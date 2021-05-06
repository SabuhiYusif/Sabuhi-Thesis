import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import { Provider, useSelector } from "react-redux";
import store from "./store"
import { BrowserRouter as Router, Route } from "react-router-dom";
import SplitLog from './components/splitting/SplitLog';
import FileUpload from './components/uploading/FileUpload';
import Labeling from './components/labeling/Labeling';
import Validation from './components/validation/Validation';
import SuccessSnackbar from './components/global/SuccessSnackbar';

function App() {

  return (
    <Provider store={store}>
      <SuccessSnackbar />
      <Router>
        <Route exact path="/" component={Navigation} />
        <Route exact path="/" component={Home} />
        <Route exact path="/uploading" component={FileUpload} />
        <Route exact path="/splitting" component={SplitLog} />
        <Route exact path="/labelling" component={Labeling} />
        <Route exact path="/validating" component={Validation} />
      </Router>
    </Provider>
  );
}

export default App;
