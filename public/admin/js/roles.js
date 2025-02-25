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
