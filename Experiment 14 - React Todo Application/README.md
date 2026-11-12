# Experiment 14 - React Todo Application with Necessary Components & GitHub Deployment

## Objective
Create a **React Todo Application** decomposed into necessary modular components (`TodoStats`, `TodoForm`, `TodoFilters`, `TodoList`, `TodoItem`), state persistence, and deploy it to **GitHub Pages**.

---

## Features Implemented
1. **Modular Components**:
   - `TodoStats`: Real-time completion counter and gradient progress bar.
   - `TodoForm`: Task input with priority level dropdown (High, Medium, Low).
   - `TodoFilters`: Status filters (All, Active, Completed) and "Clear Completed" button.
   - `TodoList` & `TodoItem`: Interactive checklist with strike-through animations and delete actions.
2. **Persistence**:
   - Automatically synchronizes with browser `localStorage`.
3. **GitHub Deployment Ready**:
   - Includes `.github/workflows/deploy.yml` for automated GitHub Actions deployment.
   - See `DEPLOYMENT_GUIDE.md` for full step-by-step instructions.

---

## How to Run in VS Code

### Option 1: Run with Node.js Server
```bash
cd "Experiment 14 - React Todo Application"
node server.js
```
Open your browser at:
```
http://localhost:3014
```

### Option 2: Live Server / Browser
- Open `index.html` with VS Code Live Server or double-click to view directly in any browser.
