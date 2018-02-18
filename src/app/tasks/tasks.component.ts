import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
tasks: Task[];closeResult: string;
  newTask: Task = new Task();
  editing: boolean = false;
  editingTask: Task = new Task();
 currentTask: Task = new Task();
statusMessage: string;
  constructor(private taskService: TaskService,private modalService: NgbModal) { }
 
  open(content:any, task:Task) {
	  console.log(task);
	   this.currentTask = task;
	   
    this.modalService.open(content).result.then((result) => {
this.updateTask(task);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.getTasks();
  }
 
  getTasks(): void {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks);
  }
  
        showInfo(task) {
        this.currentTask = task;
    
    }
	
   deleteTask(id: number): void {
   console.log('delete request'+id);
    this.taskService.deleteTask(id)
    .then(() => {
      this.tasks = this.tasks.filter(task => task.id != id);
    });
   }
  
     updateTask(taskData: Task): void {
    console.log(taskData);
    this.taskService.updateTask(taskData)
    .then(updatedTask => {
      let existingTask = this.tasks.find(task => task.id === updatedTask.id);
      Object.assign(existingTask, updatedTask);
      this.clearEditing();
    });
	 //this.statusMessage = 'Record Updated Successfully.';
  }

  toggleCompleted(taskData: Task): void {
    taskData.completed = !taskData.completed;
    this.taskService.updateTask(taskData)
    .then(updatedTask => {
      let existingTask = this.tasks.find(task => task.id === updatedTask.id);
      Object.assign(existingTask, updatedTask);
    });
  }

  editTask(taskData: Task): void {
    this.editing = true;
    Object.assign(this.editingTask, taskData);
  }

  clearEditing(): void {
    this.editingTask = new Task();
    this.editing = false;
  }
  
}


