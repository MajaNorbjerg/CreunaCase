class PersonService {
    constructor() {
        this.persons;
    }

    async loadPersons() {
        // try {
        let response = await fetch("https://randomuser.me/api/?results=50&inc=gender,name,picture,cell,email,location,login");
        let jsonData = await response.json();
        //   loaderService.show(false);

        this.persons = jsonData.results;
        return jsonData.results;
        // } catch (error) {
        //     console.log('Error getting persons:', error);
        //       loaderService.show(false);
        // }
    }

    getPerson(uuid) {

        let person = this.persons.find(person => person.login.uuid === uuid);
        return person;
    }

}
const personService = new PersonService();
export default personService;