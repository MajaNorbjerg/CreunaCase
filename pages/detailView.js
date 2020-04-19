import personService from "../services/personService.js"

export default class DetailView {
    constructor() {
        this.data = [];
        this.initData();
    }

    async initData() {
        // let persons = await personService.loadPersons();
        // console.log(await this.data)
        this.data = await personService.loadPersons();
    }

    template() {
        document.querySelector('#detailView').innerHTML += /*html*/ `
   
           <h2>Persons</h2>

           <div id="flexPersons">
           </div>

      `

    }

    goToDetailView(username) {
        // console.log(username)
        let template = "";
        for (const person of this.data) {
            // console.log(person)
            console.log(person.login.username, username)
            if (person.login.username == username) {
                console.log(person.login.username)

                template += /*html*/ ` <article class = "profile"> <img src="${person.picture.thumbnail}" alt="thumbnail"> 
             <div> ${person.name.first}
            ${person.name.last} </div>
            </article >
            `;
            }
        }
        document.querySelector('#detailView').innerHTML = template;
    }

    // goToDetailView(username) {

    //     console.log(username)
    // }

}