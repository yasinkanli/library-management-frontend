import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/books.service';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { AuthorService } from '../services/authors.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  newBookTitle = '';
  searchTerm = '';
  editingBookId: number | null = null;
  authorList: Author[] = [];
selectedAuthorIds: number[] = [];

  constructor(private bookService: BookService,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.authorService.list().subscribe(res => this.authorList = res);
  }

  loadBooks() {
    this.bookService.list().subscribe(res => {
      this.books = res.data ?? res;
      this.filteredBooks = this.books;
    });
  }

  filterBooks() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(term)
    );
  }

  saveBook() {
    if (!this.newBookTitle.trim()) {
      alert('Kitap adı boş olamaz.');
      return;
    }

    const book: Book = { title: this.newBookTitle,
      authorIds: this.selectedAuthorIds,
     };

    if (this.editingBookId) {
      this.bookService.update(this.editingBookId, book).subscribe(() => {
        alert('Kitap güncellendi.');
        this.newBookTitle = '';
        this.editingBookId = null;
        this.loadBooks();
      });
    } else {
      this.bookService.create(book).subscribe(() => {
        alert('Kitap eklendi.');
        this.newBookTitle = '';
        this.selectedAuthorIds = [];
        this.loadBooks();
      });
    }
  }

  editBook(book: Book) {
    this.newBookTitle = book.title;
    this.editingBookId = book.id!;
  }

  deleteBook(id: number) {
    if (confirm('Silmek istediğine emin misin?')) {
      this.bookService.delete(id).subscribe(() => {
        alert('Kitap silindi.');
        this.loadBooks();
      });
    }
  }
}
