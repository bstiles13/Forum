import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  id: number;
  topic = [];
  user = '';
  results = [];
  deleteThreadId: number;
  
  constructor(private route: ActivatedRoute, private http: Http) {}
  
  ngOnInit(): void {
    // Make the HTTP request:
    this.user = localStorage.getItem('currentUser');    
    this.getHistory();
  }

  getHistory() {
    this.route.params.subscribe(params => {
      this.id = params['number?'];
      this.http.get('/threads/' + this.id).subscribe(data => {
        this.results = JSON.parse(data['_body']);
        this.getTopic(); 
      });
    });
  }

  getTopic() {
    this.http.get('/onetopic/' + this.id).subscribe(data => {
      this.topic = JSON.parse(data['_body']);     
    });
  }

  stageDelete(id) {
    this.deleteThreadId = id;
  }

  deleteThread() {
    this.http.post('/deletethread', {id: this.deleteThreadId}).subscribe( data => {
      this.getHistory();
    })
  }

}
