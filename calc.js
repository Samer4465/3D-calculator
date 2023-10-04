class Calculator {
    constructor(updateDisplay) {
        this.display = '0'
        this.operator = undefined
        this.lastNumber = 0
        this.updateDisplay = updateDisplay
    }
    numberClick(number) {
        let length = this.display.length
        if (this.display == '0' && number == '0') {
            return
        }
        if (number == '00' && this.display == '0') {
            return
        }
        if (this.display =='0' && number !== '0') {
            this.display = ''
        }
        if (this.display.includes('.')) {
            length --
        }
        if (this.display.includes('-')) {
            length --
        }
        if (length >= 6) {
            return
        }
        this.display += number
        this.updateDisplay(this.display)
    }
    clear() {
        this.display = '0'
        this.updateDisplay('0')
    }
    addDot () {
        if (!this.display.includes('.')) {
            this.display += '.'
            this.updateDisplay(this.display)
        }
    }
    plusMinus () {
        if (this.display == '0') {
            return
        }
        if (!this.display.includes('-')) {
            this.display = "-" + this.display
            
        } else {
            this.display = this.display.substring(1, this.display.length)
        }
        this.updateDisplay(this.display)
    }

}
export default Calculator