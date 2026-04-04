export class Ship {
    constructor (length,hits){
        this.length = length
        this.hits = hits
        this.hits = 0
    }
    hit () {
        this.hits = this.hits + 1
        return this.hits
    }
    isSunk (){
        if (this.hits >= this.length){
            return true
        } else {
            return false
        }
    }
}
