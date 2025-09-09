import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { UtilsService } from '../../services/utils.service';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-user',
  imports: [ NgIf, MatButtonModule, MatCardModule, MatTableModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public displayedColumns: string[] = ['title', 'status', 'startDate', 'pricePerTicket', 'rating', 'actions'];
  public user : UserModel | null = null

  constructor(private router: Router, public utils: UtilsService){
    if(!UserService.getActiveUser()){
      router.navigate(['/home'])
      return
    }
    
    this.user = UserService.getActiveUser()
  }

  public doPay(order : OrderModel){
    if(UserService.changeOrderStatus('paid', order.id)){
      this.user = UserService.getActiveUser()
    }

  }

  public doCancel(order: OrderModel) {
    if (UserService.changeOrderStatus('canceled', order.id)) {
      if (this.user) {
        this.user.orders = this.user.orders.filter(o => o.id !== order.id);
      }
    }
}

}
