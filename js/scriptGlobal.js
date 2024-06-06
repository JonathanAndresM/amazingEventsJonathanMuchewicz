
export function createCard(cardContainer, card) {
    let divCard = document.createElement("div");
    divCard.classList.add("card", "py-3", "mb-2", "ms-2", "shadow-card");
    divCard.style.width = "15rem";

    divCard.innerHTML = `<img src="${card.image}" class="card-img-top rounded-top img-card" alt = "${card.name}" >
      <div class="card-body h-25">
          <h5 class="card-title">${card.name}</h5>
          <p class="card-text">${card.description}</p>
      </div>
      <div class="card-body d-flex justify-content-between align-items-center">
          <h6 class="card-title">Price ${card.price}</h6>
          <a href="/details.html?id=${card._id}" class="btn btn-outline-danger">Details</a>
      </div>`

    cardContainer.appendChild(divCard)
}

export function createCheck(array, container) {
    array.forEach((e) => {
        let divCategory = document.createElement("div");
        divCategory.classList.add("container-fluid", "d-flex", "row", "col-12", "col-md-10", "col-lg-7", "justify-content-center", "w-auto", "m-1")
        divCategory.innerHTML = `<div class="form-check col-3 col-md-1 mx-1 py-1 w-auto">
      <input class="form-check-input my-1 shadow" type="checkbox" value="${e}" id="${e.replace(/\s/g, "").toLowerCase()}">
      <label class="form-check-label fw-bolder" for="${e.replace(/\s/g, "").toLowerCase()}">
      ${e}
      </label>
      </div>`
        container.appendChild(divCategory)
    })
}

export function searchError(container) {
    let message = document.createElement("div")
    message.innerHTML = `<div class="alert alert-danger" role="alert">
    No results found.
  </div>`
  
    container.innerHTML = ""
  
    container.appendChild(message)
  }