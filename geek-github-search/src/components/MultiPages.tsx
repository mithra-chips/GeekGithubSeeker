import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface MultiPagesProps {
    // The total number of pages.
    count: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const MultiPages: React.FC<MultiPagesProps> = ({ count, onPageChange }) => {
    return (
        <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Pagination
                count={count}
                onChange={onPageChange}
                variant="outlined"
                shape="rounded"
                color="primary"
            />
        </Stack>
    );
};

export default MultiPages;