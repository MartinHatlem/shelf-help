import { Component, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LibraryStore } from '../../api/library-store';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  private libraryStore = inject(LibraryStore);
  user = this.libraryStore.currentUser;

  getUsername(): string {
    const user = this.user();
    if (!user) {
      return "Not logged in";
    }

    const username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
    return username;
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
