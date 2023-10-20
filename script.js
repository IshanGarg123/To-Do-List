let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");
let info = document.getElementById("info");
let count = parseInt(localStorage.getItem("count"));

function setInfo() {
  if (count === 0) {
    info.innerHTML = `No pending Task Left
        <br>
        <img src="images/fan-relax.gif" width="100px" height="100px">
        `;
  } else {
    info.innerHTML = `You Have ${count} Task(s) to Complete
        <br>
        <img src="images/working-cat.gif" width="100px" height="100px">
        `;
  }
  localStorage.setItem("count", count);
}
setInfo();

function addTask() {
  if (inputBox.value === "") {
    alert("You Write Something");
  } else {
    let li = document.createElement("li");
    let para = document.createElement("p");
    para.classList.add("p1");
    para.contentEditable = "true";
    para.innerHTML = inputBox.value;
    para.addEventListener("input",function(){
      console.log("Hello");
      saveData();
    })

    li.appendChild(para);

    let editbutton = document.createElement("button");
    editbutton.id = "editButton";
    editbutton.innerHTML = "edit";
    li.appendChild(editbutton);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
    count++;
    setInfo();
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
    if (e.target.classList.contains("checked")) {
      count--;
      setInfo();
    } else {
      count++;
      setInfo();
    }
  } else if (e.target.tagName === "SPAN") {
    if (!e.target.parentElement.classList.contains("checked")) {
      count--;
      setInfo();
    }
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.tagName === "BUTTON") {
    let data = prompt("Enter the new Data");
    if (data === "" || data === null) {
      alert("Enter a valid Value");
    } else {
      e.target.parentElement.children[0].innerHTML = data;
      saveData();
    }
  }
});

function saveData() {
  localStorage.setItem("data",listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

let newButton = document.getElementById("new-btn");
let newData = document.getElementById("new-data");

newButton.addEventListener("click", () => {
  if (newButton.innerHTML === "Something New") {
    newButton.innerHTML = "Hide New";
    newData.innerHTML = `
    <br>
    <a href="Amazon Clone/index1.html" target="_blank">
    <button> Shoping </button>
    </a> 
    <br><br>
    <a href="Tic-Tac-Toe2/index.html" target="_blank">
    <button> Gaming </button>
    </a> 
    <br>
    <br>
    <a href="Music Player2/index.html" target="_blank">
    <button> Music </button>
    </a> 
    <br> <br>
    <a href="Weather app/index.html" target="_blank">
    <button> Weather </button>
    </a>
    `;
  } else {
    newButton.innerHTML = "Something New";
    newData.innerHTML = ``;
  }
});