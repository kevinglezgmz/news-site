import { PRIVATE_KEY } from "../../assets/scripts/privateKey.js";
axios
    .get(`https://newsapi.org/v2/everything?q=Apple&from=2021-09-28&sortBy=popularity&apiKey=${PRIVATE_KEY}`)
    .then((response) => {
    const templateSource = document.getElementById("grid-source").innerHTML;
    const template = Handlebars.compile(templateSource);
    document.getElementById("grid").innerHTML = template({
        news: response.data.articles,
    });
})
    .catch((err) => {
    console.log(err);
});
