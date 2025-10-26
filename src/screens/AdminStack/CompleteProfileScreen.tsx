import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../theme/ThemeContext';
import CommonHeader from '../../components/CommonHeader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import api from '../../services/api/axiosInstance';
import { useTokenChecker } from '../../hook/useTokenChecker';
import { initialForm, CompanyForm } from '../../utils/InitialFrom';

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

type FormDataKeys = keyof CompanyForm;



const CompleteProfile = () => {
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const { payload } = useTokenChecker();

    const [formData, setFormData] = useState<CompanyForm>(initialForm);
    const [loading, setLoading] = useState(false);
    const [logoUri, setLogoUri] = useState<string | null>(null);
    const [showBusinessInfo, setShowBusinessInfo] = useState(false);

    // Populate from payload
    useEffect(() => {
        if (!payload) return;
        setFormData(prev => ({
            ...prev,
            name: payload.company?.name || '',
            email: payload.user?.email || '',
            phone: payload.user?.phone || '',
        }));
    }, [payload]);

    const handleInputChange = (field: FormDataKeys, value: string) => {
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
                setLogoUri(uri ?? "");
                handleInputChange('logo', uri || '');
            }
        });
    };

    const handleSubmit = async () => {
        // Validate required fields
        const requiredFields: FormDataKeys[] = ['name', 'company_code', 'email', 'phone'];
        const missingFields = requiredFields.filter(field => !formData[field].trim());

        if (missingFields.length > 0) {
            Alert.alert('Error', 'Please fill all required fields.');
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await api.post('/user/updateProfile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                Alert.alert('Success', 'Profile updated successfully!', [
                    {
                        text: 'OK',
                        onPress: () =>
                            navigation.reset({ index: 0, routes: [{ name: 'AdminDrawer' }] }),
                    },
                ]);
            } else {
                Alert.alert('Error', response.data.message || 'Failed to update profile.');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const renderInputWithIcon = (
        iconName: MaterialIconName,
        placeholder: string,
        field: FormDataKeys,
        keyboardType: any = 'default'
    ) => (
        <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
                <MaterialIcons name={iconName} size={20} color={theme.colors.primary} />
                <Text style={styles.label}>{placeholder}</Text>
            </View>
            <CustomInput
                value={formData[field]}
                onChangeText={(value) => handleInputChange(field, value)}
                placeholder={`Enter ${placeholder}`}
                keyboardType={keyboardType}
            />
        </View>
    );

    const BasicInfoSection = () => (
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

            {renderInputWithIcon('business', 'Company Name *', 'name')}
            {renderInputWithIcon('code', 'Company Code *', 'company_code')}
            {renderInputWithIcon('email', 'Email Address *', 'email', 'email-address')}
            {renderInputWithIcon('phone', 'Phone Number *', 'phone', 'phone-pad')}
            {renderInputWithIcon('language', 'Website', 'website', 'url')}
        </View>
    );

    const BusinessInfoSection = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Information</Text>

            {renderInputWithIcon('location-on', 'Address', 'address')}
            {renderInputWithIcon('location-city', 'City', 'city')}
            {renderInputWithIcon('map', 'State', 'state')}
            {renderInputWithIcon('flag', 'Country', 'country')}
            {renderInputWithIcon('local-post-office', 'Zip Code', 'zipCode', 'number-pad')}
            {renderInputWithIcon('receipt', 'GSTIN', 'gstin')}
        </View>
    );

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
                    {/* Always show Basic Info */}
                    <BasicInfoSection />

                    {/* Show Business Info only when showBusinessInfo is true */}
                    {showBusinessInfo && <BusinessInfoSection />}

                    {/* Navigation buttons */}
                    <View style={styles.navigationButtons}>
                        {showBusinessInfo ? (
                            // When Business Info is shown, show Back and Submit buttons
                            <>
                                <CustomButton
                                    title="← Back to Basic Info"
                                    onPress={() => setShowBusinessInfo(false)}
                                    backgroundColor="#6b7280"
                                    style={styles.navButton}
                                />
                                <CustomButton
                                    title={loading ? "Updating Profile..." : "Update Profile"}
                                    onPress={handleSubmit}
                                    backgroundColor={theme.colors.primary}
                                    style={styles.submitButton}
                                    disabled={loading}
                                />
                            </>
                        ) : (
                            // When only Basic Info is shown, show Continue button
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
    keyboardView: {
        flex: 1
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
    navigationButtons: {
        marginTop: 20,
        gap: 10,
    },
    continueButton: {
        paddingVertical: 14,
    },
    navButton: {
        paddingVertical: 12,
    },
    submitButton: {
        paddingVertical: 14,
    },
});

export default CompleteProfile;