"use strict";

import * as errors from "./errors.js"
import * as lexer from "./errors.js"
import {DIGITS, Token, NUMBER, PLUS, MINUS, EOF, MULTIPLY, DIVIDE} from "./toks.js"
import {NUM, BINOP, BinOpNode, NumNode} from "./nodes.js"
import { parseInput } from './parser.js'


const interpretNum = node => parseInt(node.number)

const interpretBinOp = node => {
    const left = interpret(node.left)
    const right = interpret(node.right)

        if (node.op_tok == PLUS) return left + right
        else if (node.op_tok == MINUS) return left - right
        else if (node.op_tok == MULTIPLY) return left * right
        else if (node.op_tok == DIVIDE) return left / right
}

const interpret = node => {
        if (node instanceof BinOpNode) return interpretBinOp(node)
        else if (node instanceof NumNode) return interpretNum(node)
}

const runInput = text => {
    try {
        const node = parseInput(text)
        return interpret(node)
    } catch (error) {
        throw error.toString()
    }
}

export {runInput}