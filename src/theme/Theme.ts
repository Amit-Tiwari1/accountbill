import { Colors } from './Colors';

export interface AppTheme {
    colors: {
        primary: string;
        onPrimary: string;
        secondary: string;
        background: string;
        lightBackground: string;
        surface: string;
        onSurface: string;
        error: string;
        outline: string;
        onSurfaceVariant: string;
        primaryContainer: string;
        secondaryContainer: string;
        onSecondaryContainer: string;
        errorContainer: string;
        onErrorContainer: string;
        surfaceVariant: string;
    };
    roundness: number;
}

export const LightTheme: AppTheme = {
    roundness: 12,
    colors: {
        primary: Colors.primary,
        onPrimary: '#D3D3D3',
        secondary: Colors.secondary,
        background: '#FFFFFF',
        surface: '#FFFFFF',
        onSurface: Colors.textPrimary,
        error: Colors.error,
        outline: Colors.border,
        onSurfaceVariant: Colors.textSecondary,
        primaryContainer: Colors.primaryLight,
        secondaryContainer: Colors.secondaryLight,
        onSecondaryContainer: '#000000',
        errorContainer: Colors.error,
        onErrorContainer: '#FFFFFF',
        surfaceVariant: Colors.surface,
        lightBackground: Colors.primaryLight
    },
};


