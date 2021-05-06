
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


function KFold(props) {
    const splitMethod = props.splitMethod
    const checked = props.kFold
    const handleCheckChange = (event) => {
        props.handleCheckChange(event)
    }

    const handleKFoldChange = (event) => {
        props.handleKNumber(event)
    }
    return (
        <div>
            <FormControlLabel
                control={<GreenCheckbox checked={checked} onChange={handleCheckChange} name="checkedG" />}
                label="Use K-fold"
            />
            <br></br>
            { (checked) &&
                <TextField
                    id="outlined-number"
                    label="K Value"
                    required
                    defaultValue="5"
                    type="number"
                    onChange={handleKFoldChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            }

        </div>
    )
}

export default KFold
