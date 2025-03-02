const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.querySelector("[path-data]");
if (buttonChangeStatus.length > 0) {
    buttonChangeStatus.forEach(item => {
        item.addEventListener("click", () => {
            const status = item.getAttribute("data-status");
            const id = item.getAttribute("data-id");
            let changeStatus = (status === "active" ? "inactive" : "active");
            const path = formChangeStatus.getAttribute("path-data");
            formChangeStatus.action = path + `/change-status/${changeStatus}/${id}?_method=PATCH`

            formChangeStatus.submit();
        })
    })
}

//change multi

const tableChange = document.querySelector("[checkbox-mutil]");
const formChange = document.querySelector(".form-change-multi");

if (tableChange && formChange) {
    const ids = formChange.querySelector("input[name='ids']");
    const checkboxAll = tableChange.querySelector("input[name='checkbox-all']");
    const checkbox = tableChange.querySelectorAll("input[name='checkbox-id']");
    const countCheckbox = tableChange.querySelectorAll("input[name='checkbox-id']:checked");
    let arrayChecked = [];
    checkboxAll.addEventListener("click", () => {
        checkbox.forEach(item => {
            if (checkboxAll.checked) {
                item.checked = true;
                arrayChecked.push(item.value);
            } else {
                item.checked = false;
                ids.value = "";
                arrayChecked = []
            }
        }
        )
        ids.value = arrayChecked.join(", ");
    })

    checkbox.forEach(item => {
        item.addEventListener("click", () => {

            if (countCheckbox.length === checkbox.length) {
                checkboxAll.checked = true;
            } else {
                checkboxAll.checked = false;
            }

            if (item.checked == true) {
                arrayChecked.push(item.value);

            } else {
                const check = arrayChecked.filter(id => id !== item.value);
                arrayChecked = [...check]
            }
            ids.value = arrayChecked.join(", ");
        })
    })

    formChange.addEventListener("submit", (event) => {
        event.preventDefault();
        if (event.target.type.value === "delete-all") {
            const isConfirm = confirm("Bạn có chắc muốn xóa tất cả không ?");
            if (!isConfirm) {
                return;
            } else {
                formChange.submit();
            }
        } else if (event.target.type.value === "change-position") {
            let arrayChangePosition = [];
            checkbox.forEach(item => {
                if (item.checked === true) {
                    let position = item.closest("tr").querySelector("input[name=position]");
                    arrayChangePosition.push(`${item.value}-${position.value}`);
                }
            })
            ids.value = arrayChangePosition.join(", ");
            formChange.submit();
        } else {
            formChange.submit();
        }
    })

}

//delete item
const buttonDeletes = document.querySelectorAll("[delete-button]");

if (buttonDeletes.length > 0) {
    const deleteFrom = document.querySelector("[delete-form]");
    const path = deleteFrom.getAttribute("path-data");
    buttonDeletes.forEach(item => {
        item.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này không ?")
            if (isConfirm) {
                const id = item.getAttribute("data-id");
                deleteFrom.action = path + `/${id}?_method=DELETE`
                deleteFrom.submit();
            }
        })
    })
}

//alert


//Preview images
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

const sortSelected = document.querySelector("[sort]");
if (sortSelected) {
    const selected = sortSelected.querySelector(".form-control");
    const url = new URL(window.location.href);
    selected.addEventListener("change", (event) => {
        const sortString = event.target.value;
        const [sortKey, sortMethod] = sortString.split("-");

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortMethod", sortMethod);
        window.location.href = url.href;
    })
    const buttonClear = document.querySelector("[button-clear]");
    buttonClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortMethod");
        window.location.href = url.href;
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortMethod = url.searchParams.get("sortMethod");
    if(sortKey && sortMethod) {
        const option = selected.querySelector(`option[value="${sortKey}-${sortMethod}"]`);
        option.selected = true;
    }

}