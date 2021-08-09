import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { GroupComponent } from './group/group.component';
import { DetailRecipeComponent } from './detail-recipe/detail-recipe.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { InvitesComponent } from './invites/invites.component';
import { FriendsComponent } from './friends/friends.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { DetailGroupComponent } from './detail-group/detail-group.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GroupComponent,
    DetailRecipeComponent,
    AddRecipeComponent,
    NewGroupComponent,
    InvitesComponent,
    FriendsComponent,
    AllRecipesComponent,
    LeaderboardComponent,
    FavoritesComponent,
    AddFriendComponent,
    ProfileComponent,
    UploadComponent,
    DetailGroupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthorizeGuard] },
      { path: 'detail-recipe/:id', component: DetailRecipeComponent },
      { path: 'detail-group/:id', component: DetailGroupComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-group', component: GroupComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-new-group', component: NewGroupComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-invites', component: InvitesComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-friends', component: FriendsComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-leaderboard', component: LeaderboardComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-leaderboard', component: LeaderboardComponent, canActivate: [AuthorizeGuard] },
      { path: 'all-recipes', component: AllRecipesComponent },
      { path: 'app-leaderboard', component: LeaderboardComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-favorites', component: FavoritesComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-add-friend', component: AddFriendComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-profile', component: ProfileComponent, canActivate: [AuthorizeGuard] },
      { path: 'app-upload', component: UploadComponent, canActivate: [AuthorizeGuard] }
 
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
