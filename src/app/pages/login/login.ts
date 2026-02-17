import { Component, inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LibraryStore } from '../../api/library-store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private store = inject(LibraryStore);

  name = '';
  users = this.store.users;
  loading = this.store.usersLoading;
  error = this.store.usersError;

  ngOnInit() {
    this.store.loadUsers();
  }

  onSubmit() {
    const trimmed = this.name.trim();
  
    this.store.addUser({username: trimmed, collection: []});
    console.log('User submitted:', trimmed);

    this.name = '';
  }
}
