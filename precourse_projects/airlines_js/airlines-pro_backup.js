let flights = [

    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },

    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },

    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },

    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },

    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },

    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },

    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },

    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },

    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },

    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },

    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }];


function flightsInfo(info){  //Esta funcion se encarga de motrar la info relacionada con la lista actual de vuelos para el día de hoy

    today = new Date();
    let averCost = 0;
    let conectFlight = 0;
    let printScale="";

    console.log(`\nTHERE ARE ${info.length} CURRENT FLIGHT/S SCHEDULED FOR TODAY (${today.getDate()}/${(today.getMonth() +1)}/${today.getFullYear()})\n\n`);

    for (let i=0; i<info.length; i++ ) {  //Recorre cada elemento del array de objectos

        averCost += info[i].cost; //Va sumando el coste de cada vuelo. Este valor se utilizará para calcular el coste medio de los vuelos

        if (info[i].scale==true){   //La variable printScale se utiliza para indicar si el vuelo tiene escala o no
    
            printScale="a flight connection is needed";
            conectFlight++;

        } else {

        printScale="no flight connection is needed"

        }

        console.log(`The flight with ID: ${info[i].id}, departs from: ${info[i].from}, has as destination destination: ${info[i].to}, it's cost is ${info[i].cost}€ and ${printScale}`);

    }

    console.log(`\nThe average cost of today´s flights is: ${Math.round(averCost/info.length*100)/100}€`); //Presenta el coste medio con dos decimales
    console.log(`\nThere is/are a total of ${conectFlight} flight/s with connection`);

    let destinations=[]; // Esta variable se utiliza para generar un string con los nombres de las ciudades destino de los ultimos vuelos del dia

    if (info.length<5){  // Si la lista tiene menos de 5 vuelos,se mostraran los destinos de todos ellos

        

        for (i=0; i<info.length; i++) {

            destinations = destinations +` ${info[i].to}`;

        }

        console.log(`\nToday last flight/s has/have the following destination/s: ${destinations}`);


    } else { // Si la lista tiene mas de 5 vuelos,se mostraran los destinos de los ultimos cinco

        for (i=info.length-5; i<info.length; i++) {

            destinations = destinations +` ${info[i].to}`;

        }

        console.log(`\nToday last 5 flights have the following destinations: ${destinations}`);

    }


return
    
}    

function userType() {   //Esta función se encarga de identificar al usuario cono "User" o "Admin"

    let user=``;

    do {

        user = prompt(`Are you "User" or Admin?`,``)
        
        switch (user) {

            case "USER":
            case "user":
            case "User":

                user="USER"
                break;

            case "ADMIN":
            case "Admin":
            case "admin":

                user="ADMIN"
                break;
             
            default:

        }

        if (user !==`USER` && user !==`ADMIN`) {

            console.log(`Please introduce a valid identifier`);

        }

    } while (user !==`USER` && user !==`ADMIN`); //Solo se aceptan las entradas por teeclado "USER" o "ADMIN" en mayusculas

   
    return user;

}

function sortByPrice(info){

    let sortedInfo

    sortedInfo=info.sort(function(a,b){return (b["cost"]-a["cost"]);});       //Ordenamos el array de vuelos por precio

    return sortedInfo

}

function opUser(info) { //Esta funcion realizará las tareas permitidas si el usuario es "USER"

    let search = 0;  //Esta variable se usa para almacenar la opción de búsqueda seleccionada por el usuario

    

        do{     //El programa pide introducir la forma de busqueda. Si se introduce un valor no contemplado (diferente de 1, 2 o 3), se vuelve a solicitar.

            search = prompt(`You can now search by price. Please indicate your searching preferences: 1 - Highest price, 2 - Lowest price, 3 - By exact price`,`1, 2 or 3`) 
            
            switch (search) {

                case "1":

                    let highest = 0; // Esta variable se utiliza para almacenar el mayor precio a medida que se recorre el array
                    let posHighest = 0; // Esta variable se utiliza para almacenar la posicion donde se halla el mayor precio a medida que se recorre el array.

                    for (let i=0; i<info.length;i++){

                        if (info[i].cost>highest) {

                        highest=info[i].cost;
                        posHighest=i;

                        }  
                    }
                    
                    console.log(`\nThe flight with the highest price departs from ${info[posHighest].from}, lands at ${info[posHighest].to} and has a cost of ${info[posHighest].cost} euros`);

                break;  

                case "2":

                    let lowest = Infinity; // Esta variable se utiliza para almacenar el menor precio a medida que se recorre el array. Parte de infinito para asegusar que existe un mínimo.
                    let posLowest = 0; // Esta variable se utiliza para almacenar la posicion donde se halla el menor precio a medida que se recorre el array.
                
                    for (let i=0; i<info.length;i++){

                        if (info[i].cost<lowest) {

                        lowest=info[i].cost;
                        posLowest=i;

                        }  
                    }

                    console.log(`\nThe flight with the lowest price departs from ${info[posLowest].from}, lands at ${info[posLowest].to} and has a cost of ${info[posLowest].cost}`);
                    
                break;


                case "3":

                    let price;

                    do {

                        price = prompt(`Please indicate the price you aim for`,`$?`) 

                        if(isNaN(price)==true) {

                            console.log('Please introduce a valid cost number')

                        }

                    } while (isNaN(price)==true)


                    let posPrice = 0; // Esta variable se utiliza para almacenar la posicion donde se halla el el vuelo cuyo coste es el introducido por el usuario (si hubiera).
                    let flightFlag = false; //Esta variable booleana sirve para idenntificar si se ha enocntrado un vuelo por el precio introducido por el usuario, en cuyo caso pasará a ser "true"
                    let i=0;

                    while (flightFlag == false && i<info.length){

                        flightFlag=false;
                    
                        if (info[i].cost==price) {

                            posPrice=i;
                            flightFlag=true;
                            i++
                                                   
                        } else {

                            i++

                        }
                    }                         
                    
                    if (flightFlag==true) {

                        console.log(`The flight that departs from ${info[posPrice].from} and lands at ${info[posPrice].to} has a cost of ${info[posPrice].cost}`);

                    } else {
                        
                        console.log(`We are sorry, but there's no flight for such price`);

                    }
                    
                    break;

                default:

                console.log(`Please indicate a valid searching method`); 
                search = 0;
            }
            

        } while (search == 0); //Si no se ha introducido una opcion válida (1, 2 o 3) se vuelve a solicitar

    return;

    


}

function opAdmin(info) { //Esta funcion realizará las tareas permitidas si el usuario es "ADMIN" 

let search = "No valid"; //Esta variable se usa para almacenar la opción de búsqueda seleccionada por el usuario
let printScale="";
let conectFlight = 0;


    do {            
        
        search = prompt(`Please select an option: 1 - To add a new flight to the database, 2 - To delete a flight from the list `,`1, 2`); 

        switch (search) {   

            case "1":

                if (info.length-1>=15){  //Comprobación de si hay espacio para un nuevo vuelo

                    console.log(`\n\nThe list is already full, no more flights can be included`)
                    return;
                    
                } else {

                    let newFlight = new Object();   // El nuevo vuelo introducido queda almacenado a esta variable, la cual luego se hace push en el vector "flights"

                    newFlight.id = info.length;

                    do {            // Minetras la destinacion introducida sea un número ,se sigue pidiendo un destion válido

                        newFlight.to = prompt(`Please introduce the new flight destination `,`destination?`); 

                        if(isNaN(newFlight.to)==false) {

                            console.log('Please introduce a valid destination')

                        }

                    }   while (isNaN(newFlight.to)==false)
                   
                    do {            // Minetras la ciudad de partida introducida sea un número, se sigue pidiendo una ciudad de partida válida

                        newFlight.from= prompt(`Please introduce the new flight departure location `,`departure location?`);


                        if(isNaN(newFlight.from)==false) {

                            console.log('Please introduce a valid departure location')

                        }

                    }   while (isNaN(newFlight.from)==false)



                    do {        //Mientras el coste introducido no sea un número se sigue pidiendo un coste válido

                        newFlight.cost = parseInt(prompt(`Please introduce the new flight cost `,`cost?`),10);


                        if(isNaN(newFlight.cost)==true) {

                            console.log('Please introduce a valid cost')

                        }

                    }   while (isNaN(newFlight.cost)==true)

                    let flightStop;

                    do {        //Se sigue pidiendo una respuesta siempre que el valor introducido esa diferente de "Yes" o "No"

                        flightStop=prompt(`Please specify whether the new flight has any scale (Yes/No) `,`scale?`);

                        flightStop == "Yes"? newFlight.scale=true : newFlight.scale=false


                        if(flightStop !== "Yes" && flightStop !== "No") {

                            console.log('Please introduce a valid input (Yes/No)')

                        }

                    }   while (flightStop !== "Yes" && flightStop !== "No")


                    info.push(newFlight);

                    console. clear()    //Para mayor claridad, limpia la consola

                    console.log(`\nThe flight departing from: ${info[info.length-1].from}, with destination: ${info[info.length-1].to} has been added to the list`);

                    flightsInfo(info)   //Se muestra de nuevo la información de los vuelo para ver la lista actualizada

                    return;

                }

            case "2":

                console.clear();  //Para mayor claridad limpiamos la consola y mostramos la lista de vuelos con sus ID para que el ADMIN pueda elegir cual borrar

                for (let i=0; i<info.length; i++ ) {  //Recorre cada elemento del array de objectos
           
                    if (info[i].scale==true){   //La variable printScale se utiliza para indicar si el vuelo tiene escala o no
                
                        printScale="Yes";
                        conectFlight++;
            
                    } else {
            
                    printScale="No"
            
                    }
            
                    console.log(`Flight ID: ${info[i].id} Departure location: ${info[i].from}, Destination: ${info[i].to}, Cost: ${info[i].cost}€ Scale?: ${printScale}`);
            
                }

                let flightDel = prompt(`\nPlease introduce the flight ID of the flight to be deleted`,`flight ID?`);
                let posDel=Infinity;    //Esta variabla se usa para almacenar la posición en la cual se haya el vuelo a eliminar. De no econtrarse el vuelo, la variable quedará con el valor infinito.

                for (let i=0; i< info.length; i++){

                    if (info[i].id==flightDel){

                        posDel=i;
                        
                    }

                }

                if (posDel==Infinity){

                    console.log(`\nThe flight with the introduced id is currently not in the list or invalid id introduced`);

                    return;

                } else {

                    info.splice(posDel, 1)  // Eslimina el elemento del array donde se encuentra el vuelo que se desea eliminar

                    console.clear();    //Para mayor claridad, limpia la consola

                    console.log(`\nThe flight with the id ${flightDel} has been deleted from the list`);

                    flightsInfo(info)   //Se muestra de nuevo la información de los vuelo para ver la lista actualizada

                    return;
                }

            default:

            search = "No valid"
            console.log(`\nPlease indicate a valid option`); // Si no se ha introducido una opción válida, se continua pidiendo un valor válido


        }

    } while (search == "No valid");

    return;

}

function skyAir(info) {  //Esta función controla el flow del programa, llamando a todas las funciones según sea necesario

    console. clear()    //Para mayor claridad, se limpia la consola por si hubiera algo en pantalla
    let stopCond=false  // Esta variable se usa para determinar si el programa debe detenerse

    do {

        console. clear() //Se limpia la pantalla (por si no es la primera vez que se ejecuta el programa)

        flightsInfo(info)   // Se muestra la lista inicial devuelos

        let privileges = userType() // Se solicita el tipo de usuario

        if (privileges =="USER"){   // se ejecuta la función oportuna según si el usuario es "USER" o "ADMIN"

            opUser(info)

        } else {

            opAdmin(info)

        }

        let ans="";

        do{

        ans=prompt(`Would you like to perform any other operation? (Yes/No)`,`Yes/No?`)  // Se pregunta al usuario si decide realizar otra operación. En caso afirmativo (Yes) se repite todo el proceso.
        

        if (ans!=="Yes" && ans!=="No") {        // Se continua pidiendo input siempre que la respuesta dad por el usuario sea distinta de "Yes" o "No"

        console.log("Please introduce a valid answer")

        }
        
        } while(ans!=="Yes" && ans!=="No")

        ans == "Yes" ? stopCond = false : stopCond = true
        
    } while (stopCond==false)

console. clear()
console.log(`Thanks for using Skylab Airlines`); // Bye, Bye!

return;

}

skyAir(flights) // Ejecuta el programa de Skylab Airlines