import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  thread = {
    user: '',
    topic: null,
    title: '',
    message: '',
  }

  topics = [];

  constructor(private router: Router, private http: Http) {}
  
  ngOnInit() {
    this.thread.user = localStorage.getItem('currentUser');
    this.getTopics();
  }

  getTopics() {
    this.http.get('/topics').subscribe(data => {
      // Read the result field from the JSON response.
      this.topics = JSON.parse(data['_body']);
    });
  }

  submitThread() {
    this.http.post('/newthread', this.thread).subscribe( data => {
      let result = JSON.parse(data['_body']);
      this.router.navigate(['/thread'], { queryParams: { topic: this.thread.topic, id: result.insertId } });      
    });
  }

}
