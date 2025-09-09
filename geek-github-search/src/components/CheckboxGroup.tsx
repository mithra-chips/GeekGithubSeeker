import React, { useState } from "react";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";

const keywords = [
    { key: "stars", label: "Stars", type: "number" },
    { key: "forks", label: "Forks", type: "number" },
    { key: "issues", label: "Issues", type: "number" },
    { key: "archived", label: "Archived", type: "boolean" },
    { key: "mirror", label: "Mirror", type: "boolean" },
    { key: "template", label: "Template", type: "boolean" },
    { key: "topics", label: "Topics", type: "number" },
];

type NumberValue = { min?: number; max?: number };
type BooleanValue = boolean | undefined;

type Values = {
    [key: string]: NumberValue | BooleanValue;
};

const CheckboxGroup: React.FC = () => {
    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
    const [values, setValues] = useState<Values>({});

    const handleCheckboxChange = (key: string) => {
        const isChecked = !checked[key];
        setChecked((prev) => ({
            ...prev,
            [key]: isChecked,
        }));

        if (isChecked) {
            const keyword = keywords.find((k) => k.key === key);
            if (keyword?.type === "number") {
                setValues((prev) => ({ ...prev, [key]: { min: undefined, max: undefined } }));
            } else if (keyword?.type === "boolean") {
                setValues((prev) => ({ ...prev, [key]: true })); // Default to true
            }
        } else {
            setValues((prev) => {
                const newValues = { ...prev };
                delete newValues[key];
                return newValues;
            });
        }
    };

    const handleNumberChange = (key: string, field: "min" | "max", value: string) => {
        setValues((prev) => ({
            ...prev,
            [key]: {
                ...((prev[key] as NumberValue) || {}),
                [field]: value === "" ? undefined : Number(value),
            },
        }));
    };

    const handleBooleanChange = (key: string, value: string) => {
        setValues((prev) => ({
            ...prev,
            [key]: value === "true",
        }));
    };

    return (
        <FormGroup>
            {keywords.map((item) => (
                <Box key={item.key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!checked[item.key]}
                                onChange={() => handleCheckboxChange(item.key)}
                            />
                        }
                        label={item.label}
                        sx={{ minWidth: 200 }}
                    />
                    {checked[item.key] && item.type === "number" && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                type="number"
                                label="Min"
                                variant="outlined"
                                size="small"
                                value={(values[item.key] as NumberValue)?.min ?? ""}
                                onChange={(e) => handleNumberChange(item.key, "min", e.target.value)}
                                sx={{ width: 100 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Typography sx={{ mx: 1 }}>-</Typography>
                            <TextField
                                type="number"
                                label="Max"
                                variant="outlined"
                                size="small"
                                value={(values[item.key] as NumberValue)?.max ?? ""}
                                onChange={(e) => handleNumberChange(item.key, "max", e.target.value)}
                                sx={{ width: 100 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                    )}
                    {checked[item.key] && item.type === "boolean" && (
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                name={item.key}
                                value={String(values[item.key])}
                                onChange={(e) => handleBooleanChange(item.key, e.target.value)}
                            >
                                <FormControlLabel value="true" control={<Radio size="small" />} label="True" />
                                <FormControlLabel value="false" control={<Radio size="small" />} label="False" />
                            </RadioGroup>
                        </FormControl>
                    )}
                </Box>
            ))}
        </FormGroup>
    );
};

export default CheckboxGroup;