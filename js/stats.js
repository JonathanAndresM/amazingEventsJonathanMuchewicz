let urlApi = "https://aulamindhub.github.io/amazing-api/events.json"

let apiEvents = [];
let upcomingEvents = [];
let pastEvents = [];

fetch(urlApi)
    .then(data => data.json())
    .then(data => {
        apiEvents = data.events
        upcomingEvents = apiEvents.filter(event => new Date(data.currentDate) < new Date(event.date))
        pastEvents = apiEvents.filter(event => new Date(data.currentDate) > new Date(event.date))

        eventsClassifications(pastEvents, apiEvents)
        tableUpcomingCategory(upcomingEvents)
        tablePastCategory(pastEvents)
    })


function eventsClassifications(events, apiEvents) {
    let tableClassifications = document.getElementById("table");
    let tbodyClassifications = document.createElement("tbody");
    tableClassifications.classList.add("text-center", "border-dark");

    tableClassifications.innerHTML = `
            <tr>
                <th colspan="3" scope="row" class="text-light bg-dark">Events Statistics</th>
            </tr>
            <tr>
                <td class="bg-dark-subtle">Event with highest % of attendance</td>
                <td class="bg-dark-subtle">Event with lowest % of attendance</td>
                <td class="bg-dark-subtle">Event with largest capacity</td>
            </tr>
        `;

    let highestAttendanceEvent = events.reduce((prev, current) => (prev.assistance / prev.capacity > current.assistance / current.capacity) ? prev : current);
    let lowestAttendanceEvent = events.reduce((prev, current) => (prev.assistance / prev.capacity < current.assistance / current.capacity) ? prev : current);
    let largestCapacityEvent = apiEvents.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current);

    let result = document.createElement("tr")
    result.innerHTML =
        `<td class="border">${highestAttendanceEvent.name}</td>
        <td class="border">${lowestAttendanceEvent.name}</td>
        <td class="border">${largestCapacityEvent.name}</td>
        `
        tbodyClassifications.appendChild(result)
    tableClassifications.appendChild(tbodyClassifications);
}

function tableUpcomingCategory(upcomingEvents) {
    let tableUpcoming = document.getElementById("table");
    let tbodyUpcoming = document.createElement("tbody");
    tbodyUpcoming.classList.add("text-center", "border-dark");
    tbodyUpcoming.innerHTML = `
    <tr>
        <th colspan="3" scope="row" class="text-light bg-dark">Upcoming events statistics by category</th>
    </tr>
    <tr>
        <td class="bg-dark-subtle">Categories</td>
        <td class="bg-dark-subtle">Revenues</td>
        <td class="bg-dark-subtle">Porcentage of assistance</td>
    </tr>
    <tr>
        
    </tr>
`;
    let categoryStats = {};

    upcomingEvents.forEach(event => {
        let revenue = event.price * event.estimate;

        if (!categoryStats[event.category]) {
            categoryStats[event.category] = {
                totalRevenue: 0,
                totalEstimate: 0,
                totalCapacity: 0,
                totalAssistance: 0
            };
        }

        categoryStats[event.category].totalRevenue += revenue;
        categoryStats[event.category].totalEstimate += event.estimate;
        categoryStats[event.category].totalCapacity += event.capacity;
        categoryStats[event.category].totalAssistance += event.assistance;
    });

    for (let category in categoryStats) {
        let categoryData = categoryStats[category];
        let revenue = categoryData.totalRevenue;
        let percentage = (categoryData.totalEstimate / categoryData.totalCapacity) * 100;

        let result = document.createElement("tr");
        result.innerHTML = `
            <td class="border">${category}</td>
            <td class="border">${new Intl.NumberFormat().format(revenue)}</td>
            <td class="border">${percentage.toFixed(0)}%</td>
        `;
        tbodyUpcoming.appendChild(result);
    }

    tableUpcoming.appendChild(tbodyUpcoming);
}

function tablePastCategory(pastEvents) {
    let tablePast = document.getElementById("table");
    let tbodyPast = document.createElement("tbody");
    tbodyPast.classList.add("text-center", "border-dark");
    tbodyPast.innerHTML = `
    <tr>
        <th colspan="3" scope="row" class="text-light bg-dark">Past events statistics by category</th>
    </tr>
    <tr>
        <td class="bg-dark-subtle">Categories</td>
        <td class="bg-dark-subtle">Revenues</td>
        <td class="bg-dark-subtle">Porcentage of assistance</td>
    </tr>
    <tr>
        
    </tr>
`;
    let categoryStats = {};

    pastEvents.forEach(event => {
        let revenue = event.price * event.assistance;

        if (!categoryStats[event.category]) {
            categoryStats[event.category] = {
                totalRevenue: 0,
                totalEstimate: 0,
                totalCapacity: 0,
                totalAssistance: 0
            };
        }

        categoryStats[event.category].totalRevenue += revenue;
        categoryStats[event.category].totalEstimate += event.estimate;
        categoryStats[event.category].totalCapacity += event.capacity;
        categoryStats[event.category].totalAssistance += event.assistance;
    });

    for (let category in categoryStats) {
        let categoryData = categoryStats[category];
        let revenue = categoryData.totalRevenue;
        let percentage = (categoryData.totalAssistance / categoryData.totalCapacity) * 100;

        let result = document.createElement("tr");
        result.innerHTML = `
            <td class="border">${category}</td>
            <td class="border">${new Intl.NumberFormat().format(revenue)}</td>
            <td class="border">${percentage.toFixed(0)}%</td>
        `;
        tbodyPast.appendChild(result);
    }

    tablePast.appendChild(tbodyPast);
}
