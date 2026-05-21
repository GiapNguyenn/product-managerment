// button-status 
const ButtonStatus = document.querySelectorAll("[button-status]")
if (ButtonStatus.length > 0) {
  //Lấy ra url
  let url = new URL(window.location.href);
  console.log(url)
  ButtonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status")
      console.log(status)
      if (status) {
        //xét lại biến status
        url.searchParams.set("status", status)
      }
      else {
        url.searchParams.delete("status")
      }
      console.log(url.href)
      window.location.href = url.href
    });
  })
}
// End button-status 

// Form Search 
const formSearch = document.querySelector("#form-search")
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault() //để ngăn chặn sự kiện mặc định
    const keyword = e.target.elements.keyword.value
    console.log(e.target.elements.keyword.value)
    if (keyword) {
      //xét lại biến keyword
      url.searchParams.set("keyword", keyword)
    }
    else { // nếu không xoá đi status
      url.searchParams.delete("keyword")
    }
    window.location.href = url.href
  })
}
// End Form Search 
//phan trang (pagination)
let url = new URL(window.location.href);
const buttonPagination = document.querySelectorAll("[button-pagination]")
buttonPagination.forEach(button => {
  button.addEventListener("click", () => {
    const page = button.getAttribute("button-pagination")
    url.searchParams.set("page", page)
    window.location.href = url.href
  })
})
//end phan trang (pagination)

// CheckBox multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const inputcheckAll = checkboxMulti.querySelector("input[name ='checkall']")
  const inputIds = checkboxMulti.querySelectorAll("input[ name='id']")
  inputcheckAll.addEventListener("click", () => {

    if (inputcheckAll.checked) {

      inputIds.forEach(input => {
        input.checked = true
      })
    }
    else {
      inputIds.forEach(input => {
        input.checked = false
      })
    }
  });
  inputIds.forEach(input => {
    input.addEventListener("click", () => {
      const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      if (inputsChecked === inputIds.length) {
        inputcheckAll.checked = true
      }
      else {
        inputcheckAll.checked = false
      }
    }
  );

  });
}
// End CheckBox multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault()
    const checkboxMulti = document.querySelector("[checkbox-multi]")
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
    const typeChange = e.target.elements.type.value;
    if(typeChange== "delete-all"){
      const isConfirm = confirm ("Bạn có chắc muốn xoá những sản phẩm đã chọn ?");
      if(!isConfirm){
        return;
      }
    }
    if (inputsChecked.length > 0) {
      let ids = []
      const inputIds = formChangeMulti.querySelector("input[name='ids']")
      inputsChecked.forEach(input => {
        const id = input.value
        ids.push(id)
      })
      console.log(ids.join(", "))
      inputIds.value = ids.join(", ")
      formChangeMulti.submit()
    }else {
      alert("Vui lòng chọn ít nhất một sản phẩm")
    }
  })
}

// End Form Change Multi

// 1h40p bài 17 ở giữa
