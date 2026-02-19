import { Component, inject, signal, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { LibraryStore } from './api/library-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('shelf-help');
  libraryStore = inject(LibraryStore);
  ngOnInit() {
    this.libraryStore.loadBooks();
    this.libraryStore.loadCurrentUser();
  }
}
