import * as errors from "./errors.js"
import * as lexer from "./lexer.js"
import {DIGITS, Token, NUMBER, PLUS, MINUS, EOF, MULTIPLY, DIVIDE, LPAREN} from "./toks.js"
import {BinOpNode, NumNode} from "./nodes.js"

const parse = (tokens) => {
    const toks = tokens.concat([new Token(EOF)])
    let current_tok = null
    let idx = -1

    const update_current_tok = () => idx >= 0 && idx<toks.length ? current_tok = toks[idx] : {}
  
    const advance = (f = () => {}) => {
        f()
        idx += 1
        update_current_tok()
    }

    const parser = () => {
        advance()
        const res = expr()
        if (current_tok.type != EOF) throw errors.invalidSyntaxError("Expected +, -, *, /, or NUMBER")
        return res
    }

    const bin_op = (func_a, ops, func_b) => {
        let left = func_a()
        while (ops.includes(current_tok.type)){
            const op_tok = current_tok
            advance()
            const right = func_b()
            left = new BinOpNode(left, op_tok, right)
        }
        return left
    }

    const factor = () => {
        const tok = current_tok
        advance()
        if (tok.type == NUMBER) {return new NumNode(tok.text)}
        else if (tok.type == LPAREN) {
            const e = expr()
            advance()
            return e
        }
        throw errors.invalidSyntaxError(`Expected number, got ${current_tok.type}`)
    }

    const term = () => bin_op(factor, [MULTIPLY, DIVIDE], factor)
    const expr = () => bin_op(term, [PLUS, MINUS], term)

    return parser()
}

const parseInput = (text) => {
    try {
        return parse(lexer.lex(text))
    } catch (error) {
        throw error.as_string()
    }
}

export {parseInput}