module.exports = (objectPagination, query, countProduct) => {
    if(query.page) {
        objectPagination.page = parseInt(query.page)
    }

    
    const pageNumber = Math.ceil(countProduct / objectPagination.limit);
    objectPagination.pagination = pageNumber;
    let skip = ((objectPagination.page - 1)*objectPagination.limit);
    objectPagination.skip = skip

    return objectPagination
}