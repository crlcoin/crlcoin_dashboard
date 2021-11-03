
const axiosSaveTableData = function(URL, data) {

    const headers = {
        'Content-Type': 'multipart/form-data'
    }

    axios.post(URL, data, headers)
        .then((response) => {
            if (!!response) {
                notification({ title: "Saved!" }, "success-2");

                if (!!location) {
                    let i = setInterval(function () {
                        clearInterval(i);
                        location.reload();
                    }, 2e3);
                }
            }
        })
        .catch((err) => {
            if (err)
                console.log(err)

            notification({ title: "Error" }, "error");
        })

    return
}