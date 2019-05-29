import { Component, OnInit,Input } from '@angular/core';
import { OrderEntity } from '../../../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
@Input() orderDetail:OrderEntity;
  constructor() { }

  ngOnInit() {
  }

}
