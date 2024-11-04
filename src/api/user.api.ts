import apiClient from './apiClient';
import { GetUserResponse } from '../types/User';

export const getUser = async (userId: string): Promise<GetUserResponse> => {
  try {
    const response = await apiClient.get<GetUserResponse>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error}`);
  }
};
