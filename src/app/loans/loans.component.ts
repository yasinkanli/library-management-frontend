import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService } from '../services/loans.service';
import { BookService } from '../services/books.service';
import { MemberService } from '../services/members.service';
import { Loan } from '../models/loan.model';
import { Book } from '../models/book.model';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];

  bookList: Book[] = [];
  memberList: Member[] = [];

  selectedBookId: number = 0;
  selectedMemberId: number = 0;

  searchTerm: string = '';
  editingLoanId: number | null = null;

  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.bookService.list().subscribe(res => {
      this.bookList = res.data ?? res;
      console.log('Kitaplar:', this.bookList);
    });
  
    this.memberService.list().subscribe(res => {
      this.memberList = res;
      console.log('Üyeler:', this.memberList);
    });
  
    this.loadLoans();
  }

  loadLoans() {
    this.loanService.list().subscribe(res => {
      const data = (res as any)?.data ?? res;
      this.loans = data;
      this.filteredLoans = data;
    });
  }

  filterLoans() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredLoans = this.loans.filter(loan =>
      (loan.book?.title ?? '').toLowerCase().includes(term) ||
      (loan.member?.name ?? '').toLowerCase().includes(term)
    );
  }

  saveLoan() {
    if (!this.selectedBookId || !this.selectedMemberId) {
      alert('Kitap ve üye seçmelisiniz.');
      return;
    }

    const loan: Loan = {
      bookId: this.selectedBookId,
      memberId: this.selectedMemberId
    };

    if (this.editingLoanId) {
      this.loanService.update(this.editingLoanId, loan).subscribe(() => {
        alert('Ödünç kaydı güncellendi.');
        this.clearForm();
        this.loadLoans();
      });
    } else {
      this.loanService.create(loan).subscribe(() => {
        alert('Ödünç kaydı eklendi.');
        this.clearForm();
        this.loadLoans();
      });
    }
  }

  editLoan(loan: Loan) {
    this.editingLoanId = loan.id!;
    this.selectedBookId = loan.bookId!;
    this.selectedMemberId = loan.memberId!;
  }

  deleteLoan(id: number) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.loanService.delete(id).subscribe(() => {
        alert('Ödünç kaydı silindi.');
        this.loadLoans();
      });
    }
  }

  clearForm() {
    this.selectedBookId = 0;
    this.selectedMemberId = 0;
    this.editingLoanId = null;
  }
  
}
