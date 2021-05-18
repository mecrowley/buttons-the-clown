import { ReservationForm } from "./ReservationForm.js"
import { Reservations } from "./Reservations.js";

export const ButtonsTheClown = () => {
    return `
    <header>
    <h1>Buttons and Lollipop The Clowns</h1>
    <h2>Call this # Now! 1-800-BIG-SHOT</h2>
    </header>
    <article class="reservation-form">
    ${ReservationForm()}
    <div class="clown-pic">
    <img class="clowncore" src="../img/callthisnumbernow.jpeg">
    </div>
    </article>
    
    <article class="reservations">
    <h2 class="res__header">Reservations</h2>
    ${Reservations()}
    </article>`
}