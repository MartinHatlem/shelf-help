import { Component } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';

@Component({
  selector: 'app-book-catalogue',
  imports: [BookCard],
  templateUrl: './book-catalogue.html',
  styleUrl: './book-catalogue.css',
})
export class BookCatalogue {

}
