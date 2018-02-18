import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { Task }         from '../task';
import { TaskService }  from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
task: Task = new Task();
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
	  
    this.getTask();
  }

  getTask(): void {

    const id = +this.route.snapshot.paramMap.get('id');
		  
    this.taskService.getTask(id)
      .then(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }
}
