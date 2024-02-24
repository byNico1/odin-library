const addBook = document.querySelector(".add-book");
const closeModal = document.querySelector(".close-modal");
const Modal = document.querySelector(".modal");
const bookForm = document.getElementById("book-form");

addBook.addEventListener("click", () => Modal.classList.remove("hidden"));
closeModal.addEventListener("click", () => Modal.classList.add("hidden"));

let myLibrary = [];

class Book {
  constructor(title, author, pages, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.index = index;
    this.isRead = false;
  }

  readStatus(e) {
    this.isRead = !this.isRead;

    showBooks();
  }

  isReadedFunc() {
    this.isRead = !this.isRead;
    showBooks();
  }

  get bookIndex() {
    return this.index;
  }

  removeBook(index) {
    myLibrary = myLibrary.filter((book) => book.index !== index);
    showBooks();
  }
  removeBookfunc(e) {
    removeBook(title);
    showBooks();
  }
}

function addBookToLibrary(title, author, pages, index) {
  const book = new Book(title, author, pages, index);
  myLibrary.push(book);
}

function showBooks() {
  function resetBooks() {
    const Cards = document.querySelectorAll(".card");
    Cards.forEach((el) => el.remove());
  }

  resetBooks();

  for (let book of myLibrary) {
    let index = book.bookIndex;
    const main = document.querySelector("main");

    const card = document.createElement("div");
    card.classList.add("card");
    const bookTitle = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const removeBtn = document.createElement("button");
    const readBtn = document.createElement("button");

    card.setAttribute("data-index", book.bookIndex);

    readBtn.classList.add("button");

    readBtn.addEventListener("click", () => {
      book.isReadedFunc();
    });

    removeBtn.textContent = "Remove";
    removeBtn.classList.add("button");
    removeBtn.addEventListener("click", () => {
      book.removeBook(index);
    });

    if (book.isRead) {
      readBtn.textContent = "Not Readed";
      readBtn.classList.add("bg-blue");
    } else {
      readBtn.textContent = "Readed";
      readBtn.classList.add("bg-black");
    }
    bookTitle.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    card.append(bookTitle, author, pages, readBtn, removeBtn);
    main.insertBefore(card, main.firstChild);
  }
}

let index = 0;

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) =>
    input.addEventListener("input", (event) => {
      // Each time the user types something, we check if the
      // form fields are valid.

      Array.from(bookForm.elements).forEach((i) => {
        if (i.checkValidity()) {
          // field is valid - remove class
          i.parentElement.classList.remove("invalid");
        } else {
          // field is invalid - add class
          i.parentElement.classList.add("invalid");
          i.parentElement.lastElementChild.textContent =
            "Missing value required";
          console.log(i);
        }
      });
    })
  );

  if (bookForm.checkValidity()) {
    Array.from(bookForm.elements).forEach((i) => {
      if (i.checkValidity()) {
        // field is valid - remove class
        i.parentElement.classList.remove("invalid");
      }
    });

    let bookTitle = document.getElementById("book-title").value;
    let bookAuthor = document.getElementById("book-author").value;
    let bookPages = document.getElementById("book-pages").value;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, index);
    showBooks();
  } else {
    Array.from(bookForm.elements).forEach((i) => {
      if (i.checkValidity()) {
        // field is valid - remove class
        i.parentElement.classList.remove("invalid");
      } else {
        // field is invalid - add class
        i.parentElement.classList.add("invalid");
        i.parentElement.lastElementChild.textContent = "Missing value required";
        console.log(i);
      }
    });

    return;
  }

  Modal.classList.add("hidden");
  bookForm.reset();
  console.log(myLibrary);

  index += 1;
});
