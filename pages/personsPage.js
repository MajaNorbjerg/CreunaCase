import personService from "../services/personService.js"
export default class PersonsPage {
    constructor() {
        this.data = [];
        this.filteredPersons = [];
        this.template();
        this.initData();
    }

    async initData() {
        // let persons = await personService.loadPersons();
        // console.log(await this.data)
        this.data = await personService.loadPersons();
        this.appendPersons(this.data);
        this.createGenderOptions();
        this.createTimezoneOptions();

    }
    template() {
        document.querySelector('#profile').innerHTML += /*html*/ `
   
           <h2>Persons</h2>

           <div id="flexPersons">
           </div>

      `

    }

    appendPersons(persons) {
        let template = "";
        for (const person of persons) {



            template += /*html*/ ` <article class="profile" onclick="goToDetailView('${person.login.username}')"> <img src="${person.picture.thumbnail}" alt="thumbnail"> 
             <div> ${person.name.first}
            ${person.name.last} </div>
            </article >
            `;

        }
        document.querySelector('#flexPersons').innerHTML = template;
    }

    search1And2(searchValue, mainProperty, property1, property2) {
        searchValue = searchValue.toLowerCase();
        console.log(searchValue);

        // this.filteredPersons = [];
        for (const person of this.data) {
            let prop1 = person[mainProperty][property1].toLowerCase();
            let prop2 = person[mainProperty][property2].toLowerCase();
            if (prop1.includes(searchValue) || prop2.includes(searchValue)) {
                this.filteredPersons.push(person);
            }
        }
        this.appendPersons(this.filteredPersons);
    }

    search2And2(searchValue, mainProperty, mainProperty2, property1, property2) {
        searchValue = searchValue.toLowerCase();

        // let filteredPersons = [];
        for (const person of this.data) {
            let prop1 = person[mainProperty][mainProperty2][property1].toString().toLowerCase();
            let prop2 = person[mainProperty][mainProperty2][property2].toLowerCase();
            if (prop1.includes(searchValue) || prop2.includes(searchValue)) {
                this.filteredPersons.push(person);
            }
        }
        this.appendPersons(this.filteredPersons);
    }

    search1(searchValue, property) {


        searchValue = searchValue.toLowerCase();
        // let filteredPersons = [];
        for (const person of this.data) {
            console.log(person[property])
            let theProperty = person[property].toLowerCase();
            if (theProperty.includes(searchValue)) {
                this.filteredPersons.push(person);
            }
        }
        this.appendPersons(this.filteredPersons);
    }

    search3(searchValue, property, property2, property3) {
        searchValue = searchValue.toLowerCase();
        // let filteredPersons = [];
        for (const person of this.data) {
            let theProperty = person[property][property2][property3].toLowerCase();
            if (theProperty.includes(searchValue)) {
                this.filteredPersons.push(person);
            }
        }
        this.appendPersons(this.filteredPersons);
    }

    search1And1(searchValue, mainProperty, property1) {
        searchValue = searchValue.toLowerCase();
        console.log(searchValue);

        // let filteredPersons = [];
        for (const person of this.data) {
            let prop1 = person[mainProperty][property1].toLowerCase();

            if (prop1.includes(searchValue)) {
                this.filteredPersons.push(person);
            }
        }
        this.appendPersons(this.filteredPersons);
    }

    // var input, filter, ul, li, a, i, txtValue;
    // input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    // ul = document.getElementById("myUL");
    // li = ul.getElementsByTagName("li");
    // for (i = 0; i < li.length; i++) {
    //     a = li[i].getElementsByTagName("a")[0];
    //     txtValue = a.textContent || a.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //         li[i].style.display = "";
    //     } else {
    //         li[i].style.display = "none";
    //     }
    // }

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
    createTimezoneOptions() {
        let filteredProperties = [];

        // Add the property to the array if the value isn´t there allready
        for (const person of this.data) {
            if (filteredProperties.indexOf(person.location.timezone.offset) === -1) {
                filteredProperties.push(person.location.timezone.offset);
            }
        }
        filteredProperties.sort();

        // Create options for the select box based on the dublicate-free array
        for (const value of filteredProperties) {
            var select = document.getElementById("timezone");
            var option = document.createElement("option");

            // Insert the values to options
            option.text = value;

            // Create option
            select.add(option);
        }
    };
}