import { Component } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';

@Component({
  selector: 'app-reading-list',
  imports: [BookCard],
  templateUrl: './reading-list.html',
  styleUrl: './reading-list.css',
})
export class ReadingList {

}
