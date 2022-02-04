import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: ((res: Employee[]) => this.employees = res),
      error: ((error: HttpErrorResponse) => console.log(error.message))
    });
  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: ((res: Employee) => {
        console.log(res);
        this.getEmployees();
        addForm.reset();
      }),
      error: ((err: HttpErrorResponse) => {
        alert(err.message);
        addForm.reset();
      })
    });
  }

  public onUpdateEmployee(employee: Employee): void{
    this.employeeService.updateEmployee(employee).subscribe({
      next: ((res: Employee) => {
        console.log(res);
        this.getEmployees();
      }),
      error: ((err: HttpErrorResponse) => alert(err.message))
    });
  }

  public onDeleteEmployee(employee: Employee): void{
    let id = employee.id;
    this.employeeService.deleteEmployee(id).subscribe({
      next: ((res: void) => {
        console.log(res);
        this.getEmployees();
      }),
      error: ((err: HttpErrorResponse) => alert(err.message))
    });
  }

  public searchEmployees(key: string): void{
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
    || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employee)
      }
    }
    this.employees = results;
    if(results.length === 0 || !key){
      this.getEmployees();
    }
  }

  public onOpenModal(employee: any, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    } 
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  
  

}
