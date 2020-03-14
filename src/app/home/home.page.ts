import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchSession } from '../model/batch-session';
import { Batch } from '../model/batch';
import { EmployeeService } from '../services/employee.service';
import { SessionLocation } from '../model/session-location';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  value: string;
  batch: Batch;
  latitude: number;
  longitude: number;
  zoom: number;

  batches: Batch[];
  sessionLocation: SessionLocation;

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService ) {
    console.log(this.route.queryParams);
    this.route.queryParamMap.subscribe(
      (paramMap) => {
        const empCode = paramMap.get('empCode');
        console.log(empCode);
        employeeService.getBatchesByFaculty(empCode).subscribe(
        (batches) => {
            employeeService.setBatches(batches);
            this.batches = batches;
            console.log(batches);
      });
      }
    );
  }


  ngOnInit() {
  }


  // generate(batchCode: string) {
  //   this.router.navigate(['/qrgenerated-screen', { batchCode : batchCode}] );
  // }
}
