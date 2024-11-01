import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { Search, Menu as MenuIcon } from "@mui/icons-material";

const CustomSearchBar = () => {
    return (
        <Paper
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                width: '80%',
                padding: '2px 10px',
                borderRadius: '50px',
                backgroundColor: '#f2ebf5' // Light purple color to match your design
            }}
            elevation={0} // Removes shadow if desired
        >
            {/* Left Icon */}
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton>

            {/* Input Field */}
            <InputBase
                sx={{ ml: 1, flex: 1, fontSize: '15px' }}
                placeholder="Hinted search text"
                inputProps={{ 'aria-label': 'search' }}
            />

            {/* Right Icon */}
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <Search />
            </IconButton>
        </Paper>
    );
};

export default CustomSearchBar;
