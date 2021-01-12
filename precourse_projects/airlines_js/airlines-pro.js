let flights = [

    { id: 0, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },

    { id: 1, to: 'New York', from: 'Barcelona', cost: 700, scale: false },

    { id: 2, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },

    { id: 3, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },

    { id: 4, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },

    { id: 5, to: 'London', from: 'Madrid', cost: 200, scale: false },

    { id: 6, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },

    { id: 7, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },

    { id: 8, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },

    { id: 9, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },

    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }];


function flightsInfo(info){  //Esta funcion se encarga de motrar la info relacionada con la lista actual de vuelos para el día de hoy

    let today = new Date();
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

        

        for (let i=0; i<info.length; i++) {

            destinations = destinations +` ${info[i].to}`;

        }

        console.log(`\nToday last flight/s has/have the following destination/s: ${destinations}`);


    } else { // Si la lista tiene mas de 5 vuelos,se mostraran los destinos de los ultimos cinco

        for (let i=info.length-5; i<info.length; i++) {

            destinations = destinations +` ${info[i].to}`;

        }

        console.log(`\nToday last 5 flights have the following destinations: ${destinations}`);

    }


return
    
}    

function userType() {   //Esta función se encarga de identificar al usuario cono "User" o "Admin"

    let user=``;

    do {

        user = prompt(`Are you "User" or "Admin"?`,``)

        if(!user){

            user="invalid";

        }
        
                if (user.toLowerCase() !=`user` && user.toLowerCase() !=`admin`) {

            console.log(`Please introduce a valid identifier`);

        }

    } while (user.toLowerCase() !=`user` && user.toLowerCase() !=`admin`); //Solo se aceptan las entradas por teeclado "USER" o "ADMIN" en mayusculas

    if (user.toLowerCase()==="user"){

        user="USER";

    } else {

        user="ADMIN";

    }
   
    return user;

}

function reID(info) {   //Esta función sirve para reorganizar los id de los vuelos. Se ejecutará después de borrar un vuelo del sistema

    for (let i=0;i<info.length;i++){

        info[i].id=i

    }

    return info
}

function sortByPrice(info){

    let sortedInfo=[];
    let printScale=[];

    for (let i=0; i<info.length; i++){      // Se crea una copia del array info en el array sortedInfo. Solo este últimp array sera el que se ordenara por coste

        sortedInfo[i]=Object.assign({},info[i])

    }

    sortedInfo = sortedInfo.sort(function(a,b){return (b["cost"]-a["cost"]);});       //Ordenamos el array de vuelos por precio

    for (let i=0; i<sortedInfo.length; i++ ) {  //Recorre cada elemento del array de objectos
           
        if (sortedInfo[i].scale==true){   //La variable printScale se utiliza para indicar si el vuelo tiene escala o no
    
            printScale="Yes";

        } else {

        printScale="No"

        }

        console.log(`Flight ID: ${sortedInfo[i].id} Departure location: ${sortedInfo[i].from}, Destination: ${sortedInfo[i].to}, Cost: ${sortedInfo[i].cost}€ Scale?: ${printScale}`);

    }

    return sortedInfo;

}

function opUser(info) { //Esta funcion realizará las tareas permitidas si el usuario es "USER"

    let search = 0;  //Esta variable se usa para almacenar la opción de búsqueda seleccionada por el usuario

    let option = "";    //Esta variable almacena el ID del vuelo a comprar o, en caso de que no se quiera comprar ningún vuelo, almacenara la palabra "No"

    let sortedInfo=[]; //Almacenamos en la variable "sortedInfo los vuelos ordenados por precio"

    let found=false;

    let aidi;

    let printScale=[];

        do{     //El programa pide introducir la forma de busqueda. Si se introduce un valor no contemplado (diferente de 1, 2 o 3), se vuelve a solicitar.

            search = prompt(`You can now search by price. Please indicate your searching preferences: 1 - Highest price, 2 - Lowest price, 3 - By exact price`,`1, 2 or 3`) 
            
            switch (search) {

                case "1":
                  
                    console.clear(); //Para mayor claridad, limpiamos la consola

                    console.log(`\nHereby you can see the flights sorted by price\n\n`)

                    sortedInfo=sortByPrice(info);
                    
                    console.log(`\nThe flight with the highest price departs from ${sortedInfo[0].from}, lands at ${sortedInfo[0].to} and has a cost of ${sortedInfo[0].cost} euros`);                 
                    
                    do {
                    
                    option = prompt(`Should you want to purchase a flight, please state the flight ID, otherwise answer No`,`ID, or No?`);

                    if (!option){

                        option="invalid"

                    }

                    for ( let i=0; i<sortedInfo.length;i++){

                        if (sortedInfo[i].id==parseInt(option)) {

                            found=true;
                            aidi=i;

                        } 

                    }

                    if (found==false && isNaN(parseInt(option)) == false) {

                        //console.log(option)
                        //console.log(typeof(parseInt(option)))
                        console.log("\n\nThere´s no flight with such ID\n\n")

                    }

                        if (option.toLowerCase() !="no" && found ==false) {

                            //console.log(option)
                            console.log("Please indicate a valid option");

                        }

                    } while (option.toLowerCase() !="no" && found ==false)

                    if (found==true) {


                        printScale = (sortedInfo[aidi].scale==true)?  "Yes" : "No";  //La variable printScale se utiliza para indicar si el vuelo tiene escala o no
                
                        console.clear();

                        console.log(`Thanks for purchasing the flight with the ID: ${sortedInfo[aidi].id} Departure location: ${sortedInfo[aidi].from}, Destination: ${sortedInfo[aidi].to}, Cost: ${sortedInfo[aidi].cost}€ Scale?: ${printScale} `)

                    }


                break;  

                case "2":
                    
                    console.clear(); //Para mayor claridad, limpiamos la consola

                    console.log(`\nHereby you can see the flights sorted by price\n\n`)

                    sortedInfo=sortByPrice(info);

                    console.log(`\nThe flight with the lowest price departs from ${sortedInfo[sortedInfo.length-1].from}, lands at ${sortedInfo[sortedInfo.length-1].to} and has a cost of ${sortedInfo[sortedInfo.length-1].cost}`);
                    
                    do {
                    
                        option = prompt(`Should you want to purchase a flight, please state the flight ID, otherwise answer No`,`ID, or No?`);
    
                        if (!option){

                            option="invalid"
    
                        }

                        for ( let i=0; i<sortedInfo.length;i++){
    
                            if (sortedInfo[i].id==parseInt(option)) {
    
                                found=true;
                                aidi=i;
    
                            } 
    
                        }
    
                        if (found==false && isNaN(parseInt(option)) == false) {
    
                            //console.log(option)
                            //console.log(typeof(parseInt(option)))
                            console.log("\n\nThere´s no flight with such ID\n\n")
    
                        }
    
                            if (option.toLowerCase() !="no" && found ==false) {
    
                                //console.log(option)
                                console.log("Please indicate a valid option");
    
                            }
    
                        } while (option.toLowerCase() !="no" && found ==false)
    
                        if (found==true) {
    
    
                            printScale = (sortedInfo[aidi].scale==true)?  "Yes" : "No";  //La variable printScale se utiliza para indicar si el vuelo tiene escala o no
                    
                            console.clear();
    
                            console.log(`Thanks for purchasing the flight with the ID: ${sortedInfo[aidi].id} Departure location: ${sortedInfo[aidi].from}, Destination: ${sortedInfo[aidi].to}, Cost: ${sortedInfo[aidi].cost}€ Scale?: ${printScale} `)
    
                        }

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
                    let pos=0;

                    while (flightFlag == false && pos<info.length){

                        flightFlag=false;
                    
                        if (info[pos].cost.toString()===price) {

                            posPrice=pos;
                            flightFlag=true;
                            pos++
                                                   
                        } else {

                            pos++

                        }
                    }                         
                    
                    if (flightFlag===true) {

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
let flightDel;


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

                let posDel=Infinity;    //Esta variable se usa para almacenar la posición en la cual se haya el vuelo a eliminar. De no econtrarse el vuelo, la variable quedará con el valor infinito.

                do{

                    flightDel = prompt(`\nPlease introduce the flight ID of the flight to be deleted`,`flight ID?`);

                    for (let i=0; i<info.length; i++){

                        if (info[i].id==flightDel){

                            posDel=i;
                            
                        }

                    }

                    if (posDel==Infinity){

                        console.log(`\nThe flight with the introduced id is currently not in the list or invalid id introduced. Please introduce a valid flight ID.`);

                    }

                    } while (posDel==Infinity)
                  
                console.clear();    //Para mayor claridad, limpia la consola

                if (info[posDel].scale==true){   //La variable printScale se utiliza para indicar si el vuelo tiene escala o no
                
                    printScale="Yes";
        
                } else {
        
                printScale="No"

                }

                console.log(`\nThe following flight has been deleted form the available flights list:\nID ${flightDel}\nDeparture: ${info[flightDel].from}\nDestination: ${info[flightDel].to}\nCost: ${info[flightDel].cost}€ Scale?: ${printScale}\n`);

                info.splice(posDel, 1)  // Eslimina el elemento del array donde se encuentra el vuelo que se desea eliminar

                info=reID(info) //Se reordena el array

                flightsInfo(info)   //Se muestra de nuevo la información de los vuelo para ver la lista actualizada

                return;
                

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

        ans=prompt(`Would you like to perform any other operation? (Yes/No)`,`Yes/No?`);  // Se pregunta al usuario si decide realizar otra operación. En caso afirmativo (Yes) se repite todo el proceso.
       
        if (!ans){      //Si el usuario presiona el botón "cancelar", seasume que quere cerrar el programa, por lo que se asigna que ha introducido "no"

            ans="no";
            console.log(ans);

        }

        if (ans.toLowerCase()!="yes" && ans.toLowerCase()!="no") {        // Se continua pidiendo input siempre que la respuesta dad por el usuario sea distinta de "Yes" o "No"

        console.log("Please introduce a valid answer")

        }
        
        } while(ans.toLowerCase()!=="yes" && ans.toLowerCase()!=="no")

        ans.toLowerCase() == "yes" ? stopCond = false : stopCond = true
        
    } while (stopCond==false)

console. clear()
console.log(`Thanks for using Skylab Airlines`); // Bye, Bye!

return;

}

skyAir(flights) // Ejecuta el programa de Skylab Airlines