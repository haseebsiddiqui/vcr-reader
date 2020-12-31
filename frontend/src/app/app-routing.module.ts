import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllComponent} from './all/all.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {HomeComponent} from './home/home.component';
import {AddFeedComponent} from './add-feed/add-feed.component';
import {AboutComponent} from './about/about.component';
import {PreviewFeedComponent} from './preview-feed/preview-feed.component';
import {RemoveFeedComponent} from "./remove-feed/remove-feed.component";
import {SlackSettingsComponent} from "./slack-settings/slack-settings.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', redirectTo: 'home/about', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'all_articles', component: AllComponent},
      {path: 'favorites', component: FavoritesComponent},
      //{path: 'add', component: AddComponent},
      {path: 'add_feed', component: AddFeedComponent},
      {path: 'remove_feed', component: RemoveFeedComponent},
      {path: 'about', component: AboutComponent},
      {path: 'preview_feed', component: PreviewFeedComponent},
      {path: 'slack_settings', component: SlackSettingsComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
