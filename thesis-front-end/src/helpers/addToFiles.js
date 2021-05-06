export const addToFiles = (payload, state) => {
    const files = state
    const fileName = Object.keys(payload)[0]
    const resultFile = Object.values(payload)[0]
    const index = files.findIndex((obj => Object.keys(obj)[0] == fileName));
    if (index >= 0) {
        files[index][fileName] = resultFile
    } else {
        files.push({ [fileName]: resultFile })
    }

    return [].concat(files)
};