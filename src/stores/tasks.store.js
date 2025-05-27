import { makeAutoObservable, runInAction } from 'mobx';

export default class TasksStore {
  tasks = [];
  filters = { status: '', search: '' };

  constructor(tasksService) {
    this.tasksService = tasksService;
    makeAutoObservable(this, {
      updateFilters: true,
      resetTasks: true,
      fetchTasks: false,        // we’ll use runInAction inside
      createTask: false,
      deleteTask: false,
      updateTaskStatus: false,
    });
  }

  updateFilters({ status, search }) {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchTasks();
  }

  resetTasks() {
    this.tasks = [];
  }

  async fetchTasks() {
    const result = await this.tasksService.fetchTasks(this.filters);
    if (result) {
      runInAction(() => {
        this.tasks = result.data;
      });
    }
  }

  async createTask(title, description) {
    const result = await this.tasksService.createTask(title, description);
    if (result) {
      runInAction(() => {
        this.tasks.push(result.data);
      });
    }
  }

  async deleteTask(id) {
    const idx = this.tasks.findIndex((task) => task.id === id);
    await this.tasksService.deleteTask(id);
    runInAction(() => {
      this.tasks.splice(idx, 1);
    });
  }

  async updateTaskStatus(id, status) {
    const task = this.tasks.find((task) => task.id === id);
    await this.tasksService.updateTaskStatus(id, status);
    runInAction(() => {
      if (task) {
        task.status = status;
      }
    });
  }
}
