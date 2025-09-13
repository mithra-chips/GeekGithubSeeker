import {
    Box,
    CardContent,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import { useSearchParamStore, type KeyLabelItem } from "../store/search-param-store";

const CheckboxWithInput: React.FC<{label: string}> = ({label}) => {
    const updateCheckedValue = useSearchParamStore((state) => state.updateCheckedValue);
    const keyLabelItems = useSearchParamStore((state) => state.keyLabelItems) as {[key: string]: KeyLabelItem};
    const updateInputValues = useSearchParamStore((state) => state.updateInputValues);
    const values = keyLabelItems[label].values as { min?: number, max?: number };

    const handleCheckboxChange = () => {
        updateCheckedValue(label);

        if (keyLabelItems[label].checked) {
            // send subItems
            updateInputValues(label,{ min: undefined, max: undefined });
        } else {
            updateInputValues(label, {});
        }
    };

    const handleNumberChange = (field: "min" | "max", value: string) => {
        updateInputValues(label, {...values, [field]: value ? Number(value) : undefined });
    };

    return (
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={keyLabelItems[label].checked}
                            onChange={() => handleCheckboxChange()}
                        />
                    }
                    label={keyLabelItems[label].label}
                    sx={{ minWidth: 200 }}
                />
                {keyLabelItems[label].checked && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            type="number"
                            label="Min"
                            variant="outlined"
                            size="small"
                            value={values.min ?? ""}
                            onChange={(e) => handleNumberChange("min", e.target.value)}
                            sx={{ width: 100 }}
                        />
                        <Typography sx={{ mx: 1 }}>-</Typography>
                        <TextField
                            type="number"
                            label="Max"
                            variant="outlined"
                            size="small"
                            value={values.max ?? ""}
                            onChange={(e) => handleNumberChange( "max", e.target.value)}
                            sx={{ width: 100 }}
                        />
                    </Box>
                )}
            </Box>
        </CardContent>
    );
};

export default CheckboxWithInput;