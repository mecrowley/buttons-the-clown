import { ReservationForm } from "./ReservationForm.js"
import { Reservations } from "./Reservations.js";

export const ButtonsTheClown = () => {
    return `
    <h1>Buttons and Lollipop The Clowns</h1>
    <article class="reservation-form">
    ${ReservationForm()}
    </article>
    
    <article class="reservations">
    <h2>Reservations</h2>
    ${Reservations()}
    </article>`
}