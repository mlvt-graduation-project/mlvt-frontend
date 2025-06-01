import { get, put } from './base.api';
import { GetUserResponse, UserUpdateData } from '../types/Response/User';

export const getUser = async (userId: string): Promise<GetUserResponse> => {
  try {
    const response = await get<GetUserResponse>(`/users/${userId}`);
    return response;
  } catch (error) {
    console.error('API Error in getUser:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, updatedData: UserUpdateData): Promise<string> => {
  try {
    const response = await put<string, UserUpdateData>(`/users/${userId}`, updatedData);
    return response;
  } catch (error) {
    console.error('API Error in updateUser:', error);
    throw error;
  }
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<string> => {
  try {
    const response = await put<string>(`/users/${userId}/change-password`, {
      old_password: oldPassword,
      new_password: newPassword,
    });
    return response; 
  } catch (error) {
    console.error('API Error in changePassword:', error);
    throw error;
  }
};

export const getAvatarDownloadUrl = async (userId: string): Promise<string> => {
  try {
    const response = await get<{ avatar_download_url: string }>(`/users/${userId}/avatar-download-url`);
    return response.avatar_download_url;
  } catch (error) {
    console.error('API Error in getAvatarDownloadUrl:', error);
    throw error;
  }
}