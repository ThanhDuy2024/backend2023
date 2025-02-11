module.exports = (query) => {
    const filterButtons = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    if(query.status) {
        const index = filterButtons.find(item => item.status == query.status);
        index.class = "active";
    } else {
        filterButtons[0].class = "active";
    }

    return filterButtons
}