console.log("This is index.js");

function Book(name,author,type){
    this.name = name;
    this.author = author;
    this.type = type;
}

showRecord();
function Display(){

}

function showRecord(){

    let bookList;
    if( JSON.parse(localStorage.getItem("bookRecord")) !==null ){
        bookList = JSON.parse(localStorage.getItem("bookRecord")) ;
    }
    else
    {
       bookList = [];
    }
    
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    bookList.forEach((element,index)=>{

        tableBody.innerHTML += `<tr class="record">
    
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button id="${index}" onclick="remove(this.id)" type="button" class="btn btn-danger btn-sm">Remove</button></td>
        </tr>
    `;
    })
    
}

function remove(index){
    let bookList = JSON.parse(localStorage.getItem("bookRecord")) ;
    bookList.splice(index,1);
    localStorage.setItem("bookRecord",JSON.stringify(bookList));
    showRecord();
}

Display.prototype.add = function(book){
    console.log("Adding to UI");
    let bookList;
    // let tableBody = document.getElementById("tableBody");
   if( JSON.parse(localStorage.getItem("bookRecord")) !==null ){
        bookList = JSON.parse(localStorage.getItem("bookRecord")) ;
   }
   else
   {
       console.log("Condition False");
       
       bookList = [];
   }

//    let id = html.length;   
//    let uiString = ;

    bookList.push(book);
    
    localStorage.setItem("bookRecord",JSON.stringify(bookList));
    showRecord();
}

Display.prototype.validate = function(book){
    if(book.name.length>2 && book.author.length>2 && typeof book.type!='undefined')
    {
        console.log(book.type);
        
        return true;
    }
    return false;
}

Display.prototype.showMsg = function(type,msg){
    let message = document.getElementById("showMsg");
    let html = `<div class="alert alert-${type}" role="alert">
    <strong>Messgae :</strong> ${msg}
  </div>`;
  message.innerHTML = html;
  
  setTimeout(() => {
      message.innerHTML = "";
  }, 2000);
}

Display.prototype.clear = function(){
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit",libraryFormSubmit);

function libraryFormSubmit(e){
   
    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if(fiction.checked)
    {
        type = fiction.value;
    }
    else if(programming.checked)
    {
        type = programming.value;
    }
    else if(cooking.checked)
    {
        type = cooking.value;
    }

    let book = new Book(bookName,author,type);
    // console.log(book);

    let display = new Display();

    if(display.validate(book))
    {
        display.add(book);
        display.showMsg('success',"Your book is added sucessfully ");
        display.clear();

    }
    else{
        display.showMsg("danger","Enter vaild data in all the fields");
    }

    e.preventDefault();
    
}


let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input",searchBook);

function searchBook(){
    let bookList;
    if( JSON.parse(localStorage.getItem("bookRecord")) !==null ){
        bookList = JSON.parse(localStorage.getItem("bookRecord")) ;
    }
    else
    {
       bookList = [];
    }
    let txt = searchTxt.value;
    txt.toLowerCase();

    let record = document.getElementsByClassName("record");
    if(bookList.length>0)
    {
        bookList.forEach((element,index)=>{
            console.log(element.name);
            
            if(element.name.toLowerCase().includes(txt))
            {
                record[index].style.display = "block";

            }
            else{
                record[index].style.display = "none";
            }
        })
    }
}