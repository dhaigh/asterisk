import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import App from 'components/App';
import reducer from 'reducers';

it('renders without crashing', () => {
    const store = createStore(
        reducer,
        applyMiddleware(thunk)
    );

    expect(() => {
        render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.createElement('div')
        );
    }).not.toThrow();
});
