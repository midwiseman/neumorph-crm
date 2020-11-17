import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/navigation/top-bar/top-bar.component';
import { ToggleSideBarComponent } from './components/navigation/toggle-side-bar/toggle-side-bar.component';
import { SideBarComponent } from './components/navigation/side-bar/side-bar.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import icons from '../assets/svg/svg-icons';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ToggleSideBarComponent,
    SideBarComponent,
    ClientsTableComponent,
    DashboardComponent,
    UserSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SvgIconsModule.forRoot({
      icons
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
