import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule } from '@angular/material/card';
import {MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatMenuModule } from '@angular/material/menu';
import {MatTableModule } from '@angular/material/table';
import {MatSortModule } from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';


import {MatSelectModule } from '@angular/material/select';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule } from '@angular/material/list';
import {FormsModule } from '@angular/forms';

const MatModuller =   [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatCardModule,
  MatToolbarModule,
  MatDialogModule,
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatTableModule,
  MatSortModule,
  FormsModule,
  MatProgressBarModule,
  ClipboardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatExpansionModule
  
];

@NgModule({
  imports: [MatModuller],
  exports: [MatModuller]
})
export class MaterialModule { }
