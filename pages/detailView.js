import personService from "./../services/personService.js"

export default class DetailView {
    constructor() {
        // this.data = [];
        // this.initData();
        // this.data = personService.persons;
    }

    // async initData() {
    //     // let persons = await personService.loadPersons();
    //     // console.log(await this.data)
    //     this.data = await personService.loadPersons();
    // }

    template() {
        document.querySelector('#detailView').innerHTML += /*html*/ `
   
           <h2>Persons</h2>

           <div id="flexPersons">
           </div>

      `

    }

    goToDetailView(id) {

        let template = "";
        let theId = id.slice(2, id.length);
        personService.getPerson(theId)
        console.log(personService.getPerson(theId))

        for (const person of personService.persons) {
            if (person.login.uuid === theId) {


                template += /*html*/ ` <article> <img src="${person.picture.thumbnail}" alt="thumbnail"> 
             <div> ${person.name.first}
            ${person.name.last} </div>
            </article >
            `;

            }
        }
        document.querySelector('#detailView').innerHTML = template;
        document.querySelector('#detailView').style.display = 'block'
    }

    // goToDetailView(username) {

    //     console.log(username)
    // }

}