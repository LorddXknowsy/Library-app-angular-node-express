import { Injectable } from '@angular/core';
import { Book } from './book.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();

  // Using HttpClient 3rd part library for getting data from REST-Api
  constructor(private http:HttpClient){

  }

  // Parsing data on pointing Api's hosting path
  // Using spread operator for getting copy of the data's body and data.
  getBooks() {
    this.http.get<{message: string, books: Book[]}>('http://localhost:3000/api/books')
    .subscribe((bookData) => {
      this.books = bookData.books;
      this.booksUpdated.next([...this.books]);
    });
    }
  // Turning the data-list to Observable
  bookUpdateListener(){
    return this.booksUpdated.asObservable();
  }

  // Adding book using post method
  // Sending Object to the server. The body containing responding message and data.
  // Using 'push' method for displaying data and returning the updated books array.
  addBook (title:string, author:string, genre: string){
    const book: Book = {id: null, title: title, author: author, genre: genre };
    this.http.post<{message: string}>('http://localhost:3000/api/books', book)
    .subscribe((responseData) =>{
      console.log(responseData.message);
      this.books.push(book);
      this.booksUpdated.next([...this.books]);
    })

  }



}

