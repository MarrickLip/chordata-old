import { Component, Input, OnInit } from '@angular/core';

export type StatsCardProps = {
	icon: string;
	title: string;
	value: number | string;
	summary: string;
  routerLink?: string;
};

@Component({
	selector: 'app-stats-card',
	templateUrl: './stats-card.component.html',
	styleUrls: ['./stats-card.component.css'],
})
export class StatsCardComponent implements OnInit {
	@Input() props: StatsCardProps;

	constructor() {}

	ngOnInit(): void {}
}
