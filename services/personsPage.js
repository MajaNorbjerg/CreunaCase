class AppendPersons {
    constructor() {

    }

    appendPosts(data) {
        for (const dataset of data) {
            // let newData = {}
            // console.log(dataset)

            document.querySelector('#profile').innerHTML += `<article class="profile"><div class="imgDiv"><div><img src="${dataset.picture.thumbnail}" alt="thumbnail"></div></div><div>${dataset.name.first} ${dataset.name.last}</div></article>
        `;

        }
    }
}
const appendPersons = new AppendPersons();
export default appendPersons;