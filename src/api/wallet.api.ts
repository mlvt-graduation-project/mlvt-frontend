import credentialAPI from './credential.api';

export const getWalletBalance = async (userID: string): Promise<number> => {
    try {
        const response = await credentialAPI.get<{ balance: number }>(`/wallet/balance`, {
            params: { user_id: userID },
        });
        return response.data?.balance;
    } catch (error) {
        console.error('Error getting wallet balance:', error);
        throw error;
    }
};
