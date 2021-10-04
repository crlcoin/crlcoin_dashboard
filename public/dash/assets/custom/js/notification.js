function notification(data, type) {

    if (type == "error") {
        Swal.fire({
            type: "error",
            title: data.title || "Oops...",
            text: data.message || "Something went wrong!",
            confirmButtonClass: "btn btn-confirm mt-2"
        })
    } else if (type == "success") {
        Swal.fire({
            title: data.title || "Good job!",
            text: data.message || "",
            type: "success",
            confirmButtonClass: "btn btn-confirm mt-2"
        })
    } else if (type == "success-2") {
        Swal.fire({
            title: data.message || data.title || "Saving data...",
            html: "I will close in <strong></strong> seconds.",
            timer: 1e3,
            onBeforeOpen: function() {
                Swal.showLoading(),
                t = setInterval(function() {
                    Swal.getContent().querySelector("strong").textContent = Swal.getTimerLeft()
                }, 100)
            },
            onClose: function() {
                clearInterval(t)
            }
        })
    } else {
        Swal.fire({
            title: "Oops...",
            text:  data.message || data.title || "No informations",
            type: type || "warning",
            confirmButtonClass: "btn btn-confirm mt-2"
        })
    }
    return 
}