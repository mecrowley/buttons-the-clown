const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

const applicationState = {
    clowns: [],
    reservations: [],
    completions: []
}

export const getReservations = () => {
    return [...applicationState.reservations]
}

export const getClowns = () => {
    return [...applicationState.clowns]
}

export const getCompletions = () => {
    return [...applicationState.completions]
}

export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (reservationRequests) => {
                // Store the external state in application state
                applicationState.reservations = reservationRequests
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (clowns) => {
                // Store the external state in application state
                applicationState.clowns = clowns
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                applicationState.completions = completions
            }
        )
}

export const sendReservation = (reservation) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    }
    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const deleteReservation = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
