import React, {ChangeEvent} from 'react'
import {Box, Input} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    searchBarWidth: string | number;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChange, searchBarWidth }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#DDE6ED',
            padding: '0.5rem',
            height: '20px',
            borderRadius: '4px'
        }}>
            <SearchIcon sx={{ marginRight: '10px', width: '18px' }}/>
            <Input
                placeholder={placeholder}
                onChange={onChange}
                sx={{
                    width: searchBarWidth,
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '0.8rem'
                }}
                disableUnderline
            />
        </Box>
    )
}

export default SearchBar