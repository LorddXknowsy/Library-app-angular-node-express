import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BooksService } from '../books.service';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

// Defining form's property

  title = '';
  genre = '';
  author = '';


  constructor(private booksService:BooksService) { }

// Adding book from Service
// If there's no valid form, no return is displayed


  onAddBook(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.booksService.addBook(form.value.title, form.value.author, form.value.genre)
    form.resetForm();
  };


  }




