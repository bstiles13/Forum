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

  invalidUser = {
    toggle: false,
    warning: 'Username and/or password is incorrect.'
  }

  invalidName = {
    toggle: false,
    warning: 'Username already exists.'
  }

  invalidPassword = {
    toggle: false,
    warning: "Passwords do not match."
  }

  invalidInput = {
    toggle: false,
    warning: "One or more field are incomplete. Please try again."
  }

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    var local = localStorage.getItem('currentUser');
    if (local != null) {
      this.user = local;
    }

  }

  loginExisting() {
    this.clearWarnings();
    if (this.existingUser.username == '' || this.existingUser.password == '') {
      this.invalidInput.toggle = true;
    } else {
      // Make the HTTP request:
      this.http.post('/existinguser', this.existingUser).subscribe(data => {
        // Read the result field from the JSON response.
        let result = JSON.parse(data['_body']);
        if (result) {
          this.loggedIn(this.existingUser.username);
        } else {
          this.invalidUser.toggle = true;
        }
      });
    }
  }

  loginNew() {
    this.clearWarnings();
    if (this.newUser.password1 != this.newUser.password2) {
      this.invalidPassword.toggle = true;
    } else if (this.newUser.password1 == '') {
      this.invalidInput.toggle = true;
    } else {
      // Make the HTTP request:
      this.http.post('/newuser', this.newUser).subscribe(data => {
        // Read the result field from the JSON response.
        let result = JSON.parse(data['_body']);
        if (result) {
          this.loggedIn(this.newUser.username);
        } else {
          this.invalidName.toggle = true;
        }
      });
    };
  }

  loggedIn(user) {
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
    this.loggedIn('Anonymous');
  }

  clearWarnings() {
    this.invalidUser.toggle = false;
    this.invalidName.toggle = false;
    this.invalidPassword.toggle = false;
    this.invalidInput.toggle = false;
  }

}
