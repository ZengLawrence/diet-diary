import React from 'react';
import ReactDOM from 'react-dom';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import store from "./app/store";
import Root from './routes/Root';
import SavedMeals from './routes/SavedMeals';
import { Container } from 'react-bootstrap';

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Root />, // redirect back to home page
  },
  {
    path: "/saved-meals",
    element: <SavedMeals />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
