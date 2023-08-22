import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import { getMovies} from "../reducks/movies/selector";
import  API from "../API";
import MainImage from "../components/common/MainImage";
import Preview from '../components/common/preview';
import { useDispatch } from 'react-redux';
import { addFavorite, fetchFromLocalStorage } from "../reducks/favorites/operations";
import { getFavorites } from "../reducks/favorites/selector";
import IconFav from '../assets/img/likeicon.png';
// import IconLeft from '../assets/img/icon-left';
// import IconRight from '../assets/img/icon-right';

const api = new API();
const Home = () => {
    const [moviesComingSoon, setMoviesComingSoon] = useState(null);
    const [moviesNewReleased, setMoviesNewReleased] = useState(null);
    const [selectedMovieId,setSelectedMovieId] = useState(null);
    const [showPreview, setShowPreview] =  useState(false);
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const movies = getMovies(selector);
    const favorites = getFavorites(selector);
    const clickfav = movie => {
        dispatch(addFavorite(movie));
    };
    const clickMovie = movieId => {
        setSelectedMovieId(movieId);
        setShowPreview(true)
    };

    useEffect(() => {
        dispatch(fetchFromLocalStorage);
        api.getMovies({ release_type: 'Coming Soon'})
          .then(movies => {
            setMoviesComingSoon(movies);
          })
          .catch(error => {
            alert('movies/coming soon');
          })

        api.getMovies({release_type: 'Newly Released'}|| {})
        .then(movies => {
            setMoviesNewReleased(movies)
        })
          .catch(error => {
            alert('Failed to connect API:/movies/');
          })
    }, [movies]);

    return(
        <>
           {showPreview && <Preview setShowPreview={setShowPreview} selectedMovieId={selectedMovieId} />}
           <section>
              <MainImage />
              <div class="list">
                <div class="left">
                    <div class="newly-rel">
                        <hr />
                        <h2>Newly Released</h2>
                        <hr />
                    </div>
                </div>
                <ul>
                    {moviesNewReleased && moviesNewReleased.results.length > 0 ? (
                        moviesNewReleased.results.map(movie => (
                            <li>
                                <div class="card">
                                    {movie &&
                                       Object.values(favorites).filter(
                                        favoriteMovie => movie.id == favoriteMovie.id
                                       ).length === 0 && (
                                        <img class="fav"
                                        onClick={() => {
                                            clickfav(movie);
                                        }}
                                        src={IconFav} alt="" />
                                       )}

                                       <img onClick={()=>clickMovie(movie.id)} class="image" src={'https://res.cloudinary.com/techis/' + movie.image_mobile} alt="" />
                                       
                                </div>
                                <h1>{movie.name}</h1> 
                                <p>TV-MA | Action,Crime</p>
                                <a href={movie.trailer_link} target="_blank"><button>Watch Trailer</button></a>
                            </li>

                        ))
                    ): (
                        <p>No movies here yet ....</p>
                    )}
                </ul>
              </div>

              <div class="list">
                <div class="left">
                    <div class="newly-rel">
                        <hr />
                        <h2>Upcoming Movies</h2>
                        <hr />
                    </div>
                </div>
                <ul>
                    {moviesComingSoon && moviesComingSoon.results.length > 0 ? (
                        moviesComingSoon.results.map(movie => (
                            <li>
                                <div class="card">
                                    {movie && favorites && Object.values(favorites).filter(
                                        favoriteMovie => movie.id == favoriteMovie.id).length === 0 && (
                                            <img class="fav"
                                            onClick={() => {
                                                clickfav(movie);
                                            }}
                                            src={IconFav} alt="" />
                                        )}


                                            <img onClick={()=>clickMovie(movie.id)} class="image" src={'https://res.cloudinary.com/techis/' + movie.image_mobile} alt="" />


                                   
                                </div>
                                <h1>{movie.name}</h1>
                                <p>TV-MA | Action, Crime</p>
                                <a href={movie.trailer_link} target="_blank"><button>Watch Trailer</button></a>
                            </li>
                        ))
                    ) : (
                        <p>No movies here yet...</p>

                    
                    )}
                </ul>
              </div>
           </section>
        
        
        
        </>
    );

                                
 } ;
export default Home;                         