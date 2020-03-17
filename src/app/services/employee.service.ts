import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable, Observer } from 'rxjs';
import { BatchSession } from '../model/batch-session';
import { Batch } from '../model/batch';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private batches: Batch[];


  constructor(private httpClient: HttpClient) {}

  setBatches(batches: Batch[]): void {
    this.batches = batches;
  }
  
  getBatches(): Batch[] {
    return this.batches;
  }

  login(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>( SERVER_URL + '/login/faculty', employee);
  }

  getBatchesByFaculty(empCode: string): Observable<Batch[]> {
    return this.httpClient.get<Batch[]>( SERVER_URL + '/faculty/' + empCode + '/batches');
  }

  activate(batchSessions: BatchSession[], batchCode: string ): Observable<boolean> {
    console.log(batchSessions);
    return this.httpClient.post<boolean>( SERVER_URL + '/faculty/activate', batchSessions,{
      params: {
        batchCode: batchCode
      }
    });
  }

}
