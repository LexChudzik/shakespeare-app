import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <h1>Technologies Used</h1>

        <h3>JavaScript</h3>
        <h3>Node.js</h3>
        <h3>React Redux</h3>
        <h3>PostgreSQL</h3>
        <h3>chart.js</h3>
        <h3>The Movie Database</h3>

    </div>
  </div>
);

export default AboutPage;
