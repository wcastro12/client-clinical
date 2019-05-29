import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {OrderEntity} from '../app/models/order.model'
import {  Observable} from 'rxjs/';
import { AppEnumerations } from './models/AppEnumerations'
import { environment } from '../environments/environment'
@Injectable()
export class PostService{
   private api_url:string=environment.PIXABAR_API_URL;
   private api_key:string=environment.PIXABAR_API_KEY;
   private full_url:string=this.api_url+this.api_key+'&q='
   private parPage:string='&per_page=10'

constructor( private http:Http){

}

getOrdes():Observable<Array<OrderEntity>>{

   return this.http.get('http://localhost:51636/api/OrderApi').map(this.handlerorder); 
}
handlerorder(res:any):Array<OrderEntity>{
console.log(res.json())
   const AllOrder: Array<OrderEntity> = new Array<OrderEntity>();
   res.json().forEach( order => {
      var orderobje=new OrderEntity();
      orderobje.OrderID =order.OrderID
      orderobje.OrderType = AppEnumerations.EnumTools.EnumToString(AppEnumerations.TypeOrder,order.OrderType)
      orderobje.Description =order.Description
      orderobje.Priority = AppEnumerations.EnumTools.EnumToString(AppEnumerations.Priority,order.Priority)
      orderobje.State =AppEnumerations.EnumTools.EnumToString(AppEnumerations.State,order.State) 
      orderobje.Posology=order.Posology
      orderobje.Patient=order.Patient
      AllOrder.push(orderobje)
   })
return AllOrder;
}

getPatient(){

   return this.http.get('http://localhost:51636/api/PatientAPI').map(res => res.json()); 
}
createOrder(Order:OrderEntity){

   return this.http.post('http://localhost:51636/api/OrderApi',Order); 
}

updateOrder(Order:OrderEntity){

   return this.http.put('http://localhost:51636/api/OrderApi/',Order); 
}

getimages(query:string){

   return this.http.get(this.full_url+query+this.parPage).map(res => res.json()); 
}

}