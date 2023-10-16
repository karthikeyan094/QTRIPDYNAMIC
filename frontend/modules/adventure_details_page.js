import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const adventureId = urlParams.get("adventure");
  // console.log(adventureId);

  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let responseData = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let adventureDetails = await responseData.json();
    return adventureDetails;
  }catch(error){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.querySelector("#adventure-name").textContent = adventure["name"];
  document.querySelector("#adventure-subtitle").textContent = adventure["subtitle"];
  document.querySelector("#adventure-content").textContent = adventure["content"];
  let photoGallery = document.querySelector("#photo-gallery");
  let photoGalleryDom ="";
  adventure["images"].forEach((image)=>{
    photoGalleryDom+=`<img src="${image}" class="d-block w-100 activity-card-image" style="width:100%;height:500px;" alt="...">`;
  });
  photoGallery.innerHTML = photoGalleryDom;
  // console.log(adventure);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.querySelector("#photo-gallery");
  photoGallery.textContent="";
  let carouselDom = createCarousel(images);
  photoGallery.innerHTML = carouselDom;
  document.querySelector(".carousel-item").classList.add("active");
}
function createCarousel(images){
  let carouselDom=`
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">`;
  images.forEach((image)=>{
    carouselDom+=` <div class="carousel-item activity-card-image ">
    <img src="${image} class="d-block w-100" style="width:100%;height:500px;" alt="...">
  </div>`
  });
  carouselDom+=`</div><button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`
return carouselDom;
}
//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure["available"]){
    document.querySelector("#reservation-panel-sold-out").style.display='none';
    document.querySelector("#reservation-panel-available").style.display='block';
    document.querySelector("#reservation-person-cost").textContent = adventure["costPerHead"];

  }else{
    document.querySelector("#reservation-panel-available").style.display='none';
    document.querySelector("#reservation-panel-sold-out").style.display='block';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(adventure,persons);
  
  document.querySelector("#reservation-cost").textContent= adventure["costPerHead"] * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log("formdata");
  console.log(adventure);
  let formData={};
  let reservationForm = document.querySelector("#myForm");
  reservationForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(reservationForm.elements[0].value);
    formData["name"] = reservationForm.elements[0].value;
    formData["date"] = reservationForm.elements[1].value;
    formData["person"] = reservationForm.elements[2].value;
    formData["adventure"] = adventure["id"];
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      };
      fetch(`${config.backendEndpoint}/reservations/new`, options)
  .then(data => {
      if (data.ok) {
        alert("Success!!");
       }else{
        alert("Failed!");
       }
      }).catch(e => {
      console.log(e);
      });
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure["reserved"]){
    document.querySelector("#reserved-banner").style.display='block';
  }else{
    document.querySelector("#reserved-banner").style.display='none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
