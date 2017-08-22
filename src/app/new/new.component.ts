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
    title: '',
    message: '',
  }

  constructor(private router: Router, private http: Http) {}
  
  ngOnInit() {
    this.thread.user = localStorage.getItem('currentUser');
    console.log(this.thread.user);
  }

  submitThread() {
    this.http.post('/newthread', this.thread).subscribe( data => {
      let result = JSON.parse(data['_body']);
      this.router.navigate(['/']);
    });
  }

}
