class Calculator {
    constructor(dom, op){
        this.op1Dom = document.createElement("input");
        this.op2Dom = document.createElement("input");
        this.btn = document.createElement("button");

        this.btn.innerHTML = op;

        let parent = dom;
        parent.appendChild(this.op1Dom);
        parent.appendChild(this.op2Dom);
        parent.appendChild(this.btn);
        this.op = op;

        this.btn.addEventListener("click", (e) => {
            this.calc();
        });
    }

    calc(){
        let opr1 = parseFloat(this.op1Dom.value);
        let opr2 = parseFloat(this.op2Dom.value);

        if(this.op == "plus"){
            alert(opr1 + opr2);
        }else if(this.op == "minus"){
            alert(opr1 - opr2);
        }else if(this.op == "multiply") {
            alert(opr1 * opr2);
        }else if(this.op == "divide") {
            alert(opr1 / opr2);
        }else {
            alert("잘못된 연산 코드");
        }
    }
}

// $.fn.makeCalc = function(op) {
//     let = calc = new Calculator(this[0], op);
// }