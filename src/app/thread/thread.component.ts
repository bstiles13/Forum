import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
  encapsulation: ViewEncapsulation.None,
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
    threadId: null,
    quotedUser: '',
    quotedPost: ''
  }



  deleteReplyId: number;

  constructor(private route: ActivatedRoute, private http: Http) {}
  
  ngOnInit() {
    this.newReply.user = localStorage.getItem('currentUser');
    console.log(this.newReply.user);
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

  setQuote(poster, quote) {
    this.clearQuotes();
    let newQuote = '';
    let quoteTest = quote.split("<br/>");
    if (quoteTest.length > 1) {
      newQuote = quoteTest[1];
    } else {
      newQuote = quoteTest[0];
    }
    this.newReply.quotedUser = poster;
    this.newReply.quotedPost = newQuote;
  }

  submitReply() {
    this.http.post('/newreply', this.newReply).subscribe( data => {
      this.getThread();
      this.clearQuotes();      
    });
  }

  submitQuickReply() {
    this.newReply.quotedUser = '',
    this.newReply.quotedPost = ''
    this.http.post('/newreply', this.newReply).subscribe( data => {
      this.getThread();
      this.clearQuotes();      
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

  clearQuotes() {
    this.newReply.reply = ''
    this.newReply.quotedUser = '',
    this.newReply.quotedPost = ''
  }

  loggedIn() {
    if (this.newReply.user != '' && this.newReply.user != 'null' && this.newReply.user != null && this.newReply.user != undefined) {
      return true;
    }
  }

}
