import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-card-button',
	templateUrl: './card-button.component.html',
	styleUrls: ['./card-button.component.css'],
})
export class CardButtonComponent {
	@Input() name: string;
	@Input() icon: string;
	@Output() cardButtonClick = new EventEmitter<void>();

	handleClick(): void {
		this.cardButtonClick.emit();
	}
}
