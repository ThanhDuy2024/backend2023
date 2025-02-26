const buttonDelete = document.querySelectorAll('[delete-button]');
const formDelete = document.querySelector("[delete-form]")
if(buttonDelete) {
    buttonDelete.forEach(item => {
        item.addEventListener("click", () => {
            const id = item.getAttribute('data-id');
            const pathData = formDelete.getAttribute("path-data");
            console.log(pathData);  
            const isConfirm = confirm("Bạn có chắc muốn xóa quyền này không ?");
            if(isConfirm) {
                formDelete.action = `${pathData}/${id}?_method=DELETE`;
                formDelete.submit();
            }
        })
    })
}

const tablePermission = document.querySelector("[table-permissions]");
const formChangePermission = document.querySelector("[form-change-permissions]");
if(tablePermission) {
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        let permissions = [];
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if(name == "id") {
               inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({id: id, permissions: []});
               })
            } else {
                inputs.forEach((input, index) => {
                    if(input.checked) {
                        permissions[index].permissions.push(name);
                    }
                })
            }
        })
        const inputPermissions = formChangePermission.querySelector("[input-permissions]");
        inputPermissions.value = JSON.stringify(permissions);
        formChangePermission.submit();
    })
}

const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    
    records.forEach((record, index) => {
        const permissions = record.permissions;
        permissions.forEach(permission => {
            const row = tablePermission.querySelector(`[data-name=${permission}]`);
            const input = row.querySelectorAll(`input`)[index];
            input.checked = true;
        });
    })
}