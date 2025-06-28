import { useQuery } from '@tanstack/react-query'
import { getUserDetails } from 'src/api/user.api'

export const useGetUserDetails = () => {
    const authToken = localStorage.getItem('authToken')
    return useQuery({
        queryKey: ['userDetails', authToken],
        queryFn: async () => {
            return getUserDetails()
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!authToken,
    })
    // const { userId } = useAuth();
    // const [{ user, loading, error }, setState] = useState<State>({
    //     user: null,
    //     loading: true,
    //     error: null,
    // });
    // useEffect(() => {
    //     if (!userId) {
    //         setState({ user: null, loading: false, error: null });
    //         return;
    //     }
    //     let active = true;
    //     (async () => {
    //         try {
    //             /* make the avatar request harmless – it resolves to '' on any error */
    //             const avatarPromise = getAvatarDownloadUrl(userId).catch(
    //                 () => ""
    //             );
    //             /* run both requests together */
    //             const [{ user: apiUser }, avatarUrl] = await Promise.all([
    //                 getUser(userId),
    //                 avatarPromise,
    //             ]);
    //             if (!active) return;
    //             const avatarSrc = avatarUrl
    //                 ? avatarUrl.split("?X-Amz-Algorithm")[0]
    //                 : "";
    //             setState({
    //                 user: { ...apiUser, avatarSrc },
    //                 loading: false,
    //                 error: null,
    //             });
    //         } catch (err) {
    //             /* only fires if getUser() failed */
    //             if (active)
    //                 setState({ user: null, loading: false, error: err });
    //         }
    //     })();
    //     return () => {
    //         active = false;
    //     };
    // }, [userId]);
    // return { user, loading, error };
}
