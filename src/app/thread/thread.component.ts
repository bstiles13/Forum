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

  constructor(private route: ActivatedRoute, private http: Http) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['number?'];
      console.log(this.id);
      this.http.get('/thread/' + this. id).subscribe(data => {
        this.results = JSON.parse(data['_body']);
        console.log(this.results);
      });
    });
  }

}
