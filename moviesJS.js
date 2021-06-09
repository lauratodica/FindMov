

const upcomingList = document.querySelector('.upcomming-movies');
const latestList = document.querySelector('.latest-movies');
const popularList = document.querySelector('.popular-movies');
const topRatedList = document.querySelector('.toprated-movies');
const recommendationList = document.querySelector('.genres-list');
const genresForm = document.querySelector('.genres-form'); 
const searchButton = document.querySelector('.search-button');
const searchBar = document.querySelector('.search-bar');
const searchedMovie = document.querySelector('.searched-movie');

//declaring variables
const api_key = 'da87eb79e5486cb479ecbe70f388b703';
const api = '18278d1e';

let upcomingArray = [];
let popularArray = [];
let topRatedArray = [];
let recommendationArray = [];
let genresFormArray = [];
let moviesArray = [];
let filteredArray = [];
let items = 5;
let genresId;
let inputValue = '';
let descriptionSplit;
let descriptionFinal;


// Hiding/ Showing navigation when scrolling
document.addEventListener("DOMContentLoaded", function(){

    let el_autohide = document.querySelector('.autohide');
    
  
    if(el_autohide){
      var last_scroll_top = 500;
      window.addEventListener('scroll', function() {
            let scroll_top = window.scrollY;
           if(scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            }
            else {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
      }); 
    }
});  

//search for a movie event
searchButton.addEventListener('click', e => {
    e.preventDefault();
    inputValue = searchBar.value;
    let insertValue = searchBar.value.split(' ').join('+');
    searchBar.value = '';

    fetch(`http://www.omdbapi.com/?t=${insertValue}&apikey=${api}`)
        .then(data => data.json())
        .then(data => {
            descriptionSplit = data.Plot.split(' ');
            descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
            searchedMovie.innerHTML = `
            <div class="card card-class" style="width: 18rem;">
            ${data.Poster ? `<img src="${data.Poster}" class="card-img-top">` : ''}                
                <div class="card-body">
                    <h5 class="card-title">${data.Title}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#searchMoviesModal-${data.id}">[...]</a></p>
                </div>
            </div>

            <div class="modal fade" id="searchMoviesModal-${data.id}" tabindex="-1" aria-labelledby="searchMoviesModalLabel-${data.id}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="searchMoviesModalLabel-${data.id}">${data.Title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${data.Plot}
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    });


//retrieving data from db
fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        upcomingArray = data.results;
        showMovies(items, upcomingArray);
    })



fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        popularArray = data.results;
        showPopular(items, popularArray);
        
    })

fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        topRatedArray = data.results;
        showTopRated(items, topRatedArray);
    })

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
    .then(data => data.json())
    .then(data => {
        genresFormArray = data.genres;
        showGenres(genresFormArray);
    })

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`)
    .then(data => data.json())
    .then(data => {
        moviesArray = data.results;
    });


//select event for genres of movies
genresForm.addEventListener('change', e => {
    genresId = e.target.value;
    filterByGenres(genresId);
    showRecommendations(filteredArray);

})


const filterByGenres = id => {
    filteredArray = moviesArray.filter(item => item.genre_ids.includes(Number(id)));
} 

//create recommendations list for the page
const showRecommendations = array => {
    recommendationList.innerHTML = '';
    let recommendations = items<array.length ? items : array.length;
    for(let i=0; i<recommendations; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        recommendationList.innerHTML += `
            <div class="card card-class" style="width: 18rem;">
            ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}                
                <div class="card-body">
                    <div class = title-description>
                        <h5 class="card-title">${array[i].title}</h5>
                        <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#recommendationsMoviesModal-${array[i].id}">[...]</a></p>
                    </div>
                    <div class = "vote">
                        <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                        <p class="card-text"><b>Released Date: </b>${array[i].release_date}</p>
                    </div>  
                </div>
            </div>

            <div class="modal fade" id="recommendationsMoviesModal-${array[i].id}" tabindex="-1" aria-labelledby="recommendationsMoviesModalLabel-${array[i].id}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="recommendationsMoviesModalLabel-${array[i].id}">${array[i].title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${array[i].overview}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

//create genres list for "select label"
const showGenres = array => {
    genresForm.innerHTML = '';
    for (let i = 0; i<array.length; i++) {
        genresForm.innerHTML += `
        <option value=${array[i].id}>${array[i].name}</option>
        `
    }
}  

//create upcoming list for the page
const showMovies = (items, array) => {
    upcomingList.innerHTML = '';
    for (let i = 0; i < items; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        upcomingList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
        ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}                
            <div class="card-body">
                <div class = title-description>
                    <h5 class="card-title">${array[i].title}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#upcomingMoviesModal-${array[i].id}">[...]</a></p>
                </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                    <p class="card-text"><b>Released Date: </b>${array[i].release_date}</p>
                </div>        
            </div>
        </div>

        <div class="modal fade" id="upcomingMoviesModal-${array[i].id}" tabindex="-1" aria-labelledby="upcomingMoviesModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="upcomingMoviesModalLabel-${array[i].id}">${array[i].title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${array[i].overview}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }
} 

//create popular list for the page
const showPopular = (items, array) => {
    popularList.innerHTML = '';
    for (let i = 0; i < items; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        popularList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
        ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}                
            <div class="card-body">
                <div class = title-description>
                    <h5 class="card-title">${array[i].title}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#upcomingMoviesModal-${array[i].id}">[...]</a></p>
                </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                    <p class="card-text"><b>Released Date: </b>${array[i].release_date}</p>
                </div>  
            </div>
        </div>

        <div class="modal fade" id="popularMoviesModal-${array[i].id}" tabindex="-1" aria-labelledby="popularMoviesModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popularMoviesModalLabel-${array[i].id}">${array[i].title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${array[i].overview}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

//create topRated list for the page
const showTopRated = (items, array) => {
    topRatedList.innerHTML = '';
    for (let i = 0; i < items; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        topRatedList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
            ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}                
            <div class="card-body">
                <div class = title-description>
                    <h5 class="card-title">${array[i].title}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#topRatedMoviesModal-${array[i].id}">[...]</a></p>
                </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                    <p class="card-text"><b>Released Date: </b>${array[i].release_date}</p>
                </div>  
            </div>
        </div>

        <div class="modal fade" id="topRatedMoviesModal-${array[i].id}" tabindex="-1" aria-labelledby="topRatedMoviesModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="topRatedMoviesModalLabel-${array[i].id}">${array[i].title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${array[i].overview}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}