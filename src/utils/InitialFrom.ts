export interface CompanyForm {
    name: string;
    company_code: string;
    logo: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    gstin: string;
}

export const initialForm: CompanyForm = {
    name: '',
    company_code: '',
    logo: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    gstin: '',
};