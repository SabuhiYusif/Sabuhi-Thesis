
import React from 'react';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';


function SplitOrdering(props) {
    const splitMethod = props.splitMethod

    const handleChange = (event) => {
        props.handleChange(event)
    }

    return (
        <div>
            <InputLabel id="label">Ordering Method</InputLabel>
            <FormControl variant="outlined">
                <Select labelId="label" id="select" value={splitMethod} onChange={handleChange}>
                    <MenuItem value="sequential">Sequential</MenuItem>
                    <MenuItem value="random">Random</MenuItem>
                    <MenuItem value="temporal">Temporal</MenuItem>
                    <MenuItem value="temporal_strict">Temporal Strict </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SplitOrdering
