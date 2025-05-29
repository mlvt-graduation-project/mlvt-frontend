// src/pages/EditAccount.tsx
import React, { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    Divider,
    Link,
} from '@mui/material';
import { AccountCircle, Lock, Subscriptions } from '@mui/icons-material';
import PersonalDetails from '../../components/PersonalDetails';
import ChangePassword from '../../components/ChangePassword';
import Voucher from '../../components/Voucher';
import Footer from '../../components/Footer';
import LogoImg from '../../assets/mlvt_logo.png';
import { useUserDetails } from '../../hooks/useUserDetails';
import { UserWithAvatar } from '@/types/Response/User';

type TabKey = 'personal' | 'password' | 'subscription';

const TABS: {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
}[] = [
        { key: 'personal', label: 'Personal details', icon: <AccountCircle /> },
        { key: 'password', label: 'Change password', icon: <Lock /> },
        { key: 'subscription', label: 'Subscription', icon: <Subscriptions /> },
    ];

const listItemCommonSx = {
    cursor: 'pointer',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
};

const EditAccount: React.FC = () => {
    const theme = useTheme();
    const { user, loading } = useUserDetails();
    const [activeTab, setActiveTab] = useState<TabKey>('personal');

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <PersonalDetails
                        user={user as UserWithAvatar}
                    />
                );
            case 'password':
                return <ChangePassword />;
            case 'subscription':
                return <Voucher />;
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', padding: 4, height: '100vh' }}>
                {/* Left Sidebar */}
                <Box sx={{ flex: 1, maxWidth: 400, pr: 5 }}>
                    <Link href="/">
                        <Box
                            component="img"
                            src={LogoImg}
                            alt="Logo"
                            sx={{ width: 150, height: 150, mb: 2, borderRadius: '0.8rem' }}
                        />
                    </Link>
                    <Typography
                        sx={{
                            fontWeight: 650,
                            color: theme.palette.primary.main,
                            fontSize: '1.23rem',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        Multi-language Video Translation
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            mt: 0.5,
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        Manage your personal account settings
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mt: 3,
                            mb: 1,
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        Account settings
                    </Typography>

                    <List>
                        {TABS.map(({ key, label, icon }) => {
                            const isActive = activeTab === key;
                            return (
                                <ListItem
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    sx={{
                                        ...listItemCommonSx,
                                        backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
                                    }}
                                >
                                    <ListItemIcon>
                                        {React.cloneElement(icon as React.ReactElement, {
                                            sx: { color: isActive ? theme.palette.secondary.main : theme.palette.text.disabled }
                                        })}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        sx={{
                                            color: isActive ? theme.palette.secondary.main : theme.palette.text.disabled,
                                            '& .MuiTypography-root': { fontFamily: 'inherit' },
                                        }}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: theme.palette.divider }} />

                {/* Content Area */}
                <Box sx={{ flex: 2, pl: 5 }}>
                    {renderContent()}
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default EditAccount;
