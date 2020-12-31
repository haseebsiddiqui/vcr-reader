import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AllComponent} from './all/all.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {AddFeedComponent} from './add-feed/add-feed.component';
import {AboutComponent} from './about/about.component';
import {HttpClientModule} from '@angular/common/http';
import {PreviewFeedComponent} from './preview-feed/preview-feed.component';
import {RemoveFeedComponent} from './remove-feed/remove-feed.component';
import {SlackSettingsComponent} from './slack-settings/slack-settings.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {UserService} from './register/user.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    HttpClientModule,
    // MatAccordion,
    MatCardModule,
    MatExpansionModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AllComponent,
    FavoritesComponent,
    //AddComponent,
    AddFeedComponent,
    AboutComponent,
    PreviewFeedComponent,
    RemoveFeedComponent,
    SlackSettingsComponent,
    RegisterComponent,
    LoginComponent,
    // DialogOverviewExample,
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
