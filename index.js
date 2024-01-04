const addBook = document.querySelector(".add-book");
const Modal = document.querySelector(".modal");
const bookForm = document.getElementById("book-form");

addBook.addEventListener("click", () => Modal.classList.remove("hidden"));

let myLibrary = [];

function Book(title, author, pages, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.index = index;
  this.isRead = false;
  this.info = function () {
    return `${this.title}, ${this.pages}, ${this.author}`;
  };
}

function readStatus(e) {
  let title = e.target.parentNode.firstChild.innerText.toLowerCase();

  book.isRead = !book.isRead;
  showBooks();
}

function addBookToLibrary(title, author, pages, index) {
  const book = new Book(title, author, pages, index);
  myLibrary.push(book);
}

function removeBook(index) {
  // myLibrary = myLibrary.filter((book) => book.title.toLowerCase() !== title);

  myLibrary = myLibrary.filter((book) => book.index !== index);
  showBooks();
}

const removeBookfunc = (e) => {
  // let title = e.target.parentNode.firstChild.innerText.toLowerCase();

  removeBook(title);
  showBooks();
};

function resetBooks() {
  const Cards = document.querySelectorAll(".card");
  Cards.forEach((el) => el.remove());
}

function showBooks() {
  resetBooks();

  for (let book of myLibrary) {
    let index = book.index;
    const main = document.querySelector("main");

    const card = document.createElement("div");
    card.classList.add("card");
    const bookTitle = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const removeBtn = document.createElement("button");
    const readBtn = document.createElement("button");

    card.setAttribute("data-index", book.index);

    readBtn.classList.add("button");

    readBtn.addEventListener("click", () => {
      book.isRead = !book.isRead;
      showBooks();
    });

    removeBtn.textContent = "Remove";
    removeBtn.classList.add("button");
    removeBtn.addEventListener("click", () => {
      removeBook(index);
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

  let bookTitle = document.getElementById("book-title").value;
  let bookAuthor = document.getElementById("book-author").value;
  let bookPages = document.getElementById("book-pages").value;

  addBookToLibrary(bookTitle, bookAuthor, bookPages, index);
  showBooks();

  Modal.classList.add("hidden");
  bookForm.reset();
  console.log(myLibrary);

  index += 1;
});
