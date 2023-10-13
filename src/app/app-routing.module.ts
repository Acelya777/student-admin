import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { FileUserComponent } from './file/file-user/file-user.component';
import { MenuComponent } from './menu/menu.component';
import { FileComponent } from './file/file.component';

const routes: Routes = [
  {
    path:'student',
    component:StudentComponent,
  },
  {
    path:'student/:id',
    component:ViewStudentComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'file/:id',
    component:FileComponent
  },
  {
    path:'user/:Id',
    component:FileUserComponent
  },
  {
    path:'menu',
    component:MenuComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
