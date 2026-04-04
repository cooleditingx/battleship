import { Ship } from "./Ship.js"
import { PlaceRanShips } from "./shipPlacement.js"

export class GameBoard {
    constructor () {
        this.shipArr = []
        this.missedAttacks = []
        this.hits = []
    }
    placeShip (ship, coordinates){
        let check = true  
        coordinates.forEach(coordinate => {
            let x = coordinate[0]
            let y = coordinate[1]
            if (x < 0 || x >= 10 || y < 0 || y >= 10){
                check = false
            }
        })
        
        this.shipArr.forEach(shipobj => {
            shipobj.coordinates.forEach(oldcoord => {
                coordinates.forEach(newcoord => {
                    if (oldcoord[0] === newcoord[0] && oldcoord[1] === newcoord[1]){
                        check = false
                    }
                })
            })
        })
        if (check === false){
            return false
        }
        if (ship.length !== coordinates.length) {
            return false
        }
        this.shipArr.push({
            ship: ship,
            coordinates: coordinates
        })
        return true
    }
    receiveAttack (coordinates){
        for (let c = 0; c < this.missedAttacks.length; c++){
            if (coordinates[0] === this.missedAttacks[c][0] && 
                coordinates[1] === this.missedAttacks[c][1]){
                return false
            }
        }
        for (let c = 0; c < this.hits.length; c++){
            if (coordinates[0] === this.hits[c][0] && 
                coordinates[1] === this.hits[c][1]){ 
                return false
            }
        }
        let hit = false
        let hitShip = null
        this.shipArr.forEach(shipobj => {
            shipobj.coordinates.forEach(oldcoord => {
                if (oldcoord[0] === coordinates[0] && 
                    oldcoord[1] === coordinates[1]){
                    hit = true
                    hitShip = shipobj.ship
                }
            })
        })
        if (hit === true){
            hitShip.hit()
            this.hits.push(coordinates)
            return true
        } 
        this.missedAttacks.push(coordinates)
        return false   
    }
    shipsSunk (){
        if (this.shipArr.length === 0){
            return false
        }
        let count = 0
        this.shipArr.forEach(shipobj => {
            if (shipobj.ship.isSunk()){
                count = count + 1
            }
        })
        if (count === this.shipArr.length){
            return true
        }
        return false
    }
    placeShipRandomly(){
        PlaceRanShips(this)
    }
}