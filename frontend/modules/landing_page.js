import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let responseData = await fetch(`${config.backendEndpoint}/cities`);
    let data = await responseData.json();
    // console.log(data);
    return data;
  }catch(err){
    return null;
  }
 

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
 
  let divContainer = document.querySelector("#data");
  let divChildContainer = document.createElement("div");
  divChildContainer.setAttribute("class","col-lg-3 col-md-6 col-sm-12 mb-4 t1");
  // divChildContainer.setAttribute("id",`${id}`);
  divChildContainer.innerHTML= `
  <div class="tile" >
  
    <div class="tile-text">
      <h5>${city}</h5>
      <h5>${description}</h5>
    </div>
    <a id="${id}" href="pages/adventures/?city=${id}">
    <img src="${image}" alt="" />
    </a>
  </div>
  `
  divContainer.append(divChildContainer);
  
{/* <div class="col-lg-3 col-6 mb-3">
            <a href="./resort/index.html">
            <div class="card c-tile">
              <img class="card-img-top" src="../../assets/adventures/resort.jpg" alt="">
              <div class="card-body d-flex justify-content-lg-between justify-content-center flex-lg-row flex-column align-items-center">
                <p class="card-text">Resort</p>
                <p>₹1,200</p>
              </div>
            </div>
            </a>
          </div> */}
  
}

export { init, fetchCities, addCityToDOM };
