import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LibraryStore } from '../../api/library-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  private libraryStore = inject(LibraryStore);
  isAuthenticated() {
    return this.libraryStore.currentUser() !== null;
  }
}
