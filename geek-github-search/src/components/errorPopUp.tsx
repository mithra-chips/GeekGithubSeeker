import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { type AlertColor } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface ErrorObj {
    message: string;
    status: AlertColor;
}

interface ErrorPopupProps {
    error: ErrorObj;
    afterErrorShown?: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ error }) => {
    const [open, setOpen] = React.useState(!!error);

    React.useEffect(() => {
        setOpen(!!error);
    }, [error]);

    const handleClose = () => {
        setOpen(false);
    };

    if (!error) {
        return null;
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                severity={error.status}
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