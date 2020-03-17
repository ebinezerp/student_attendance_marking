import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Batch } from '../model/batch';
import { EmployeeService } from '../services/employee.service';
import { SessionLocation } from '../model/session-location';
import { Location } from '@angular/common';

@Component({
  selector: 'app-qr-generate-screen',
  templateUrl: './qr-generate-screen.component.html',
  styleUrls: ['./qr-generate-screen.component.scss'],
})
export class QrGenerateScreenComponent implements OnInit {

  elementType: 'url' | 'canvas' | 'img' = 'img';
  batch: Batch;
  value: string;
  date: string = new Date().getDate().toString();
  time: string = new Date().getTime().toString();
  sessionLocation = new SessionLocation();

  constructor(private activatedRoute: ActivatedRoute, private location: Location ,private employeeService: EmployeeService) {
    const batchCode = activatedRoute.snapshot.queryParamMap.get('batchCode');
    this.batch = employeeService.getBatches().find(batch => batch.batchCode === batchCode);
    this. value = this.batch.batchCode + this.date + this.time;
    console.log(this.value);
    const batchSessions = this.batch.batchSessions;
    console.log(batchSessions);
    this.setCurrentLocation();
    for (const batchSession of batchSessions) {
      batchSession.attendanceCode = this.value;
      batchSession.sessionLocation = this.sessionLocation;
    }
    console.log(batchSessions[0]);
    this.employeeService.activate(batchSessions, this.batch.batchCode).subscribe(
      (result) => {
        console.log(result);
        this.batch.batchSessions = this.batch.batchSessions.map(batch => {
          batch.triggerd = true;
          return batch;
        });
      }
    );
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      console.log('entered if');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.sessionLocation.latitude = position.coords.latitude;
        this.sessionLocation.longitude = position.coords.longitude;
      },
      (error) => {
        console.log(error);
      });
    }
  }

  ngOnInit() {}

  back() {
    this.location.back();
  }


}
