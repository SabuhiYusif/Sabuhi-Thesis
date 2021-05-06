import React from 'react';
import './../../App.css';
import Alert from '@material-ui/lab/Alert';

function AlertSuccess(props) {
    const message = props.message
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Alert
                severity="success">{message}
            </Alert>
        </div>
    )
}

export default AlertSuccess;
