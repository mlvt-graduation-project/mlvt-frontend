import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export interface CustomButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
    text: string;
    height?: number | string;
    onClick: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    height = 39,
    onClick,
    sx,
    ...rest
}) => (
    <Button
        variant="contained"
        onClick={onClick}
        sx={{
            height,
            borderRadius: 1,
            fontWeight: 550,
            bgcolor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.background.default,
            fontFamily: 'Poppins, Sora, sans-serif',
            ...sx,
        }}
        {...rest}
    >
        {text}
    </Button>
);
