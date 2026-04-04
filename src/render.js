export function createGameboard(container,gridclass){
    container.innerHTML = ""
    container.classList.add(gridclass)
    for (let x = 0; x < 10; x++){
        for (let y = 0; y < 10; y++){
            let div = document.createElement("div")
            div.setAttribute("data-row", x)
            div.setAttribute("data-col", y)
            div.className = "cell"
            container.appendChild(div)
        }
    }
}
export function renderShip(coordinates, shipLength, gridContainer) {
    for (let i = 0; i < coordinates.length; i++) {
        const row = coordinates[i][0]
        const col = coordinates[i][1]
        const cell = gridContainer.querySelector(`[data-row="${row}"][data-col="${col}"]`)
        if (cell) {
            if (gridContainer == playergameboard){
                const className = `ship-${shipLength}`
                cell.classList.add('ship')
                cell.classList.add(className)
            } else if (gridContainer == computergameboard){
                const className = `compShip-${shipLength}`
                cell.classList.add('ship')
                cell.classList.add(className)
            }
            
        }
    }
}
export function renderAllShips(gameboardObject, gridContainer){
    gameboardObject.shipArr.forEach(shipObject => {
        const length = shipObject.ship.length
        const coordinates = shipObject.coordinates
        renderShip(coordinates, length, gridContainer)
    })
}
export function updateCell(row, col, isHit, container){
    const cell = container.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    
    if (cell) {
        if (isHit) {
            cell.classList.add("attack")
        } else {
            cell.classList.add('miss')
        }
    }
}
export function eventHandlers(container, callback){
    const cells = container.querySelectorAll(".cell")
    cells.forEach(cell => {
        cell.addEventListener("click", function(event){
            if (event.target.classList.contains("hit") || 
                event.target.classList.contains("miss")){
                return
            }
            const row = parseInt(event.target.getAttribute("data-row"))
            const col = parseInt(event.target.getAttribute("data-col"))
            callback([row, col])
        })
    })
}
export function displayMessage(message) {
    let dialog = document.getElementById("pop-up")
    dialog.showModal()
    const messageElement = document.getElementById('displayMessage')
    if (messageElement) {
        messageElement.textContent = message
    }
}