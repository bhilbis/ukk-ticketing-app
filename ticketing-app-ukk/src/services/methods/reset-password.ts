import axiosInstance from '@/lib/axiosInstance';
import axios from 'axios';

export const postSendOtp = async (data: { email: string }) => {
    try {
      const response = await axiosInstance.post('/forgot-password', data);
  
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
  
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed Send Code:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Pendaftaran gagal');
      } else {
        console.error("Failed Send Code:", error);
        throw new Error('Send Code Failed');
      }
    }
}

export const resendOtp = async (email: string) => {
    try {
        const response = await axiosInstance.post('//resend-code', email);
        
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }
    
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Failed Resend Code:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Pendaftaran gagal');
        } else {
            console.error("Failed Resend Code:", error);
            throw new Error('Resend Code Failed');
        }
    }
}

export const postVerifyOtp = async (email: string, code: string) => {
    try {
        const response = await axiosInstance.post('/validate-code', {email, code});
        
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Failed Verify Code:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Pendaftaran gagal');
        } else {
            console.error("Failed Verify Code:", error);
            throw new Error('Verify Code Failed');
        }
    }
}

export const postResetPassword = async (email: string, code: string, password: string, password_confirmation: string) => {
    try {
        const response = await axiosInstance.post('/reset-password', {email, code, password, password_confirmation});
        
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return response;
    } catch (error) { 
        if (axios.isAxiosError(error)) {
            console.error("Failed Reset Password:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Pendaftaran gagal');
        } else {
            console.error("Failed Reset Password:", error);
            throw new Error('Reset Password Failed');
        }
    }
}