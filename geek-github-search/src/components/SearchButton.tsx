import React from 'react';
import Button from '@mui/material/Button';

interface SearchButtonProps {
    onClick: () => Promise<void>;
    children: React.ReactNode;
    disabled?: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, children, disabled = false }) => {
    return (
        <Button
            fullWidth
            variant="contained"
            onClick={onClick}
            sx={{ mb: 1 }}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export default SearchButton;