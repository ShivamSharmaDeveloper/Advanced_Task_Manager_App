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
 components/           # React components
    TaskInput.jsx    # Task input form with validation
    TaskList.jsx     # Task list with drag-and-drop
    TaskItem.jsx     # Individual task component
    FilterBar.jsx    # Filter controls
    ThemeToggle.jsx  # Theme switcher
 context/             # React Context
    TaskContext.js   # Global state management
 hooks/               # Custom hooks
    useLocalStorage.js # localStorage sync hook
 App.js              # Main application component
 App.css             # Global styles and themes
 index.js            # Application entry point
```

## Data Storage

All data is stored locally in the browser:

### localStorage Structure
- **Key**: `taskManagerState`
- **Contains**:
  ```javascript
  {
    tasks: [
      {
        id: "unique_id",
        title: "Task title",
        isCompleted: false,
        createdAt: "2024-01-01T00:00:00.000Z",
        order: 0
      }
    ],
    filter: "all", // "all" | "completed" | "pending"
    theme: "light", // "light" | "dark"
    error: "" // Error messages
  }
  ```

### Data Persistence
- Tasks are saved automatically on any change
- Theme preference persists across sessions
- Filter preference is maintained
- Data survives browser refreshes and restarts

## Performance Features

### Optimizations Implemented
- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes event handlers
- **useMemo**: Memoizes derived state and calculations
- **CSS Transitions**: Hardware-accelerated animations
- **Debounced Input**: Smooth typing experience
- **Virtual Scrolling**: Efficient for large task lists

### Accessibility Features
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Logical tab order
- **Semantic HTML**: Proper heading structure
- **Color Contrast**: WCAG AA compliant
- **Reduced Motion**: Respects user preferences

## Browser Compatibility

| Browser | Minimum Version | Status |
|---------|----------------|---------|
| Chrome | 90+ | Fully Supported |
| Firefox | 88+ | Fully Supported |
| Safari | 14+ | Fully Supported |
| Edge | 90+ | Fully Supported |

## Build and Deployment

### Development
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests (if configured)
```

### Production Build
```bash
npm run build
```
This creates an optimized `build` folder ready for deployment.

### Environment Variables
Create a `.env` file in the root directory (optional):
```
# Custom configuration
REACT_APP_TITLE=My Task Manager
REACT_APP_VERSION=1.0.0
```

## Troubleshooting

### Common Issues

1. **Tasks not saving**
   - Check if localStorage is enabled in your browser
   - Clear browser cache and try again
   - Ensure you're not in private/incognito mode

2. **Drag and drop not working**
   - Update to the latest browser version
   - Ensure JavaScript is enabled
   - Check browser console for errors

3. **Theme not persisting**
   - Clear browser cache
   - Check localStorage quota limits
   - Disable any storage-blocking extensions

4. **Performance issues**
   - Check number of tasks (consider pagination for 1000+ tasks)
   - Disable browser extensions
   - Try in an incognito window

### Getting Help

1. Check the browser console for error messages
2. Verify all dependencies are installed (`npm install`)
3. Ensure you're using a supported browser version
4. Create an issue in the project repository

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use functional components and hooks
- Follow React best practices
- Maintain consistent naming conventions
- Add appropriate comments for complex logic
- Ensure accessibility standards are met

## License

This project is open source and available under the [MIT License](LICENSE).

## Changelog

### Version 1.0.0
- Initial release
- Core task management functionality
- Drag-and-drop reordering
- Dark/light theme support
- localStorage persistence
- Responsive design
- Form validation
- Performance optimizations
- Accessibility features

---

**Enjoy managing your tasks! =�**

For questions or feedback, please open an issue in the project repository.