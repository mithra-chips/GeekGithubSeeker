import React from 'react';
import Button from '@mui/material/Button';

interface SearchButtonProps {
    onClick: () => Promise<void>;
    children: React.ReactNode;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, children }) => {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            {children}
        </Button>
    );
};

export default SearchButton;