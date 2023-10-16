
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // console.log(search);
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search.slice(6));
  return search.slice(6);

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try{
    let responseData = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let adventures = await responseData.json();
    return adventures;
  }catch(err){
    return null;
  }
 
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let divParentContainer =document.querySelector("#data");
  divParentContainer.innerHTML= "";
  adventures.forEach((adventure)=>{
    let divContainer = document.createElement("div");
    divContainer.setAttribute("class","col-lg-3 col-6 mb-3 ");
    divContainer.innerHTML =`
              <a href="detail/?adventure=${adventure.id}" id="${adventure.id}" >
              <div class="card activity-card c-tile">
                <img class="card-img-top" src="${adventure.image}" alt="">
                <div class="card-body" style="width:100%;">
                <div class="d-flex justify-content-lg-between justify-content-center flex-lg-row flex-column align-items-center" style="width:100%">
                  <p class="card-text">${adventure.name}</p>
                  <p>${adventure.costPerHead}</p>
                </div>
                <div class="d-flex justify-content-lg-between justify-content-center flex-lg-row flex-column align-items-center" style="width:100%">
                  <p class="card-text">Duration</p>
                  <p>${adventure.duration}</p>
                  </div>
                </div>
              </div>
              </a>
    `
    divParentContainer.append(divContainer);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter((place)=>{
    if(place.duration >=low && place.duration<=high){
      return place;
    }
  })
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((spot)=>{
    return categoryList.includes(spot.category);
  })
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  if(filters.duration!=="" && filters.category.length!==0){
    let filteredCategoryList = filterByCategory(list,filters.category);
    let duration = filters.duration.split("-");
    let low = parseInt(duration[0]);
    let high = parseInt(duration[1]);
    let filteredList = filterByDuration(filteredCategoryList,low,high);
    return filteredList;

  }else if(filters.category.length!==0){
    let filteredList = filterByCategory(list,filters.category);
    return filteredList;
  }else if(filters.duration!=""){
    let duration = filters.duration.split("-");
    let low = parseInt(duration[0]);
    let high = parseInt(duration[1]);
    let filteredList = filterByDuration(list,low,high);
    return filteredList;
  }
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
let filters = JSON.parse(localStorage.getItem('filters'));
console.log(filters);
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log(filters);
  let categoryList = filters.category;
  let filterListEle = document.querySelector("#category-list");
  categoryList.forEach((filterEle)=>{
    let pillEle = document.createElement("p");
    pillEle.setAttribute("class","filter-pill-item");
    pillEle.textContent = filterEle;
    filterListEle.append(pillEle);
  })
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
