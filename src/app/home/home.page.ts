import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchSession } from '../model/batch-session';
import { Batch } from '../model/batch';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  elementType: 'url' | 'canvas' | 'img' = 'img';
  value: string;
  batchCode: string;
  date: string = new Date().getDate().toString();
  time: string = new Date().getTime().toString();

  batches: Batch[];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService ) {
    console.log(this.route.queryParams);
    this.route.queryParamMap.subscribe(
      (paramMap) => {
        const empCode = paramMap.get('empCode');
        console.log(empCode);
        employeeService.batches(empCode).subscribe(
        (batches) => {
            this.batches = batches;
            console.log(batches);
      });
      }
    );
  }

  generate() {
    this.value = (this.batchCode + this.date + this.time);
    const batchSession = new BatchSession();
    batchSession.attedanceCode = this.value;
    batchSession.sessionId  = '1.4';
    batchSession.batch = new Batch();
    batchSession.batch.batchCode = this.batchCode;

    let batchSessions: BatchSession[] = [];
    batchSessions.push(batchSession);

    this.employeeService.activate(batchSessions);
  }
}
