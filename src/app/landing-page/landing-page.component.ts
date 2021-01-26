import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { yearsBtn, launchBtn } from '../constant/button.constant';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  yearButtons: any = yearsBtn;
  launchButtons: any = launchBtn;
  spacePrograms: any = [];
  paramsObj: any = {};
  selectedYear: any;
  selectedLaunch: any;
  selectedLand: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRequest(this.paramsObj).subscribe((data: any[]) => {
      this.spacePrograms = this.getFilteredData(data);
    });
  }

  getYear(val) {
    if (this.selectedYear === val) {
      this.selectedYear = null;
      // this.paramsObj = {};
      delete this.paramsObj['launch_year'];
      this.dataService.getRequest(this.paramsObj).subscribe((data: any[]) => {
        this.spacePrograms = this.getFilteredData(data);
      });
    } else {
      this.selectedYear = val;
      this.paramsObj['launch_year'] = val;
      this.dataService.getRequest(this.paramsObj).subscribe((data: any[]) => {
        this.spacePrograms = this.getFilteredData(data);
      });
    }
  }

  getLaunch(val) {
    if (this.selectedLaunch === val) {
      this.selectedLaunch = null;
      // this.paramsObj = {};
      delete this.paramsObj['launch_success'];
      this.dataService.getRequest(this.paramsObj).subscribe((data: any[]) => {
        this.spacePrograms = this.getFilteredData(data);
      });
    } else {
      this.selectedLaunch = val;
      this.paramsObj['launch_success'] = val.toLowerCase();
      this.dataService.getRequest(this.paramsObj).subscribe((data: any[]) => {
        this.spacePrograms = this.getFilteredData(data);
      });
    }
  }

  getLand(val) {
    if (this.selectedLand === val) {
      this.selectedLand = null;
      // this.paramsObj = {};
      delete this.paramsObj['land_success'];
      this.dataService.getRequest(this.paramsObj).subscribe((data: any[]) => {
        this.spacePrograms = this.getFilteredData(data);
      });
    } else {
      this.selectedLand = val;
      this.paramsObj['land_success'] = val.toLowerCase();
      this.dataService.getRequest(this.paramsObj).subscribe((data: any[]) => {
        this.spacePrograms = this.getFilteredData(data);
        console.log("this.spacePrograms",this.spacePrograms);
        
      });
    }
  }

  getFilteredData(array) {
    return array.map((val) => ({
      flight_No: val.flight_number,
      mission_name: val.mission_name,
      launch_success: val.launch_success,
      launch_land: val.rocket.first_stage.cores[0].land_success,
      mission_id: val.mission_id,
      launch_year: val.launch_year,
      logo: val.links.mission_patch_small
    }));
  }

}