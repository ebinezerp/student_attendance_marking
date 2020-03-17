import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {

  employee: Employee;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.employee = new Employee();
  }

  submitted() {
    this.employeeService.login(this.employee).subscribe(
      (data) => {
        this.router.navigate(['/home/qrscreen'], { queryParams: { empCode: data.empCode }});
      },
      (error) => {
        console.log(error);
        alert('invalid credentails');
      }
    );
  }
}
