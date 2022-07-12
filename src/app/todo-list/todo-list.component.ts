import { Component, OnInit } from '@angular/core';
import { TodoItem } from './models/todo-item.model';
import { TodosStorageService } from "../services/todos-storage.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoItems: TodoItem[] = [Object.assign(new TodoItem(), {name: 'Create something'})];
  newTask: TodoItem = new TodoItem();
  private todosStorageService: TodosStorageService;

  constructor(todosStorageService: TodosStorageService) {
    this.todosStorageService = todosStorageService;
  }

  ngOnInit(): void {
    this.todosStorageService.getTodos()
      .subscribe(items => {
        this.todoItems = items as TodoItem[];
      })
  }

  addToList() {
    if (this.newTask.name == '') {
    }
    else {
      this.todosStorageService.storeTodo(this.newTask);
      this.todoItems.push(this.newTask);
      this.newTask = new TodoItem();
    }
  }

  deleteTask(index: number) {
    this.todosStorageService.deleteTodo(this.todoItems[index].id);
    this.todoItems.splice(index, 1);
  }

  markAsCompleted(index: number) {
    const todo = this.todoItems[index];
    this.todosStorageService.markAsCompleted(todo);
  }

  edit(item: TodoItem) {
    // TODO to be implemented
  }
}
