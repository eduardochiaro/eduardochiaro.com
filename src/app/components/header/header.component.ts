import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	data: any[] = [];

	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.getData().subscribe(
			dataFrom =>{
			this.setData(dataFrom);
			}
		);
	}

	setData(dataFrom: any[]) {
		this.data = dataFrom;
	}
}
