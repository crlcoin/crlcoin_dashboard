function notification(data, type, reloadPage) {

    if (type == "error") {
        Swal.fire({
            type: "error",
            title: data.title || "Oops...",
            text: data.message || "Something went wrong!",
            confirmButtonClass: "btn btn-confirm mt-2"
        })
    } else if (type == "success") {
        Swal.fire({
            title: data.title || "Successfully!",
            text: data.message || '',
            type: "success",
            confirmButtonClass: "btn btn-confirm mt-2"
        })
        .then(function(response) {
            if (response && reloadPage && location) {
                location.reload()
            }
        })
    } else {
        Swal.fire({
            title: "Oops...",
            text:  data.message || "Something went wrong!",
            type: "warning",
            confirmButtonClass: "btn btn-confirm mt-2"
        })
    }
    return
}