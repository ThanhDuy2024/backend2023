//filter
const buttons = document.querySelectorAll("[button-status]");
if(buttons) {
    buttons.forEach(button => {
       button.addEventListener("click", () => {
        const url = new URL(window.location.href);
        const status = button.getAttribute("button-status");
        if(status) {
            url.searchParams.set("status", status);
        } else {
            url.searchParams.delete("status");
        }
        window.location.href = url.href;
       })
    })
}
//end filter

//search
const form = document.querySelector("#form-search");
if(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.keyword.value
        const url = new URL(window.location.href);
        if(keyword) {
            url.searchParams.set("keyword", keyword);
            url.searchParams.set("page", 1);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
//end search

//pagination
const pagination = document.querySelectorAll("[button-pagination]");
if(pagination) {
    pagination.forEach(item => {
        item.addEventListener("click", () => {
            const pageNumber = item.getAttribute("button-pagination");
            const url = new URL(window.location.href);
            if(pageNumber) {
                url.searchParams.set("page", parseInt(pageNumber));
            } else {
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        })
    })
}
//end pagination