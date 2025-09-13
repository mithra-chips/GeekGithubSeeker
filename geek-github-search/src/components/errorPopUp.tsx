import * as React from 'react';
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
    error: ErrorObj;
    onClose: () => void;
}

const getSeverity = (status: string): AlertColor => {
    if(!status){
        return 'info';
    }
    if (status.startsWith('4')) {
        return 'warning';
    }
    if (status.startsWith('5')) {
        return 'error';
    }
    return 'info'; // Default case
};

const ErrorPopup: React.FC<ErrorPopupProps> = ({ error, onClose }) => {
    const [open, setOpen] = React.useState(!!error);

    React.useEffect(() => {
        setOpen(!!error);
    }, [error]);

    const handleClose = () => {
        setOpen(false);
        // Call the parent's onClose after the transition is complete
        setTimeout(onClose, 300); 
    };

    if (!error) {
        return null;
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
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
        </Snackbar>
    );
};

export default ErrorPopup;