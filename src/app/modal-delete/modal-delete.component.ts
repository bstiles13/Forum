import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input('test') test: string;
  

}
