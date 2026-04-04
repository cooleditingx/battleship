import { Ship } from "./Ship"
import {GameBoard} from "./GameBoard.js"
test("placing ship at correct coordinates", ()=>{
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])).toBe(true)
})
test("ship is stored in shipArray", ()=> {
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])
    expect(gameBoard.shipArr.length).toBe(1)
    expect(gameBoard.shipArr[0].coordinates).toEqual([[0,1],[0,2],[0,3]])
    expect(gameBoard.shipArr[0].ship).toEqual(ship)
})
test("multiple ships are placed without overlap", ()=> {
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    let ship2 = new Ship(4,0)
    expect(gameBoard.placeShip(ship,[[0,5],[0,6],[0,8]])).toBe(true)
    expect(gameBoard.placeShip(ship2,[[1,1],[1,2],[1,3],[1,4]])).toBe(true)
    expect(gameBoard.shipArr.length).toBe(2)
})
test("placing ship at wrong coordinates", ()=>{
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[0,1],[-1,2],[0,3]])).toBe(false)
})
test("placing ship at out of bound coordinates", ()=>{
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[8,0],[9,0],[10,0]])).toBe(false)
})
test("multiple ships are placed with overlap", ()=> {
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    let ship2 = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[0,5],[0,6],[0,8]])).toBe(true)
    expect(gameBoard.placeShip(ship2,[[0,5],[0,6],[0,8]])).toBe(false)
    expect(gameBoard.shipArr.length).toBe(1)
})
test("multiple ships are placed with partial overlap", ()=> {
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    let ship2 = new Ship(4,0)
    expect(gameBoard.placeShip(ship,[[0,5],[0,6],[0,8]])).toBe(true)
    expect(gameBoard.placeShip(ship2,[[0,2],[0,6],[0,3]])).toBe(false)
    expect(gameBoard.shipArr.length).toBe(1)
})
test("ship length does'nt match coordinates", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[0,1],[0,2]])).toBe(false)
})
test("ship length does'nt match coordinates", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[0,1],[0,2]],[0,3],[0,4],[0,5],[0,6])).toBe(false)
})
test("record attacks at empty coordinates as miss", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])
    expect(gameBoard.receiveAttack([5,5])).toBe(false)
    expect(gameBoard.hits.length).toBe(0)
    expect(gameBoard.missedAttacks[0]).toEqual([5,5])
})
test("record attacks at multiple empty coordinates as miss", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])
    expect(gameBoard.receiveAttack([5,5])).toBe(false)
    expect(gameBoard.receiveAttack([7,6])).toBe(false)
    expect(gameBoard.receiveAttack([4,7])).toBe(false)
    expect(gameBoard.hits.length).toBe(0)
    expect(gameBoard.missedAttacks[0]).toEqual([5,5])
    expect(gameBoard.missedAttacks[1]).toEqual([7,6])
    expect(gameBoard.missedAttacks[2]).toEqual([4,7])
})
test("record attacks at same coordinates as miss once", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])
    expect(gameBoard.receiveAttack([5,5])).toBe(false)
    expect(gameBoard.receiveAttack([5,5])).toBe(false)
    expect(gameBoard.hits.length).toBe(0)
    expect(gameBoard.missedAttacks.length).toEqual(1)
})
test("record attacks at coordinates as hit", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])
    expect(gameBoard.receiveAttack([0,1])).toBe(true)
    expect(gameBoard.hits[0]).toEqual([0,1])
    expect(ship.hits).toBe(1)
    expect(gameBoard.missedAttacks.length).toEqual(0)
})
test("record attacks at coordinates as hits", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])
    expect(gameBoard.receiveAttack([0,1])).toBe(true)
    expect(gameBoard.receiveAttack([0,2])).toBe(true)
    expect(gameBoard.receiveAttack([0,3])).toBe(true)
    expect(gameBoard.hits[0]).toEqual([0,1])
    expect(gameBoard.hits[1]).toEqual([0,2])
    expect(gameBoard.hits[2]).toEqual([0,3])
    expect(ship.hits).toBe(3)
    expect(gameBoard.missedAttacks.length).toEqual(0)
})
test("record attacks on multiple ships at coordinates as hit", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    let ship2 = new Ship(3,0)
    gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])
    gameBoard.placeShip(ship2,[[0,4],[0,5],[0,6]])
    expect(gameBoard.receiveAttack([0,1])).toBe(true)
    expect(gameBoard.receiveAttack([0,4])).toBe(true)
    expect(gameBoard.hits[0]).toEqual([0,1])
    expect(gameBoard.hits[1]).toEqual([0,4])
    expect(ship.hits).toBe(1)
    expect(ship2.hits).toBe(1)
    expect(gameBoard.missedAttacks.length).toEqual(0)
})
test("record attacks at same coordinates as hit once", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(3,0)
    gameBoard.placeShip(ship,[[0,1],[0,2],[0,3]])
    expect(gameBoard.receiveAttack([0,1])).toBe(true)
    expect(gameBoard.receiveAttack([0,1])).toBe(false)
    expect(gameBoard.hits[0]).toEqual([0,1])
    expect(ship.hits).toBe(1)
    expect(gameBoard.hits.length).toEqual(1)
})
test("no ships test", ()=> {
    let gameBoard = new GameBoard
    expect(gameBoard.shipsSunk()).toBe(false)
})
test("no hits on ships test", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(2,0)
    gameBoard.placeShip(ship,[[0,0],[0,1]])
    let ship2 = new Ship(3,0)
    gameBoard.placeShip(ship2,[[2,2],[2,3],[2,4]])
    expect(gameBoard.shipsSunk()).toBe(false)
})
test("partial hits on ships test", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(2,0)
    gameBoard.placeShip(ship,[[0,0],[0,1]])
    let ship2 = new Ship(3,0)
    gameBoard.placeShip(ship2,[[2,2],[2,3],[2,4]])
    gameBoard.receiveAttack([0,0])
    gameBoard.receiveAttack([2,2])
    expect(gameBoard.shipsSunk()).toBe(false)
})
test("hits on some ships test", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(2,0)
    gameBoard.placeShip(ship,[[0,0],[0,1]])
    let ship2 = new Ship(3,0)
    gameBoard.placeShip(ship2,[[2,2],[2,3],[2,4]])
    gameBoard.receiveAttack([0,0])
    gameBoard.receiveAttack([0,1])
    gameBoard.receiveAttack([2,2])
    expect(gameBoard.shipsSunk()).toBe(false)
})
test("hits on all ships test", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(2,0)
    gameBoard.placeShip(ship,[[0,0],[0,1]])
    let ship2 = new Ship(3,0)
    gameBoard.placeShip(ship2,[[2,2],[2,3],[2,4]])
    gameBoard.receiveAttack([0,0])
    gameBoard.receiveAttack([0,1])
    gameBoard.receiveAttack([2,4])
    gameBoard.receiveAttack([2,3])
    gameBoard.receiveAttack([2,2])
    expect(gameBoard.shipsSunk()).toBe(true)
})
test("placing ship at edge coordinates horizontal", ()=>{
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[9,0],[9,1],[9,2]])).toBe(true)
})
test("placing ship at edge coordinates vertical", ()=>{
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[0,9],[1,9],[2,9]])).toBe(true)
})
test("placing ship at corner coordinates", ()=>{
    let gameBoard = new GameBoard()
    let ship = new Ship(3,0)
    expect(gameBoard.placeShip(ship,[[0,0],[1,0],[2,0]])).toBe(true)
})
test("attack ship at board edge", ()=> {
    let gameBoard = new GameBoard
    let ship = new Ship(1,0)
    gameBoard.placeShip(ship,[[9,9]])
    gameBoard.receiveAttack([9,9])
    expect(ship.hits).toBe(1)
})