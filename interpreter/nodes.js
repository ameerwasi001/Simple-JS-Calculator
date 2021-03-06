const NUM = -100
const BINOP = -101

class NumNode{
    constructor(number){
        this.number = number
        this.type_ = NUM
    }

    toString(){
        return `${this.number.toString()}`
    }
}


class BinOpNode{
    constructor(left, op_tok, right){
        this.left = left
        this.op_tok = op_tok
        this.right = right
        this.type_ = BINOP
      }

    toString(){
        return `BinOpNode(${this.left.toString()}, ${this.op_tok.toString()}, ${this.right.toString()})`
      }
}

export {NUM, BINOP, NumNode, BinOpNode}