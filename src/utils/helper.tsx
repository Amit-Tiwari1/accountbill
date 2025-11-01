import api from "../services/api/axiosInstance";

export const validatePhoneNumber = (num: string) => /^[6-9]\d{9}$/.test(num);

export const cleanCompanyCode = (companyCode: string | null | undefined): string => {
    if (!companyCode) return '';

    // Remove TEMP- patterns from company code
    const cleanedCode = companyCode
        .replace(/^TEMP-/i, '')
        .replace(/^TEMP_/i, '')
        .replace(/^TMP-/i, '')
        .replace(/^TMP_/i, '')
        .replace(/^TEMP/i, '')
        .replace(/^TMP/i, '')
        .trim();

    return cleanedCode;
};

export const cleanCompanyField = (value: string | null | undefined): string => {
    if (!value) return '';

    const temporaryPatterns = [
        'temporary company',
        'temp company',
        'default company',
        'placeholder company',
        'sample company',
        'test company'
    ];

    const cleanedValue = temporaryPatterns.reduce((acc, pattern) => {
        return acc.toLowerCase().replace(pattern.toLowerCase(), '').trim();
    }, value);

    return cleanedValue === '' ? '' : value;
};

export const isTemporaryCompanyCode = (companyCode: string | null | undefined): boolean => {
    if (!companyCode) return false;

    const tempPatterns = [
        /^TEMP-/i,
        /^TEMP_/i,
        /^TMP-/i,
        /^TMP_/i,
        /^TEMP/i,
        /^TMP/i
    ];

    return tempPatterns.some(pattern => pattern.test(companyCode));
};

/**
 * Generates a temporary company code (useful for creating new companies)
 */
export const generateTemporaryCompanyCode = (): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `TEMP-${randomNum}`;
};


// utils/urlHelper.js
export const getLogoUrl = (logoPath: string | null | undefined) => {
    if (!logoPath) return null;

    // Remove leading slash if present to avoid double slashes
    const cleanPath = logoPath.replace(/^\//, '');
    console.log(cleanPath);

    return `${api.defaults.baseURL}/${cleanPath}`;
};
