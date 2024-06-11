import * as functionGlobal from "./module/scriptGlobal.js"
const urlApi = "https://aulamindhub.github.io/amazing-api/events.json"

let apiEvents = [];
let categorys = [];
fetch(urlApi)
.then(data => data.json())
.then(data => {
  apiEvents = data.events
  functionGlobal.card(apiEvents, cardContainer)
  categorys = [... new Set(apiEvents.map(event => event.category))]
  functionGlobal.createCheck(categorys, categoryContainer)
})




let cardContainer = document.getElementById("card");
let categoryContainer = document.getElementById("category");

let checkbox = document.getElementById("category")
let search = document.getElementById("search")

checkbox.addEventListener("change", (event) => {
  functionGlobal.filterEvents(apiEvents, cardContainer)
})

search.addEventListener("input", (e) => {
  functionGlobal.filterEvents(apiEvents, cardContainer)
})

