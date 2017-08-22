import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  id: number;
  results = [];
  replies = [];

  newReply = {
    user: '',
    reply: '',
    id: null
  }

  constructor(private route: ActivatedRoute, private http: Http) {}
  
  ngOnInit() {
    this.newReply.user = localStorage.getItem('currentUser');
    this.getThread();
  }

  getThread() {
    this.route.params.subscribe(params => {
      this.id = params['number?'];
      this.newReply.id = params['number?'];
      console.log(this.id);
      this.http.get('/thread/' + this.id).subscribe(data => {
        this.results = JSON.parse(data['_body']);
        console.log(this.results);
          this.http.get('reply/' + this.id).subscribe(reply => {
            this.replies = JSON.parse(reply['_body']);
          })        
      });
    });
  }

  submitReply() {
    console.log('submitted');
    this.http.post('/newreply', this.newReply).subscribe( data => {
      this.getThread();
    });
  }

}
