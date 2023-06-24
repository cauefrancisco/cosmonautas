import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/components/layout/main-layout/main-layout.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FullPostComponent } from './pages/blog/components/full-post/full-post.component';
import { CreatePostComponent } from './pages/home/components/create-post/create-post.component';
import { LoginComponent } from './pages/login/login.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'blog',
        children: [
          { path: '', component: BlogComponent },
          { path: 'post/:id', component: FullPostComponent }
        ]
      },
      { path: 'create', component: CreatePostComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
