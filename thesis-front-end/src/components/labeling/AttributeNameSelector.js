import React from 'react';
import './../../App.css';
import { Box, InputLabel, MenuItem, Select } from '@material-ui/core';

function AttributeNameSelector(props) {

    const handleChange = (event) => {
        props.handleChange(event)
    }
    const attrMethod = props.attrMethod
    const attrNames = props.attrNames

    return (
        <div>
            <Box>
                <InputLabel id="label">{props.label}</InputLabel>
                <Select labelId="label" value={attrMethod} onChange={handleChange}>
                    <MenuItem value="default" disabled>
                        Not Selected
                        </MenuItem>
                    {attrNames.map((text, index) => (
                        <MenuItem value={text}>{text}</MenuItem>
                    ))}
                </Select>
            </Box>
        </div>
    )
}

export default AttributeNameSelector;
