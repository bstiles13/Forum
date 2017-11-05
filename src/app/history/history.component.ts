import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  user = '';
  results = [];
  deleteThreadId: number;
  
  constructor(private http: Http) {}
    
  ngOnInit(): void {
    // Make the HTTP request:
    this.user = localStorage.getItem('currentUser');    
    this.getHistory();
  }

  getHistory() {
    this.http.get('/threads').subscribe(data => {
      // Read the result field from the JSON response.
      // this.results = data['results'];
      this.results = JSON.parse(data['_body']);
    });
  }

  stageDelete(id) {
    console.log(id);
    this.deleteThreadId = id;
  }

  deleteThread() {
    console.log("clicked");
    this.http.post('/deletethread', {id: this.deleteThreadId}).subscribe( data => {
      this.getHistory();
    })
  }

}
