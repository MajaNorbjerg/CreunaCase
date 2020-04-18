// "use strict";
// Import pages
import PersonsPage from "./pages/personsPage.js";



// Import services
// import SpaService from "./services/spa.js";
// import LoaderService from "./services/loader.js";
import personService from "./services/personService.js";



// // Declare and init pages
let personsPage = new PersonsPage();


// // Declare and init services

// let spaService = new SpaService("home");
// let loaderService = new LoaderService();
// loaderService.show(false);

// window.pageChange = function () {
//     spaService.pageChange();
// }
window.search = (input, array) => personsPage.search(input, array)
window.myFunction = (input, property) => personsPage.myFunction(input, property)