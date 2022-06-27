import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanLoadGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthPageModule) },
  {
    path: 'courses',
    children: [
        {
          path: '',
          loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule),
          canLoad: [CanLoadGuard]
        },
        {
          path: ':id',
          loadChildren: () => import('./courses/course-detail/course-detail.module').then( m => m.CourseDetailPageModule),
          canLoad: [CanLoadGuard]
        }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
