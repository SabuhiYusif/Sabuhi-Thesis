import React from 'react';
import './../../App.css';
import { Box, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';


function ClassifierSelection(props) {

    return (
        <div>
            <Box mt={5} mr={5}>
                <RadioGroup onChange={props.handleClassifierChange} aria-label="quiz" name="quiz"  >
                    <FormControlLabel value="DECISION_TREE" control={<Radio />} label="Decision Tree Classifier" />
                    <FormControlLabel value="LOGISTIC_REGRESSION" control={<Radio />} label="Logistic Regression Classifier" />
                </RadioGroup>
            </Box>
            <br></br>
            {(props.classifier === "DECISION_TREE") &&
                <Box display="flex">
                    <Box mr={5}>
                        <TextField
                            id="outlined-number"
                            defaultValue={props.maxDepth}
                            label="Max Depth"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={props.handleMaxDepthChange}
                            variant="outlined"
                        />
                    </Box>
                    <Box mr={5}>
                        <TextField
                            id="outlined-number"
                            defaultValue={props.minSamples}
                            label="Min Samples Leaf"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={props.handleMinSamplesChange}
                            variant="outlined"
                        />
                    </Box>
                </Box>
            }
        </div>
    )
}

export default ClassifierSelection;
