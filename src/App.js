import React from 'react';
import NewsApp from './NewsApp';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <div className="App-logo">
              <FontAwesomeIcon icon={faNewspaper} size="2x" /> <span>Top 5 News Reader</span>
            </div>
          </a>
          <p>Always the top 5 stories from your favorite news sources</p>
        </nav>


      </header>
      <section>
        <NewsApp />
      </section>

    </div>
  );
}

export default App;
