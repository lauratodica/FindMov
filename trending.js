const trendingAllList = document.querySelector('.trendingall-list');
const trendingMoviesList = document.querySelector('.trendingmovies-list');
const trendingShowsList = document.querySelector('.trendingshows-list');
const trendingActorsList = document.querySelector('.trendingactors-list');

//declaring variables

let items = 5;
let trendingAllArray = [];
let trendingMoviesArray = [];
let trendingShowsArray = [];
let trendingActorsArray = [];
let descriptionSplit;
let descriptionFinal;


//retreaving data from db
fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}`)
    .then(data => data.json())
    .then(data => {
        trendingAllArray = data.results;
        showTrendingAll(items, trendingAllArray);
    })

fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`)
    .then(data => data.json())
    .then(data => {
        trendingMoviesArray = data.results;
        showTrendingMovies(items, trendingMoviesArray);
    })

fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}`)
    .then(data => data.json())
    .then(data => {    
        trendingShowsArray = data.results;
        showTrendingShows(items, trendingShowsArray);
    })

fetch(`https://api.themoviedb.org/3/trending/person/week?api_key=${api_key}`)
    .then(data => data.json())
    .then(data => {
        trendingActorsArray = data.results;
        showTrendingActors(items, trendingActorsArray);
    })

//Hiding/Showing navigation on the page 
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

//create trending All list for the page
const showTrendingAll = (items, array) => {
    trendingAllList.innerHTML = '';
    for (let i = 0; i < items; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        trendingAllList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
        ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}                
            <div class="card-body">
                <div class = title-description>
                    ${!array[i].original_title ? `<h5 class="card-title">${array[i].original_name}</h5>` : `<h5 class="card-title">${array[i].original_title}</h5>`}
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#recommendationsShowsModal-${array[i].id}">[...]</a></p>
                    </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                </div>
            </div>
        </div>

        <div class="modal fade" id="recommendationsShowsModal-${array[i].id}" tabindex="-1" aria-labelledby="recommendationsShowsModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="recommendationsShowsModalLabel-${array[i].id}"> ${!array[i].original_title ? array[i].name : array[i].original_title}</h5>
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
    
//create trending movies list for the page
const showTrendingMovies = (items, array) => {
    trendingMoviesList.innerHTML = '';
    for (let i = 0; i < items; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        trendingMoviesList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
            ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}                
            <div class="card-body">
                <div class = title-description>
                    <h5 class="card-title">${array[i].title}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#trendingMoviesModal-${array[i].id}">[...]</a></p>
                </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                    <p class="card-text"><b>Released Date: </b>${array[i].release_date}</p>
                </div>  
            </div>
        </div>

        <div class="modal fade" id="trendingMoviesModal-${array[i].id}" tabindex="-1" aria-labelledby="trendingMoviesModalLabel-${array[i].id}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="trendingMoviesModalLabel-${array[i].id}">${array[i].title}</h5>
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

//create trending shows list for the page
const showTrendingShows = (items, array) => {
    trendingShowsList.innerHTML = '';
    for (let i = 0; i < items; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        trendingShowsList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
        ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}                
            <div class="card-body">
                <div class = title-description>
                    <h5 class="card-title">${array[i].name}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#trendingShowsModal-${array[i].id}">[...]</a></p>
                </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                    <p class="card-text"><b>Released Date: </b>${array[i].first_air_date}</p>
                </div>  
            </div>
        </div>

        <div class="modal fade" id="trendingShowsModal-${array[i].id}" tabindex="-1" aria-labelledby="trendingShowsModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="trendingShowsModalLabel-${array[i].id}">${array[i].name}</h5>
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

//create trending actors list for the page
const showTrendingActors = (items, array) => {
    trendingActorsList.innerHTML = '';
    for (let i = 0; i < items; i++) {
        trendingActorsList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${array[i].name}</h5>
                <p class="card-text"><b>Known for: </b>${array[i].known_for[0].title}</p>
                <p class="card-text"><b>Popularity: </b> ${array[i].popularity}</p>
            </div>
        </div>
        `
    }
} 