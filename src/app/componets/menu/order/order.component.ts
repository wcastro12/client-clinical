import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig,MatButton } from '@angular/material';
import { NewOrderComponent } from './new-order/new-order.component'
import { GridOptions  } from 'ag-grid';
import { PostService } from '../../../services'
import { OrderEntity } from '../../../models/order.model'
import { AppEnumerations } from '../../../models/AppEnumerations'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[PostService]
 
})
export class OrderComponent implements OnInit {
  public Orders:OrderEntity[]=[];
  public OrderSelect:OrderEntity;
  public gridOptions: GridOptions = {};
  public search:string;
  constructor(public dialog: MatDialog,
              private Service:PostService) { 

                this.Service.getOrdes().subscribe(post => {
                  this.Orders=post;

                  
                })
    

              }

  ngOnInit() {

    this.gridOptions = {
			rowSelection: 'single',
			enableColResize: true,
			enableRangeSelection: true,
			suppressHorizontalScroll: false,
			rowData: this.Orders,
			animateRows: true,
      enableStatusBar: false,
			columnDefs: [
  {
    headerName: "Id Orden",
    field: "OrderID",
    width: 100,
    colId: "OrderID"
  },
  {
    headerName: "Tipo",
    field: "OrderType",
    width: 150,
    colId: "IdOrderType"
  },
  {
    headerName: "Descripcion",
    field: "Description",
    width: 150,
    colId: "IdDescription"
  },
  {
    headerName: "Prioridad",
    field: "Priority",
    width: 150,
    colId: "IdPriority"
  }
  ,
  {
    headerName: "Estado",
    field: "State",
    width: 250,
    colId: "StateID"
  },
  {
    headerName: "Nombre Paciente",
    field: "Patient.Name",
    width: 250,
    colId: "IDName"
  }
  ,
  {
    headerName: "Apellido Paciente",
    field: "Patient.LastName",
    width: 250,
    colId: "IDLastName"
  }
],

			overlayNoRowsTemplate: ' ',
			toolPanelSuppressRowGroups: true,
			toolPanelSuppressValues: true,
			toolPanelSuppressPivots: true,
			toolPanelSuppressPivotMode: true
    };
  }
  public gridReady($event): void {

    this.gridOptions.api.showLoadingOverlay()
    this.gridOptions.api.setRowData(this.Orders);
    this.gridOptions.columnApi.setColumnVisible("OrderID", false)

}

  newOrder($event) : void {
    const config = new MatDialogConfig();
    config.data = {
    IsUpdate : false 
    }
 
    const dialogRef = this.dialog.open(NewOrderComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      setTimeout( () => { 

        this.Service.getOrdes().subscribe(post => {
          this.Orders=new Array<OrderEntity>();
          this.Orders=post;
          this.gridOptions.api.setRowData(this.Orders);
        })
        

      }, 1000 );
    });
  
  }

  public onCellDoubleClicked(event): void {

		try {
    const config = new MatDialogConfig();

			config.data = {
        IsUpdate : true,
				OrderID: event.data.OrderID,
        PacientName: event.data.Patient.Name,
        PacientLastName: event.data.Patient.Name,
        Priority: event.data.Priority,
        State: event.data.State
   
			}
			const dialogRef = this.dialog.open(NewOrderComponent, config);
			dialogRef.afterClosed().subscribe(result => {

        setTimeout( () => { 
            this.Service.getOrdes().subscribe(post => {
            this.Orders=post;
            this.gridOptions.api.setRowData(this.Orders);
          })
       
        }, 1000 );
      });
      
   

		}
		catch (error) {
		
		}

  }
  onSelect(order1:OrderEntity):void{

    this.OrderSelect =order1
  }
  onCellClicked(event):void {

   this.OrderSelect =this.gridOptions.api.getSelectedRows()[0];
 
  }
  searchgrid(){

    this.gridOptions.api.setQuickFilter(this.search);
  }
}
