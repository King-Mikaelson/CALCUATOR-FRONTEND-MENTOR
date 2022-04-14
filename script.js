class Calculator {
    constructor(previousCalculatorNumberDisplayed, currentCalculatorNumberDisplayed ){
        this.previousCalculatorNumberDisplayed  = previousCalculatorNumberDisplayed
        this.currentCalculatorNumberDisplayed   = currentCalculatorNumberDisplayed
        this.reset()
    }

    reset() {
        this.previousDisplay = ""
        this.currentDisplay = ""
        this.operation = undefined
    }

    remove(){
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1)
    }

    appendNumberText(number) {
        if (number === "." && this.currentDisplay.includes(".")) return
        this.currentDisplay = this.currentDisplay.toString() + number.toString()

    }

    selectOperation(operation){
        if (this.currentDisplay === "") return
        if (this.previousDisplay !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousDisplay = this.currentDisplay
        this.currentDisplay = ""
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousDisplay)
        const current = parseFloat(this.currentDisplay)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation){
            case "+":
                computation = previous + current
                break
            case "-":
                computation = previous - current
                break
            case "x":
                computation = previous * current
                break
            case "/":
                computation = previous / current
                break
                default:
                    return
        }

        this.currentDisplay = computation
        this.operation = undefined
        this.previousDisplay = ""

    }

getDisplayedNumber(number) {
    const stringNumber = number.toString()
    const intergerNumber = parseFloat(stringNumber.split('.')[0])
    const decimalNumber = stringNumber.split('.')[1]
    let intergerDisplay
    if (isNaN(intergerNumber)) {
        intergerDisplay = ""
    } else {
        intergerDisplay = intergerNumber.toLocaleString("en", {maximumFractionDigits: 0})
 }
    if (decimalNumber != null) {
        return `${intergerDisplay}.${decimalNumber}`
    } else {
        return intergerDisplay
    }
}

    updateScreen() {
        this.currentCalculatorNumberDisplayed.textContent = 
        this.getDisplayedNumber(this.currentDisplay)
        if (this.operation != null) {
            this.previousCalculatorNumberDisplayed.textContent = 
           `${this.getDisplayedNumber(this.previousDisplay)} ${this.operation}`
        }else {
            this.previousCalculatorNumberDisplayed.textContent = ""
        }
         
    }
}





// Toggle button functionality
const calculatorNumbers = document.querySelectorAll("[calc-number]");
const calculatorOperations = document.querySelectorAll("[calc-operation]");
const removeOperation = document.querySelector("[calc-delete]");
const equalOperation = document.querySelector("[calc-equals]");
const resetOperation = document.querySelector("[calc-reset]")
const previousCalculatorNumberDisplayed = document.querySelector("[calc-previous-number]");
const currentCalculatorNumberDisplayed = document.querySelector("[calc-current-number]");



const calculator = new Calculator(previousCalculatorNumberDisplayed, currentCalculatorNumberDisplayed)


calculatorNumbers.forEach(number => {
    number.addEventListener("click", () => {
        calculator.appendNumberText(number.textContent)
        calculator.updateScreen()
    })
})

calculatorOperations.forEach(operation => {
    operation.addEventListener("click", () => {
        calculator.selectOperation(operation.textContent)
        calculator.updateScreen()
    } )
} )

equalOperation.addEventListener("click", button => {
    calculator.compute()
    calculator.updateScreen()
})

resetOperation.addEventListener("click", button => {
    calculator.reset()
    calculator.updateScreen()
})


removeOperation.addEventListener("click", button => {
    calculator.remove()
    calculator.updateScreen()
})

const mainmode = document.querySelector(".calculator-main")
const toggleButon = document.querySelectorAll(".toggle-button")
// var arr = [...toggleButon]

// converting the Nodelist object into an Array so the filter method can be used
const divsArr = Array.from(toggleButon)

const result =  Array.isArray(divsArr)
console.log(divsArr);

divsArr.forEach((element, index) => {
    element.addEventListener("click", () => {
        element.style.opacity = "1";

        if (index == 0) {
            document.getElementsByTagName("body")[0].style.backgroundColor = " hsl(222, 26%, 31%)";
            // mainmode.classList.toggle('')

        }else if (index == 1) {
            mainmode.classList.toggle('white-mode');
            document.getElementsByTagName("body")[0].style.backgroundColor = "hsl(0, 0%, 90%)";

        }else {
            mainmode.classList.toggle('purple-mode');
            document.getElementsByTagName("body")[0].style.backgroundColor = "hsl(268, 75%, 9%)"
        }

        divsArr.filter(function (item) {
            return item != element
        }).forEach( (item) => {
            item.style.opacity = "0"
        })
    })

})