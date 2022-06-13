import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Item {
  bookName: string;
  year: number;
  authorName: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  public bookList:any[] = [];

  itemForm! : FormGroup;
  item: Item;
  constructor() {
    this.item = {} as Item
  }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      bookName: new FormControl(this.item.bookName , [Validators.required]),
      year: new FormControl(this.item.year , [Validators.required]),
      authorName: new FormControl(this.item.authorName , [Validators.required]),
    })
  }

  get bookName() {
    return this.itemForm.get('bookName')
  }

  get year() {
    return this.itemForm.get('year')
  }

  get authorName() {
    return this.itemForm.get('authorName')
  }

  public saveBook(): void {
    if (this.itemForm.invalid) {
      for (const control of Object.keys(this.itemForm.controls)) {
        this.itemForm.controls[control].markAsTouched();
      }
      return;
    }

    this.item = this.itemForm.value;
    this.bookList.push(this.item)
    // @ts-ignore
    this.bookName?.reset();
    this.year?.reset();
    this.authorName?.reset();
  }

  public deleteBook(index:any) {
    this.bookList.splice(index , 1)
  }

}
