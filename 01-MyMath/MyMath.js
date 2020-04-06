/**
 * 'export' ist nötig falls wir MyMath in einem anderen Modul importieren wollen.
 * 'class' legt fest dass es sich hierbei um eine Klasse handelt.
 * 'MyMath' ist der Name der Klasse.
 */
export class MyMath {

    /**
     * Der Konstruktor wird aufgerufen um neue Instanzen der Klasse zu generieren.
     * vgl. let myNumber = new MyMath(3);
     * 
     * @param value Unser Initialwert für den Wert von unserer MyMath Instanz.
     */
    constructor(value) {
        // 'this' referenziert den Kontext in dem die aktuelle Funktion aufgerufen wird. 
        // Hier referenziert es die Instanz der Klasse MyMath die wir gerade erstellen.
        // mit 'value * 1' erzwingen wir, dass value als number gelesen wird.
       if (value > 0) {
        this.value = value * 1; 
       } else {
           this.value = 0;
       }
        

        //this.value = (value * 1) || 0; Musterlösug
    }


    add(value) {
       this.value += value;
    }

    subtract(value) {
        this.value -= value;
    }

    multiply(value) {
        this.value *= value;

    }

    divide(value) {
        this.value /= value;

    }

    pow(value) {
        this.value ** value;
        
    }

    faculty() {
        if (this.value % 1 === 0) {
            let result = 1;
            for(let i = 0; i < this.value; i++) {
                result += result * i;
            }
        return result;
        }
    }
}