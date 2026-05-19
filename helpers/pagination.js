module.exports = (objectPagination,query,countProduct) =>{
  if(query.page){
    objectPagination.currentPage =parseInt(query.page);
  }
  objectPagination.skip = (objectPagination.currentPage -1) * objectPagination.limitItems
  console.log(objectPagination.currentPage) //trang hiện tại
  
  const totalPage = Math.ceil(countProduct/objectPagination.limitItems);
  console.log(totalPage)
  objectPagination.totalPage = totalPage
  return objectPagination;
}