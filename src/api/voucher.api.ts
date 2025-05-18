import credentialAPI from './credential.api';

export const UseRedeemCode = async (userID: number, redeemCode: string): Promise<number> => {
    try {
        const response = await credentialAPI.post<{ token: number }>(`/voucher/use/${redeemCode}`, {
            user_id: userID,
        });
        return response.data?.token;
    } catch (error) {
        console.error('Error using redeem code:', error);
        throw error;
    }
};
