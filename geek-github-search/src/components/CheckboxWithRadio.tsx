import {
    Box,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { useSearchParamStore } from "../store/search-param-store";

const CheckboxWithRadio: React.FC<{label: string}> = ({label}) => {
    const updateCheckedValue = useSearchParamStore((state) => state.updateCheckedValue);
    const keyLabelItems = useSearchParamStore((state) => state.keyLabelItems);
    const updateInputValues = useSearchParamStore((state) => state.updateInputValues);

    const handleCheckboxChange = () => {
        updateCheckedValue(label);

        if (keyLabelItems[label].checked) {
            updateInputValues(label, true);
        } else {
            updateInputValues(label, undefined);
        }
    };

    const handleBooleanChange = (value: string) => {
        updateInputValues(label,value === "true");
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
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            name={keyLabelItems[label].label}
                            value={String(keyLabelItems[label].values)}
                            onChange={(e) => handleBooleanChange(e.target.value)}
                        >
                            <FormControlLabel value="true" control={<Radio size="small" />} label="True" />
                            <FormControlLabel value="false" control={<Radio size="small" />} label="False" />
                        </RadioGroup>
                    </FormControl>
                )}
            </Box>
        </CardContent>
    );
};

export default CheckboxWithRadio;