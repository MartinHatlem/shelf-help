import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './pages/login/login';
import { BookCatalogue } from './pages/book-catalogue/book-catalogue';
import { BookDetails } from './pages/book-details/book-details';
import { ReadingList } from './pages/reading-list/reading-list';
import { BookCard } from './components/book-card/book-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, BookCatalogue, BookDetails, ReadingList, BookCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('shelf-help');
}
