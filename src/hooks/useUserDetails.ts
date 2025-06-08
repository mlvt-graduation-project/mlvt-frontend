import { useEffect, useState } from 'react';
import { getUser, getAvatarDownloadUrl } from '../api/user.api';
import { useAuth } from '../context/AuthContext';
import { UserWithAvatar } from '@/types/Response/User';

interface State {
    user: UserWithAvatar | null;
    loading: boolean;
    error: unknown;
}

export function useUserDetails() {
    const { userId } = useAuth();
    const [{ user, loading, error }, setState] = useState<State>({
        user: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!userId) {
            setState({ user: null, loading: false, error: null });
            return;
        }
        let active = true;
        (async () => {
            try {
                /* make the avatar request harmless – it resolves to '' on any error */
                const avatarPromise = getAvatarDownloadUrl(userId).catch(() => '');

                /* run both requests together */
                const [{ user: apiUser }, avatarUrl] = await Promise.all([
                    getUser(userId),        
                    avatarPromise,          
                ]);

                if (!active) return;      

                const avatarSrc = avatarUrl
                    ? avatarUrl.split('?X-Amz-Algorithm')[0]
                    : '';

                setState({
                    user: { ...apiUser, avatarSrc },
                    loading: false,
                    error: null,
                });
            } catch (err) {
                /* only fires if getUser() failed */
                if (active) setState({ user: null, loading: false, error: err });
            }

        })();

        return () => {
            active = false;
        };
    }, [userId]);

    return { user, loading, error };
}
