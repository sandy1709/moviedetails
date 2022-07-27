/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Movie.css"

const omdbAPI = "dd067742";

function Movie() {
    const [movieData, setmovieData] = useState([]);
    const [favList, setfavList] = useState([]);
    // const [cacheList, setcacheList] = useState([]);
    let { MOVIE_ID } = useParams();

    useEffect(() => {
        movieDetails();
        if (localStorage.getItem('favList')) {
            setfavList(JSON.parse(localStorage.getItem("favList")))
        } else
            localStorage.setItem('favList', JSON.stringify([]));
    }, [])


    const addToFav = (movie) => {
        let check = true;
        let newa = [];
        // eslint-disable-next-line array-callback-return
        const favList = JSON.parse(localStorage.getItem("favList"));
        favList.map((namemovie) => {
            if (namemovie.imdbID === movie.imdbID) {
                check = false;
                newa = favList.filter((namemovie) => namemovie.imdbID !== movie.imdbID);
            }
        })
        if (check) {
            newa = [...favList, movie]
        }
        setfavList(newa);
        localStorage.setItem("favList", JSON.stringify(newa));
    }

    const movieDetails = async () => {
        let check = true;
        let data = [];
        // // eslint-disable-next-line array-callback-return
        const existingCache = JSON.parse(localStorage.getItem("cacheList"));
        existingCache.map((namemovie) => {
            if (namemovie.imdbID === MOVIE_ID) {
                check = false;
                data = namemovie;
            }
        })
        if (check) {
            const link = `http://www.omdbapi.com/?i=${MOVIE_ID}&apikey=${omdbAPI}`;
            const fetched_url = await fetch(link);
            data = await fetched_url.json();
            const mcache = [data, ...existingCache]
            localStorage.setItem("cacheList", JSON.stringify(mcache));
        }
        setmovieData(data);
    }

    return (<div className='movBody'>
        <div className='movNav'>
            <div className='nav1'>
                <p className='logo'>OMDB</p>
            </div>
            <div  className='nav2'>
                <Link to="/">
                    <button>Search Another Movie</button>
                </Link>
            </div>
            <div  className='nav3'>

            </div>
        </div>
        <div className='mainSection'>
            <div className='movPoster'>
                <img src={movieData.Poster} alt={movieData.Title} className='Detailedimg' />
                <br />
                {favList.some(fav => fav.imdbID === movieData.imdbID) ?
                    <button className="movfavbutton" onClick={() => addToFav(movieData)}>❤️️</button> :
                    <button className="movunfavbutton" onClick={() => addToFav(movieData)}>❤️️</button>}
            </div>
            <div className='movDetails'>
                <p>
                    <b>Title:</b>{"  "}{movieData.Title} {movieData.Year !== "N/A" ? <span>{"("} {movieData.Year} {")"}</span> : <>{" "}</>}
                    <br />
                    <b>Type:</b>{"  "}{movieData.Type}
                    <br />
                    <b>Actors:</b>{"  "}{movieData.Actors}
                    <br />
                    <b>Director:</b>{"  "}{movieData.Director}
                    <br />
                    <b>Writer:</b>{"  "}{movieData.Writer}
                    <br />
                    <b>Genre:</b>{"  "}{movieData.Genre}
                    <br />
                    <b>Runtime:</b>{"  "}{movieData.Runtime}
                    <br />
                    <b>Imdb Rating:</b>{"  "}{movieData.imdbRating} {movieData.imdbVotes !== "N/A" ? <span>{" "}Rated by {movieData.imdbVotes} Users</span> : <>{" "}</>}
                    <br />
                    <b>Language:</b>{"  "}{movieData.Language}
                    <br />
                    <b>Country:</b>{"  "}{movieData.Country}
                    <br />
                    <b>BoxOffice:</b>{"  "}{movieData.BoxOffice}
                    <br />
                    <b>Awards:</b>{"  "}{movieData.Awards}
                    <br />
                    <b>Released:</b>{"  "}{movieData.Released}
                    
                    <br />
                    <a href={`https://www.imdb.com/title/${movieData.imdbID}`}><button className="imdbbutton"><b>Go to IMDB!</b></button></a>
                </p>
            </div>
        </div>
        <div className='plotSection'>
            <b>Plot: </b>{"  "}{movieData.Plot}
        </div>
    </div>
    )
}

export default Movie;