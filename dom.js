import {Get, Post, Put, Delete} from "./api.js"

const btnDark = document.querySelector(".btnDark")
const btnLight = document.querySelector(".btnLight")
const inpSearch = document.querySelector(".inpSearch")
const btnAdd = document.querySelector(".btnAdd")

const AddDialog = document.querySelector(".AddDialog")
const AddForm = document.querySelector(".AddForm")
const btnAddClose = document.querySelector(".btnAddClose")

const EditDialog = document.querySelector(".EditDialog")
const EditForm = document.querySelector(".EditForm")
const btnEditClose = document.querySelector(".btnEditClose")

const box = document.querySelector(".box")

let idx = null


btnDark.addEventListener("click", toggleDarkMode);
btnLight.addEventListener("click", toggleDarkMode);
function toggleDarkMode() {
    const currentTheme = document.body.getAttribute("data-theme");

    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "light");
        btnDark.style.display = "block";
        btnLight.style.display = "none";
    } else {
        document.body.setAttribute("data-theme", "dark");
        btnDark.style.display = "none";
        btnLight.style.display = "block";
    }
}
window.addEventListener("load", () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
        btnDark.style.display = "none";
        btnLight.style.display = "block";
    } else {
        document.body.setAttribute("data-theme", "light");
        btnDark.style.display = "block";
        btnLight.style.display = "none";
    }
});
document.body.addEventListener("transitionend", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    localStorage.setItem("theme", currentTheme);
});



inpSearch.oninput=(event)=>{
    Get(event.target.value)
}



btnAdd.onclick =()=>{
    AddDialog.showModal()
}
AddForm.onsubmit=(event)=>{
    event.preventDefault()
    let obj={
        fullname: AddForm["AddFullName"].value,
        email: AddForm["AddEmail"].value,
        phone: AddForm["AddPhone"].value
    }
    Post(obj)
    AddDialog.close()
}
btnAddClose.onclick =()=>{
    AddDialog.close()
}



const openEditDialog=(e)=>{
    EditDialog.showModal()
    EditForm["EditFullName"].value = e.fullname
    idx = e.id
    EditForm["EditEmail"].value = e.email
    idx = e.id
    EditForm["EditPhone"].value = e.phone
    idx = e.id
}
EditForm.onsubmit=(event)=>{
    event.preventDefault()
    let obj={
        fullname: EditForm["EditFullName"].value,
        email: EditForm["EditEmail"].value,
        phone: EditForm["EditPhone"].value
    }
    Put(idx, obj)
    EditDialog.close()
}
btnEditClose.onclick=()=>{
    EditDialog.close()
}



function getData(data){
    box.innerHTML = ""
    data.forEach((e, i)=>{
        const tr = document.createElement("tr")
        const tdFullName = document.createElement("td")
        const tdEmail = document.createElement("td")
        const tdPhone = document.createElement("td")
        const btnEdit = document.createElement("button")
        const btnDelete = document.createElement("button")
    
        btnEdit.onclick=()=>{
            openEditDialog(e)
        }

        btnDelete.onclick=()=>{
            Delete(e.id)
        }

        tdFullName.innerHTML = e.fullname
        tdEmail.innerHTML = e.email
        tdPhone.innerHTML = e.phone
        btnEdit.innerHTML = "Edit"
        btnDelete.innerHTML = "Delete"
        tdFullName.classList.add("tdFullName")
        tdEmail.classList.add("tdEmail")
        tdPhone.classList.add("tdPhone")
        btnEdit.classList.add("btnEdit")
        btnDelete.classList.add("btnDelete")
        tr.classList.add("tr")
        tr.append(tdFullName, tdEmail, tdPhone, btnEdit, btnDelete)
        box.appendChild(tr)
    })
}
export default getData