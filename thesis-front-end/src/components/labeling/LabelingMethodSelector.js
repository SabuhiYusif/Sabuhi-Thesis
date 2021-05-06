import React from 'react';
import './../../App.css';
import { InputLabel, MenuItem, Select } from '@material-ui/core';

function LabelingMethodSelector(props) {
    const handleChange = (event) => {
        props.handleChange(event)
    }
    const labelingMethod = props.labelingMethod
    return (
        <div>
            <InputLabel id="label">{props.label}</InputLabel>
            <Select labelId="label" id="select" value={labelingMethod} onChange={handleChange}>
                <MenuItem value="default" disabled>
                    Not Selected
                </MenuItem>
                <MenuItem value="numerical">Numerical</MenuItem>
                <MenuItem value="categorical">Categorical</MenuItem>
                <MenuItem value="temporal">Temporal</MenuItem>
            </Select>
        </div>
    )
}

export default LabelingMethodSelector;
