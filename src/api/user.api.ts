import apiClient from './credential.api';
import { GetUserResponse, UserUpdateData } from '../types/Response/User';

export const getUser = async (userId: string): Promise<GetUserResponse> => {
  try {
    const response = await apiClient.get<GetUserResponse>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error}`);
  }
};

export const updateUser = async (userId: string, updatedData: UserUpdateData) => {
  try {
    const response = await apiClient.put<string>(`/users/${userId}`, updatedData);
    return response;
  } catch (error) {
    throw new Error(`Failed to update user data: ${error}`);
  }
}
