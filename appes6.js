class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Clase localStorage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      //Añadir libro a la vista desde localstorage
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Evento en el DOM para mostrar localstorage
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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

    //Añadir al LocalStorage
    Store.addBook(book);

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

  //Eliminar del LocalStore
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Mostrar alerta
  ui.showAlert("Libro Eliminado!!!", "success");
  e.preventDefault();
});
