import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorService } from '../services/authors.service';
import { Author } from '../models/author.model';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];

  searchTerm = '';
  newAuthorName = '';
  editingAuthorId: number | null = null;

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.list().subscribe(res => {
      this.authors = res;
      this.filteredAuthors = res;
    });
  }

  filterAuthors() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(term)
    );
  }

  saveAuthor() {
    if (!this.newAuthorName.trim()) {
      alert('Yazar adı boş olamaz.');
      return;
    }

    const author = { name: this.newAuthorName };

    if (this.editingAuthorId) {
      this.authorService.update(this.editingAuthorId, author).subscribe(() => {
        alert('Yazar güncellendi.');
        this.clearForm();
        this.loadAuthors();
      });
    } else {
      this.authorService.create(author).subscribe(() => {
        alert('Yazar eklendi.');
        this.clearForm();
        this.loadAuthors();
      });
    }
  }

  editAuthor(author: Author) {
    this.editingAuthorId = author.id!;
    this.newAuthorName = author.name;
  }

  deleteAuthor(id: number) {
    if (confirm('Yazarı silmek istediğine emin misin?')) {
      this.authorService.delete(id).subscribe(() => {
        alert('Yazar silindi.');
        this.loadAuthors();
      });
    }
  }

  clearForm() {
    this.newAuthorName = '';
    this.editingAuthorId = null;
  }
}
