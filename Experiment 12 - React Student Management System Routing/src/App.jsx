import React, { useState } from "react";
import {
    BrowserRouter, Routes, Route, Link, Navigate
} from "react-router-dom";
import "./App.css";

function Register() {
    const [form, setForm] = useState({ name: "", rollNo: "", email: "" });
    const [message, setMessage] = useState("");

    const update = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submit = event => {
        event.preventDefault();
        setMessage(`Registered student: ${form.name} (${form.rollNo})`);
        setForm({ name: "", rollNo: "", email: "" });
    };

    return (
        <section className="panel">
            <h2>Student Registration</h2>
            <form onSubmit={submit}>
                <label>Full Name
                    <input name="name" value={form.name} onChange={update} required />
                </label>
                <label>Roll Number
                    <input name="rollNo" value={form.rollNo} onChange={update} required />
                </label>
                <label>Email
                    <input name="email" type="email" value={form.email} onChange={update} required />
                </label>
                <button type="submit">Register</button>
            </form>
            <p role="status">{message}</p>
        </section>
    );
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const submit = event => {
        event.preventDefault();
        setMessage("Login form submitted successfully.");
    };

    return (
        <section className="panel">
            <h2>Student Login</h2>
            <form onSubmit={submit}>
                <label>Email
                    <input type="email" value={email} onChange={event => setEmail(event.target.value)} required />
                </label>
                <label>Password
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
            <p role="status">{message}</p>
        </section>
    );
}

function About() {
    return (
        <section className="panel">
            <h2>About Student Management System</h2>
            <p>This portal demonstrates student registration, login and navigation.
            It can be extended to manage enrollment and academic records.</p>
        </section>
    );
}

function Contact() {
    return (
        <section className="panel">
            <h2>Contact Administration</h2>
            <p>Email: support@university.edu</p>
            <p>Phone: +91-40-23456789</p>
        </section>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <h1>Student Portal</h1>
                    <nav>
                        <Link to="/">Register</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
