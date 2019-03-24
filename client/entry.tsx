import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import sw from './serviceWorker';
import './style.css';

// render the App component to the root node
ReactDOM.render(<App />, document.getElementById('root'));

// register a service worker for asset caching
sw.register();
