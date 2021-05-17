import { deleteReservation, getClowns, getReservations, saveCompletion } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")

export const Reservations = () => {
    const reservations = getReservations()
    let html = `
    <section class="reservations-display">
    <div class="reservations__header">
    <div class="reservations__title">Party for:</div>
    <div class="reservations__performer">Performed by:</div> 
    </div>
    <div class="reservations">
    ${reservations.map(convertResToDivElement).join("")
        }
    </div>
    </section>`
    return html
}

const convertResToDivElement = (reservation) => {
    const clowns = getClowns()
    return `
    <div class="reservation">
    <div class="reservation__childName">${reservation.childName}</div>
    <div class="reservation__performer">
    <select class="clowns" id="clowns">
    <option value="0">Choose</option>
    ${clowns.map(
        clown => {
            return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
        }
    ).join("")
        }
        </select>
    </div>
    <div class="reservation__deny">
    <button class="delete-button"id="reservation--${reservation.id}">Deny</button>
    </div>
    </div>`
}

document.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "clowns") {
        const [reservationId, clownId] = changeEvent.target.value.split("--")
        const timestamp = Date.now()
        const date_created = new Date(timestamp).toLocaleDateString("en-US")
        const completion = {
            "reservationId": parseInt(reservationId),
            "clownId": parseInt(clownId),
            "date_created": date_created
        }
        saveCompletion(completion)
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("reservation--")) {
        const [, resId] = clickEvent.target.id.split("--")
        deleteReservation(parseInt(resId))
    }
})