import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../theme/ThemeContext';
import CommonHeader from '../../components/CommonHeader';
import CustomButton from '../../components/CustomButton';
import { useTokenChecker } from '../../hook/useTokenChecker';
import { initialForm } from '../../utils/InitialFrom';
import { showToast } from '../../hook/useToast';
import { fetchCompanyById, updateCompany } from '../../redux/slices/companySlice';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { cleanCompanyCode, cleanCompanyField, getLogoUrl } from '../../utils/helper';

// Types
type CompanyFormData = typeof initialForm.CompanyForm;
type CompanyFormKeys = keyof CompanyFormData;

const CompleteProfile = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const { payload } = useTokenChecker();
    const { currentCompany, loading: reduxLoading, error } = useAppSelector((state: any) => state.company);

    const [formData, setFormData] = useState<CompanyFormData>(initialForm.CompanyForm);
    const [logoUri, setLogoUri] = useState<string | null>(null);
    const [showBusinessInfo, setShowBusinessInfo] = useState(false);

    useEffect(() => {
        fetchCompanyData();
    }, [dispatch, payload]);

    useEffect(() => {
        if (currentCompany) {
            populateFormWithCompanyData(currentCompany);
        }
    }, [currentCompany]);

    const fetchCompanyData = async () => {
        try {
            let companyId: number | undefined;

            if (payload?.company?.id) {
                companyId = parseInt(payload.company.id);
            }
            console.log("companyId", companyId);


            if (companyId && !isNaN(companyId)) {
                await dispatch(fetchCompanyById(companyId) as any);
            } else {
                console.log('No company ID found, using payload data');
                if (payload?.company) {
                    populateFormWithCompanyData(payload.company);
                }
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
            showToast.error('Failed to load company data');
        }
    };

    const populateFormWithCompanyData = (companyData: any) => {
        const populatedData: CompanyFormData = {
            name: cleanCompanyField(companyData.name) || '',
            company_code: cleanCompanyCode(companyData.company_code) || '',
            logo: companyData.logo || '',
            email: cleanCompanyField(companyData.email) || '',
            phone: companyData.phone || payload?.user?.phone || '',
            website: cleanCompanyField(companyData.website) || '',
            address: cleanCompanyField(companyData.address) || '',
            city: cleanCompanyField(companyData.city) || '',
            state: cleanCompanyField(companyData.state) || '',
            country: cleanCompanyField(companyData.country) || '',
            zipCode: cleanCompanyField(companyData.zipCode) || '',
            gstin: cleanCompanyField(companyData.gstin) || '',
        };

        setFormData(populatedData);

        if (companyData.logo) {
            setLogoUri(getLogoUrl(companyData.logo));
        }
    };

    const handleInputChange = (field: CompanyFormKeys, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleChooseLogo = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
            quality: 0.8
        };

        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                    setLogoUri(uri);
                    handleInputChange('logo', uri);
                }
            }
        });
    };

    const handleSubmit = async () => {
        const requiredFields: CompanyFormKeys[] = ['name', 'company_code', 'email'];
        const missingFields = requiredFields.filter(field => !formData[field].trim());

        if (missingFields.length > 0) {
            showToast.error('Please fill all required fields.');
            return;
        }

        try {
            const companyId = parseInt(payload?.company?.id || '');

            if (!companyId || isNaN(companyId)) {
                showToast.error('Company ID not found.');
                return;
            }

            if (logoUri && logoUri.startsWith('file://')) {
                const formDataToSend = new FormData();

                Object.keys(formData).forEach(key => {
                    if (key !== 'phone' && key !== 'logo') {
                        formDataToSend.append(key, formData[key as CompanyFormKeys]);
                    }
                });

                formDataToSend.append('logo', {
                    uri: logoUri,
                    type: 'image/jpeg',
                    name: 'company-logo.jpg'
                } as any);


                const result = await dispatch(updateCompany({
                    id: companyId,
                    companyData: formDataToSend
                })).unwrap();


                if (result.success) {
                    showToast.success(result.data.message || 'Profile updated successfully!');
                    navigation.reset({ index: 0, routes: [{ name: 'AdminDrawer' }] });
                    dispatch(fetchCompanyById(companyId))
                } else {
                    showToast.error(result.data.message || 'Failed to update profile');
                }

            } else {
                const { phone, ...submitData } = formData;

                console.log('📤 Sending JSON data:', submitData);

                const result = await dispatch(updateCompany({
                    id: companyId,
                    companyData: submitData
                })).unwrap();

                console.log("✅ Result:", result);

                if (result.success) {
                    showToast.success(result.data.message || 'Profile updated successfully!');
                    navigation.reset({ index: 0, routes: [{ name: 'AdminDrawer' }] });
                    dispatch(fetchCompanyById(companyId))
                } else {
                    showToast.error(result.data.message || 'Failed to update profile');
                }
            }
        } catch (error: any) {
            console.error('❌ Update error:', error);
            showToast.error(error.message || 'Something went wrong.');
        }
    };


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onPrimary }]}>
            <CommonHeader
                title="Company Profile"
                showBackButton={false}
                showMenuButton={false}
                rightIcon="account-circle"
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Information</Text>

                        {/* Logo */}
                        <View style={styles.logoSection}>
                            <Text style={styles.logoLabel}>Company Logo</Text>
                            <TouchableOpacity style={styles.logoContainer} onPress={handleChooseLogo}>
                                {logoUri ? (
                                    <Image source={{ uri: logoUri }} style={styles.logo} />
                                ) : (
                                    <View style={styles.logoPlaceholder}>
                                        <MaterialIcons name="add-a-photo" size={24} color="#6b7280" />
                                        <Text style={styles.logoPlaceholderText}>Choose Logo</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Company Name */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='business' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>Company Name *</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.name}
                                onChangeText={(value) => handleInputChange('name', value)}
                                placeholder="Enter Company Name"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                editable={true}
                            />
                        </View>

                        {/* Company Code */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='code' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>Company Code *</Text>
                            </View>
                            <TextInput
                                style={[styles.input, styles.disabledInput, { borderColor: theme.colors.outline, color: theme.colors.onSurface }]}
                                value={formData.company_code}
                                onChangeText={(value) => handleInputChange('company_code', value)}
                                placeholder="Enter Company Code"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                editable={false}
                            />
                        </View>

                        {/* Email Address */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='email' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>Email Address *</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                                placeholder="Enter Email Address"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="email-address"
                                editable={true}
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Phone Number */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='phone' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>Phone Number</Text>
                            </View>
                            <TextInput
                                style={[styles.input, styles.disabledInput, { borderColor: theme.colors.outline, color: theme.colors.onSurface }]}
                                value={formData.phone}
                                onChangeText={(value) => handleInputChange('phone', value)}
                                placeholder="Enter Phone Number"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="phone-pad"
                                editable={false}
                            />
                        </View>

                        {/* Website */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='language' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>Website</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.website}
                                onChangeText={(value) => handleInputChange('website', value)}
                                placeholder="Enter Website"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="url"
                                editable={true}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {showBusinessInfo && <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Business Information</Text>

                        {/* Address */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='location-on' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>Address</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.address}
                                onChangeText={(value) => handleInputChange('address', value)}
                                placeholder="Enter Address"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="default"
                                editable={true}
                            />
                        </View>

                        {/* City */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='location-city' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>City</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.city}
                                onChangeText={(value) => handleInputChange('city', value)}
                                placeholder="Enter City"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="default"
                                editable={true}
                            />
                        </View>

                        {/* State */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='map' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>State</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.state}
                                onChangeText={(value) => handleInputChange('state', value)}
                                placeholder="Enter State"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="default"
                                editable={true}
                            />
                        </View>

                        {/* Country */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='flag' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>Country</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.country}
                                onChangeText={(value) => handleInputChange('country', value)}
                                placeholder="Enter Country"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="default"
                                editable={true}
                            />
                        </View>

                        {/* Zip Code */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='local-post-office' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>Zip Code</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.zipCode}
                                onChangeText={(value) => handleInputChange('zipCode', value)}
                                placeholder="Enter Zip Code"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="number-pad"
                                editable={true}
                            />
                        </View>

                        {/* GSTIN */}
                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <MaterialIcons name='receipt' size={20} color={theme.colors.primary} />
                                <Text style={styles.label}>GSTIN</Text>
                            </View>
                            <TextInput
                                style={[styles.input, { borderColor: theme.colors.outline, color: theme.colors.onSurface, backgroundColor: '#f7f6f6ff' }]}
                                value={formData.gstin}
                                onChangeText={(value) => handleInputChange('gstin', value)}
                                placeholder="Enter GSTIN"
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                keyboardType="default"
                                editable={true}
                            />
                        </View>
                    </View>}

                    <View style={styles.navigationButtons}>
                        {showBusinessInfo ? (
                            <>
                                <CustomButton
                                    title="← Back to Basic Info"
                                    onPress={() => setShowBusinessInfo(false)}
                                    backgroundColor="#6b7280"
                                    style={styles.navButton}
                                />
                                <CustomButton
                                    title={reduxLoading ? "Updating Profile..." : "Update Profile"}
                                    onPress={handleSubmit}
                                    backgroundColor={theme.colors.primary}
                                    style={styles.submitButton}
                                    disabled={reduxLoading}
                                />
                            </>
                        ) : (
                            <CustomButton
                                title="Continue to Business Info →"
                                onPress={() => setShowBusinessInfo(true)}
                                backgroundColor={theme.colors.primary}
                                style={styles.continueButton}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContent: {
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginTop: 20,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    section: {
        marginBottom: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 8,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 10,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
    },
    logoPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoPlaceholderText: {
        marginTop: 8,
        fontSize: 12,
        color: '#6b7280',
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    inputGroup: {
        marginBottom: 16
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151'
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'normal',
    },
    disabledInput: {
        backgroundColor: '#f9fafb',
        opacity: 0.7,
    },
    navigationButtons: {
        marginTop: 20,
        gap: 10,
    },
    continueButton: {
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButton: {
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CompleteProfile;