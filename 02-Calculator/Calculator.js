import {MyMath} from "../01-MyMath/MyMath.js";

export class Calculator {

    constructor(numpad, outputCalculation, outputSolution) {
        this.numpad = numpad;
        this.outputCalculation = outputCalculation;
        this.outputSolution = outputSolution;
        this.setupNumPad();        
    }

    setupNumPad() { 
        var listofallnumbers = this.numpad.children;
        for (let element of listofallnumbers) {
            element.addEventListener('click', this.onButtonClick.bind(this, listofallnumbers))
        }

    }

    onButtonClick(symbol) {
        console.log(symbol);
    }

    print(string) {

    }

    printSolution(string) {

    }

    clear() {

    }

}
