# Step-by-Step GitHub Deployment Guide (Experiment 14)

This guide shows you how to deploy the React Todo Application to **GitHub Pages** so anyone can access it online via `https://<your-username>.github.io/<repo-name>/`.

---

## Method 1: Deploy Directly via GitHub Pages (Fastest - 2 Minutes)

### Step 1: Initialize Git in your folder (if not already done)
Open terminal in VS Code:
```bash
git init
git add .
git commit -m "Experiment 14: React Todo Application with modular components"
```

### Step 2: Create a GitHub Repository
1. Log into your GitHub account: [https://github.com](https://github.com)
2. Click the **+** icon in the top right -> **New repository**.
3. Name your repository (e.g., `react-todo-app` or `sd-lab-experiments`).
4. Set visibility to **Public** and click **Create repository**.

### Step 3: Push Your Code to GitHub
Copy the commands shown on GitHub:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```

### Step 4: Enable GitHub Pages in Repository Settings
1. On your GitHub repository page, click the **Settings** tab.
2. In the left sidebar, click **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and directory `/ (root)`.
4. Click **Save**.
5. Within 1 minute, GitHub will display your live published URL:
   ```
   https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/
   ```

---

## Method 2: Automated Deployment via GitHub Actions (Included)

This project already comes configured with `.github/workflows/deploy.yml`.
When you push to the `main` branch:
1. GitHub Actions automatically executes the workflow.
2. It pushes the live application to the `gh-pages` branch.
3. Your site automatically updates with zero manual intervention!

---

## Component Architecture Overview

The React Todo Application is built with 5 distinct components:

```
[ TodoApp (Parent Container & State Management) ]
   ├── [ TodoStats ]        -> Displays percentage complete & remaining tasks
   ├── [ TodoForm ]         -> Task input with priority level selector
   ├── [ TodoFilters ]      -> Filter buttons (All, Active, Completed) & Clear
   └── [ TodoList ]         -> Container for task entries
        └── [ TodoItem ]    -> Checkbox, text, priority badge & delete button
```
