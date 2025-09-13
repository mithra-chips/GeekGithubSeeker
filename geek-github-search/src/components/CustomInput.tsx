import React from 'react';
import TextField from '@mui/material/TextField';

interface CustomInputProps {
    placeholder:SearchType;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type SearchType = 'Search Repositories';

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, onChange }) => {
    return (
        <TextField
            sx={{ mb: 2 }}
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default CustomInput;