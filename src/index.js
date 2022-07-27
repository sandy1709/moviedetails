/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import Movie from './Movie'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/movie/:MOVIE_ID" element={<Movie />} ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  // <Route path="/series/:SERIES_ID" element={<Test />}></Route>
);

