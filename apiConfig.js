import appendPersons from "./services/personsPage.js";


let url = "https://randomuser.me/api/?results=50&inc=gender,name,picture,cell,email,location,login";






function fetchData() {
    let personArr = [];
    fetch(url)

        .then(function (response) {

            return response.json();

        })


        .then(function (data) {

            console.log(data.results);

            personArr = data.results;

            appendPersons.appendPosts(personArr);


        });


}
fetchData();





// class FetchPersons {
//     constructor() {
//         this.url = "https://randomuser.me/api/?results=50&inc=gender,name,picture,cell,email,location,login";


//         // this.personArr = [];
//         this.fetchData();
//         // console.log(this.personArr)
//     }

//     fetchData() {
//         let personArr = [];
//         fetch(this.url)

//             .then(function (response) {

//                 return response.json();

//             })


//             .then(function (data) {

//                 console.log(data.results);

//                 personArr = data.results;

//                 appendPersons.appendPosts(personArr);


//             });


//     }

// }
// const fetchPersons = new FetchPersons();
// export default fetchPersons;