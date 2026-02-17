import { Component, inject} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { LibraryStore } from '../../api/library-store';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private store = inject(LibraryStore);
  private router = inject(Router);

  name = '';
  users = this.store.users;
  loading = this.store.usersLoading;
  error = this.store.usersError;

  ngOnInit() {
    this.store.loadUsers();
  }

  onSubmit() {
    const trimmed = this.name.trim();
    if(!trimmed) {
      alert("Username not valid!");
      return;
    }

    let currentUser = this.users().find(user => user.username === trimmed);

    if(currentUser) {
      this.store.setCurrentUser(currentUser);
      this.router.navigate(['']);
      return;
    }
 
    this.store.addUser({username: trimmed, collection: []})
    this.router.navigate(['']);
  }
    
}
