 import {PatientEntity} from './patient.model'
 import {ipsModel} from './ips.model'
 import { AppEnumerations} from './AppEnumerations'
 
 export class OrderEntity{
    OrderID:number;
    OrderType:any;
    Description:string;
    Priority:any;
    State:any;
    Posology:string;
    Ips:ipsModel;
    DateOrder:any;
    Patient:any;
    PatientID:number;
    ReasonChange:string;
   constructor() {}

 }