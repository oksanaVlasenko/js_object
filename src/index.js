
function printData(elem) {
    let cont = document.getElementById('uniqueId');
    let card = document.createElement('div');
    card.className = 'list-group-item list-group-item-action d-flex justify-content-around align-items-center';
    card.setAttribute('id', elem.id);

    let name = document.createElement('p');
    name.textContent = elem.name;
    name.className = 'text-primary';
    card.appendChild(name);

    let cost = document.createElement('p');
    cost.textContent = "Cost - " + elem.cost + " $";
    cost.className = 'text-primary';
    card.appendChild(cost);

    let quan = document.createElement('p');
    quan.textContent = "Quantity - " + elem.quantity;
    quan.className = 'text-primary';
    card.appendChild(quan);

    cont.appendChild(card);
    return cont;
}


function getData () {
    let cont = document.getElementById('uniqueId');
    cont.innerHTML='';
    fetch(`http://localhost:3000/products`)
    .then(response => response.json())
    .then(products => products.map(printData))
    .catch(error => console.log('error', error));
}

let btnGet = document.getElementById('getList');
btnGet.addEventListener('click', getData);

function postData(url = '', data = {}) {
      return fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          redirect: 'follow', 
          referrer: 'no-referrer', 
          body: JSON.stringify(data), 
      })
      .then(response => response.json()); 
}

function addItem() {
    let newItem = {
        id: "",
        name: faker.commerce.product(),
        cost: faker.commerce.price(),
        quantity: Math.round(Math.random()*100)
    }

    postData(`http://localhost:3000/products`, newItem)
    .then(data => console.log(JSON.stringify(data))) 
    .catch(error => console.error(error));
    swal("Item added!", "Good job", "success");
}

let btnAdd = document.getElementById('addItem');
btnAdd.addEventListener('click', addItem);

const deleteMethod = {
    method: 'DELETE', 
    headers: {
     'Content-type': 'application/json; charset=UTF-8' 
    }
}
   
function deleteItem(){
    swal("Write id of item for deleting: ", {
        content: "input",
    })
    .then ((value) => {
        console.log(value);
        let cont = document.getElementById('uniqueId');
        let child = cont.childNodes;
        console.log(child.length);
        if(value <= child.length) {
            fetch(`http://localhost:3000/products/${value}`, deleteMethod) 
                .then(response => response.json())
                .then(data => console.log(data)) 
                .catch(err => console.log(err))
                swal("Item deleted!", "Good job", "success");
            } else {
                swal("Sorry!", "Item doesn't exict! Try again", "error");
            }   
    })
    
}

let btnDelete = document.getElementById('deleteItem');
btnDelete.addEventListener('click', deleteItem);

function cost(a,b){
    return a.cost - b.cost;
}

function sortList(){
    swal("Write type of sorting: cost or name ", {
        content: {
            element: "input",
            attributes: {
            placeholder: "Cost or name",
            },
        }
    })
    .then(value => {
        if(value === "cost") {
            fetch(`http://localhost:3000/products`)
            .then(response => response.json())
            .then(products => {
                let list = products.sort(cost);
                let cont = document.getElementById('uniqueId');
                cont.innerHTML='';
                list.map(printData);
            })
            .catch(error => console.log('error', error));
            swal("Just a minute...", "", "success");
        } else if (value === "name") {
            fetch(`http://localhost:3000/products`)
            .then(response => response.json())
            .then(products => {
                let list = products.sort(function(){ 
                    return Math.random() - 0.5;
                });
                let cont = document.getElementById('uniqueId');
                cont.innerHTML='';
                list.map(printData);
            })
            .catch(error => console.log('error', error));
            swal("Just a minute...", "", "success");
        } else {
            swal("Sorry!", "Enter 'cost' or 'name', please. Try again", "error");
        }
    })
}

let btnSort = document.getElementById('sortItem');
btnSort.addEventListener('click', sortList);

function ucFirst(str) {
    if (!str) return str; 
    return str[0].toUpperCase() + str.slice(1);
}

function findItem() {
    swal("Please enter name of product for searching", {
        content: {
            element: "input",
            attributes: {
            placeholder: "Cost or name",
            },
        }
    })
    
    .then(value => {
        let newval = ucFirst(value);
        fetch(`http://localhost:3000/products`)
        .then(response => response.json())
        .then(products => {
            let prod = products.find(item => item.name === newval);
            let cont = document.getElementById('uniqueId');
            cont.innerHTML='';
            let id = document.createElement('p');
            id.textContent = 'Your product`s id is - ' + prod.id;
            id.className = 'list-group-item list-group-item-action d-flex justify-content-stretch align-items-center';
            cont.appendChild(id);
            printData(prod);
        })
        .catch(error => {
            console.log('error', error)
            swal("Sorry!", "Didn't find. Try again", "error");
        });
    })
 
}

let btnSearch = document.getElementById('searchByName');
btnSearch.addEventListener('click', findItem );

function selectedItem() {
    let cont = document.getElementById('uniqueId');
    cont.innerHTML='';
    fetch(`http://localhost:3000/products`)
    .then(response => response.json())
    .then(products => products.map(printData))
    .catch(error => console.log('error', error));
    document.querySelector('#uniqueId').addEventListener('click', function(e){ 
        e.preventDefault();
        let id = e.target; 
        id.className === "list-group-item list-group-item-action d-flex justify-content-around align-items-center success" ? 
        id.classList.remove('success') : id.classList.add('success');
    });
}

let btnSelect = document.getElementById('selected');
btnSelect.addEventListener('click', selectedItem);

