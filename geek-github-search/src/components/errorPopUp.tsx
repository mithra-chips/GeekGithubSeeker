import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert, { type AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface ErrorObj {
    message: string;
    status: string;
    errors: string[];
}

interface ErrorPopupProps {
    errors: ErrorObj[];
    onClose: () => void;
}

const getSeverity = (status: string): AlertColor => {
    if (status.startsWith('4')) {
        return 'warning';
    }
    if (status.startsWith('5')) {
        return 'error';
    }
    return 'info'; // Default case
};

const ErrorPopup: React.FC<ErrorPopupProps> = ({ errors, onClose }) => {
    const [open, setOpen] = React.useState(errors.length > 0);

    React.useEffect(() => {
        setOpen(errors.length > 0);
    }, [errors]);

    const handleClose = () => {
        setOpen(false);
        // Call the parent's onClose after the transition is complete
        setTimeout(onClose, 300); 
    };

    if (!errors || errors.length === 0) {
        return null;
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Stack sx={{ width: '100%' }} spacing={1}>
                {errors.map((error, index) => (
                    <Alert
                        key={index}
                        severity={getSeverity(error.status)}
                        variant="filled"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2, alignItems: 'center' }}
                    >
                        {error.message}
                    </Alert>
                ))}
            </Stack>
        </Snackbar>
    );
};

export default ErrorPopup;