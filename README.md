# Advanced Task Manager

A modern, feature-rich task management application built with React, featuring drag-and-drop functionality, dark/light theme support, and persistent local storage.

## Features

### Core Functionality
-  Add, complete, and delete tasks
- Filter tasks by status (All, Completed, Pending)
- Drag-and-drop task reordering
- All data persists in localStorage
- Fully responsive design (mobile-first)
- Dark/Light theme toggle with persistence
- Smooth animations and transitions

### Technical Features
- **React 18** with functional components and hooks
- **Context API** for global state management
- **Custom useLocalStorage hook** for data persistence
- **React Beautiful DND** for drag-and-drop
- **Performance optimizations** (React.memo, useCallback, useMemo)
- **Form validation** with error handling
- **Accessibility features** (ARIA labels, keyboard navigation)
- **Error boundaries** for robust error handling

## Tech Stack

- **React 18.2.0** - UI library
- **React Beautiful DND 13.1.1** - Drag and drop functionality
- **React Scripts 5.0.1** - Build tool (Create React App)
- **CSS3** - Styling with custom properties for theming
- **localStorage API** - Data persistence

## Installation

### Prerequisites
- Node.js 14+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup Instructions

1. **Clone or download the repository**
   ```bash
   # If cloning from git
   git clone <repository-url>
   cd Advanced_Task_Manager_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

## Usage Guide

### Adding Tasks
1. Type your task in the input field at the top
2. Press Enter or click the "Add" button
3. Tasks appear at the top of the list
4. Empty or whitespace-only tasks are not allowed

### Managing Tasks
- **Complete/Uncomplete**: Click the checkbox next to a task
- **Delete**: Click the trash icon on the right side of a task
- **Reorder**: Drag tasks using the hamburger menu icon (���)

### Filtering Tasks
- **All**: Shows all tasks
- **Completed**: Shows only completed tasks
- **Pending**: Shows only incomplete tasks

### Theme Switching
- Click the theme toggle in the header
- Switch between light and dark themes
- Theme preference is saved automatically

### Keyboard Shortcuts
- `Enter`: Add new task or complete task navigation
- `Delete/Backspace`: Delete focused task
- `Tab`: Navigate between elements
- `Space`: Toggle theme when focused

## Project Structure

```
src/

