/* eslint-disable no-unused-vars */
import './Main.css';
import { useState, useEffect} from "react";
import Movie from "./Movie"
import {BrowserRouter, Routes, Route, Link ,useParams } from "react-router-dom";
// const omdbAPI ="fguigfghj";
const omdbAPI = "dd067742";

function Main() {
    const [movieList, setmovieList] = useState([]);
    const [movieName, setmovieName] = useState("");
    const [premovieName, setpremovieName] = useState("");
    const [tempd, settempd] = useState({});
    const [favList, setfavList] = useState([]);
    const [cacheList, setcacheList] = useState([]);

    const [tResults, settResults] = useState("");

    useEffect(() => {
        if (localStorage.getItem('favList')) {
            setfavList(JSON.parse(localStorage.getItem("favList")))
        } else{
            localStorage.setItem('favList', JSON.stringify([])); }
        if (localStorage.getItem('cacheList')) {
                setcacheList(JSON.parse(localStorage.getItem("cacheList")))
            } else{
                localStorage.setItem('cacheList', JSON.stringify([])); }
    }, [])

    // Clear text in input box
    const clearTextbox = () => {
        setmovieName("");
    };

    const addToFav = (movie) => {
        let check = true;
        // eslint-disable-next-line array-callback-return
        favList.map((namemovie) => {
            if (namemovie.imdbID === movie.imdbID) {
                check = false;
            }
        })
        let newa = [];
        if (check) {
            newa = [...favList, movie]
        } else {
            newa = favList.filter((namemovie) => namemovie.imdbID !== movie.imdbID);
        }
        setfavList(newa);
        localStorage.setItem("favList", JSON.stringify(newa));
    }

    const taskValueSearch = async () => {
        const link = `http://www.omdbapi.com/?s=${movieName}&apikey=${omdbAPI}`;
        const fetched_url = await fetch(link);
        // console.log(fetched_url)
        const data = await fetched_url.json();
        console.log(data);
        var tempx = {};
        setpremovieName(movieName);
        if (data.Response === "True") {
            setmovieList(data.Search);
            settempd({});
            settResults(data.totalResults)
        } else {
            if (data.Response === "False") {
                tempx["Error"] = data.Error;
            } else {
                tempx["Error"] = "Sorry buddy! I can't fetch any movie now. Try later.";
            }
            settempd(tempx);
            setmovieList([]);
            settResults("");
        }
    }

    return (
        <div className="mainArea">
            {/* Head */}
            <div classsName="mainHead">
                <div className="headCSS">
                    <h1 className="tiTle">Get Movie Details</h1>
                    {/* search Query */}
                    <div className="searchBox">
                        <b>Search Movie: </b>{"    "}
                        <input
                            type="text"
                            placeholder='Movie Name'
                            value={movieName}
                            onChange={(e) => { setmovieName(e.target.value) }}
                        />
                    </div>
                    {/* Display search query */}
                    {
                        movieName === "" ? <br /> : (
                            <div className="displaySearch">
                                <b>Your search query: </b> {movieName}
                                {"  "}
                                <button type="button" onClick={() => {
                                    taskValueSearch(movieName)
                                }} >
                                    Search
                                </button>
                                {"  "}
                                <button onClick={clearTextbox}>Search Another Movie</button>
                            </div>
                        )
                    }
                </div>
                <br />
                <br />
            </div>
            {/* Body */}
            <div className="mainBody">
                {/* LAst searched Movied */}
                <div className="col1">
                    <b>Last Searched Movies</b>
                    { cacheList.length===0 ? <div><p>You haven't opened any movie yet</p></div> : (
                        <div>
                            {/* eslint-disable-next-line array-callback-return */}
                            {cacheList.map((movie, i) => {
                                if (i < 10) {
                                    return (
                                        <div className="moviepresentation" >
                                            <div className="poster">
                                                <Link to= {`/movie/${movie.imdbID} `}>
                                                    <img src={movie.Poster}
                                                        alt='Movie'
                                                        className="imgstyle"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="moviedetails" onClick={clearTextbox}>
                                                <p >
                                                    {movie.Title}
                                                    <br />
                                                    <b>Type: </b> {movie.Type}
                                                    <br />
                                                    <b>Year: </b> {movie.Year} {"   "}
                                                    {favList.some(fav => fav.imdbID === movie.imdbID) ? <button className="favbutton" onClick={() => {addToFav(movie)}}>❤️️</button> : <button className="unfavbutton" onClick={() => addToFav(movie)}>❤️️</button> }
                                                </p>    
                                                <br />
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
                {/* Search query results  */}
                <div className="col2">
                    {
                        movieList.length === 0 ? (tempd !== "" && premovieName !== "" ? <div><b>Query: {premovieName}<br />{tempd.Error}</b></div> : <br />) : (
                            <div>
                                <b>Movies found based on your query {"\""}{premovieName}{"\""}</b>
                                <br />
                                <b>Total Results found: {tResults}</b>{"  "}
                                <button onClick={clearTextbox}>Advance Search</button>
                                <br />
                                {/* eslint-disable-next-line array-callback-return */}
                                {movieList.map((movie) => {
                                    return (
                                        <div className="moviepresentation" >
                                            <div className="poster">
                                                <Link to= {`/movie/${movie.imdbID} `}>
                                                    <img src={movie.Poster}
                                                        alt='Movie'
                                                        className="imgstyle"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="moviedetails" onClick={clearTextbox}>
                                                <p >
                                                    {movie.Title}
                                                    <br />
                                                    <b>Type: </b> {movie.Type}
                                                    <br />
                                                    <b>Year: </b> {movie.Year} {"   "}
                                                    {favList.some(fav => fav.imdbID === movie.imdbID) ? <button className="favbutton" onClick={() => {addToFav(movie)}}>❤️️</button> : <button className="unfavbutton" onClick={() => addToFav(movie)}>❤️️</button> }
                                                </p>
                                                <br />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                </div>
                {/* Liked movies */}
                <div className="col3">
                    <b>Liked Movies</b>
                    {favList.length === 0 ? <p>You Haven't liked any movie</p> : (
                        <div>
                            {/* eslint-disable-next-line array-callback-return */}
                            {favList.map((movie, i) => {
                                if (i < 10) {
                                    return (
                                        <div className="moviepresentation" >
                                            <div className="poster">
                                                <Link to= {`/movie/${movie.imdbID} `}>
                                                    <img src={movie.Poster}
                                                        alt='Movie'
                                                        className="imgstyle"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="moviedetails" onClick={clearTextbox}>
                                                <p >
                                                    {movie.Title}
                                                    <br />
                                                    <b>Type: </b> {movie.Type}
                                                    <br />
                                                    <b>Year: </b> {movie.Year} {"   "}
                                                    <button className="favbutton" onClick={() => addToFav(movie)}>❤️️</button>
                                                </p>    
                                                <br />
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// import React from 'react';

// function Main () {
//     return <h1>Hi there</h1>
// }

export default Main;