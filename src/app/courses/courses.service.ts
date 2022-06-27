import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [
    {
      id: "1",
      name: "Web general knowledge",
      url: "https://medium.com/geekculture/2022-web-program-chapter-n-1-is-done-499fb0707220?source=your_stories_page----------------------------------------",
      imgUrl: "https://miro.medium.com/max/875/1*5xLI3IuQLEWPKbGbPg0xeg.gif",
    },
    {
      id: "2",
      name: "Web page skeleton",
      url: "https://medium.com/geekculture/your-html-essentials-69d9b2349355?source=your_stories_page----------------------------------------",
      imgUrl: "https://miro.medium.com/max/1400/1*bZnpFle3QfGm11NiY-QXOA.png",
    },
  ];

  constructor() { }

  getAllCourses() {
    return [...this.courses];
  }

  getCourse(id: string){
    return { ...this.courses.find(course => course.id === id) };
  }
  
}
