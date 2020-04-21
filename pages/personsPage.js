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
        this.createTimezoneOptions();
        console.log(this.data)

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



            template += /*html*/ ` <article class="profile" id="ID${person.login.uuid}" onclick="goToDetailView(this.id)"> <img src="${person.picture.thumbnail}" alt="thumbnail"> 
             <div> ${person.name.first}
            ${person.name.last} </div>
            ${person.email}
            ${person.cell}
            </article >
            `;

        }
        document.querySelector('#flexPersons').innerHTML = template;
    }

    // search1And2(searchValue, mainProperty, property1, property2) {
    //     searchValue = searchValue.toLowerCase();
    //     console.log(searchValue);

    //     // this.allPersons = [];
    //     for (const person of this.data) {
    //         let element = document.querySelector(`#ID${person.login.uuid}`)
    //         let prop1 = person[mainProperty][property1].toLowerCase();
    //         let prop2 = person[mainProperty][property2].toLowerCase();
    //         if (prop1.includes(searchValue) || prop2.includes(searchValue)) {
    //             element.style.display = ""
    //         } else {
    //             element.style.display = "none";
    //         }
    //     }
    //     // this.appendPersons(this.allPersons);
    // }

    // search2And2(searchValue, mainProperty, mainProperty2, property1, property2) {
    //     searchValue = searchValue.toLowerCase();

    //     for (const person of this.data) {
    //         let element = document.querySelector(`#ID${person.login.uuid}`)

    //         let prop1 = person[mainProperty][mainProperty2][property1].toString().toLowerCase();
    //         let prop2 = person[mainProperty][mainProperty2][property2].toLowerCase();
    //         if (prop1.includes(searchValue) || prop2.includes(searchValue) && (element.style.display = 'inline')) {
    //             // element.style.display = ""
    //         } else {
    //             element.style.display = "none";
    //         }
    //     }
    //     // this.appendPersons(this.allPersons);
    // }

    // search1(searchValue, property) {


    //     searchValue = searchValue.toLowerCase();
    //     // let allPersons = [];
    //     for (const person of this.data) {
    //         let element = document.querySelector(`#ID${person.login.uuid}`)

    //         let theProperty = person[property].toLowerCase();
    //         if (theProperty.includes(searchValue) && (element.style.display = 'inline')) {
    //             // element.style.display = ""
    //         } else {
    //             element.style.display = "none";
    //         }
    //     }
    //     // this.appendPersons(this.allPersons);
    // }

    // search3(searchValue, property, property2, property3) {
    //     searchValue = searchValue.toLowerCase();
    //     // let allPersons = [];
    //     for (const person of this.data) {
    //         let element = document.querySelector(`#ID${person.login.uuid}`)
    //         let theProperty = person[property][property2][property3].toLowerCase();
    //         if (theProperty.includes(searchValue) && (element.style.display = 'inline')) {
    //             // element.style.display = ""
    //         } else {
    //             element.style.display = "none";
    //         }
    //     }
    //     // this.appendPersons(this.allPersons);
    // }

    // search1And1(searchValue, mainProperty, property1) {
    //     searchValue = searchValue.toLowerCase();
    //     // console.log(searchValue);

    //     // let allPersons = [];
    //     for (const person of this.data) {
    //         let element = document.querySelector(`#ID${person.login.uuid}`)
    //         let prop1 = person[mainProperty][property1].toLowerCase();

    //         if (prop1.includes(searchValue) && (element.style.display = 'inline')) {
    //             // element.style.display = ""
    //         } else {
    //             element.style.display = "none";
    //         }
    //     }
    //     // this.appendPersons(this.allPersons);
    // }

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

    filter(search, username, timezone, adress, email, cell, gender) {
        let filteredArr = [];
        // console.log(filteredArr)
        console.log(search)
        let nameElm = document.querySelector(`#${search}`)
        let usernameElm = document.querySelector(`#${username}`);
        let timezoneElm = document.querySelector(`#${timezone}`)
        let adressElm = document.querySelector(`#${adress}`);
        let emailElm = document.querySelector(`#${email}`)
        let cellElm = document.querySelector(`#${cell}`);
        let genderElm = document.querySelector(`#${gender}`)

        console.log(usernameElm.value)


        filteredArr = this.data.filter(person =>
            person.name.first.includes(nameElm.value) && person.name.last.includes(nameElm.value) &&
            person.login.username.includes(usernameElm.value) &&
            person.email.includes(emailElm.value) &&
            person.location.street.name.includes(adressElm.value) &&
            // person.location.street.value.toString().includes(adressElm.value) &&
            person.cell.includes(cellElm.value) &&
            person.gender === genderElm.value
            // person.location.timezone.offset === timezoneElm.value

        )
        console.log(filteredArr)
        this.appendPersons(filteredArr);



    }

    // filter() {


    //     let allPersons = this.data;


    //     let filteredPersons = []
    //     // console.log(allPersons)
    //     // console.log(this.data)
    //     let newArr = [];
    //     let inputs = document.querySelector('#filterInputs').getElementsByTagName('INPUT');
    //     let selects = document.querySelector('#filterInputs').getElementsByTagName('SELECT');
    //     // console.log(inputs.length, selects.length)
    //     for (const input of inputs) {
    //         if (input.value !== "") {
    //             if (input.id === 'search') {

    //                 for (const person of allPersons) {
    //                     if (person.name.first.includes(input.value) || person.name.last.includes(input.value)) {
    //                         // console.log('det virker måske')
    //                         // console.log(allPersons)
    //                         filteredPersons = allPersons.filter(person => {
    //                             if (person.name.first.includes(input.value) || person.name.last.includes(input.value)) {
    //                                 return person
    //                             }
    //                         })
    //                         console.log(filteredPersons)
    //                         // console.log(allPersons)
    //                     } else {


    //                         // let index = allPersons.indexOf(person);
    //                         // allPersons.splice(index, 1);
    //                         // console.log(allPersons)
    //                         // console.log(allPersons)
    //                     }
    //                 }

    //             }


    //             if (input.id == 'username') {

    //                 for (const person of allPersons) {
    //                     if (person.login.username.includes(input.value)) {
    //                         // console.log('det virker måske')
    //                     } else {
    //                         let index = allPersons.indexOf(person);
    //                         allPersons.splice(index, 1);
    //                     }
    //                 }

    //             }


    //             if (input.id == 'adress') {
    //                 console.log(input.id)
    //                 console.log(allPersons)
    //                 for (const person of allPersons) {
    //                     if (person.location.street.name.includes(input.value) || person.location.street.number.includes(input.value)) {
    //                         // console.log('det virker måske')
    //                     } else {
    //                         let index = allPersons.indexOf(person);
    //                         allPersons.splice(index, 1);
    //                     }
    //                 }

    //             }

    //             if (input.id === 'email') {

    //                 for (const person of allPersons) {
    //                     if (person.email.includes(input.value)) {
    //                         // console.log('det virker måske')
    //                     } else {
    //                         let index = allPersons.indexOf(person);
    //                         allPersons.splice(index, 1);
    //                     }
    //                 }

    //             }

    //             if (input.id == 'cell') {

    //                 for (const person of allPersons) {
    //                     if (person.cell(input.value)) {
    //                         // console.log('det virker måske')
    //                     } else {
    //                         let index = allPersons.indexOf(person);
    //                         allPersons.splice(index, 1);
    //                     }
    //                 }

    //             }
    //         }


    //     }



    //     this.appendPersons(filteredPersons);


    //     // let gender = document.querySelector('#gender');
    //     // let timezone = document.querySelector('#timezone');
    //     // let adress = document.querySelector('#adress');
    //     // let time = "";
    //     // let adr = "";
    //     // for (const person of this.data) {


    //     //     if (timezone.value !== "") {
    //     //         time = `${timezone.value} === ${person.location.timezone.offset}`
    //     //     }
    //     //     if (adress.value !== "") {
    //     //         adr = `${timezone.value} === ${person.location.street.name}`
    //     //     }


    //     //     if (time && adr) {
    //     //         // if (person.gender.includes(gender.value)) {
    //     //         console.log('det matcher')
    //     //     }

    //     // }

    // }
}