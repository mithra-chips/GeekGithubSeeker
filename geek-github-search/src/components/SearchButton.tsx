import React from 'react';
import Button from '@mui/material/Button';

interface SearchButtonProps {
    onClick: () => Promise<void>;
    children: React.ReactNode;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, children }) => {
    return (
        <Button
            fullWidth
            variant="contained"
            onClick={onClick}
            sx={{ mb: 1 }}
        >
            {children}
        </Button>
    );
};

export default SearchButton;