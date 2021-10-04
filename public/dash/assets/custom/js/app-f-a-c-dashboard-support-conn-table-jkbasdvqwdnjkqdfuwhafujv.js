
const axiosSaveTableData = function(URL, data) {

    const headers = {
        'Content-Type': 'multipart/form-data'
    }

    axios.post(URL, data, headers)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })

    return
}