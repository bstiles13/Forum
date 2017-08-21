import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  results = [];

  existingUser = {
    email: '',
    password: '',
  }

  newUser = {
    email: '',
    password1: '',
    password2: ''
  }

  constructor(private http: Http) { }

  ngOnInit() {

  }

  loginExisting() {
    console.log(this.existingUser);
    // Make the HTTP request:
    this.http.post('/existinguser', this.existingUser).subscribe(data => {
    // Read the result field from the JSON response.
    this.results = JSON.parse(data['_body']);
    console.log(this.results);
  });
  }

  loginNew() {
    console.log(this.newUser);
    // Make the HTTP request:
    this.http.post('/newuser', this.newUser).subscribe(data => {
    // Read the result field from the JSON response.
    this.results = JSON.parse(data['_body']);
    console.log(this.results);
    });
  }

  loginGuest() {
    
  }

}
