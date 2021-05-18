import { deleteReservation, getClowns, getCompletions, getReservations, saveCompletion } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")

export const Reservations = () => {
    const reservations = getReservations()
    const completions = getCompletions()

    let reservationsCompleted = reservations.map(reservation => {
        if (completions.length === 0) {
            reservation.completed = false
        } else {
            for (const completion of completions) {
                if (completion.reservationId === reservation.id) {
                    reservation.completed = true
                    return reservation
                }
                reservation.completed = false
            }
        }
        return reservation
    })

    reservationsCompleted.sort((a, b) => a.completed - b.completed)

    let html = `
    <section class="reservations-display">
    <div class="reservations__header">
    <div class="reservations__title">Party for:</div>
    <div class="reservations__performer">Performed by:</div> 
    </div>
    <div class="reservations">
    ${reservationsCompleted.map(convertResToDivElement).join("")
        }
    </div>
    </section>`
    return html
}

const convertResToDivElement = (reservation) => {
    const clowns = getClowns()
    const completions = getCompletions()
    if (reservation.completed === false) {
        return `
        <div class="reservation incomplete">
        <div class="reservation__childName">${reservation.childName}</div>
        <div class="reservation__mods">
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
        </div>
        </div>`
    } else {
        const foundCompletion = completions.find(completion => completion.reservationId === reservation.id)
        const foundClown = clowns.find(clown => clown.id === foundCompletion.clownId)
        return `
        <div class="reservation complete">
        <div class="reservation__childName">${reservation.childName}</div>
        <div class="reservation__mods">
        <div class="reservation__performer">
        ${foundClown.name}
        </div>
        <div class="reservation__deny">
        <button class="delete-button"id="reservation--${reservation.id}">Delete</button>
        </div>
        </div>
        </div>`
    }
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