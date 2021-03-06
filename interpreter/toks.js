const DIGITS = "0123456789".split("")

const NUMBER = "NUMBER"
const PLUS = "PLUS"
const MINUS = "MINUS"
const MULTIPLY = "MULTIPLY"
const DIVIDE = "DIVIDE"
const EOF = "EOF"
const LPAREN = "LPAREN"
const RPAREN = "RPAREN"

class Token{
    constructor(type_, text=""){
        this.type = type_        
        this.text = text
    }

    toString(){
        return this.text === "" ? this.type : `[${this.type_} : ${this.text}]`
    }
}

export {DIGITS, Token, NUMBER, PLUS, MINUS, MULTIPLY, DIVIDE, EOF, LPAREN, RPAREN}