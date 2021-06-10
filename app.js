
const movieList = document.querySelector('.movie-list');
const showsList = document.querySelector('.tvshows-list');
const actorsList = document.querySelector('.actors-list');
// form
const submitForm = document.querySelector('.submit-form');
const submitButton = document.querySelector('.submit-button');
const firstNameInput = document.querySelector('.first-name');
const lastNameInput = document.querySelector('.last-name');
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');


//declaring variables 
let moviesArray =[];
let showsArray = [];
let actorsArray = [];
let items = 5;
let descriptionSplit;
let descriptionFinal;


//Sing-up Form event
submitForm.addEventListener('submit', e => {
    e.preventDefault();
    let emailValue = emailInput.value;
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    let passwordValue = passwordInput.value;
    let regexPass = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,20}$/gm
    let isEmailValid = regexEmail.test(emailValue)
    let isPasswordValid = regexPass.test(passwordValue)
    if (isEmailValid) {
        emailInput.classList.remove('invalid-input')
    } else {
        emailInput.classList.add('invalid-input')
        
    }
    if (isPasswordValid) {
        passwordInput.classList.remove('invalid-input')
    } else {
        passwordInput.classList.add('invalid-input')
    }
    if (submitForm.checkValidity() && isPasswordValid && isEmailValid) {
        const myModal = document.getElementById('exampleModal')
        const modal = bootstrap.Modal.getInstance(myModal)
        modal.hide()
        firstNameInput.value = ''
        lastNameInput.value = ''
        emailInput.value = ''
        passwordInput.value = ''
    }

})

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

//retrieving data from db and make the list for Top 5 movies

fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`) 
    .then(response => response.json())
    .then(data => {
        moviesArray = data.results;
        showMovies(items, moviesArray);
    });


const showMovies = (items, array) => {
    movieList.innerHTML = '';
    let numberOfItems = (items < array.length) ? items : array.length;
    for(let i = 0; i<numberOfItems; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        movieList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
        ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}            
            <div class="card-body">
                <h5 class="card-title">${array[i].title}</h5>
                <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#topMoviesModal-${array[i].id}">[...]</a></p>
            <div class = "none"
            </div>
            </div>
        </div>

        <div class="modal fade" id="topMoviesModal-${array[i].id}" tabindex="-1" aria-labelledby="topMoviesModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="topMoviesModalLabel-${array[i].id}">${array[i].title}</h5>
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

//retrieving data from db and make the list for Top 5 shows

fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`) 
    .then(response => response.json())
    .then(data => {
        showsArray = data.results;
        showTvshows(items, showsArray);
    });

const showTvshows = (items, array) => {
    showsList.innerHTML = '';
    let numberOfItems = (items < array.length) ? items : array.length;
    for(let i = 0; i<numberOfItems; i++) {
        descriptionSplit = array[i].overview.split(' ');
        descriptionFinal = descriptionSplit.slice(0, 20).join(' ');
        showsList.innerHTML += `
        <div class="card card-class" style="width: 18rem;">
        ${array[i].poster_path ? `<img src="http://image.tmdb.org/t/p/w500/${array[i].poster_path}" class="card-img-top">` : ''}
            <div class="card-body">
                <h5 class="card-title">${array[i].name}</h5>
                <p class="card-text">${descriptionFinal} <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#topTvShowsModal-${array[i].id}">[...]</a> </p>              
            <div class = "none"
            </div>
            </div>
        </div>
        
        <div class="modal fade" id="topTvShowsModal-${array[i].id}" tabindex="-1" aria-labelledby="topTvShowsModalLabel-${array[i].id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="topTvShowsModalLabel-${array[i].id}">${array[i].name}</h5>
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

//retrieving data from db and make the list for Top 5 actors

fetch(`https://api.themoviedb.org/3/trending/person/day?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        actorsArray = data.results;
        showActors(items, actorsArray);
    });

    const showActors = (items, array) => {
        actorsList.innerHTML = '';
        let numberOfItems = (items < array.length) ? items : array.length;
        for(let i = 0; i<numberOfItems; i++) {
            actorsList.innerHTML += `
            <div class="card card-class" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${array[i].name}</h5>
                    <p class="card-text">Known for: <b>${array[i].known_for[0].title}</b></p>
                </div>
            </div>
            `
        }
    }

