const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

const applicationState = {
    clowns: [],
    requests: [],
    completions: []
}

export const getRequests = () => {
    return [...applicationState.requests]
}

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (reservationRequests) => {
                // Store the external state in application state
                applicationState.requests = reservationRequests
            }
        )
}

export const sendRequest = (request) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }
    return fetch(`${API}/requests`, fetchOptions)
    .then(response => response.json())
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        } 
    )
}

