import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent } from './app.component';
import { TaskService } from './task.service';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TasksComponent }       from './tasks/tasks.component';
import { TaskDetailComponent }  from './task-detail/task-detail.component';
import { AddTaskComponent }     from './add-task/add-task.component';
import { UpdateTaskComponent }  from './update-task/update-task.component';
import { DeleteTaskComponent }  from './delete-task/delete-task.component';

import { AppRoutingModule } from './app.routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
	HttpModule,
	AppRoutingModule,
	NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
   
    DashboardComponent,
	TasksComponent,
	TaskDetailComponent,
	AddTaskComponent,
	UpdateTaskComponent,
	DeleteTaskComponent
  ],
   providers: [TaskService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

