import personService from "../services/personService.js"
export default class PersonsPage {
    constructor() {
        this.data = [];

        this.allPersons;
        this.template();
        this.initData();
    }

    async initData() {
        // let persons = await personService.loadPersons();
        // console.log(await this.data)
        this.data = await personService.loadPersons();
        this.appendPersons(this.data);
        this.createGenderOptions();
        // this.createTimezoneOptions();
        console.log(this.data)
        this.showFilter();

    }
    template() {
        document.querySelector('#profile').innerHTML += /*html*/ `
   
           <h2>Persons</h2>

           <article id="filterInputs">
           <label class="alwaysShow" for="firstName">First name:</label>
           <label class="alwaysShow" for="lastName">Last name:</label>
           
           <input class="alwaysShow" type="search" id="firstName" placeholder="Search by first name"
               onkeyup="filter('firstName', 'username', 'lastName', 'email', 'cell', 'gender')">

           <input class="alwaysShow" type="search" id="lastName" placeholder="Search by last name"
               onkeyup="filter('firstName', 'username', 'lastName', 'email', 'cell', 'gender')">





           <label class="filter" for="username">Username:</label>
           <label class="filter" for="email">Email:</label>

           <input class="filter" type="search" id="username" placeholder="Search by username"
               onkeyup="filter('firstName', 'username', 'lastName', 'email', 'cell', 'gender')">

                      <input class="filter" type="search" id="email"
               onkeyup="filter('firstName', 'username', 'lastName', 'email', 'cell', 'gender')"
               placeholder=" Search for an email" title="Search by email">




           <label class="filter" for="cell">Cell number:</label>
           <label class="filter" for="gender">Gender:</label>

           <input class="filter" type="search" id="cell"
               onkeyup="filter('firstName', 'username', 'lastName', 'email', 'cell', 'gender')" placeholder="Search by phone number"
               title="Type in cell number">
          
           <select class="filter" id="gender"
               onchange=" filter('firstName', 'username', 'lastName', 'email', 'cell', 'gender')">

               <option value="">All genders</option>

             

           </select>

           <input id="filterBtn" class="displayNone" type="checkbox" onclick="showFilter()">
           <label for="filterBtn">Filter even more</label>
    

       </article>

           <div id="flexPersons">
           </div>

      `

    }

    appendPersons(persons) {
        let template = "";
        for (const person of persons) {


            template += /*html*/ ` <article class="profile" id="ID${person.login.uuid}" onclick="goToDetailView(this.id)"> <img src="${person.picture.thumbnail}" alt="thumbnail"> 
             <div> ${person.name.first}
            ${person.name.last} </div>
            </article >
            `;

        }
        document.querySelector('#flexPersons').innerHTML = template;
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


    // Option values from the api to the select gender box
    //.............................................................
    // createTimezoneOptions() {
    //     let filteredProperties = [];

    //     // Add the property to the array if the value isn´t there allready
    //     for (const person of this.data) {
    //         if (filteredProperties.indexOf(person.location.timezone.offset) === -1) {
    //             filteredProperties.push(person.location.timezone.offset);
    //         }
    //     }
    //     filteredProperties.sort();

    //     // Create options for the select box based on the dublicate-free array
    //     for (const value of filteredProperties) {
    //         var select = document.getElementById("timezone");
    //         var option = document.createElement("option");

    //         // Insert the values to options
    //         option.text = value;

    //         // Create option
    //         select.add(option);
    //     }
    // };



    filter(firstName, username, lastName, email, cell, gender) {
        let filteredArr = [];

        let firstNameElm = document.querySelector(`#${firstName}`).value.toLowerCase();
        let lastNameElm = document.querySelector(`#${lastName}`).value.toLowerCase();
        let usernameElm = document.querySelector(`#${username}`).value.toLowerCase();
        // let timezoneElm = document.querySelector(`#${timezone}`)
        // let adressElm = document.querySelector(`#${adress}`);
        let emailElm = document.querySelector(`#${email}`).value.toLowerCase();
        let cellElm = document.querySelector(`#${cell}`).value.toLowerCase();
        let genderElm = document.querySelector(`#${gender}`).value.toLowerCase();

        // let first = firstNameElm.value.toLowerCase();
        console.log(firstNameElm)

        filteredArr = this.data.filter(person =>
            person.name.first.includes(firstNameElm) &&
            person.name.last.includes(lastNameElm.value) &&
            person.login.username.includes(usernameElm.value) &&
            person.email.includes(emailElm.value) &&
            person.cell.includes(cellElm.value) &&
            person.gender === genderElm.value

        )
        this.appendPersons(filteredArr);

    }

    showFilter() {
        let checkBox = document.querySelector('#filterBtn')
        let filter = document.querySelector('#filterInputs').querySelectorAll('.filter');
        for (const input of filter) {
            input.classList.toggle('displayNone');
        }

        let label = document.querySelector('[for="filterBtn"]')
        if (checkBox.checked == true) {
            label.innerHTML = "Less filtering"
        } else {
            label.innerHTML = "Even more filtering"
        }
    }
}