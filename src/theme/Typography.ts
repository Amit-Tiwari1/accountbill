import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Base screen width for scaling (Pixel 5 = 411)
const scale = SCREEN_WIDTH / 411;

function responsiveSize(size: number) {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const Typography = {
    // Font families (you can update based on your app)
    fontFamilyRegular: 'System',
    fontFamilyMedium: 'System',
    fontFamilyBold: 'System',

    // Font weights
    weightLight: '300' as const,
    weightRegular: '400' as const,
    weightMedium: '500' as const,
    weightSemiBold: '600' as const,
    weightBold: '700' as const,

    // Responsive font sizes
    displayLarge: responsiveSize(57),
    displayMedium: responsiveSize(45),
    displaySmall: responsiveSize(36),

    headlineLarge: responsiveSize(32),
    headlineMedium: responsiveSize(28),
    headlineSmall: responsiveSize(24),

    titleLarge: responsiveSize(22),
    titleMedium: responsiveSize(16),
    titleSmall: responsiveSize(14),

    bodyLarge: responsiveSize(16),
    bodyMedium: responsiveSize(14),
    bodySmall: responsiveSize(12),

    labelLarge: responsiveSize(14),
    labelMedium: responsiveSize(12),
    labelSmall: responsiveSize(11),

    // Line heights (approximate Material specs)
    lineHeight: {
        display: responsiveSize(64),
        headline: responsiveSize(40),
        title: responsiveSize(28),
        body: responsiveSize(22),
        label: responsiveSize(18),
    },

    // Letter spacing for better readability
    letterSpacing: {
        tight: -0.25,
        normal: 0,
        wide: 0.5,
    },
};

export default Typography;
