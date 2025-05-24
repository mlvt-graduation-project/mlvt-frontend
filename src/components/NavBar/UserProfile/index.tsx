import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Badge,
    Menu,
    MenuItem,
    Typography,
    IconButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {
    AccountCircle,
    NavigateNext,
    WorkspacePremiumSharp,
    Help,
    Logout,
    Language,
    LightMode,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../api/user.api';
import { useAuth } from '../../../context/AuthContext';
import { User } from '../../../types/Response/User';
import { serialize } from 'v8';
import MenuDropdown from '../components/MenuDropdown';

interface UserProfileProps {
    first_name: string;
    last_name: string;
    status: boolean; // User status: premium or standard
    avatarSrc: string;
    notifications: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ first_name, last_name, status, avatarSrc, notifications }) => {
    const theme = useTheme();
    const { userId } = useAuth();

    const [user, setUser] = useState<User>();
    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(null);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (userId) {
                    const userData = await getUser(userId);
                    setUser(userData.user);
                } else {
                    throw new Error('User ID is null');
                }
            } catch (error) {
                throw new Error(`Failed to fetch user data: ${error}`);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const altText = `${first_name.charAt(0)}${last_name.charAt(0)}`;

    const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorDropdown(event.currentTarget);
    };

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} style={{ cursor: 'pointer' }}
                onClick={handleDropdownOpen}
            >
                <Avatar src={avatarSrc} alt={altText} sx={{ width: '3rem', height: '3rem' }} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}

                >
                    <Typography
                        sx={{
                            color: theme.palette.text.primary,
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                        }}
                    >
                        {`${user?.first_name} ${user?.last_name}`}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.77rem',
                        }}
                    >
                        {status ? 'Premium user' : 'Standard user'}
                    </Typography>
                </Box>
                <Badge badgeContent={notifications} color="primary" sx={{ cursor: 'pointer' }}>
                    <IconButton>
                        <NotificationsNoneIcon />
                    </IconButton>
                </Badge>
            </Box>

            {/* Dropdown Menu */}
            <MenuDropdown user={user!} anchorDropdown={anchorDropdown} setAnchorDropdown={setAnchorDropdown} />

        </>
    );
};

export default UserProfile;
