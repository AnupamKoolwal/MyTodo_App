import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewtaskComponent } from './components/viewtask/viewtask.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { CompletedtaskComponent } from './components/completedtask/completedtask.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { IncompletedtaskComponent } from './components/incompletedtask/incompletedtask.component';
import { ArchievedComponent } from './components/archieved/archieved.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { EdittaskComponent } from './components/edittask/edittask.component';
import { ViewnotificationComponent } from './components/viewnotification/viewnotification.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    ViewtaskComponent,
    AddtaskComponent,
    CompletedtaskComponent,
    IncompletedtaskComponent,
    ArchievedComponent,
    SearchbarComponent,
    EdittaskComponent,
    ViewnotificationComponent,
    ForgetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,FormsModule,MatSnackBarModule,MatTooltipModule,MatBadgeModule,MatPaginatorModule,
    NgxPaginationModule,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
