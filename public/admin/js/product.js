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