import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { BookCatalogue } from './pages/book-catalogue/book-catalogue';
import { BookDetails } from './pages/book-details/book-details';
import { ReadingList } from './pages/reading-list/reading-list';

export const routes: Routes = [
  { path: '', component: BookCatalogue },
  { path: 'login', component: Login },
  { path: 'book-details/:id', component: BookDetails },
  { path: 'reading-list', component: ReadingList },
];
