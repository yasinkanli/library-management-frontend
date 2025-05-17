import { Book } from './book.model';
import { Member } from './member.model';

export interface Loan {
  id?: number;
  bookId: number;
  memberId: number;
  loanDate?: string;
  dueDate?: string;
  book?: Book;
  member?: Member;
}
