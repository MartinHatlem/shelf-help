import { Component, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Book } from '../../api/book-api';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})

export class BookCard {
  @Input() book!: Book; // TODO: change type to book once merged with api branch
  @Input() favorite? = false; // TODO: Connect to whether user has favorited the book or not
  @Input() coverImg = '/placeholder.png'; // TODO: Connect to actual book cover image from API

  // TODO: Add output event emitter for favorite toggle
  
  toggleFavorite() {
    this.favorite = !this.favorite;
  }
}