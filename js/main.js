async function search(x) {
    let i = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=912aca6291b942f7aff162638241912&q=${x}&days=3`)
    if (i.ok && i.status != 400) {
        let x = await i.json();
        current(x.location, x.current)
        incoming(x.forecast.forecastday)
    }
}


document.getElementById("searchInput").addEventListener("keyup", x => {
    search(x.target.value)
})

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function current(x, i) {
    if (i != null) {
        let e = new Date(i.last_updated.replace(" ", "T"));
        let temp = `<div class="body1 col-lg-4 col-md-12 br1 px-0">
                    <div class="head1 d-inline-flex justify-content-between w-100 py-2 px-2" id="today">
                        <h6>${days[e.getDay()]}</h6>
                        <h6>${e.getDate() + monthNames[e.getMonth()]}</h6>
                    </div>
                    <div class="mt-4 px-3" id="currentWeather">
                        <p class="icons fw-bold">${x.name}</p>
                        <h3>${i.temp_c}<sup>o</sup>C</h3>
                        <img src="https:${i.condition.icon}" alt="status">
                        <p class="text-info">status</p>
                        <div class="row">
                            <div class="d-inline-flex col-4 icons mb-3">
                                <i class="fa-solid fa-cloud-showers-heavy me-1"></i>
                                <p>20%</p>
                            </div>
                            <div class="d-inline-flex col-4 icons">
                                <i class="fa-solid fa-wind me-1"></i>
                                <p>18 km/h</p>
                            </div>
                            <div class="d-inline-flex col-4 icons">
                                <i class="fa-solid fa-location-arrow me-1"></i>
                                <p>East</p>
                            </div>
                        </div>
                    </div>
                </div>
                `
                document.getElementById("myRow").innerHTML = temp
    }
}

function incoming(x) {
    let i = ""
    for (let e = 1; e < x.length; e++)
    i +=`<div class="body2 col-lg-4 col-md-12 px-0">
                <div class="head2 d-inline-flex justify-content-center w-100 py-2">
                    <h6>${days[new Date(x[e].date.replace(" ", "T")).getDay()]}</h6>
                </div>
                <div class="text-center mt-5">
                    <img src="https:${x[e].day.condition.icon}" alt="status" class="my-3">
                    <h3 class="fw-bold">${x[e].day.maxtemp_c}<sup>o</sup>C</h3>
                    <small class="lowerDegree mb-3">${x[e].day.mintemp_c}<sup>o</sup></small>
                    <br>
                    <p class="text-info mt-3">${x[e].day.condition.text}</p>
                </div>
            </div>
            `
            document.getElementById("myRow").innerHTML += i
}

search("cairo");




// function getData() {
//     let myReq = new XMLHttpRequest()

// myReq.open("get","")
// }