import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <h1>Technologies Used</h1>
      <ul>
        <li>JavaScript</li>
        <li>Node.js</li>
        <li>React Redux</li>
        <li>chart.js</li>
        <li>The Movie Database</li>
        <li></li>
      </ul>
    </div>
  </div>
);

export default AboutPage;
