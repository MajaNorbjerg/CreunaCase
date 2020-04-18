import personService from "../services/personService.js"
export default class PersonsPage {
    constructor() {
        this.data = personService.loadPersons();
        this.template();
        this.initData();
    }

    async initData() {
        // let persons = await personService.loadPersons();
        // console.log(await this.data)

        this.appendPersons(await this.data);

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



            template += /*html*/ ` <article class = "profile"> <div class = "imgDiv"> <div> <img src = "${person.picture.thumbnail}" alt = "thumbnail"> 
            </div></div > <div> ${person.name.first}
            ${person.name.last} </div>
            </article >
            `;

        }
        document.querySelector('#flexPersons').innerHTML = template;
    }

    async search(searchValue) {
        searchValue = searchValue.toLowerCase();
        console.log(searchValue);

        let filteredPersons = [];
        for (const person of await this.data) {
            let firstName = person.name.first.toLowerCase();
            let lastName = person.name.last.toLowerCase();
            if (firstName.includes(searchValue) || lastName.includes(searchValue)) {
                filteredPersons.push(person);
            }
        }
        console.log(await this.data)
        this.appendPersons(filteredPersons);
    }

    async myFunction(searchValue, property) {

        searchValue = searchValue.toLowerCase();
        let filteredPersons = [];
        for (const person of await this.data) {
            console.log(property)
            let theProperty = person[property].toLowerCase();
            console.log(theProperty)
            if (theProperty.includes(searchValue)) {
                filteredPersons.push(person);
            }
        }
        this.appendPersons(filteredPersons);





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
    }



}