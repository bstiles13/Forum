import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  results = [];
  
  constructor(private http: Http) {}
    
  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('/threads').subscribe(data => {
      // Read the result field from the JSON response.
      // this.results = data['results'];
      this.results = JSON.parse(data['_body']);
      console.log(this.results);
    });
  }

}
