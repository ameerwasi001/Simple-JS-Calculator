class Error {
    constructor(error_name, details){
        this.name = error_name
        this.msg = details
      }

    as_string(){
        return `${this.name}: ${this.msg}`
      }
}

const illegalCharacterError = (details = "") => new Error("Illegal Character", details)
const expectedCharError = (details = "") => new Error("Expected Character", details)
const invalidSyntaxError = (details = "") => new Error("Syntax Error", details)

export {illegalCharacterError, expectedCharError, invalidSyntaxError}