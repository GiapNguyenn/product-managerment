//change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length > 0) {
  
  buttonChangeStatus.forEach(button => {
    const formChangeStatus =document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path")
    console.log(`${path}`)
    button.addEventListener("click", ()=> {
      const statusCurrent = button.getAttribute("data-status")
      const idCurrent = button.getAttribute("data-id")
      let statusChange =statusCurrent == "active" ? "inactive" : "active"
      console.log(`${statusCurrent}`)
      console.log(`${idCurrent}`)
      console.log(`${statusChange}`)
      const action = path + `/${statusChange}/${idCurrent}?_method=PATCH`
      console.log(action)
        formChangeStatus.action = action;
        formChangeStatus.submit();
    });
  })
}
//end change status

// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  buttonsDelete.forEach( button => {
    button.addEventListener("click", () => {
    const isConfirm = confirm("Bạn có chắc muốn xoá sản phẩm này không?")
    if(isConfirm) {
      const id = button.getAttribute("data-id")
      const action = `${path}/${id}?_method=DELETE`;
      formDeleteItem.action = action;
      formDeleteItem.submit();
    }
  });
  });
}
// End Delete item