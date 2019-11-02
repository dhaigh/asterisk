// react/redux stuff
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// app stuff
import App from './components/App';
import reducer from './reducers';
import './index.css';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ || (_ => null);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),

        // if devTools are not present then this will evaluate to null
        devTools()
    )
);


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
