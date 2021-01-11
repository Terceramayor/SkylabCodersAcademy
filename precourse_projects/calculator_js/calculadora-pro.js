function input() {      //Esta función se encarga de generar un array válido de números sobre los que se realizarán los cálculos

    let numLength;
    let count=0;
    let numbers=[];

    numLength = prompt("How many numbers you want to compute?", undefined)

    if (numLength==0){

        return numbers=[0];

    }

    else {

    while (count < numLength){
                                
            numbers[count]= parseFloat(prompt(`Introduce the number ${count+1}`,`Number ${count+1}`));
           

        if ( isNaN(numbers[count]) ){  //Condición para comprobar si se ha introducido algo que no sea un número, en cuyo caso solicita de nuevo un número

            console.log("Introduce only numbers! Please retry ")

        } else {

            count++;

        }    
        }

        return numbers
    }
    }
    
function calculus (numbers){    //Esta función realiza los cálculos y los muetra en pantalla

    if (numbers.length==1){

        console.log(`The square root of your number is: ${numbers[0]*numbers[0]}`)
        return

    } else {

        let add = 0;
        let subs = 2*numbers[0];
        let mult = 1;
        let div = numbers[0]*numbers[0];

        for (let i=0; i<numbers.length; i++){

        add=add+numbers[i];
        subs=subs-numbers[i];
        mult=mult*numbers[i];
        div=div/numbers[i];
        
        }
        
        add = Math.round(add*100)/100;
        subs = Math.round(subs*100)/100;
        mult = Math.round(mult*100)/100;
        div = Math.round(div*100)/100;
    
    console.log(`The addition of your numbers is: ${add}`)
    console.log(`The substraction of your numbers is: ${subs}`)
    console.log(`The multiplication of your numbers is: ${mult}`)
    console.log(`The division of your number is: ${div}`)

    return

    }

}
    
function calculator(){  //Esta función organiza el flow de ejecución de la calculadora, llamando a las funciones "input" y "calculus" mientras la condición de parada (stopCondition) sea false

    let stopCondition = false;

    while (stopCondition == false) {

    numbers = input()

    calculus (numbers)
    

    let wouldYou = prompt(`Would you like to run another set of operations? (Y->for yes)`,`Another round?`) 
    
    wouldYou == "Y" || wouldYou =="y" ? stopCondition = false : stopCondition = true;

    console. clear()

    }

    
    console.log("Bye, Bye!")
    return

}

calculator();  //Ejecuta la calculadora