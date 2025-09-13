import  { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, type SelectChangeEvent, Card, CardHeader, Typography } from '@mui/material';

type SortOption = {
    value: string;
    label: string;
};

interface SortButtonProps {
    onSortChange: (sortValue: string) => void;
    initialSort?: string;
}

// 排序选项列表
const sortOptions: SortOption[] = [
    { value: '', label: 'Best Match' },
    { value: 'stars', label: 'Stars' },
    { value: 'forks', label: 'Forks' },
    { value: 'updated', label: 'Recently Updated' },
];

const SortButton: React.FC<SortButtonProps> = ({ onSortChange, initialSort = '' }) => {
    const [selectedSort, setSelectedSort] = useState(initialSort);

    // 处理选择变化事件
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const sortValue = event.target.value;
        setSelectedSort(sortValue);
        onSortChange(sortValue);
    };

    return (
        <Card>
            <CardHeader
                title={
                <Typography variant="h6" component="h3">
                    Sort Options
                </Typography>
                }
            />
            <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="sort-by-label">Sort by</InputLabel>
                <Select
                    labelId="sort-by-label"
                    id="sort-by-select"
                    value={selectedSort}
                    label="Sort by"
                    onChange={handleSelectChange}
                >
                    {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Card>
    );
};

export default SortButton;
