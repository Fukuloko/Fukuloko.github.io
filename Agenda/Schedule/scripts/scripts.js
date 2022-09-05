let allContacts = [];
let newContactObject;
const tableHeader = `<tr><th class="bottom-header"></th><th class="theader">id</th><th class="theader">nome</th><th class="bottom-header">Contato</th></tr>`

// localStorage.clear();

function changeOpacity(){
    document.getElementById("lupa").style.transition = "opacity 0.8s";
    document.getElementById("lupa").style.opacity = "1";
    document.getElementById("lupa").style.cursor = "pointer";
}

function newContact(){
    newContactObject = {
        id: document.getElementById('contact-id').value,
        nome: document.getElementById('contact-name').value,
        cellphone: document.getElementById('contact-cel').value,
    }

    localStorage.setItem(newContactObject.id, JSON.stringify(newContactObject));
}

function removeContact(id){
    localStorage.removeItem(id);
    document.location.reload(true);
}

function createObj(){
    let objectList = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;
    
    while(i--){
        objectList[i] = (JSON.parse(localStorage.getItem(keys[i])));
    }
    
    objectList.sort(function compare(a,b){
        if(a.nome < b.nome) return -1;
        if(a.nome > b.nome) return 1;
        return 0;
    });

    return objectList;
}

// function nameFilter(){
//     let objectList = createObj();
//     let filteredList;

//     input = document.getElementById("search-box").value;
//     // for(var contact of objectList){
//     //     console.log(JSON.Stringify(contact.name).filter("a"));
//     //     // (contact.nome).contains(input);
        
//     // }

//     filteredList = objectList.filter(function(el){
//         console.log();
//         return ((el.nome).toString().contains("a"));
//     })

//     console.log(input);
// }

function nameFilter() {
    // Declare variables
    let objectList = createObj();

    let input, filter, table, tr, i, j;
    input = document.getElementById('search-box');
    filter = input.value.toUpperCase();
    table = document.getElementById("list");
    tr = table.getElementsByTagName('tr');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0, j=1; i < objectList.length; i++, j++) {
        nome = objectList[i].nome;
        if (nome.toUpperCase().indexOf(filter) > -1) {
            tr[j].style.display = "";
        } else {
            tr[j].style.display = "none";
        }
    }
  }

function listContacts(){

    //pegar todas as keys do localStorage para colocar todas as informações em values
    let objectList = createObj();

    const table = document.getElementById('list');
    let dataHtml = table.innerHTML;

    for(let contact of objectList)
        dataHtml += `<tr><td><div class="remove-button" onclick="removeContact(${contact.id})"><img class="remove-img" src="/Agenda/Schedule/assets/remove.png" /></div></td><td class="cells">${contact.id}</td><td class="cells">${contact.nome}</td><td class="cells">${contact.cellphone}</td></tr>`;
    
    table.innerHTML = dataHtml;
}


