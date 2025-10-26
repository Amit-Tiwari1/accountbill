import { useEffect, useRef } from 'react';
import { Animated, Keyboard, Platform } from 'react-native';

export const useHeaderAnimation = () => {
    const titleAnim = useRef(new Animated.Value(1)).current; // title scale
    const subtitleAnim = useRef(new Animated.Value(1)).current; // subtitle opacity
    const iconAnim = useRef(new Animated.Value(1)).current; // icon scale / size

    const animateHeader = (keyboardVisible: boolean) => {
        Animated.parallel([
            Animated.timing(titleAnim, {
                toValue: keyboardVisible ? 0.8 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(iconAnim, {
                toValue: keyboardVisible ? 0.6 : 1,
                duration: 300,
                useNativeDriver: false, // size interpolation
            }),
            Animated.timing(subtitleAnim, {
                toValue: keyboardVisible ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSub = Keyboard.addListener(showEvent, () => animateHeader(true));
        const hideSub = Keyboard.addListener(hideEvent, () => animateHeader(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    // Interpolated icon size and circle size
    const iconSize = iconAnim.interpolate({
        inputRange: [0.6, 1],
        outputRange: [18, 30],
    });

    const circleSize = iconAnim.interpolate({
        inputRange: [0.6, 1],
        outputRange: [48, 80],
    });

    const circleRadius = iconAnim.interpolate({
        inputRange: [0.6, 1],
        outputRange: [24, 40],
    });

    return { titleAnim, subtitleAnim, iconAnim, iconSize, circleSize, circleRadius };
};
