import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.css']
})
export class CardButtonComponent implements OnInit {
  @Input() name: string;
  @Input() icon: string;
  @Output() click = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
    console.log({name: this.name, icon: this.icon})
  }

}
