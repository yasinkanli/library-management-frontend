import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../services/members.service';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  filteredMembers: Member[] = [];

  searchTerm = '';
  newMemberName = '';
  newMemberCardNumber = '';
  editingMemberId: number | null = null;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.list().subscribe(res => {
      this.members = res;
      this.filteredMembers = res;
    });
  }

  filterMembers() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredMembers = this.members.filter(member =>
      member.name.toLowerCase().includes(term)
    );
  }

  saveMember() {
    if (!this.newMemberName.trim() || !this.newMemberCardNumber.trim()) {
      alert('Üye adı ve kart numarası zorunludur.');
      return;
    }

    const member: Member = {
      name: this.newMemberName,
      cardNumber: this.newMemberCardNumber
    };

    if (this.editingMemberId) {
      this.memberService.update(this.editingMemberId, member).subscribe(() => {
        alert('Üye güncellendi.');
        this.clearForm();
        this.loadMembers();
      });
    } else {
      this.memberService.create(member).subscribe(() => {
        alert('Üye eklendi.');
        this.clearForm();
        this.searchTerm = '';
        this.loadMembers();
      });
    }
  }

  editMember(member: Member) {
    this.editingMemberId = member.id!;
    this.newMemberName = member.name;
    this.newMemberCardNumber = member.cardNumber ?? '';
  }

  deleteMember(id: number) {
    if (confirm('Silmek istediğine emin misin?')) {
      this.memberService.delete(id).subscribe(() => {
        alert('Üye silindi.');
        this.loadMembers();
      });
    }
  }

  clearForm() {
    this.newMemberName = '';
    this.newMemberCardNumber = '';
    this.editingMemberId = null;
  }
}
