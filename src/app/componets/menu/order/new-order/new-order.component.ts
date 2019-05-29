import { Component, OnInit } from '@angular/core';
import { AppEnumerations } from '../../../../models/AppEnumerations'
import { FormBuilder, FormGroup } from '@angular/forms'
import { PatientEntity } from '../../../../models/patient.model'
import { OrderEntity } from '../../../../models/order.model'
import { PostService } from '../../../../services'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog, MatDialogConfig,MatButton,MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
  providers:[PostService]
})
export class NewOrderComponent implements OnInit {
    
  public TypeOrder =AppEnumerations.EnumTools.EnumToArray(AppEnumerations.Enumerations.TypeOrder);// [{id:1, value:"Medicamentos"},{id:2, value:"Dietas"},{id:3, value:"Mezclas"},{id:4, value:"OrdenesGenerales"},{id:5, value:"Materiales"}];
  public Priority =AppEnumerations.EnumTools.EnumToArray(AppEnumerations.Enumerations.Priority);// [{id:1, value:"Alta"},{id:2, value:"Media"},{id:3, value:"Baja"}];
  public State = AppEnumerations.EnumTools.EnumToArray(AppEnumerations.Enumerations.State); //[{id:1, value:"Ordenado"},{id:2, value:"Cancelado"},{id:3, value:"Suministrado"}];
  public order: FormGroup
  public PatientEntity:PatientEntity[]=[];
  public IsUpdate:boolean=false;
  public OrderEntity:OrderEntity;
  public dataOrder: any
  public title:string= "Crear Ordern";
  public error:string;

  constructor(public fb: FormBuilder,
    private Service:PostService,
    public dialogRef: MatDialogRef<any>,) { 
    this.Service.getPatient().subscribe(post => {
      this.PatientEntity=post;
      this.OrderEntity=new OrderEntity();
     })
  }

  ngOnInit() {
    this.dataOrder = this.dialogRef._containerInstance._config.data;
 
   
    if(this.dataOrder.IsUpdate){
      this.dataOrder.PacientName
      this.IsUpdate=true;
      this.title='Modificar Ordern';
    
      var objorder=new OrderEntity();
      objorder.OrderID=this.dataOrder.OrderID;
      
                        

    }


    this.createForm();
  }
  

  public createForm(): void {

		try {
			this.order = this.fb.group({
				typeOrder: [{
					
			
        }],
        priority: [{
					
			
        }],
        patient:[{
				
			
        }],
        priorityupdate:[{value: this.dataOrder.Priority }],
        stateUpdate:[{value: this.dataOrder.State }],
        stateCreate:{ value: "Creada",disabled: true},
        pacienteUpdate:{value:this.dataOrder.PacientName+" "+this.dataOrder.PacientLastName,disabled: true},
        posologia:[{ value: "",disabled: false}],
        description:[{ value: "",disabled: false}],
        reason:[{ value: "",disabled: false}]
			});
		}
		catch (error) {

		}
  }
  
  public changeTypeOrder($event): void {

    this.OrderEntity.OrderType=	this.order.get('typeOrder').value;
    console.log(this.OrderEntity.State);

  }
  
  public changePatient($event): void {

  
    this.OrderEntity.PatientID =this.order.get('patient').value.PatientID;//	;
    //this.order.get('patient').value.PatientID

  }

  public blurDescription($event): void {

    this.OrderEntity.Description=	this.order.get('description').value;

  }

  

  public changePriority($event): void {

    this.OrderEntity.Priority=	this.order.get('priority').value;

  }
  
  public blurPosologia($event): void {

    this.OrderEntity.Posology=	this.order.get('posologia').value;

  }
  public changeState($event): void {

    this.OrderEntity.State=	this.order.get('stateUpdate').value;

  }

  public blurreason($event): void {

    this.OrderEntity.ReasonChange=	this.order.get('reason').value;

  }
  
  
  
  public createOrder($event): void {

    this.OrderEntity.State=this.State[0];
    if( this.OrderEntity.OrderType==undefined || this.OrderEntity.Priority==undefined || this.OrderEntity.Description==undefined || this.OrderEntity.Posology==undefined)
    {
      this.error="Debe seleccionar todos los campos ";
      return;
    }
    this.Service.createOrder(this.OrderEntity).subscribe(post => {
      this.cancelar();
     })
  }

  public modifyOrder($event): void {
    this.OrderEntity.OrderID=this.dataOrder.OrderID;
    if( this.OrderEntity.State==undefined || this.OrderEntity.ReasonChange==undefined )
    {
      this.error="Debe seleccionar todos los campos ";
      return;
    }
    this.Service.updateOrder(this.OrderEntity).subscribe(post => {
     this.cancelar();
     })
  }
  

  public cancelar(): void {

		this.dialogRef.close()
	}
}
