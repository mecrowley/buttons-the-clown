import { ReservationForm } from "./ReservationForm.js"

export const ButtonsTheClown = () => {
    return `
    <h1>Buttons and Lollipop The Clowns</h1>
    <article class="reservation-form">
    ${ReservationForm()}
    </article>
    
    <article class="reservation-requests">
    <h2>Reservation Requests</h2>
    
    </article>`
}