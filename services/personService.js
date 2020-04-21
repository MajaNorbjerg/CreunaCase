class PersonService {
    constructor() {
        this.persons;
    }

    //.................... Service for fetching data from randomuser.me ....................
    async loadPersons() {
        let response = await fetch("https://randomuser.me/api/?results=50&inc=gender,name,picture,cell,email,location,login"); // Fetch data from randomuser.me
        let jsonData = await response.json(); // Save the data as JSON

        this.persons = jsonData.results; // Save the JSON data in a "global" variable
        return jsonData.results; //return the JOSN data
    }

    //.................... Service for finding the specific user for detail view ....................
    getPerson(uuid) {

        let person = this.persons.find(person => person.login.uuid === uuid); // Find the user with the matching user id
        return person; // Return the person
    }

}
const personService = new PersonService();
export default personService;