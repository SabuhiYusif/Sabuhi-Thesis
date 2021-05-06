import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { closeSuccess } from "../alerts/closeSuccess";

function SuccessSnackbar() {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alerts.alert);
    const message = alert.message
    const service = alert.service
    const handleClose = () => {
        closeSuccess(dispatch, service)
    }

    return (
        <div>
            {
                (alert.isSuccessfull) &&
                <Snackbar
                    open={true}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="success">
                        {message}
                    </Alert>
                </Snackbar>
            }
        </div>
    );
}

export default SuccessSnackbar;
