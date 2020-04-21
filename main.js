// "use strict";
// Import pages
import PersonsPage from "./pages/personsPage.js";
import DetailView from "./pages/detailView.js";


// // Declare and init pages
let personsPage = new PersonsPage();
let detailView = new DetailView();

// Import services
// import SpaService from "./services/spa.js";
// import LoaderService from "./services/loader.js";
import personService from "./services/personService.js";





// // Declare and init services

// let spaService = new SpaService("home");
// let loaderService = new LoaderService();
// loaderService.show(false);

// window.pageChange = function () {
//     spaService.pageChange();
// }
window.search1And2 = (searchValue, mainProperty, property1, property2) => personsPage.search1And2(searchValue, mainProperty, property1, property2)
window.search1 = (input, property) => personsPage.search1(input, property)
window.search1And1 = (searchValue, mainProperty, property1) => personsPage.search1And1(searchValue, mainProperty, property1);
window.search2And2 = (searchValue, mainProperty, mainProperty2, property1, property2) => personsPage.search2And2(searchValue, mainProperty, mainProperty2, property1, property2);
window.search3 = (searchValue, property, property2, property3) => personsPage.search3(searchValue, property, property2, property3);
window.goToDetailView = (username) => detailView.goToDetailView(username);
window.filter = (firstName, username, lastName, email, cell, gender) => personsPage.filter(firstName, username, lastName, email, cell, gender);
window.showFilter = () => personsPage.showFilter();
window.goback = () => detailView.goback()