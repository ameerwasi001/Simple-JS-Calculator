import { runInput } from "./interpreter/interpreter.js"

const range = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt)
const signs = [["+"], ["-"], ["*"], ["/", "="]]

// A simpler way to write this would be [[1, 2, 3], [4, 5, 6], [7, 8, 9], ["0", "."]]
const numGrid = 
    new Array(3)
        .fill(0)
        .map(_ => new Array(3))
        .map(arr => arr.fill(0))
        .map((_, ind) => range(3, ind*3+1))
        .concat([["0", "."]])
const grid = numGrid.map((arr, i) => arr.concat(signs[i])).map(arr => arr.map(a => a.toString()))

const mainContainer = document.getElementById("main")
const valueBox = document.getElementById("value")
let got_error = false

mainContainer.appendChild(document.createElement("br"))

const change = i => {
    if (got_error){
        got_error = false
        valueBox.value = ""
    }
    valueBox.value += i
}

const evaluate = () => {
    try {valueBox.value = runInput(valueBox.value)}
    catch (error){
        got_error = true
        valueBox.value = error
    }
}

for (const a of grid){
    for(const i of a){
        const button = document.createElement("button")
        button.innerHTML = i
        button.className = "button"
        button.onclick = _ => i === "=" ? evaluate() : change(i)
        mainContainer.appendChild(button)
    }
    const br = document.createElement("br")
    mainContainer.appendChild(br)
}