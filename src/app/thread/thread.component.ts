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
  topic = [];

  newReply = {
    user: '',
    reply: '',
    topicId: null,
    threadId: null
  }

  deleteReplyId: number;

  constructor(private route: ActivatedRoute, private http: Http) {}
  
  ngOnInit() {
    this.newReply.user = localStorage.getItem('currentUser');
    this.getThread();
    this.getTopic();    
    this.loggedIn();
  }

  getThread() {
    this.route.queryParams.subscribe(params => {
      this.id = params.topic;
      this.newReply.topicId = params.topic;      
      this.newReply.threadId = params.id;
      this.http.get('/thread/' + this.newReply.threadId).subscribe(data => {
        this.results = JSON.parse(data['_body']);
          this.http.get('reply/' + this.newReply.threadId).subscribe(reply => {
            this.replies = JSON.parse(reply['_body']);
          })        
      });
    });
  }

  getTopic() {
    this.http.get('/onetopic/' + this.id).subscribe(data => {
      this.topic = JSON.parse(data['_body']);     
    });
  }

  submitReply() {
    this.http.post('/newreply', this.newReply).subscribe( data => {
      this.getThread();
    });
  }

  stageDelete(id) {
    this.deleteReplyId = id;
  }

  deleteReply() {
    this.http.post('/deletereply', {id: this.deleteReplyId}).subscribe( data => {
      this.getThread();
    })
  }

  loggedIn() {
    if (this.newReply.user != '' && this.newReply.user != 'null' && this.newReply.user != null && this.newReply.user != undefined) {
      return true;
    }
  }

}
