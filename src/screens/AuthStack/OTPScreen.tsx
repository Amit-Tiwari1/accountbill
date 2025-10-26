import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated,
    TouchableOpacity,
    TextInput,
    Text,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../theme/Colors';
import { showToast } from '../../hook/useToast';

interface OTPScreenProps {
    navigation: any;
    route: any;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation, route }) => {
    const { phone } = route.params;
    const theme = useTheme();

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputsRef = useRef<TextInput[]>([]);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const [counter, setCounter] = useState(30);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        timerRef.current = setInterval(() => {
            setCounter((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleChangeNumber = () => navigation.goBack();

    const handleResendOTP = () => {
        setCounter(30);
        setOtp(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
        showToast.success('OTP resent successfully!');

        timerRef.current = setInterval(() => {
            setCounter((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleOTPChange = (text: string, index: number) => {
        if (!/^\d*$/.test(text)) return; // only digits
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            inputsRef.current[index + 1]?.focus();
        } else if (!text && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = () => {
        const code = otp.join('');
        if (code.length !== 6) return showToast.error('nter a valid 6-digit OTP');
        showToast.success('OTP Verified!');
        navigation.replace('AdminDrawer');

    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                        <View style={[styles.mainContent, { backgroundColor: Colors.card }]}>
                            <View style={styles.iconContainer}>
                                <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary }]}>
                                    <MaterialIcons name="lock" size={30} color="#fff" />
                                </View>
                            </View>
                            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
                                Verify OTP
                            </Text>
                            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
                                Enter the 6-digit code that you recive
                            </Text>
                            <TouchableOpacity onPress={handleChangeNumber}>
                                <Text style={[styles.changeNumber, { color: theme.colors.primary }]}>
                                    Change Number
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* OTP Boxes */}
                        <View style={styles.bodyContent}>
                            <View style={styles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(el) => { inputsRef.current[index] = el!; }}  // <-- fixed
                                        value={digit}
                                        onChangeText={(text) => handleOTPChange(text, index)}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        style={[
                                            styles.otpInput,
                                            {
                                                borderColor: digit ? theme.colors.primary : theme.colors.outline,
                                                color: theme.colors.onSurface,
                                                backgroundColor: theme.colors.surface,
                                            },
                                        ]}
                                    />
                                ))}
                            </View>


                            <TouchableOpacity
                                onPress={handleVerifyOTP}
                                style={[styles.submitButton, { backgroundColor: theme.colors.surface }]}
                            >
                                <Text style={[styles.buttonLabel, { color: theme.colors.primary }]}>Verify</Text>
                            </TouchableOpacity>

                            <Text style={[styles.footerText, { color: theme.colors.surface }]}>
                                {counter > 0 ? `Resend OTP in ${counter}s` : (
                                    <Text style={{ color: theme.colors.primary }} onPress={handleResendOTP}>
                                        Resend OTP
                                    </Text>
                                )}
                            </Text>
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    keyboardView: { flex: 1 },
    scrollContent: { flexGrow: 1 },
    mainContent: {
        height: '33%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 0,
    },
    bodyContent: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 40,
        alignItems: 'center',
    },
    iconContainer: { marginBottom: 24 },
    iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 6 },
    subtitle: { fontSize: 15, opacity: 0.7, textAlign: 'center', marginBottom: 12 },
    changeNumber: { fontSize: 14, textDecorationLine: 'underline', marginTop: 4 },
    otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, width: '80%', gap: 5 },
    otpInput: {
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 14,
        width: 45,
    },
    submitButton: { borderRadius: 12, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 24 },
    buttonLabel: { fontSize: 16, fontWeight: '600' },
    footerText: { textAlign: 'center', fontSize: 12, opacity: 0.6, lineHeight: 18 },
});

export default OTPScreen;
