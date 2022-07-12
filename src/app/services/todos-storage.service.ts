import { Injectable } from '@angular/core';
import { TodoItem } from '../todo-list/models/todo-item.model';
import { HttpClientHelper } from "./http-client-helper";

@Injectable({providedIn: 'root'})
export class TodosStorageService {
  private baseUrl: string = 'api/TodoItems';
  constructor(private httpClientHelper: HttpClientHelper) {}

  storeTodo(todoItem: TodoItem): void {
    this.httpClientHelper.postItem(this.baseUrl, { name: todoItem.name });
  }

  getTodos() {
    return this.httpClientHelper.getItems<TodoItem[]>(this.baseUrl);
  }

  deleteTodo(id: string) {
    this.httpClientHelper.delete(`${this.baseUrl}/${id}`);
  }

  markAsCompleted(todoItem: TodoItem) {
    todoItem.isCompleted = true;
    this.httpClientHelper.put(`${this.baseUrl}/${todoItem.id}`,
      { name: todoItem.name, isCompleted: todoItem.isCompleted });
  }
}
