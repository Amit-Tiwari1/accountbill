// drawerAnimation.ts
import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const DrawerWidth = width * 0.7;

export const useDrawerAnimation = () => {
    const animation = useRef(new Animated.Value(0)).current;

    const openDrawer = (callback?: () => void) => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start(callback);
    };

    const closeDrawer = (callback?: () => void) => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start(callback);
    };

    const toggleDrawer = (isOpen: boolean, callback?: () => void) => {
        Animated.timing(animation, {
            toValue: isOpen ? 0 : 1,
            duration: 250,
            useNativeDriver: true,
        }).start(callback);
    };

    const drawerTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-DrawerWidth, 0],
    });

    const contentTranslate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, DrawerWidth],
    });

    const overlayOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.4],
    });

    return {
        animation,
        drawerTranslate,
        contentTranslate,
        overlayOpacity,
        openDrawer,
        closeDrawer,
        toggleDrawer,
    };
};
