import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

  course: Course;

  constructor(private activatedRoute: ActivatedRoute, private coursesSertvice: CoursesService, private route: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( param => {
      if(!param.has('id')){
        // redirect if no id is provided
        this.route.navigate(['/courses']);
        return;
      } 

      const courseId = param.get("id");
      this.course = this.coursesSertvice.getCourse(courseId);

    })
  }

}
