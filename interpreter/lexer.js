import * as errors from "./errors.js"
import {LPAREN, RPAREN, DIGITS, Token, NUMBER, PLUS, MINUS, MULTIPLY, DIVIDE} from "./toks.js"

function lex(text) {
    text = text
    let idx = -1
    let current_char = ""

    const advance = (f = () => {}) => {
        f()
        idx += 1
        current_char = idx < text.length ? text[idx] : ""
    }

    const make_number = () => {
        let number_str = ""
        let e_count = 0
        let dot_count = 0
        let valid_chars = [...DIGITS, ...['e', '.']]
        while((current_char != "") && (valid_chars.includes(current_char))){
            if (current_char == ".") dot_count+=1
            if (current_char == "e") e_count+=1
            if (dot_count == 2) break
            if (e_count == 2) break
            if ((dot_count == 1) && (e_count == 1)) break
            number_str += current_char
            advance()
          }
        return new Token(NUMBER, number_str)
      }

      const lex = () => {
        advance()
        const toks = []
        while (current_char != ""){
            if (current_char == '+') advance(_ => toks.push(new Token(PLUS)))
            else if (current_char == '-') advance(_ => toks.push(new Token(MINUS)))
            else if (current_char == '*') advance(_ => toks.push(new Token(MULTIPLY)))
            else if (current_char == '/') advance(_ => toks.push(new Token(DIVIDE)))
            else if (current_char == '(') advance(_ => toks.push(new Token(LPAREN)))
            else if (current_char == ')') advance(_ => toks.push(new Token(RPAREN)))
            else if (DIGITS.includes(current_char)) toks.push(make_number())
            else {
                throw errors.expectedCharError(current_char)
            };
        }
        return toks
    }

    return lex()
}

export {lex}