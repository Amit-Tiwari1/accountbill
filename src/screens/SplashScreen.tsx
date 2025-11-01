import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  Text,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { testDbConnection } from '../hook/useExportDb';
import { decodeJwt } from '../utils/jwtHelper';
import { useAppDispatch, useAppSelector } from '../hook/hooks';
import { fetchCompanyById } from '../redux/slices/companySlice';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Animation values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(30)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  // Use useRef for navigation destination to persist across renders
  const navigationDestination = useRef<any>(null);

  useEffect(() => {
    const runAnimation = async () => {
      try {
        await testDbConnection();

        const authPromise = checkAuth();

        // Background fade in
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Logo animation sequence
        Animated.sequence([
          Animated.parallel([
            Animated.timing(logoOpacity, {
              toValue: 1,
              duration: 600,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(logoScale, {
              toValue: 1,
              duration: 800,
              easing: Easing.out(Easing.back(1.2)),
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(500),
          Animated.parallel([
            Animated.timing(textOpacity, {
              toValue: 1,
              duration: 400,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(textTranslateY, {
              toValue: 0,
              duration: 400,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(800),
        ]).start(async () => {
          await authPromise;

          Animated.parallel([
            Animated.timing(logoOpacity, {
              toValue: 0,
              duration: 300,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
              toValue: 0,
              duration: 300,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(backgroundOpacity, {
              toValue: 0,
              duration: 300,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
          ]).start(() => {
            if (navigationDestination.current) {
              navigation.reset(navigationDestination.current);
            }
          });
        });

      } catch (error) {
        console.error('DB connection error:', error);
        navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
      }
    };

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          // No token → go to Auth stack
          navigationDestination.current = {
            index: 0,
            routes: [{ name: 'AuthStack' }],
          };
          return;
        }

        // Decode token payload
        const { payload } = decodeJwt(token);
        console.log("payload", payload);

        if (!payload || !payload.company?.id) {
          console.error('Invalid token payload');
          navigationDestination.current = {
            index: 0,
            routes: [{ name: 'AuthStack' }],
          };
          return;
        }

        const companyId = parseInt(payload.company.id);
        if (isNaN(companyId)) {
          console.error('Invalid company ID:', payload.company.id);
          navigationDestination.current = {
            index: 0,
            routes: [{ name: 'AuthStack' }],
          };
          return;
        }

        // Fetch company details
        const result = await dispatch(fetchCompanyById(companyId)).unwrap();
        console.log('Company Fetch Result:', result);

        // Your API returns { status: "success", data: { ... } }
        if (result.status === 'success' && result.data) {
          const { name, email } = result.data;

          const isTempUser =
            name?.toLowerCase().startsWith('temporary') ||
            (email && email.startsWith('temp_'));

          if (isTempUser) {
            navigationDestination.current = {
              index: 0,
              routes: [{ name: 'CompleteProfile' }],
            };
            return;
          }

          // ✅ Normal company user
          navigationDestination.current = {
            index: 0,
            routes: [{ name: 'AdminDrawer' }],
          };
        } else {
          // If API fails → go to Auth stack
          console.error('Company fetch failed:', result);
          navigationDestination.current = {
            index: 0,
            routes: [{ name: 'AuthStack' }],
          };
        }
      } catch (e) {
        console.log('Error checking auth', e);
        navigationDestination.current = {
          index: 0,
          routes: [{ name: 'AuthStack' }],
        };
      }
    };


    runAnimation();
  }, [navigation, logoScale, logoOpacity, textOpacity, textTranslateY, backgroundOpacity, dispatch]);

  return (
    <Animated.View style={[styles.container, {
      backgroundColor: theme.colors.background,
      opacity: backgroundOpacity
    }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
        translucent
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={[styles.logoCircle, { backgroundColor: theme.colors.primary }]}>
            <MaterialIcons
              name="account-balance-wallet"
              size={60}
              color="white"
            />
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={[styles.appName, { color: theme.colors.primary }]}>
            Account Bill
          </Text>
          <Text style={[styles.appTagline, { color: theme.colors.onSurfaceVariant }]}>
            Manage your finances
          </Text>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  appTagline: {
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;