"use strict";

function printData(elem) {
  var cont = document.getElementById('uniqueId');
  var card = document.createElement('div');
  card.className = 'list-group-item list-group-item-action d-flex justify-content-around align-items-center';
  card.setAttribute('id', elem.id);
  var name = document.createElement('p');
  name.textContent = elem.name;
  name.className = 'text-primary';
  card.appendChild(name);
  var cost = document.createElement('p');
  cost.textContent = "Cost - " + elem.cost + " $";
  cost.className = 'text-primary';
  card.appendChild(cost);
  var quan = document.createElement('p');
  quan.textContent = "Quantity - " + elem.quantity;
  quan.className = 'text-primary';
  card.appendChild(quan);
  cont.appendChild(card);
  return cont;
}

function getData() {
  var cont = document.getElementById('uniqueId');
  cont.innerHTML = '';
  fetch("http://localhost:3000/products").then(function (response) {
    return response.json();
  }).then(function (products) {
    return products.map(printData);
  })["catch"](function (error) {
    return console.log('error', error);
  });
}

var btnGet = document.getElementById('getList');
btnGet.addEventListener('click', getData);

function postData() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  });
}

function addItem() {
  var newItem = {
    id: "",
    name: faker.commerce.product(),
    cost: faker.commerce.price(),
    quantity: Math.round(Math.random() * 100)
  };
  postData("http://localhost:3000/products", newItem).then(function (data) {
    return console.log(JSON.stringify(data));
  })["catch"](function (error) {
    return console.error(error);
  });
  swal("Item added!", "Good job", "success");
}

var btnAdd = document.getElementById('addItem');
btnAdd.addEventListener('click', addItem);
var deleteMethod = {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
};

function deleteItem() {
  swal("Write id of item for deleting: ", {
    content: "input"
  }).then(function (value) {
    console.log(value);
    var cont = document.getElementById('uniqueId');
    var child = cont.childNodes;
    console.log(child.length);

    if (value <= child.length) {
      fetch("http://localhost:3000/products/".concat(value), deleteMethod).then(function (response) {
        return response.json();
      }).then(function (data) {
        return console.log(data);
      })["catch"](function (err) {
        return console.log(err);
      });
      swal("Item deleted!", "Good job", "success");
    } else {
      swal("Sorry!", "Item doesn't exict! Try again", "error");
    }
  });
}

var btnDelete = document.getElementById('deleteItem');
btnDelete.addEventListener('click', deleteItem);

function cost(a, b) {
  return a.cost - b.cost;
}

function sortList() {
  swal("Write type of sorting: cost or name ", {
    content: {
      element: "input",
      attributes: {
        placeholder: "Cost or name"
      }
    }
  }).then(function (value) {
    if (value === "cost") {
      fetch("http://localhost:3000/products").then(function (response) {
        return response.json();
      }).then(function (products) {
        var list = products.sort(cost);
        var cont = document.getElementById('uniqueId');
        cont.innerHTML = '';
        list.map(printData);
      })["catch"](function (error) {
        return console.log('error', error);
      });
      swal("Just a minute...", "", "success");
    } else if (value === "name") {
      fetch("http://localhost:3000/products").then(function (response) {
        return response.json();
      }).then(function (products) {
        var list = products.sort(function () {
          return Math.random() - 0.5;
        });
        var cont = document.getElementById('uniqueId');
        cont.innerHTML = '';
        list.map(printData);
      })["catch"](function (error) {
        return console.log('error', error);
      });
      swal("Just a minute...", "", "success");
    } else {
      swal("Sorry!", "Enter 'cost' or 'name', please. Try again", "error");
    }
  });
}

var btnSort = document.getElementById('sortItem');
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
        placeholder: "Cost or name"
      }
    }
  }).then(function (value) {
    var newval = ucFirst(value);
    fetch("http://localhost:3000/products").then(function (response) {
      return response.json();
    }).then(function (products) {
      var prod = products.find(function (item) {
        return item.name === newval;
      });
      var cont = document.getElementById('uniqueId');
      cont.innerHTML = '';
      var id = document.createElement('p');
      id.textContent = 'Your product`s id is - ' + prod.id;
      id.className = 'list-group-item list-group-item-action d-flex justify-content-stretch align-items-center';
      cont.appendChild(id);
      printData(prod);
    })["catch"](function (error) {
      console.log('error', error);
      swal("Sorry!", "Didn't find. Try again", "error");
    });
  });
}

var btnSearch = document.getElementById('searchByName');
btnSearch.addEventListener('click', findItem);

function selectedItem() {
  var cont = document.getElementById('uniqueId');
  cont.innerHTML = '';
  fetch("http://localhost:3000/products").then(function (response) {
    return response.json();
  }).then(function (products) {
    return products.map(printData);
  })["catch"](function (error) {
    return console.log('error', error);
  });
  document.querySelector('#uniqueId').addEventListener('click', function (e) {
    e.preventDefault();
    var id = e.target;
    id.className === "list-group-item list-group-item-action d-flex justify-content-around align-items-center success" ? id.classList.remove('success') : id.classList.add('success');
  });
}

var btnSelect = document.getElementById('selected');
btnSelect.addEventListener('click', selectedItem);