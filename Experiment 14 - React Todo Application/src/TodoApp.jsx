import React, { useState } from "react";

export default function TodoApp() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Complete Web Technologies Record", completed: false }
    ]);
    const [input, setInput] = useState("");

    const addTask = event => {
        event.preventDefault();
        const text = input.trim();
        if (!text) return;
        setTasks(current => [
            ...current,
            { id: Date.now(), text, completed: false }
        ]);
        setInput("");
    };

    const toggleTask = id => {
        setTasks(current => current.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = id => {
        setTasks(current => current.filter(task => task.id !== id));
    };

    return (
        <main style={{ maxWidth: 520, margin: "40px auto", padding: 20,
            fontFamily: "Arial", background: "#f8fafc" }}>
            <h1>React TODO Application</h1>
            <form onSubmit={addTask} style={{ display: "flex", gap: 8 }}>
                <input value={input}
                    onChange={event => setInput(event.target.value)}
                    placeholder="Enter a new task..."
                    aria-label="New task"
                    style={{ flex: 1, padding: 10 }} />
                <button type="submit">Add</button>
            </form>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {tasks.map(task => (
                    <li key={task.id}
                        style={{ display: "flex", justifyContent: "space-between",
                            alignItems: "center", gap: 12, padding: 12,
                            borderBottom: "1px solid #cbd5e1" }}>
                        <button type="button" onClick={() => toggleTask(task.id)}
                            style={{ background: "none", border: 0, color: "#1e293b",
                                textDecoration: task.completed ? "line-through" : "none",
                                textAlign: "left", flex: 1, cursor: "pointer", fontSize: "16px" }}>
                            {task.text}
                        </button>
                        <button type="button" onClick={() => deleteTask(task.id)}
                            style={{ padding: "5px 10px", cursor: "pointer" }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <p>Total tasks: {tasks.length}</p>
            <p>Completed: {tasks.filter(task => task.completed).length}</p>
        </main>
    );
}
