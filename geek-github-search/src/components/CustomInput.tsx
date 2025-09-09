import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

interface CustomInputProps {
    placeholder:SearchType;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

type SearchType = 'Search Repositories' | 'Search Topics';

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, onChange, onKeyDown }) => {
    return (
        <Box sx={{ width: '100%', my: 2 }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default CustomInput;