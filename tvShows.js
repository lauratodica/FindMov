const upcomingList = document.querySelector('.upcoming-shows');
const onAirList = document.querySelector('.onair-shows')
const popularList = document.querySelector('.popular-shows');
const topRatedList = document.querySelector('.toprated-shows');
const genresList = document.querySelector('.genres-form');
const recommendationList = document.querySelector('.genres-list');

//declaring variables

let upcomingArray = [];
let onAirArray = [];
let popularArray = [];
let topRatedArray = [];
let recommendationArray = [];
let genresArray = [];
let showsArray = [];
let items = 5;
let descriptionSplit;
let descriptionFinal;


////retrieving data from db
fetch(`https://api.themoviedb.org/3/tv/latest?api_key=${api_key}&language=en-US`)
    .then(data => data.json())
    .then(data => {
        upcomingArray = data;
        showUpcoming(upcomingArray);
    })

fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        onAirArray = data.results;
        showOnAir(items, onAirArray);
    })

fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        popularArray = data.results;
        showPopular(items, popularArray);
    })

fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        topRatedArray = data.results;
        showTopRated(items, topRatedArray);
    })

fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}&language=en-US`)
    .then(data => data.json())
    .then(data => {
        genresArray = data.genres;
        showGenres(genresArray);
    })

fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`)
    .then(data => data.json())
    .then(data => {
        showsArray = data.results;
    });


//Hiding/Showing navigation when scrolling
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

//create genres list for "select label"
const showGenres = array => {
    genresList.innerHTML = '';
    for (let i = 0; i<array.length; i++) {
        genresList.innerHTML += `
        <option value=${array[i].id}>${array[i].name}</option>
        `
    }
}  

//select event for genres of shows
genresList.addEventListener('change', e => {
    genresId = e.target.value;
    filterByGenres(genresId);
    showRecommendations(filteredArray);
})


const filterByGenres = id => {
    filteredArray = showsArray.filter(item => item.genre_ids.includes(Number(id)));
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
                        <h5 class="card-title">${array[i].name}</h5>
                        <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#recommendationsShowsModal-${array[i].id}">[...]</a></p>
                    </div>
                    <div class = "vote">
                        <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                        <p class="card-text"><b>Released Date: </b>${array[i].first_air_date}</p>
                    </div>  
                </div>
            </div>

            <div class="modal fade" id="recommendationsShowsModal-${array[i].id}" tabindex="-1" aria-labelledby="recommendationsShowsModalLabel-${array[i].id}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="recommendationsShowsModalLabel-${array[i].id}">${array[i].name}</h5>
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

//create upcoming list for the page
const showUpcoming = (array) => {
    upcomingList.innerHTML += `
    <div class="card card-class" style="width: 18rem;">
    ${array.poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array.poster_path}" class="card-img-top">` : ''}            
        <div class="card-body">
            <h5 class="card-title">${array.name}</h5>
            <p class="card-text"><b>Status: </b>${array.status}</p>
            <p class="card-text"><b>Number of seasons: </b>${array.number_of_seasons}</p>
            <p class="card-text"><b>Number of episodes: </b>${array.number_of_episodes}</p>
        </div>
    </div>
    `
}

//create OnAir list for the page
const showOnAir = (items, array) => {
    onAirList.innerHTML = '';
    for (let i = 0; i < items; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        onAirList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
        ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}               
            <div class="card-body">
                <div class = title-description>
                    <h5 class="card-title">${array[i].name}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#onAirShowsModal-${array[i].id}">[...]</a></p>
                </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                    <p class="card-text"><b>Released Date: </b>${array[i].first_air_date}</p>
                </div>  
            </div>
        </div>

        <div class="modal fade" id="onAirShowsModal-${array[i].id}" tabindex="-1" aria-labelledby="onAirShowsModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="onAirShowsModalLabel-${array[i].id}">${array[i].name}</h5>
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
                    <h5 class="card-title">${array[i].name}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#popularShowsModal-${array[i].id}">[...]</a></p>
                </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                    <p class="card-text"><b>Released Date: </b>${array[i].first_air_date}</p>
                </div>  
            </div>
        </div>

        <div class="modal fade" id="popularShowsModal-${array[i].id}" tabindex="-1" aria-labelledby="popularShowsModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="popularShowsModalLabel-${array[i].id}">${array[i].name}</h5>
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
                    <h5 class="card-title">${array[i].name}</h5>
                    <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#topRatedShowsModal-${array[i].id}">[...]</a></p>
                </div>
                <div class = "vote">
                    <p class="card-text"><b>Vote Average: </b> ${array[i].vote_average}</p>
                    <p class="card-text"><b>Released Date: </b>${array[i].first_air_date}</p>
                </div>  
            </div>
        </div>

        <div class="modal fade" id="topRatedShowsModal-${array[i].id}" tabindex="-1" aria-labelledby="topRatedShowsModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="topRatedShowsModalLabel-${array[i].id}">${array[i].name}</h5>
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

