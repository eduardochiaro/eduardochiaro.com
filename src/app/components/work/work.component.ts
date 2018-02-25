import { Component, OnInit } from '@angular/core';
import { PastworkService } from '../../services/pastwork.service';


//model
import { Company } from '../../models/company';

@Component({
	selector: 'app-work',
	templateUrl: './work.component.html',
	styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
	bgClass: string = "none";
	pastWorks: any[] = [];
	toggle: string = "tooltip";

	constructor(private pastworkService: PastworkService) { }
		

		ngOnInit() {
			this.pastworkService.getPastWork().subscribe(
				works => {
				this.showWork(works);
				}
			);
		}

	showWork(works: any[]) {

		works.forEach(element => {
		var work = new Company(
				element.name,
				element.logo,
				element.style,
				element.special,
				element.disclaimer
			);

			this.pastWorks.push(work);
		});
	}
	
	over(img: string){
	// this.bgClass = img;
	}
}