function ini() {  //Esta función pide el nombre del usuario e indica que comienza una partida nueva con un nuevo carton
    
    let name="";
    let dim=0;

    name = prompt(`WELCOME THE TO SKYLAB BINGO GAME.TO BEGIN, PLEASE STATE YOUR NAME: `, `name?`);

    for (let i=0; i<name.length;i++){       //Comprobamos si se han introducido solo espacios

        dim = (name.charAt(i)===" ") ? dim+1:dim ;
        
    }
    
    if (dim===name.length){

        dim = false;
        
    } else {

        dim = 0;

    } while (typeof(name)!="string" || name==="name?" || 0 === name.length || dim===false){

        console.log(`Please insert a valid name!`)
        name = prompt(`WELCOME THE TO SKYLAB BINGO GAME.TO BEGIN, PLEASE STATE YOUR NAME: `, `name?`);

        for (let i=0; i<name.length;i++){       //Comprobamos si se han introducido solo espacios

            dim = (name.charAt(i)===" ") ? dim+1:dim ;
            
        }
        
        if (dim===name.length){
    
            dim = false;
                
        } else {

            dim=0;

        }

    }

    console.log(`Hello ${name}!`)

    return name;

}

function cartRaw() {    //Esta función genera el carton en form de matriz de 15 números aleatorios distribuidos en 5 filas y 3 columnas

    let rawNum=[];
    let num;
    let numRepeat;

    for (let i=0; i<5 ; i++) {

        rawNum[i]=[];  // Se Generan las filas de la tabla

    }

    for (let i=0; i<5 ; i++) {

        for (let j=0; j<3; j++) {   // Se generan las columnas de la tabla

            do {    //El proceso de generación de cada número del cartón se repite hasta que salga un número distinto de cero, menor que quice y que aun no haya salido
        
                num=Math.trunc(100*Math.random());
                numRepeat=false;
            
                for (let k=0; k<rawNum.length; k++) {

                    for (let l=0; l < rawNum[k].length; l++) {

                        if (num==rawNum[k][l]){

                            numRepeat = true;

                        }

                    }
                }
                
            } while (num==0 || num>30 || numRepeat == true)
            
            rawNum[i][j] = num;

        }
    }
    
        return rawNum

}
    
function cartTable(arr) {   // Esta función se encarga de organizar la matriz que contiene los numeros del carton en forma de objeto y mostrarlo en la consola como una tabla de facil lectura

    let carton = {

        set organ(arr) {    // Este set se utiliza para generar las categorías de la tabla (filas y columnas) y asignar el valor correspondiente 

            for (let i=0; i<5 ; i++) {

                this[`Row ${i+1}:`]={};  // Se Generan las filas de la tabla
        
            }
        
            for (let i=0; i<5 ; i++) {
        
                for (let j=0; j<3; j++) {   // Se generan las columnas de la tabla
                
                    this[`Row ${i+1}:`][`Column ${j+1}:`]=arr[i][j];
            
                }
            }
        }
    }

        carton.organ=arr; //Se ejecuta la ordenación de la tabla ("set organ()"")
        return carton

}

function ball(ballArray){    //Esta función se encarga de generar el número random que simula el número sacado aleatoriamente

        let ballRepeat=false;   // Eta variable se usa para controla que el número que sale del bombo no se repita

        do {    //El proceso de generación del número aleatorio se repite hasta que salga un número distinto de cero y que no haya salido ya            
            
            ballNumBuffer=Math.trunc(100*Math.random()); // Se genera un número aleatorio comprendido entre 0 y 100

            let counting=0;

            do {            //Se comprueba que el número generado aleatoriamente no haya salido antes
                
                if(ballArray[counting]==ballNumBuffer) {

                    ballRepeat=true;
                    
                } else {

                    ballRepeat=false;

                }

                counting++;

            } while (ballRepeat==false && counting < ballArray.length)         

        } while ( ballNumBuffer ==0 || ballNumBuffer > 40 || ballRepeat==true) // El proceso se repite mientras el numero que salga sea cero, mayor que 15 o un número que ya ha salido anteriormente


        console.log(`The current playing number is ${ballNumBuffer}\n\n`);

        ballArray.push(ballNumBuffer);

    return ballArray

}

function check(carton,ball){    //Esta función se encarga de comprobar si el número sacado del bombo se encuentra en el cartón del jugador 
//Aquí se recorre el carton para comprobar si hay algún match. De haberlo, se marca su posicióncon una X y se muestra el carton actualizado

    for (let posRow in carton){                     //Recorre las filas del objeto que almacena el carton

        for (let posColumn in carton[posRow]) {     //Recorre las columnas del objeto que almacena el carton
    
            if (carton[posRow][posColumn]==ball){

                console.log(`Congrats! The number ${ball} has been found in the the possition ${posRow}, ${posColumn}`)

                carton[posRow][posColumn] = `X`;

            }

        }
    }

    console.log(`Here you have the updated carton:`)
    console.table(carton);

    return


}

function luck(carton,gameStatus){   //Esta función se encarga de comprobar si el carton contiene linea

    let count = 0;            //Esta variable se utiliza para contar el numero de X de cada linea (se pone a cero cada vez que salta de linea). Si, tras recorrer una linea entera, si valor es tres, quiere decir que se ha hecho linea
    let z = 0;
    let line = true;

    for (let posRow in carton){        //Recorre las filas del objeto que almacena el carton

        //console.log(`posRow -> ${posRow}`)

        for (let posColumn in carton[posRow]) {     //Recorre las columnas del objeto que almacena el carton
    
            if (carton[posRow][posColumn]==`X`){

                count++

            }

        }

        //console.log(`count-> ${count}`)


        if (count==3) { //Si count vale tres, indica que toda una fila tiene todos sus valores a X, por lo que se ha producido linea
        
            z=0;
            line=true;

            if (gameStatus.length==0){     //La dimensión del array arrayLuck indica si es la primera, segunda o tercera linea que se realiza en la misma partida. Si es la tercera significa que se ha producido BINGO!

                console.log(`You have made LINE! (${posRow})`)
                gameStatus.push(posRow);
                return gameStatus;

            } else {
            
                while (line==true && z<gameStatus.length) { //Recorremos el array gameStatus hasta llegar al final de su lomgitud mientras no se encuentre el nombre de una linea en la que ya se haya producido linea en un turno anterior

                    //console.log(`Zeta-> ${z}`)
                    //console.log(`gameStatus.length-> ${gameStatus.length}`)
                    
                    //console.log(`gameStatus[z]-> ${gameStatus[z]}`)

                    if (gameStatus[z]==posRow){

                        line=false
                        z++

                    } else {

                        line=true
                        z++

                    }
                }
                
                //console.log(`line-> ${line}`)

                if (line==true){       

                    console.log(`(You have made LINE again (${posRow}), but you´ll get points only for the first one)\n\n`)
                    gameStatus.push(posRow);
                    return gameStatus;

                } 
            }
            
        }   
        
        count=0; //Al cambiar de fila ponemos el contador de "X" a cero

    }
    
    return gameStatus;

}

function firstLine(gameStatus, turn, beforeTurn, lineTurn){  //Esta pequeña función detecta el turno en el que se produce la primera linea y lo almacena. La puntuación final depende de cuantos turnos pasan hasta que se detecta la primera linea.

    if (beforeTurn!==gameStatus.length && gameStatus.length ==1) {

        return turn

    }

        return lineTurn

}

function score(lineTurn,turn){      //Esta función calcula la puntuación de la partida y devuelve el resultado en el array "result"

    let result=[]; //Este vector tiene dos componentes. En el primero se almacena la puntuación obtenida según el número de turnos empleados en obtener bingo; en el segundo la puntuación según el número de turnos empleados en obtener la primera linea

    if (turn < 31) {

        result[0]=100;

    }   else if (turn >= 31 && turn <35) {

        result[0]=80;

    }   else if (turn >= 35 && turn <39){

        result[0]=50;

    }   else {

        result[0]=20;

    }

    result[1]=Math.trunc((2/Math.pow(lineTurn-1,1.5))*1000);

    return result

}

function player (pName, pScore) {       //Eesta funcion genera un objeto con el nombre del jugador y su puntuación final. Se utilizará para generar el ranking

    this["Player Name"]=pName;
    this["Score"]=pScore;

}

function ranking(rank, pName, pScore) {         //Esta función se ecarga de introducir el jugador en el rankig

    let currentPlayer = new player(pName, pScore)

    if (rank.length==0){    // Si aún no hay ningún jugador en el ranking, se añade directamente los resultados de la primera partida

        rank[0] = currentPlayer;
        
        return rank

    }

    for (let i=0; i<rank.length;i ++){       //Buscamos si el jugador ya aparece en el ranking y, de ser así, si la punruación obtenida en la partida actual es mayor, actualizamos su puntuación.
        
        //console.log(currentPlayer);

        //console.log(rank[i]["Score"])
        //console.log(pScore)
        //console.log(i);
        //console.log(rank.length-1);
        //console.log(currentPlayer)

        if ( rank[i]["Player Name"]==pName) {           // Si el jugador ya aparece en el ranking...

            if ( rank[i]["Score"] < pScore ) {          //Y ademas la puntuación en la partida actual es mayor que la que aparece en el ranking, actualizamos la puntuación

            //console.log("FLAG!");

            rank[i] = currentPlayer;

            //console.table(rank);

            return rank

            } else {        //Si la puntuación en la partida actual es menor que la que ya aperece en el ranking, no hacemos nada

            //console.table(rank);

            return rank

            }

        }   else if (i==rank.length-1){      //Si el jugador aún no ha aparecido en el ranking, se añade al final

                rank.push(currentPlayer);
                //console.log(rank.length);

                //console.table(rank);

                return rank

        }

    }

}

function sortRanking(rank) {        // Esta función se encarga de reordenar el ranking

    //console.table(rank);

    rank=rank.sort(function(a,b){return (b["Score"]-a["Score"]);});       //Ordenamos el array del ranking por puntuación

    console.log(`This is the updated ranking:\n\n`);

    console.table(rank);

    return rank

}

function bingo(){   //Esta es la función principal que se encarga de la ejecución del programa

    console.clear();    //Se limpia la consola

    let name=ini();     //Se da la bienvenida y se pide el nombre al usuario

    let cartNum=[];     //Variable que almacena en forma de matriz los valores del carton
    let carton={};      //Variable que almacena en forma de objeto los valores del carton
    let cartonOk="No";  //Variable usada para comprobar si el carton le gusta al usuario
    let gameStatus=[];  //Variable que almacena las lineas que se van realizando y, de darse el caso, el BINGO
    let ballArray=[];   //Variable que almacena los numeros que van saldiendo del bombo
    let turn=0;         //Variable para contar los turnos
    let beforeTurn=0;   //Esta variable se usa para almacenar la dimension del array "ballArray" antes de cada turno. Al compararla con la dimensión depues del turno se concluirá que se ha realizado una linea (se usará en la función score)
    let lineTurn=0;     //Esta variable almacenará el turno en el que se ha producido la primera linea. Esto sirve para calcular parte de la puntuación.
    let result=[];      //Este vector tiene dos componentes. En el primero se almacena la puntuación obtenida según el número de turnos empleados en obtener bingo; en el segundo la puntuación según el número de turnos empleados en obtener la primera linea
    let reGame=true;    //Variable booleana para comprobar si el usuario desea realizar una nueava partida (tras acabar la partuda actual)
    let next=false;     //Variable usada para controla la confirmacion de realizar una nueva partida
    let rank=[];        //Este array almacena los jugadores y sus puntuaciones

    console.log(`Before the game begins, here you have the score system that will determine whether you are a champion or just a regular Bingo player:\n\n`);
    console.log('Your final score will depend on two things:\n\n');
    console.log('\t1 - The number of turns you need to do BINGO:');
    console.log(`\t\t\tIf it's lower than 31 turns -> 100 points`);
    console.log(`\t\t\tIf it's between 31 and 35 turns -> 80 points`);
    console.log(`\t\t\tIf it's between 35 and 39 turns -> 50 points`);
    console.log(`\t\t\tIf it's higher than 39 turns -> 20 points\n\n`);
    console.log(`\t2 - The number of turns you need to complete the FIRST line`);
    console.log(`\t\t\tThe sooner, the much higher amount of points you will have`);
    console.log(`\t\t\tThe precise rule is: Points = (2/(turns-1)^1,5)*1000\n\n`);

    do {         //Se pide confirmacion hasta que se acepte

    next=!window.confirm(`Are the rules clear? Shall the game begin?`);

    } while (next==true)

        while(reGame==true) {       //Bucle para iniciar una nueva partida

            turn=0;
            beforeTurn=0
            lineTurn=0;
            ballArray=[]; 
            gameStatus=[];
            cartonOk=false;

            do {      

                console.clear();    // Se limpia la consola a cada inicio de turno

                cartNum=cartRaw()   // Se genera una matriz de 5x3 con los 15 números del carton

                carton=cartTable(cartNum)   // Se transforma el carton a forma de objeto con las filas y columnas identificadas. Esto permite mostrar el carton en forma de tabla para una lectura sencilla

                console.table(carton);

                cartonOk=window.confirm(`Here you have your new carton. Would you like to generate a different one?`)

            } while (cartonOk == true)

            console.log(`\n\n\n\nTHE GAME HAS STARTED! GOOD LUCK ${name}\n\n`)

            do {        //Se continua preguntando si se desea pasar al siguiente turno mientras la respuesta sea "false"

                if (turn!==0) { //La confirmación debe realizarse a partir del primer turno

                    do {

                    next=confirm("Ready for the next turn?"); // Se pide confirmacón antes de iniciar cada turno. Si se elimina esta linea, el juego corre de una tirada.
                    
                    } while(next==false)

                }

                beforeTurn=gameStatus.length

                turn++;

                console.log(`\n\nTURN: ${turn}\n\n`)

                ballArray=ball(ballArray);  //Se genera el número extraido de la urna

                check(carton,ballArray[ballArray.length-1]);    //Se comprueba si el número de la bola aparece en el carton

                gameStatus=luck(carton,gameStatus); //Se conprueba si se ha producido linea y si es la primera linea de la partida

                lineTurn = firstLine(gameStatus,turn,beforeTurn,lineTurn);

                //console.log(gameStatus)

                    } while (gameStatus.length < 5) // Si la longitud del vector "gameStatus" es cinco, implica que se han realizado 5 lineas, por lo que implica que se ha hecho BINGO!

            console.log(`AND YOU HAVE BINGO!!!, CONGRATULATIONS ${name}\n\n`)
            
            result=score(lineTurn,turn);

            console.log(`-- Since it took you ${turn} turns to do BINGO, you have ${result[0]} points`);
            console.log(`-- You had the first line completed at the turn ${lineTurn} so you have ${result[1]} extra points`);
            console.log(`···· YOU FINAL SCORE IS: ${result[0]+result[1]} POINTS! ····\n\n\n\n`);

            ranking(rank, name, result[0]+result[1]);       //Se actualiza el ranking    
            
            sortRanking(rank)       //Se reordena y presenta el ranking

            reGame = window.confirm("Would you like to play again?")  
            
            if(reGame==true) {      //Si no estamos ante la primera partida, se vuelve a pedir el nombre del jugador

                name=ini();

            }

        }

    console.clear();   

    console.log("Thanks for playing, Bye Bye!")

return

}

bingo();