import * as functionGlobal from "./module/scriptGlobal.js"

const urlApi = "https://aulamindhub.github.io/amazing-api/events.json"
let apiEvents = [];
let categorys = [];
let pastEvents = [];

let cardContainer = document.getElementById("card")
let categoryContainer = document.getElementById("category")

fetch(urlApi)
.then(response => response.json())
.then(data => {
  apiEvents = data.events;
  pastEvents = apiEvents.filter(event => new Date(data.currentDate) > new Date(event.date))
  
  functionGlobal.card(pastEvents, cardContainer);
  categorys = [... new Set(apiEvents.map(event => event.category))]
  functionGlobal.createCheck(categorys, categoryContainer);
  
})

functionGlobal.createCheck(categorys, categoryContainer)

let checkbox = document.getElementById("category")
let search = document.getElementById("search")

checkbox.addEventListener("change", (event) => {
  functionGlobal.filterEvents(pastEvents, cardContainer)
})

search.addEventListener("input", (e) => {
  functionGlobal.filterEvents(pastEvents, cardContainer)
})
