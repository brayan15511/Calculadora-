const previosOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previosOperationText, currentOperationText) {
        this.previosOperationText = previosOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // Adiciona o digito na tela da calculadora
    addDigit(digit) {

        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Todas as operações
    processOperation(operation) {
        
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            if(this.previosOperationText.innerText !== "") {
                //mudança de operação
                this.changeOperation(operation); 
            }
            return;
        }

        //pegar os valores passados e atuais 
        let operationValue;
        const previous = +this.previosOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;        

            case "DEL":
                this.processDelOperator();
                break;       
                
            case "CE":
                this.processClearCurrentOperation();
                break;                

            case "C":
                this.processClearAllOperation();
                break; 

            case "=":
                this.processEqualsOperator();
                break;     

            default:
                return;
                

        }

    }

    // mudar os valores na tela da calculadora 
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
         
         if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
         } else {
             if(previous === 0) {
                operationValue = current
             }
             this.previosOperationText.innerText = `${operationValue} ${operation}`;
             this.currentOperationText.innerText = "";
         }

    }

    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previosOperationText.innerText = this.previosOperationText.innerText.slice(0, -1) + operation;
        }


        processDelOperator() {

            this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);

        }

        processClearCurrentOperation() {
            this.currentOperationText.innerText = "";
        }

        processClearAllOperation() {
           this.currentOperationText.innerText = "";
           this.previosOperationText.innerText = "";
        }

        processEqualsOperator() {
            const operation = previosOperationText.innerText.split(" ")[1];
            
            this.processOperation(operation);
        }

    

}
    const calc = new Calculator(previosOperationText, currentOperationText);

    buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const value = e.target.innerText;
    
            if ((+value >= 0 && +value <= 9) || value === ".") {
                calc.addDigit(value);
            } else {
                calc.processOperation(value);
            }
        });
    });