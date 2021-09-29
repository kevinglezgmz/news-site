import { PRIVATE_KEY } from "../../assets/scripts/privateKey.js";

declare let Handlebars;
declare let axios;

const searchBtn = <HTMLButtonElement>document.getElementById("search-btn");

function fetchNews(event: MouseEvent) {
  const newsUri = getNewsUri();
  if (newsUri) {
    axios.get(newsUri).then(setNewsHandlebars).catch(logRequestError);
  }
}

function getNewsUri(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const from = yesterday.toDateString();

  const searchInput = <HTMLInputElement>document.getElementById("search-input");
  const q = searchInput.value;
  if (q !== "") {
    return `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=popularity&apiKey=${PRIVATE_KEY}`;
  }
}

function setNewsHandlebars(response: any) {
  const templateSource = document.getElementById("grid-source").innerHTML;
  const template = Handlebars.compile(templateSource);
  document.getElementById("grid").innerHTML = template({
    news: response.data.articles,
  });
}

function logRequestError(err: any) {
  console.log(err);
}

searchBtn.addEventListener("click", fetchNews);
