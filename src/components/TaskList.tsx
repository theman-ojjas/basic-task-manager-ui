import React, { useEffect, useState } from 'react';
import { TaskItem } from '../types/TaskItem';
import { api } from '../services/api';
import { TaskForm } from './TaskForm';

type FilterType = 'all' | 'active' | 'completed';

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [filter, setFilter] = useState<FilterType>('all');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const tasks = await api.getTasks();
        setTasks(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = async (description: string) => {
        await api.createTask(description);
        loadTasks();
    };

    const toggleTask = async (task: TaskItem) => {
        await api.updateTask(task.id, !task.isCompleted);
        loadTasks();
    };

    const deleteTask = async (id: string) => {
        await api.deleteTask(id);
        loadTasks();
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.isCompleted;
        if (filter === 'completed') return task.isCompleted;
        return true;
    });

    return (
        <div className="container mt-4">
            <h1>Task Manager</h1>
            <TaskForm onAdd={addTask} />
            
            <div className="btn-group mb-3">
                <button 
                    className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button 
                    className={`btn btn-outline-primary ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>
                <button 
                    className={`btn btn-outline-primary ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>

            <ul className="list-group">
                {filteredTasks.map(task => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => toggleTask(task)}
                                className="me-2"
                            />
                            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                                {task.description}
                            </span>
                        </div>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
