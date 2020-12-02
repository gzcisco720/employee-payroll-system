import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './src/views/app';
import './src/config';

ReactDom.render(<App />, document.querySelector('#app-root'));
