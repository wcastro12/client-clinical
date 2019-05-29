import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services'
import { GridOptions  } from 'ag-grid';
import { PatientEntity } from '../../../models/patient.model'
import { ipsModel } from '../../../models/ips.model'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers:[PostService]
})
export class PatientComponent implements OnInit {
  patientEntity:PatientEntity[];
  public gridOptions: GridOptions = {};
 
  constructor( private Service:PostService ) { 

    this.Service.getPatient().subscribe(post => {
     this.patientEntity=post;
    })
  }

  ngOnInit() {


    
    this.gridOptions = {
			rowSelection: 'single',
			enableColResize: true,
			enableRangeSelection: true,
			suppressHorizontalScroll: false,
			rowData: this.patientEntity,
			animateRows: true,
			enableStatusBar: false,
			columnDefs: [
  {
    headerName: "Name",
    field: "Name",
    width: 150,
    colId: "IdName"
  },
  {
    headerName: "LastName",
    field: "LastName",
    width: 150,
    colId: "IdLastName"
  },
  {
    headerName: "Document",
    field: "Document",
    width: 150,
    colId: "IdDocument"
  },
  {
    headerName: "IPS",
    field: "Ips.Name",
    width: 150,
    colId: "IpsID"
  }
  ,
  {
    headerName: "Historia",
    field: "History",
    width: 250,
    colId: "HistoryID"
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
    this.gridOptions.api.setRowData(this.patientEntity);
  


}

}

// class PatientEntity{
//   Document:string;
//   History:string;
//   IpsID:string;
//   LastName:string;
//   Name:string;
//   PatientID:number;
//   Ips:{ IpsID: number; Name: string;};

//   constructor() {}
// }

