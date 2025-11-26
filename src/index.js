import React from 'react';
import ReactDOM from 'react-dom/client';
// CSS for react-beautiful-dnd is imported via the library itself
import App from './App';

// Performance monitoring (only in development)
if (process.env.NODE_ENV === 'development') {
  // Enable React DevTools Profiler if available
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    // React DevTools will automatically profile the app
  }
}

// Error boundary to catch and report errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // You could also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>Oops! Something went wrong.</h1>
          <p>We're sorry, but something unexpected happened.</p>
          <details style={{
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            maxWidth: '600px',
            fontSize: '14px',
            color: '#6c757d'
          }}>
            <summary>Error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Get the root element
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

// Create React root
const root = ReactDOM.createRoot(container);

// Performance mark for app load time
if (process.env.NODE_ENV === 'development') {
  performance.mark('app-start');
}

// Render the app
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Mark app as loaded and remove initial loader
document.addEventListener('DOMContentLoaded', () => {
  // Add a small delay to ensure React has mounted
  setTimeout(() => {
    document.body.classList.add('react-loaded');

    if (process.env.NODE_ENV === 'development') {
      performance.mark('app-loaded');
      performance.measure('app-load-time', 'app-start', 'app-loaded');
      const measure = performance.getEntriesByName('app-load-time')[0];
      console.log(`App loaded in ${measure.duration.toFixed(2)}ms`);
    }
  }, 100);
});

// Service Worker registration (for production builds)
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}