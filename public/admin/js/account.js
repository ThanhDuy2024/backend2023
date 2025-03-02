const buttonDelete = document.querySelectorAll('[delete-button]');
const formDelete = document.querySelector("[delete-form]")
if(buttonDelete) {
    buttonDelete.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.getAttribute('data-id');
            const pathData = formDelete.getAttribute("path-data"); 
            const isConfirm = confirm("Bạn có chắc muốn xóa quyền này không ?");
            if(isConfirm) {
                formDelete.action = `${pathData}/${id}?_method=DELETE`;
                formDelete.submit();
            }
        })
    })
}

const buttonChangeStatus = document.querySelectorAll('[button-change-status]');
const formChangeStatus = document.querySelector("[change-status-form]");
if(buttonChangeStatus && formChangeStatus) {
    buttonChangeStatus.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.getAttribute('data-id');
            const status = item.getAttribute('data-status');
            const changeStatus = status === "active" ? "inactive" : "active";
            const pathData = formChangeStatus.getAttribute("path-data");
            const isConfirm = confirm(`Bạn có chắc muốn chuyển trạng thái của quyền này sang ${changeStatus} không ?`);
            if(isConfirm) {
                formChangeStatus.action = `${pathData}/${id}/${changeStatus}?_method=PATCH`;
                formChangeStatus.submit();
            }
        })
    })
}

const formSearch = document.querySelector("[from-search]");
if(formSearch) {
    const inputSearch = formSearch.querySelector("input[name=keyword]");
    const url = new URL(window.location.href);
    inputSearch.addEventListener("change", (e) => {
        e.preventDefault();
        if(e.target.value != "") {
            url.searchParams.set("keyword", e.target.value);
        } else {
            url.searchParams.remove("keyword", e.target.value);
        }
    })
}

const createUpload = document.querySelector("[create-upload-image]");
if (createUpload) {
    const uploadImage = document.querySelector("[input-upload-image]");
    const preview = document.querySelector("[input-upload-preview]");
    const buttonPreview = document.querySelector("[button-preview]");
    if (preview.src) {
        buttonPreview.classList.add("show");
    }
    uploadImage.addEventListener("change", (e) => {
        //e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            buttonPreview.classList.add("show");
            preview.src = URL.createObjectURL(file);
        }
    })

    buttonPreview.addEventListener("click", (e) => {
        e.preventDefault();
        uploadImage.value = "";
        preview.src = "";
        buttonPreview.classList.remove("show");
    })
}

const alertChange = document.querySelector(".alert-position");
if (alertChange) {
    const timeSet = alertChange.getAttribute("time-value");
    setTimeout(() => {
        alertChange.classList.add("alert-hidden");
    }, parseInt(timeSet))
}