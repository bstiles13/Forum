import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  results = []

  constructor(private http: Http) { }

  ngOnInit(): void {
    // Make the HTTP request:
    this.getTopics();
  }

  getTopics() {
    this.http.get('/topics').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = JSON.parse(data['_body']);
      console.log(this.results);
    });
  }

}
