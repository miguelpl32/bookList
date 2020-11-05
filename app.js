// Constructor libors
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//Constructor UI
function UI() {}

//añadir libro a la lista
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //crear tabla
  const row = document.createElement("tr");
  //insertar columna
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;
  list.appendChild(row);
};

//Funcion mostrar Alerta
UI.prototype.showAlert = function (message, className) {
  //Crear el div
  const div = document.createElement("div");
  //añadir la clase
  div.className = `alert ${className}`;
  //añadir text
  div.appendChild(document.createTextNode(message));
  //añadir contenedor
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  //Insertar la alerta
  container.insertBefore(div, form);

  //añadir tiempo de mostrarlta
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Eliminar libro
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Funcion limpiar formulario
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Evento añadir libro
document.getElementById("book-form").addEventListener("submit", function (e) {
  // recoger los valores del formulario
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  //Validar datos
  if (title === "" || author === "" || isbn === "") {
    //alerta de error
    ui.showAlert("Rellena los campos", "error");
  } else {
    // añadir libro a la lista
    ui.addBookToList(book);
    //mensage libro añadido
    ui.showAlert("Libro añadido!!!", "success");
    //Limpiar formulario
    ui.clearFields();
  }

  e.preventDefault();
});

// Evento eliminar libro

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  //Mostrar alerta
  ui.showAlert("Libro Eliminado!!!", "success");
  e.preventDefault();
});
