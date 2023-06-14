import './styles/main.scss';
// import moji from './assets/smile.svg'

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';


// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'



const root = createRoot(document.getElementById('app'));
root.render(
    <Provider store={store}><App /></Provider>
);

// const img = document.getElementById('moji');
// img.src = moji;
// img.style.width = '400px';
// console.log("hello");