import { Component, OnInit, Input } from '@angular/core';
import { ItemComponent } from '../../../';
import { database } from 'firebase';

@Component({
  selector: 'table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss']
})
export class TableItemComponent implements ItemComponent, OnInit {
  @Input() ref: database.DataSnapshot;
  @Input() index: number;

  private item: Object;

  public imageUrl: string;

  ngOnInit() {
    this.item = this.ref.val();
    this.getImage('thumbnail');
  }

  public loadImg(event): void {
    event.target.style.opacity = 1;
  }
  public getImage(size) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?inc=picture', true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.imageUrl = JSON.parse(xhr.response)['results'][0]['picture'][size];
      }
    };
    xhr.onerror = () => this.imageUrl = '';
  }
}
