import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})

export class BookCard {
  @Input() book: any; // TODO: change type to book once merged with api branch
  @Input() favorite = false; // TODO: Connect to whether user has favorited the book or not
  @Input() coverImg = '/placeholder.png'; // TODO: Connect to actual book cover image from API
  
  toggleFavorite() {
    this.favorite = !this.favorite;
  }
}