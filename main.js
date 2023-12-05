// Array Books
let books = [];

// Fungsi untuk merender buku-buku ke dalam rak
function renderBooks(filter) {
  // Element rak buku "Belum Selesai Dibaca" dan "Sudah Selesai Dibaca"
  const listUnread = document.getElementById("incompleteBookshelfList");
  const listRead = document.getElementById("completeBookshelfList");

  // Mengosongkan rak buku
  listUnread.innerHTML = "";
  listRead.innerHTML = "";

  // Menerapkan filter pada judul buku (opsional)
  filter = filter?.trim().toLowerCase();

  // Melakukan iterasi pada array books
  for (let book of books) {
    // Membuat elemen buku
    const bookElement = makeBookElement(book);

    // Menerapkan filter pada judul buku (opsional)
    let filterChecked = true;
    if (filter) {
      filterChecked = book.title.toLowerCase().includes(filter);
    }

    // Menentukan rak buku berdasarkan status isComplete
    if (filterChecked) {
      if (book.isComplete) {
        listRead.append(bookElement);
      } else {
        listUnread.append(bookElement);
      }
    }
  }
}

// Fungsi untuk membuat elemen buku
function makeBookElement(book) {
  // Membuat elemen-elemen buku
  const title = document.createElement("h3");
  title.innerText = book.title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Penulis: " + book.author;

  const textYear = document.createElement("p");
  textYear.innerText = "Tahun: " + book.year;

  const action = document.createElement("div");
  action.classList.add("action");

  // Membuat tombol untuk menandai buku sebagai "Belum Selesai" atau "Sudah Selesai"
  const btnUnread = document.createElement("button");
  btnUnread.classList.add("green");
  btnUnread.innerText = "Belum Selesai Dibaca";

  const btnFinished = document.createElement("button");
  btnFinished.classList.add("green");
  btnFinished.innerText = "Sudah Selesai Dibaca";

  // Menambahkan event listener untuk mengubah status buku
  btnUnread.addEventListener("click", function () {
    changeBookState(book.id, false);
  });
  btnFinished.addEventListener("click", function () {
    changeBookState(book.id, true);
  });

  // Membuat tombol untuk menghapus buku
  const btnDelete = document.createElement("button");
  btnDelete.classList.add("red");
  btnDelete.innerText = "Hapus";

  // Menambahkan event listener untuk menghapus buku
  btnDelete.addEventListener("click", function () {
    removeBook(book.id);
  });

  // Menambahkan tombol dan elemen buku ke dalam container
  action.append(book.isComplete ? btnUnread : btnFinished, btnDelete);

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(title, textAuthor, textYear, action);

  return container;
}

// Fungsi untuk menambahkan buku baru
function addBook() {
  const book = {
    id: +new Date(),
    title: inputTitle.value,
    author: inputAuthor.value,
    year: Number(inputYear.value),
    isComplete: inputIsComplete.checked,
  };

  // Menambahkan buku ke dalam array books
  books.push(book);
  saveData();
  resetForm();
  renderBooks();
}

// Fungsi untuk menghapus buku berdasarkan ID
function removeBook(bookId) {
  // Menghapus buku dari array books
  books = books.filter((book) => book.id !== bookId);
  saveData();
  renderBooks();
}

// Fungsi untuk mengubah status buku (Selesai/Belum Selesai)
function changeBookState(bookId, newState) {
  const book = books.find((book) => book.id === bookId);
  if (book) {
    book.isComplete = newState;
    saveData();
    renderBooks();
  }
}

// Fungsi untuk menyimpan data buku ke dalam localStorage
function saveData() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Fungsi untuk memuat data buku dari localStorage
function loadData() {
  const data = JSON.parse(localStorage.getItem("books"));
  if (data !== null) {
    books = data;
  }

  // Menjalankan fungsi renderBooks ketika halaman telah dimuat
  document.addEventListener("DOMContentLoaded", function () {
    renderBooks();

    // Menambahkan event listener untuk form penambahan buku
    inputForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addBook();
    });

    // Menambahkan event listener untuk form pencarian buku
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      renderBooks(searchInput.value);
      searchInput.value = "";
    });
  });
}

// Menginisialisasi elemen-elemen form
const inputTitle = document.querySelector("#inputBookTitle");
const inputAuthor = document.querySelector("#inputBookAuthor");
const inputYear = document.querySelector("#inputBookYear");
const inputIsComplete = document.querySelector("#inputBookIsComplete");
const inputForm = document.querySelector("#inputBook");
const searchInput = document.querySelector("#searchBookTitle");
const searchForm = document.querySelector("#searchBook");

// Fungsi untuk mereset form
function resetForm() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputYear.value = "";
  inputIsComplete.checked = false;
}

// Memuat data buku saat halaman dimuat
loadData();
