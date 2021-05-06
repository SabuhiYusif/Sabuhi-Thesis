import React from 'react';
import './../../App.css';
import { Box, InputLabel, MenuItem, Select } from '@material-ui/core';

function AttributeValueSelector(props) {

    const handleChange = (event) => {
        props.handleChange(event)
    }
    const attrValue = props.attrValue
    const attrValues = props.attrValues
    const meanValue = props.meanValue

    return (
        <div>
            <Box>
                <InputLabel id="label">{props.label}</InputLabel>
                <Select labelId="labell" id="nemm" value={attrValue} onChange={handleChange}>
                    <MenuItem value="default">
                        Not Selected
                    </MenuItem>
                    {attrValues.map((text, index) => (
                        <MenuItem value={text}>{text}</MenuItem>
                    ))}
                </Select>
                <br></br>
                <p>
                    Mean value: {meanValue}
                </p>
            </Box>
        </div>
    )
}

export default AttributeValueSelector;
