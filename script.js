class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText
    this.currentOperandText = currentOperandText
    this.clear()
  }
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operator = undefined
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
  }
  appendNumber(number) {
    if (number ==='.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperator(operator) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operator = operator
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operator) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation.toFixed(4)
    this.operator = undefined
    this.previousOperand = ''
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerNumber = parseFloat(stringNumber.split('.')[0])
    const decimalNumber = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerNumber)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerNumber.toLocaleString('en', {
        maximumFractionDigits: 0 
      })
    }
    if (decimalNumber != null) {
      return `${integerDisplay}.${decimalNumber}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay(){
    this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operator != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`
    } else {
      this.previousOperandText.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const equalsButton = document.querySelector('.equals')
const deleteButton = document.querySelector('.delete')
const allClearButton = document.querySelector('.clearAll')
const previousOperandText = document.querySelector('.previousOperand')
const currentOperandText = document.querySelector('.currentOperand')

const calculator = new Calculator(previousOperandText,currentOperandText)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})