import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatListModule, MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { WEB_DECLARATIONS, SERVICES_DECLARATIONS } from './web/index';

@NgModule({
  declarations: [
    AppComponent,
    ...WEB_DECLARATIONS,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [SERVICES_DECLARATIONS],
  bootstrap: [AppComponent]
})
export class AppModule { }
