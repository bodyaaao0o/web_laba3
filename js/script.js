let books = [];
let editIndex = -1;

class Book {
    constructor(title, author, pages, price) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.price = price;
    }
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const price = document.getElementById('price').value;

    if (title && author && pages && price) {
        const book = new Book(title, author, pages, price);
        books.push(book);
        clearInputFields();
        renderBooks();
        updateTotalPrice();
    } else {
        alert('Заповніть всі поля');
    }
}

function renderBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = books.map((book, index) => `
        <div class="book-item">
            <span class="book-title">Назва: ${book.title}</span><br>
            <span class="book-author">Автор: ${book.author}</span><br>
            <span class="book-pages">Кількість сторінок: ${book.pages}</span><br>
            <span class="book-price">Ціна: ${book.price} грн</span><br>
            <button class="delete-btn" onclick="deleteBook(${index})">Видалити</button>
            <button class="edit-btn" onclick="startEdit(${index})">Редагувати</button>
        </div>
    `).join('');
}


function deleteBook(index) {
    books.splice(index, 1);
    renderBooks();
    updateTotalPrice();
}

function startEdit(index) {
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('pages').value = book.pages;
    document.getElementById('price').value = book.price;

    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'inline-block';

    editIndex = index;
}

function saveChanges() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const price = document.getElementById('price').value;

    if (title && author && pages && price) {
        books[editIndex] = new Book(title, author, pages, price);
        clearInputFields();
        renderBooks();
        updateTotalPrice();

        document.getElementById('add-btn').style.display = 'inline-block';
        document.getElementById('edit-btn').style.display = 'none';
        editIndex = -1;
    } else {
        alert('Заповніть всі поля');
    }
}

function clearInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('price').value = '';
}

function searchBook() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );

    renderFilteredBooks(filteredBooks);
}

function renderFilteredBooks(filteredBooks) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = filteredBooks.map((book, index) => `
        <div class="book-item">
            <span class="book-title">Назва: ${book.title}</span><br>
            <span class="book-author">Автор: ${book.author}</span><br>
            <span class="book-pages">Кількість сторінок: ${book.pages}</span><br>
            <span class="book-price">Ціна: ${book.price} грн</span><br>
            <button class="delete-btn" onclick="deleteBook(${index})">Видалити</button>
            <button class="edit-btn" onclick="startEdit(${index})">Редагувати</button>
        </div>
    `).join('');
}

function resetSearch() {
    document.getElementById('search').value = ''; 
    renderBooks(); 
}

function sortBooks() {
    books.sort((a, b) => a.price - b.price);
    renderBooks();
}

function calculateTotalPrice() {
    return books.reduce((total, book) => total + parseFloat(book.price), 0);
}

function updateTotalPrice() {
    const totalPrice = calculateTotalPrice();
    document.getElementById('total-price').innerText = totalPrice;
}

