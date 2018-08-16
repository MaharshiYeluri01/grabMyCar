import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment.prod';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatSelectModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppComponent } from './app.component';
import { ridesService } from './services/posts.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { AddComponent } from './add/add.component';
import { RetriveRidesService } from './services/retrive-rides.service';
import { InfoComponent } from './info/info.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth-guard.service';
import { CardComponent } from './card/card.component';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { BookRideComponent } from './card/book-ride/book-ride.component';
import { GetRideService } from './services/get-ride.service';
import { StatusComponent } from './status/status.component';
import { SearchComponent } from './search/search.component';
import { ViewrideComponent } from './viewride/viewride.component';
import { UiComponent } from './ui/ui.component';
import { UserRequestsService } from './services/user-requests.service';
import { UsersService } from './services/users.service';
import { MyErrorHandler } from './my-error-handler.service';
import { NotFoundComponent } from './not-found/not-found.component';




const appRoutes: Routes = [
  { path: '', component: SearchComponent,canActivate:[AuthGuard]},
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'dashboard', component: DasboardComponent ,canActivate:[AuthGuard]},
  { path: 'add', component: AddComponent,canActivate:[AuthGuard]},
  { path: 'bookride/:id', component: BookRideComponent,canActivate:[AuthGuard]},
  { path: 'status', component: StatusComponent,canActivate:[AuthGuard]},
  { path: 'status/:id', component:ViewrideComponent ,canActivate:[AuthGuard]},

  { path: 'info', component: InfoComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DasboardComponent,
    AddComponent,
    InfoComponent,
    CardComponent,
    TimestampPipe,
    BookRideComponent,
    StatusComponent,
    SearchComponent,
    ViewrideComponent,
    UiComponent,
    NotFoundComponent,
   
  
  ],
  imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
   AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatTabsModule,
    AngularFireStorageModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireDatabaseModule,
    MatBadgeModule,
    NgbModule.forRoot(),
    MatCheckboxModule



  ],
 
  providers: [ridesService,
    GetRideService,
    UserRequestsService,UsersService,ridesService,
  RetriveRidesService,AuthService,AuthGuard,
  {provide: ErrorHandler, useClass: MyErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
