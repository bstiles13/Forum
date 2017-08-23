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
      this.loggedIn = true;
      this.user = local;
    }
  }

  logout() {
    localStorage.setItem('currentUser', null);
    this.loggedIn = false;
    this.user = null;
    if (window.location.href === 'http://localhost:9000/') {
      location.reload();
    } else {
      window.location.replace('/');
    }
  }
  
}
