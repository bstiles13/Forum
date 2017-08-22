import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = null;

  existingUser = {
    username: '',
    password: '',
  }

  newUser = {
    username: '',
    password1: '',
    password2: ''
  }

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    var local = localStorage.getItem('currentUser');
    console.log(localStorage.getItem('currentUser'));
    if (local != null) {
      console.log('logged in');
      this.user = local;
      console.log(this.user);
    }
    
  }

  loginExisting() {
    console.log(this.existingUser);
    // Make the HTTP request:
    this.http.post('/existinguser', this.existingUser).subscribe(data => {
    // Read the result field from the JSON response.
    let result = JSON.parse(data['_body']);
    console.log(result);
    if (result === 'success') {
      console.log('yup');
      this.loggedIn(this.existingUser.username);
    }
  });
  }

  loginNew() {
    console.log(this.newUser);
    // Make the HTTP request:
    this.http.post('/newuser', this.newUser).subscribe(data => {
    // Read the result field from the JSON response.
    let result = JSON.parse(data['_body']);
    console.log(result);
    });
  }

  loggedIn(user) {
    console.log(user);
    localStorage.setItem('currentUser', user);

    this.existingUser = {
      username: '',
      password: '',
    };

    this.newUser = {
      username: '',
      password1: '',
      password2: ''
    };
    window.location.replace('/')
  }

  loginGuest() {
    
  }

}
