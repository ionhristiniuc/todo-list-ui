import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from "@angular/forms";
import { TodosStorageService } from "./services/todos-storage.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthorizationService } from "./services/authorization.service";
import { AuthComponent } from './auth/auth.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TodosStorageService, AuthorizationService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
