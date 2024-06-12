import * as functionGlobal from "./module/scriptGlobal.js"
const urlApi = "https://aulamindhub.github.io/amazing-api/events.json"
let idDetails = new URL(window.location.href).searchParams.get("id");
let apiEvents = [];
let eventsDetails =[];
fetch(urlApi)
  .then(response => response.json())
  .then(data => {
    apiEvents = data
    eventsDetails = apiEvents.events.filter(event => event._id == idDetails);
    if (eventsDetails.length != 0) {
      detailsCard(eventsDetails);
    } else {
      functionGlobal.searchError(cardDetails)
      console.error("Event not found")
    }
  })
.catch(error => {
  console.error("Fetch error:",error);
  functionGlobal.searchError(cardDetails)
});

function detailsCard(eventsDetails) {

  let cardDetails = document.getElementById("cardDetails");

  if (eventsDetails.length > 0) {
    eventsDetails = eventsDetails[0];
    let divDetails = document.createElement("div");
    divDetails.classList.add("card", "w-100", "rounded-4");
    divDetails.innerHTML = `<div class="row g-0 p-3 rounded-4 shadow-card-details">
      <div class="col-md-4">
        <img src="${eventsDetails.image}" class="img-fluid rounded-4 w-auto img-card-details" alt="${eventsDetails.name}">
      </div>
      <div class="col-md-8">
        <div class="card-body p-2">
          <h5 class="card-title h1 text-decoration-underline text-center">${eventsDetails.name}</h5>
          <p class="card-text text-center h5">${eventsDetails.description}</p>
          <p class="card-text text-center h5">${eventsDetails.date < apiEvents.currentDate ? "This event took place on " : "This event will take place on "}${eventsDetails.date || eventsDetails.date}</p>
          <p class="card-text h5">Category: ${eventsDetails.category}</p>
          <p class="card-text h5">Place: ${eventsDetails.place}</p>
          <p class="card-text h5">Capacity: ${eventsDetails.capacity}</p>
          <p class="card-text h5">${eventsDetails.date < apiEvents.currentDate ? "Assistance: " : "Estimate: "}${eventsDetails.assistance || eventsDetails.estimate}</p>
          <p class="card-text h5"><small class="text-body-secondary">Price: ${eventsDetails.price}</small></p>
        </div>
      </div>
    </div>`;
    cardDetails.appendChild(divDetails);
  }
}
