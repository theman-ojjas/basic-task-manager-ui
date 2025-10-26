import React, { useState } from 'react';

interface Props {
    onAdd: (description: string) => void;
}

export const TaskForm: React.FC<Props> = ({ onAdd }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim()) {
            onAdd(description);
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter new task..."
                />
                <button type="submit" className="btn btn-primary">Add Task</button>
            </div>
        </form>
    );
};
