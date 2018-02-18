import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TasksComponent }       from './tasks/tasks.component';
import { TaskDetailComponent }  from './task-detail/task-detail.component';
import { AddTaskComponent }     from './add-task/add-task.component';
import { UpdateTaskComponent }  from './update-task/update-task.component';
import { DeleteTaskComponent }  from './delete-task/delete-task.component';

 
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'task-detail/:id', component: TaskDetailComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'update-task', component: UpdateTaskComponent },
  { path: 'delete-task', component: DeleteTaskComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}