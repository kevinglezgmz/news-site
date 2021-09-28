import { PRIVATE_KEY } from "../../assets/scripts/privateKey.js";
const searchBtn = document.getElementById("search-btn");
function fetchNews(event) {
    const newsUri = getNewsUri();
    axios.get(newsUri).then(setNewsHandlebars).catch(logRequestError);
}
function getNewsUri() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const from = yesterday.toDateString();
    const searchInput = document.getElementById("search-input");
    const q = searchInput.value;
    return `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=popularity&apiKey=${PRIVATE_KEY}`;
}
function setNewsHandlebars(response) {
    const templateSource = document.getElementById("grid-source").innerHTML;
    const template = Handlebars.compile(templateSource);
    document.getElementById("grid").innerHTML = template({
        news: response.data.articles,
    });
}
function logRequestError(err) {
    console.log(err);
}
searchBtn.addEventListener("click", fetchNews);
