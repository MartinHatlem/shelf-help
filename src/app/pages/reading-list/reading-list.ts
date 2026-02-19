import { Component } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';
import { BookCatalogue } from '../book-catalogue/book-catalogue';

@Component({
  selector: 'app-reading-list',
  imports: [BookCard, BookCatalogue],
  templateUrl: './reading-list.html',
  styleUrl: './reading-list.css',
})
export class ReadingList {
  

}
