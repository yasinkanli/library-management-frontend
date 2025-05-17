import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { LoansComponent } from './loans/loans.component';
import { MembersComponent } from './members/members.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AuthorsComponent,
    BooksComponent,
    LoansComponent,
    MembersComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeSection: string = 'authors'; // default: yazarlar

  setActive(section: string) {
    this.activeSection = section;
  }
}
