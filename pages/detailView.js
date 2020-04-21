import personService from "../services/personService.js"

export default class DetailView {
    constructor() {
        this.template();
    }

    //HTML template added to #detailView
    //.............................................................
    template() {
        document.querySelector('#detailView').innerHTML += /*html*/ `
        <article>
            <div class="line"> <!-- White background -->
                <button type="button" onclick="goback()">Go back</button> <!-- Back to persons button -->
            </div>
     
         
            <div id="detailViewContent"> <!-- Div for the person data -->
            </div>
          
        </article>
      `

    }


    // Go from person page to the detail view page
    //.............................................................
    goToDetailView(id) {

        let template = "";
        let theId = id.slice(2, id.length); // The id in the DOM has "ID" in front of it, so it dosen´t start with a number. Remove these to caracters to get the person id from the API.     
        let specificPerson = personService.getPerson(theId) // Run the function from personService, which finds the specific data for the choosen person.

        template += /*html*/ ` <!-- Add this data to the template by this variable -->
                <img src="${specificPerson.picture.medium}" alt="medium"> 

                <h2>${specificPerson.name.first}
                ${specificPerson.name.last} </h2>

                <div class="textCollection">
                    <p><b>Username: </b>${specificPerson.login.username}</p>
                    <p><b>Gender: </b>${specificPerson.gender}</p>
                </div>
       
                <div class="textCollection">
                    <p><b>Adress: </b>${specificPerson.location.street.name} ${specificPerson.location.street.number}</p> 
                    <p><b>Timezone: </b>${specificPerson.location.timezone.offset}</p>
                </div>
      
                <div class="textCollection">
                    <p><b>Email: </b><a href="mailto:${specificPerson.email}">${specificPerson.email}</a></p>
                    <p><b>Cell number: </b><a href="tel:${specificPerson.cell}">${specificPerson.cell}</a></p>
                </div>
            
                `;


        document.querySelector('#detailViewContent').innerHTML = template; // Add this template content to the page template
        document.querySelector('#profile').style.display = 'none' // Hide the person page
        document.querySelector('#detailView').style.display = 'block' // Show the detail view
    }


    // Go from detail view page back to the person page
    //.............................................................
    goback() {
        document.querySelector('#detailView').style.display = 'none'; // Hide the detail view
        document.querySelector('#profile').style.display = 'block'; // Show the person page
    }

}