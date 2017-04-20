import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Common } from "../common";
@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.scss']
})
export class NewPersonComponent implements OnInit {
  private form: FormGroup;
  private imageUrl: string;
  constructor(
      private FB: FormBuilder,
      private dialogRef: MdDialogRef<NewPersonComponent>,
  ) { }

  ngOnInit() {
    this.getImage('large');
    
    this.form = this.FB.group({
      name: ['', Validators.required],
      age: [18, Validators.required],
      gender: ['', Validators.required],
      country: ['UA', Validators.required],
      job: ['', Validators.required],
      cv: ['', Validators.required],
      inSearch: [true, Validators.required],
      favoriteFramework: ['', Validators.required]
    });

  }

  getImage = Common.prototype.getImage;
  loadImg = Common.prototype.loadImg;

  closePopup(save) {
    if (save) {
      this.dialogRef.close(this.form.value);
    } else {
      this.dialogRef.close(save)
    }
  }
}