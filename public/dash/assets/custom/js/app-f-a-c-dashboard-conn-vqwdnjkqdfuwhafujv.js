const saveDatas = {
    tables: async function (data) {
        if (!data) {
            return notification({ message: "No data selected to save" }, "warning");
        }

        await axios
            .post("/f/a/c/dashboard/create/tables", {
                headers: {
                    accept: "application/json",
                    "Content-Type": `multipart/form-data`,
                },
                data: data,
            })
            .then(function (result) {
                appDashboardClickFunctions.refreshCreateTable();
                if (!!location) {
                    notification({ title: "Saved!" }, "success-2");
                    let i = setInterval(function () {
                        clearInterval(i);
                        location.reload();
                    }, 2e3);
                } else {
                    notification({ title: "Saved!" }, "success-2");
                }
            })
            .catch(function (e) {
                if (e) {
                    notification({ message: e.message }, "error");
                }
            });
    },

    company: async function (data) {
        if (!data) {
            return notification({ message: "No data selected to save" }, "warning");
        }

        await axios
            .post("/f/a/c/dashboard/create/companies", {
                headers: {
                    accept: "application/json",
                    "Content-Type": `multipart/form-data`,
                },
                data: data,
            })
            .then(function (result) {
                appDashboardClickFunctions.refreshCreateCompany();
                if (!!location) {
                    notification({ title: "Saved!" }, "success-2");
                    let i = setInterval(function () {
                        clearInterval(i);
                        location.reload();
                    }, 2e3);
                } else {
                    notification({ title: "Saved!" }, "success-2");
                }
            })
            .catch(function (e) {
                if (e) {
                    notification({ message: e.message }, "error");
                }
            });
    },
};

const updateDatas = {
    tables: async function (data) {
        if (!data) {
            return notification({ message: "No data selected to save" }, "warning");
        }

        await axios
            .post("/f/a/c/dashboard/update/tables", {
                headers: {
                    accept: "application/json",
                    "Content-Type": `multipart/form-data`,
                },
                data: data,
            })
            .then(function (result) {
                if (!!location) {
                    notification({ title: "Saved!" }, "success-2");
                    let i = setInterval(function () {
                        clearInterval(i);
                        location.href = "/f/a/c/dashboard/overview";
                    }, 2e3);
                } else {
                    notification({ title: "Saved!" }, "success-2");
                }
            })
            .catch(function (e) {
                if (e) {
                    notification({ message: e.message }, "error");
                }
            });
    },

};

const removeDatas = {
    tableConfig: async function (data) {
        if (!data) {
            return notification({ message: "No data selected to remove" }, "warning");
        }

        await axios
            .post("/f/a/c/dashboard/delete/tables", {
                data: data,
            })
            .then(function (result) {
                if (!!location) {
                    notification({ title: "Deleted!" }, "success-2");
                    let i = setInterval(function () {
                        clearInterval(i);
                        location.reload();
                    }, 2e3);
                } else {
                    notification({ title: "Deleted!" }, "success");
                }
            })
            .catch(function (e) {
                if (e) {
                    notification({ message: e.message }, "error");
                }
            });
    },

    permission: async function (data) {
        if (!data) {
            return notification({ message: "No data selected to remove" }, "warning");
        }

        await axios
            .post("/f/a/c/dashboard/delete/companies", {
                data: data,
            })
            .then(function (result) {
                if (!!location) {
                    notification({ title: "Deleted!" }, "success-2");
                    let i = setInterval(function () {
                        clearInterval(i);
                        location.reload();
                    }, 2e3);
                } else {
                    notification({ title: "Deleted!" }, "success");
                }
            })
            .catch(function (e) {
                if (e) {
                    notification({ message: e.message }, "error");
                }
            });
    },
};

const appDashboardConnectFunctions = {
    saveTableConfig: function () {
        let newObjt = checkTablesConfigInput();
        if (newObjt === "notification") return
        if (!newObjt) {
            return notification(
                { title: "Oops...", message: "Some entry is empty" },
                "warning"
            );
        }
        return saveDatas.tables(newObjt);
    },

    updateTableConfig: function () {
        let newObjt = checkTablesConfigInput();
        if (newObjt === "notification") return
        if (!newObjt) {
            return notification(
                { title: "Oops...", message: "Some entry is empty" },
                "warning"
            );
        }
        return updateDatas.tables(newObjt);
    },

    removeTable: function (element) {
        let data = element.getAttribute('value');

        if (!data) {
            notification({ title: "Not found Table Id" }, "error");
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#dd3333",
                confirmButtonText: "Yes, delete it!",
            }).then(function (t) {
                if (t.value && !t.dismiss) {
                    removeDatas.tableConfig(data);
                    t.value &&
                        Swal.fire("Deleted!", "Your datas has been deleted.", "success");
                }
            });
        }

        return;
    },

    // Companies
    saveCompany: function () {
        let newObjt = checkCompanyInput();
        if (!newObjt)
            return notification(
                { title: "Input blank", message: "Some entry is empty" },
                "warning"
            );
        return saveDatas.company(newObjt);
    },

    deleteAllPermission: function () {
        let datas = deleteAllPermissionSelected.getAll();

        if (datas.length <= 0) {
            notification({ title: "No data selected" }, "warning");
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(function (t) {
                if (t.value && !t.dismiss) {
                    removeDatas.permission(datas);
                    t.value &&
                        Swal.fire("Deleted!", "Your datas has been deleted.", "success");
                }
            });
        }

        return;
    },
};

function checkTablesConfigInput() {
    let tableColumns = [];
    var anColumnEmpty = false

    const NAMES = document.querySelectorAll("#columnName");
    const TYPES = document.querySelectorAll("#columnOptionsList");
    const OPTIONS = document.querySelectorAll("#columnOptions");
    const FUNCTIONS = document.querySelectorAll("#columnFunction");

    const tableName = document.getElementById("tableName").value.trim();
    const tableFunctions = document.getElementById("tableFunction").value || "";

    NAMES.forEach(function (e, i) {
        if ( !!OPTIONS[i].value ) {
            OPTIONS[i].value.replace(/,/g, ";")
        }

        let newObjt = {
            name: !!NAMES[i].value ? NAMES[i].value : "",
            type: !!TYPES[i].value ? TYPES[i].value : "",
            options:
                !!TYPES[i].value && TYPES[i].value === "options" && !!OPTIONS[i].value
                    ? OPTIONS[i].value.split(";")
                    : [],
            functions:
                !!TYPES[i].value &&
                    TYPES[i].value === "function" &&
                    !!FUNCTIONS[i].value
                    ? FUNCTIONS[i].value
                    : "",
        };

        if (Array.isArray(newObjt) && newObjt.length > 0) {
            newObjt.options.filter(function (result) {
                return result !== "";
            });
        }

        if (newObjt.name == "" || newObjt.type == "") {
            anColumnEmpty = true
        } else {
            tableColumns.push(newObjt);
        }
    });

    if (!!anColumnEmpty) {
        notification(
            { title: helpers.errors.blankInput, message: "Please check all columns name and all columns type" },
            "error"
        );
        return "notification"
    }

    if (tableName === "") {
        notification(
            { title: "Table Name", message: helpers.errors.blankInput },
            "error"
        );
        return "notification";
    }

    if (!tableColumns && tableColumns.length > 0) {
        notification({ title: "Column", message: "A column is required" }, "error");
        return "notification";
    }

    let tableId = document.querySelector("[data-crl-table-id]") ? document.querySelector("[data-crl-table-id]").getAttribute("data-crl-table-id")
        : ((tableName).replace(/ /g, "")).toLowerCase() + Date.now()

    return {
        table_id: tableId,
        name: tableName,
        functions: tableFunctions,
        columns: tableColumns,
    };
}

function checkCompanyInput() {
    const checkBoxValue = document
        .getElementById("radioCompanyType")
        .value.trim();
    const nameValue = document.getElementById("companyName").value.trim();
    const emailValue = document.getElementById("companyMail").value.trim();
    const permissionValue = document
        .getElementById("companyPermission")
        .value.trim();

    if (checkBoxValue === "") {
        notification(
            { title: "Checkbox", message: helpers.errors.blankInput },
            "error"
        );
        return false;
    }
    if (nameValue === "") {
        notification(
            { title: "Company Name", message: helpers.errors.blankInput },
            "error"
        );
        return false;
    }
    if (emailValue === "") {
        notification(
            { title: "Company Email Address", message: helpers.errors.blankInput },
            "error"
        );
        return false;
    }
    if (permissionValue === "") {
        notification(
            { title: "Company Permission", message: helpers.errors.blankInput },
            "error"
        );
        return false;
    }

    return {
        type: checkBoxValue,
        name: nameValue,
        email: emailValue,
        permission: permissionValue,
    };
}

!(function (allCrlElements) {
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        };
    }

    allCrlElements.forEach(function (element) {
        const fn = element.getAttribute("data-crl");
        if (!!appDashboardConnectFunctions[fn]) {
            element.addEventListener("click", function (event) {
                appDashboardConnectFunctions[fn](this);
            });
        }
    });
})(document.querySelectorAll("[data-crl]"));
