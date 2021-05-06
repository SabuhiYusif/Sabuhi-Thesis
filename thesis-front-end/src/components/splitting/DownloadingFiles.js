

import React from 'react';
import { Button, Box } from '@material-ui/core';


function DownloadingFiles(props) {
    const currentFile = props.currentFile
    const handleFullDownload = (file) => {
        props.handleDownloadClick(file)
    }

    const handleTrainDownload = (file) => {
        props.handleTrainDownloadClick(file)
    }

    const handleTestDownload = (file) => {
        props.handleTestDownloadClick(file)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Box p={1}>
                <label htmlFor="contained-button-file">
                    <Button
                        onClick={() => handleFullDownload(currentFile)}
                        variant="outlined"
                        color="primary" >
                        Download Full Log
                    </Button>
                </label>
                <br></br>
                <br></br>
            </Box>
            <Box p={1}>
                <label htmlFor="contained-button-file">
                    <Button
                        onClick={() => handleTrainDownload(currentFile)}
                        variant="outlined"
                        color="primary" >
                        Download Train Log
                    </Button>
                </label>
                <br></br>
                <br></br>
            </Box>
            <Box p={1}>
                <label htmlFor="contained-button-file">
                    <Button
                        onClick={() => handleTestDownload(currentFile)}
                        variant="outlined"
                        color="primary" >
                        Download Test Log
                     </Button>
                </label>
                <br></br>
                <br></br>
            </Box>
        </div>
    )

}

export default DownloadingFiles