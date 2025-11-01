import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api/axiosInstance';

interface Company {
    id: number;
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
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

interface CompanyState {
    companies: Company[];
    currentCompany: Company | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: CompanyState = {
    companies: [],
    currentCompany: null,
    loading: false,
    error: null,
    success: false,
};

// Get all companies
export const fetchCompanies = createAsyncThunk(
    'company/fetchCompanies',
    async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
        try {
            const response = await api.get(`?route=company&page=${page}&limit=${limit}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Failed to fetch companies');
        }
    }
);

// Get company by ID
export const fetchCompanyById = createAsyncThunk(
    'company/fetchCompanyById',
    async (companyId: number, { rejectWithValue }) => {
        try {
            const response = await api.get(`?route=company/show&id=${companyId}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Failed to fetch company');
        }
    }
);

// Create company
export const createCompany = createAsyncThunk(
    'company/createCompany',
    async (companyData: FormData | Omit<Company, 'id' | 'isDeleted' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
        try {
            const config = companyData instanceof FormData
                ? { headers: { 'Content-Type': 'multipart/form-data' } }
                : {};

            const response = await api.post('?route=company', companyData, config);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Failed to create company');
        }
    }
);

// Update company
export const updateCompany = createAsyncThunk(
    'company/updateCompany',
    async ({ id, companyData }: { id: number; companyData: any }, { rejectWithValue }) => {
        try {
            console.log('📤 Data type:', companyData instanceof FormData ? 'FormData' : 'JSON');
            console.log('📤 Data:', companyData);

            const config = companyData instanceof FormData
                ? {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
                : {};

            const response = await api.put(`?route=company/update&id=${id}`, companyData, config);

            console.log('✅ Backend response:', response.data);

            return {
                success: true,
                data: response.data,
            };
        } catch (err: any) {
            console.log('❌ Full error:', err);
            console.log('❌ Error response:', err.response?.data);
            return rejectWithValue(err.response?.data?.error || 'Failed to update company');
        }
    }
);
// Delete company (soft delete)
export const deleteCompany = createAsyncThunk(
    'company/deleteCompany',
    async (companyId: number, { rejectWithValue }) => {
        try {
            const response = await api.delete(`?route=company/delete&id=${companyId}`);
            return { companyId, data: response.data };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Failed to delete company');
        }
    }
);

// Search companies
export const searchCompanies = createAsyncThunk(
    'company/searchCompanies',
    async ({ query, page = 1, limit = 10 }: { query: string; page?: number; limit?: number }, { rejectWithValue }) => {
        try {
            const response = await api.get(`?route=company/search&q=${query}&page=${page}&limit=${limit}`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Search failed');
        }
    }
);

// Upload logo
export const uploadCompanyLogo = createAsyncThunk(
    'company/uploadLogo',
    async ({ companyId, logo }: { companyId: number; logo: FormData }, { rejectWithValue }) => {
        try {
            const response = await api.post('?route=company/uploadLogo', logo, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return { companyId, data: response.data };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Failed to upload logo');
        }
    }
);

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        clearCompanyError: (state) => {
            state.error = null;
        },
        clearCompanySuccess: (state) => {
            state.success = false;
        },
        setCurrentCompany: (state, action: PayloadAction<Company | null>) => {
            state.currentCompany = action.payload;
        },
        clearCompanies: (state) => {
            state.companies = [];
            state.currentCompany = null;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // fetchCompanies
        builder.addCase(fetchCompanies.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.companies = action.payload.data || [];
            state.success = true;
        });
        builder.addCase(fetchCompanies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // fetchCompanyById
        builder.addCase(fetchCompanyById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCompanyById.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.currentCompany = action.payload.data || null;
            state.success = true;
        });
        builder.addCase(fetchCompanyById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // createCompany
        builder.addCase(createCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(createCompany.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            // You can add the new company to the list if needed
            if (action.payload.companyId) {
                state.success = true;
            }
        });
        builder.addCase(createCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.success = false;
        });

        // updateCompany
        builder.addCase(updateCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(updateCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;

            // Update current company with the data from payload
            if (state.currentCompany) {
                state.currentCompany = {
                    ...state.currentCompany,
                    ...action.payload.data // Spread the data from the response
                };
            }
        });
        builder.addCase(updateCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.success = false;
        });

        // deleteCompany
        builder.addCase(deleteCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteCompany.fulfilled, (state, action: PayloadAction<{ companyId: number; data: any }>) => {
            state.loading = false;
            state.success = true;

            const { companyId } = action.payload;

            // Remove from companies list
            state.companies = state.companies.filter(company => company.id !== companyId);

            // Clear current company if it's the one being deleted
            if (state.currentCompany?.id === companyId) {
                state.currentCompany = null;
            }
        });
        builder.addCase(deleteCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // searchCompanies
        builder.addCase(searchCompanies.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(searchCompanies.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.companies = action.payload.data || [];
            state.success = true;
        });
        builder.addCase(searchCompanies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // uploadCompanyLogo
        builder.addCase(uploadCompanyLogo.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(uploadCompanyLogo.fulfilled, (state, action: PayloadAction<{ companyId: number; data: any }>) => {
            state.loading = false;
            state.success = true;

            const { companyId, data } = action.payload;

            // Update logo in current company
            if (state.currentCompany && state.currentCompany.id === companyId) {
                state.currentCompany.logo = data.logoPath;
            }

            // Update logo in companies list
            const index = state.companies.findIndex(company => company.id === companyId);
            if (index !== -1) {
                state.companies[index].logo = data.logoPath;
            }
        });
        builder.addCase(uploadCompanyLogo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {
    clearCompanyError,
    clearCompanySuccess,
    setCurrentCompany,
    clearCompanies
} = companySlice.actions;

export default companySlice.reducer;