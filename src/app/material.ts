import { MatCheckboxModule,MatToolbarModule,MatIconModule,MatMenuModule,MatButtonModule,MatListModule,
    MatLineModule,MatFormFieldModule, MatInputModule ,MatTabsModule, MatDialogModule,
    MatCardModule,MatSelectModule } from '@angular/material'
import { NgModule} from '@angular/core' 
import { MatGridListModule } from '@angular/material/grid-list'
import {MatExpansionModule} from '@angular/material/expansion'

@NgModule({
    imports:[MatCheckboxModule,MatToolbarModule,MatIconModule,MatMenuModule,MatFormFieldModule,
        MatButtonModule,MatListModule,MatLineModule,MatGridListModule,MatExpansionModule, MatInputModule,MatTabsModule,
        MatDialogModule,MatCardModule,MatSelectModule],

    exports:[MatCheckboxModule,MatToolbarModule,MatIconModule,MatMenuModule,MatFormFieldModule,
        MatButtonModule,MatListModule,MatLineModule,MatGridListModule,MatExpansionModule, MatInputModule,MatTabsModule,
        MatDialogModule,MatCardModule,MatSelectModule]
})

export class MaterialModule{}