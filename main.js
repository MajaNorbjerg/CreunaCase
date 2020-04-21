// "use strict";

// Import pages
import PersonsPage from "./pages/personsPage.js";
import DetailView from "./pages/detailView.js";


// Declare and init pages
let personsPage = new PersonsPage();
let detailView = new DetailView();


// Add functions to global scope
window.goToDetailView = (username) => detailView.goToDetailView(username);
window.filter = () => {
    let firstName = document.querySelector("#firstName").value.toLowerCase();
    let lastName = document.querySelector("#lastName").value.toLowerCase();
    let username = document.querySelector("#username").value.toLowerCase();
    let email = document.querySelector("#email").value.toLowerCase();
    let cell = document.querySelector("#cell").value.toLowerCase();
    let gender = document.querySelector("#gender").value.toLowerCase();
    personsPage.filter(firstName, username, lastName, email, cell, gender)
}
window.showFilter = () => personsPage.showFilter();
window.goback = () => detailView.goback()