import personService from "../services/personService.js"
export default class PersonsPage {
    constructor() {
        this.data = [];

        this.allPersons;
        this.template();
        this.initData();
    }

    //.................... This initData function runs within the constructor and runs the first essential functions to get data shown on the page ....................
    async initData() {
        this.data = await personService.loadPersons(); // Get the returned JSON data from the personService.js
        this.appendPersons(this.data); // Add persons
        this.createGenderOptions(); // Add options to gender select box
        this.showFilter(); // Hide the extra filtrations at first

    }

    //HTML template added to #profile
    //.............................................................
    template() {
        document.querySelector("#profile").innerHTML += /*html*/ `
   
        <h2>Persons</h2>
       
        <article id="filterInputs"> <!-- All the input fields for filtering persons-->



             <!-- All the static inputfields .................... -->
            <label for="firstName">First name:</label>
            <label for="lastName">Last name:</label>
           
            <!-- First name -->
            <input type="search" id="firstName" placeholder="Search by first name"
               onkeyup="filter()">

            <!-- Last name -->
            <input type="search" id="lastName" placeholder="Search by last name"
               onkeyup="filter()">




            <!-- All the extra inputfields .................... -->
            <label class="filter" for="username">Username:</label>
            <label class="filter" for="email">Email:</label>

            <!-- Username -->
            <input class="filter" type="search" id="username" placeholder="Search by username"
               onkeyup="filter()">

            <!-- Email -->
            <input class="filter" type="search" id="email"
               onkeyup="filter()"
               placeholder=" Search for an email" title="Search by email">





            <label class="filter" for="cell">Cell number:</label>
            <label class="filter" for="gender">Gender:</label>

            <!-- Cell -->
            <input class="filter" type="search" id="cell"
               onkeyup="filter()" placeholder="Search by phone number"
               title="Type in cell number">
          
            <!-- Gender -->
            <select class="filter" id="gender"
               onchange=" filter()">
               <option value="">All genders</option>
            </select>




            <!-- Filter checkbox -->
            <input id="filterCheck" class="displayNone" type="checkbox" onclick="showFilter()">
            <label for="filterCheck">Filter even more</label>
    

       </article>
           <!-- Div for the fetched persons -->
           <div id="flexPersons">
           </div>  


      `
    }


    // Function for appending the person data to the DOM
    //.............................................................
    appendPersons(persons) {
        let template = "";

        if (innerWidth > 1024) { //for desktop wider than 1024px
            for (const person of persons) {

                template += /*html*/ ` <article class="profile" id="ID${person.login.uuid}" onclick="goToDetailView(this.id)"> <img src="${person.picture.thumbnail}" alt="thumbnail">
                 <p> ${person.name.first}
                ${person.name.last} </p>
                <p>   ${person.gender} </p> 
                <p> ${person.email}</p> 
                <p>   ${person.cell} </p> 
               
                </article >
                `;

            }
            document.querySelector('#flexPersons').innerHTML = template;
        } else { //for every screen les than 1024px wide

            for (const person of persons) {

                template += /*html*/ ` <article class="profile" id="ID${person.login.uuid}" onclick="goToDetailView(this.id)"> <img src="${person.picture.thumbnail}" alt="thumbnail">
             <p> ${person.name.first}
            ${person.name.last} </p>
           
            </article >
            `;

            }
            document.querySelector('#flexPersons').innerHTML = template;
        }
    }



    // Option values from the api to the select gender box
    //.............................................................
    createGenderOptions() {
        let filteredProperties = [];

        // Add the property to the array if the value isn´t there allready
        for (const person of this.data) {
            if (filteredProperties.indexOf(person.gender) === -1) {
                filteredProperties.push(person.gender);
            }
        }

        // Create options for the select box based on the dublicate-free array
        for (const value of filteredProperties) {
            var select = document.getElementById("gender");
            var option = document.createElement("option");

            // Insert the values to options
            option.text = value;

            // Create option
            select.add(option);
        }
    };



    // Filter the person array based on input from different inputfields
    //.............................................................
    filter(firstName, username, lastName, email, cell, gender) { // get the value in lower case from input fields

        console.log(firstName, username, lastName, email, cell, gender)

        let filteredArr = this.data.filter(person => //filter the array of persons in a new array
            person.name.first.toLowerCase().includes(firstName) &&
            person.name.last.toLowerCase().includes(lastName) &&
            person.login.username.toLowerCase().includes(username) &&
            person.email.toLowerCase().includes(email) &&
            person.cell.toLowerCase().includes(cell) &&
            (person.gender === gender || gender === "")

        )
        this.appendPersons(filteredArr); // Append this new array to the DOM
    }



    // Show or hide the extra input fields
    //.............................................................
    showFilter() {
        let checkBox = document.querySelector('#filterCheck'); // The checkbox
        let filter = document.querySelector('#filterInputs').querySelectorAll('.filter'); // All the elements 
        for (const input of filter) {
            input.classList.toggle('displayNone');
        }

        let label = document.querySelector('[for="filterCheck"]') // The checkbox label
        if (checkBox.checked == true) {
            label.innerHTML = "Less filtering"
        } else {
            label.innerHTML = "Even more filtering"
        }
    }
}