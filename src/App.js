import React from "react";
// import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Upload from "./Upload/Upload";
import Home from "./Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path={'/upload'} element={<Upload/>}></Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;
