import { sendReservation } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        const userGuardianName = document.querySelector("input[name='guardianName']").value
        const userChildName = document.querySelector("input[name='childName']").value
        const userChildrenNumber = document.querySelector("input[name='childrenNumber']").value
        const userPartyAddress = document.querySelector("input[name='partyAddress']").value
        const userReservationLength = document.querySelector("input[name='reservationLength']").value
        const userReservationDate = document.querySelector("input[name='reservationDate']").value

        const dataToSendToApi = {
            guardianName: userGuardianName,
            childName: userChildName,
            childrenNumber: userChildrenNumber,
            partyAddress: userPartyAddress,
            reservationLength: userReservationLength,
            reservationDate: userReservationDate
        }
        sendReservation(dataToSendToApi)
    }
})

export const ReservationForm = () => {
    let html = `
    <div class="form__fields">
    <h2 class="now-offering">Now offering online reservations!</h2>    
    <div class="field">
            <label class="label" for="guardianName">Guardian Name</label>
            <input type="text" name="guardianName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childrenNumber">Number of children attending</label>
            <input type="number" name="childrenNumber" class="input" />
        </div>
        <div class="field">
            <label class="label" for="partyAddress">Address of party</label>
            <input type="text" name="partyAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationLength">Length of reservation (hours)</label>
            <input type="number" name="reservationLength" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationDate">Date of reservation</label>
            <input type="date" name="reservationDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
        </div>
    `

    return html
}