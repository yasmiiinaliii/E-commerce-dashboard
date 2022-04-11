import { Component, OnInit } from '@angular/core';
import {Order} from '@develop/orders'
import { OrdersService } from '@develop/orders';

export const ORDER_STATUS = {
  0: {
    label: 'Pending',
    color: 'primary'
  },
  1: {
    label: 'Confirmed',
    color: 'warning'
  },
  2: {
    label: 'Cancel',
    color: 'danger'
  },
};

@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})
export class OrderListComponent implements OnInit {
  orders : Order[] = []
  
  // orderStatus = "panding";
  // orderStatus = ORDER_STATUS;

  constructor( private orderService : OrdersService ) { }

  ngOnInit(): void {
    this._getOrders()
  }

  private _getOrders(){
    this.orderService.getOrders().subscribe(
      (orders) => { 
        this.orders = orders; 
        console.log(orders);
      }
    )
  }
}
