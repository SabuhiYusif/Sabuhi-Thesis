import React from 'react';
import './../../App.css';
import Alert from '@material-ui/lab/Alert';
import { closeErrors } from '../../helpers/closeErrors';
import { useDispatch } from 'react-redux';

function AlertSuccess(props) {
    const message = props.message
    const dispatch = useDispatch()

    const handleOnClose = () => {
        closeErrors(dispatch)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Alert
                onClose={handleOnClose}
                severity="success">{message}
            </Alert>
        </div>
    )
}

export default AlertSuccess;
