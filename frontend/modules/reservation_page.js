import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let response = await fetch(`${config.backendEndpoint}/reservations`);
    let reservations = await response.json();
    return reservations;

  }catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length===0){
    document.querySelector("#no-reservation-banner").style.display='block';
    document.querySelector("#reservation-table-parent").style.display='none';
    return;
  }else{
    document.querySelector("#no-reservation-banner").style.display='none';
    document.querySelector("#reservation-table-parent").style.display='block';
  }
  let tableBody = document.querySelector("#reservation-table");
  reservations.forEach((reservation)=>{
    let tableRow = document.createElement('tr');
  tableRow.innerHTML=`
    <td><b>${reservation["id"]}</b></td>
    <td>${reservation["name"]}</td>
    <td>${reservation["adventureName"]}</td>
    <td>${reservation["person"]}</td>
    <td>${new Date(reservation["date"]).toLocaleDateString('en-IN',{  year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
    <td>${reservation["price"]}</td>
    <td>${new Date(reservation["time"]).toLocaleString('en-IN',{dateStyle:'long',timeStyle:'medium'}).replace(' at',',')}</td>
    <td id="${reservation["id"]}"><a type="button"  href='/frontend/pages/adventures/detail/?adventure=${reservation["adventure"]}' class="reservation-visit-button ">Visit Adventure</a></td>
  `;
  tableBody.append(tableRow);
  })
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
