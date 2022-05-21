import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode = 'list';
  todos: Todo[] = [];
  title = 'Lista de Tarefas';
  text = '';
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private localStorageService: LocalstorageService) {
    this.form = this.formBuilder.group({
      // title: ['', Validators.required] another way to build the form
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.loadAllTasksFromStorage();
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

  add() {
    const { title } = this.form.value;
    const id = this.todos.length + 1;

    this.todos.push(new Todo(id, title, false));
    this.form.reset();

    this.saveAllTasksOnStorage();
    this.mode = 'list';
  }

  markAsDone(todo: Todo) {
    todo.done = !todo.done;

    this.saveAllTasksOnStorage();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveAllTasksOnStorage();
    }
  }

  saveAllTasksOnStorage() {
    this.localStorageService.save('todos:newton', JSON.stringify(this.todos));
  }

  loadAllTasksFromStorage() {
    const savedTodos = this.localStorageService.get('todos:newton');

    if (!savedTodos) return;

    this.todos = JSON.parse(savedTodos);
  }
}
