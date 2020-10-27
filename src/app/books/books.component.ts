import { Component,  OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BooksService } from '../books.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

// Initializing book's property as a blank array
// Using 'rxjs' library and 'Subscription' operator for subscribe the observable.
books: Book [] = [];
private booksSubscription: Subscription;
constructor(private booksService: BooksService){}


// Initializing service 'books' and fetch the data using on-initializing sycle-hook method
// Subscribing the observable and return the fetching data.
ngOnInit(){

  this.booksService.getBooks();
  this.booksSubscription = this.booksService.bookUpdateListener()
  .subscribe((books: Book[]) => {
    this.books = books;

  });

// Unsubscribing the observable for avoiding memory leak
}
ngOnDestroy(){
  this.booksSubscription.unsubscribe();
}


}
