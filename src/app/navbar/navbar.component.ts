import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;
  user = null;

  constructor(){}
  
  ngOnInit() {
    var local = localStorage.getItem('currentUser');
    if (local != null && local != 'null') {
      console.log(localStorage.getItem('currentUser'));
      console.log(local);
      this.loggedIn = true;
      this.user = local;
    }
  }

  logout() {
    localStorage.setItem('currentUser', null);
    this.loggedIn = false;
    this.user = null;
    console.log(window.location.href);
    if (window.location.href === 'http://localhost:9000/') {
      console.log('true');
      location.reload();
    } else {
      window.location.replace('/');
    }
  }
  
}
