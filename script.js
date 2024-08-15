class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskList = document.getElementById('task-list');
        this.taskInput = document.getElementById('task-input');
        this.addTaskBtn = document.getElementById('add-task-btn');
        this.addTaskBtn.addEventListener('click', () => this.addTask());
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText !== '') {
            const task = {
                id: this.tasks.length + 1,
                text: taskText,
                completed: false,
            };
            this.tasks.push(task);
            this.renderTask(task);
            this.taskInput.value = '';
        }
    }

    renderTask(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.id = task.id;
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        taskItem.querySelector('.complete-btn').addEventListener('click', () => this.toggleComplete(task.id));
        taskItem.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(task.id));

        this.taskList.appendChild(taskItem);
    }

    toggleComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            const taskItem = this.taskList.querySelector(`[data-id="${id}"]`);
            taskItem.classList.toggle('completed');
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        const taskItem = this.taskList.querySelector(`[data-id="${id}"]`);
        if (taskItem) {
            this.taskList.removeChild(taskItem);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
