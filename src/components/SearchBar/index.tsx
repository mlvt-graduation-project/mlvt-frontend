import React, { ChangeEvent } from 'react'
import { Box, Input } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

type SearchBarProps = {
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchBarWidth: string | number;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChange, searchBarWidth }) => {
    const theme = useTheme();
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.secondary.main,
            width: '100%',
            height: '2.2rem',
            borderRadius: '0.7rem',
            padding: '0.2rem 0.5rem',
            gap: '0.5rem',
        }}>
            <SearchIcon sx={{
                fontSize: '1.6rem',
                color: theme.palette.primary.main,
            }} />
            <Input
                placeholder={placeholder}
                onChange={onChange}
                sx={{
                    width: searchBarWidth,
                    fontSize: '0.9rem'
                }}
                disableUnderline
            />
        </Box>
    )
}

export default SearchBar
