import { Component,Input, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  tasks: Task[];
  newTask: Task = new Task();
  editing: boolean = false;
  editingTask: Task = new Task();
  currentTask: Task = new Task();
  statusMessage: string;
  
  constructor(
  private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }
  
  showInfo(task) {
    this.currentTask = task;
  }
    getTasks(): void {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks );    
  }

  createTask(taskForm: NgForm): void {
    this.taskService.createTask(this.newTask)
      .then(createTask => {        
        taskForm.reset();
        this.newTask = new Task();
        this.tasks.unshift(createTask)
      });
	   this.statusMessage = 'Record Added Successfully.';
  }
  
   deleteTask(id: number): void {
    this.taskService.deleteTask(id)
    .then(() => {
      this.tasks = this.tasks.filter(task => task.id != id);
    });
	 this.statusMessage = 'Record Deleted Successfully.';
  }

  updateTask(taskData: Task): void {
    console.log(taskData);
    this.taskService.updateTask(taskData)
    .then(updatedTask => {
      let existingTask = this.tasks.find(task => task.id === updatedTask.id);
      Object.assign(existingTask, updatedTask);
      this.clearEditing();
    });
	 this.statusMessage = 'Record Updated Successfully.';
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


