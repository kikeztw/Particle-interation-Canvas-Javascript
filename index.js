// version 5 arreglando el problema de resize 
// agregando elemento input para modificar la cantidad de puntos

let html = document.getElementsByTagName("html")[0];
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = html.clientWidth;
canvas.height = html.clientHeight ;

// declaracion de las variables para las particulas

let x, y, circleNumber;
let circlecontainer= [];



// inputo elemenent 

let input = document.getElementById("input");
let visuzalidor = document.getElementById("visualizador");
circleNumber = 50;
visuzalidor.innerHTML = `Current Particle Number : ${input.value}`;
document.addEventListener("input", element =>{

    
    visuzalidor.innerHTML = `Current Particle Number : ${input.value}`;
     circleCreater();

})


//eventos

window.addEventListener("resize", () => {

    canvas.width = html.clientWidth;
    canvas.height = html.clientHeight ;

})

window.addEventListener("mousemove", element => {

    mouse.x = element.x;
    mouse.y = element.y;

})

window.addEventListener("mouseout", () => {

    mouse.x = undefined;
    mouse.y = undefined;

})


// obecto mouse 


var mouse = {

    x : undefined,
    y : undefined,

}



// objecto circulo


function Circle (x,y){

    this.red = Math.floor(Math.random() * 255);
    this.green = Math.floor(Math.random() * 255);
    this.blue = Math.floor(Math.random() * 255);
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * 4;
    this.dy = (Math.random() - 0.5) * 4;
    this.radius = (Math.random() * 2) + 1.5;
    this.udapte = function(){

        if( this.x > innerWidth - 20 || this.x < 0 ){

            this.dx = -this.dx;

        }

        if( this.y > innerHeight - 20 || this.y < 0){

            this.dy = -this.dy;

        }

       this.x += this.dx;
       this.y += this.dy;     
       this.draw()
       this.line(circlecontainer);
       this.lineMouseTo( mouse);

    }
}


Circle.prototype.draw = function(){

    
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = `rgba(${this.red},${this.green},${this.blue}, 0.7)`;
    c.fill();

};

Circle.prototype.line = function(array){

       
   
    array.forEach(element => {

        let sx = Math.pow((this.x - element.x),2);
        let sy = Math.pow((this.y - element.y),2);
        let d = Math.sqrt(sx + sy);  
        

        if(d < 100 ){
                c.beginPath();
                c.moveTo(this.x, this.y);
                c.lineTo(element.x, element.y);
                c.strokeStyle = "white";
                c.lineWidth = "0.1";
                c.stroke();
        }
    })

 

}

Circle.prototype.lineMouseTo = function( object){


        let sx = Math.pow((this.x - object.x),2);
        let sy = Math.pow((this.y - object.y),2);
        let d = Math.sqrt(sx + sy);   
        if(d < 100){
            c.beginPath();
            c.moveTo(this.x , this.y);
            c.lineTo(object.x, object.y);
            c.lineWidth = "0.2";
            c.stroke();
        }  


}




// creando los circulos y lineas

function circleCreater(){

    circlecontainer = [];
    circleNumber = input.value;


for(let i = 0; i < circleNumber; i++){

   
    x = Math.random() * html.clientWidth ;
    y = Math.random() * html.clientHeight;
    var circle = new Circle (x,y);
    circlecontainer.push(circle);
    
}

    
}




function animated (){

    requestAnimationFrame(animated);
    c.clearRect(0,0, innerWidth, innerHeight);
    circlecontainer.forEach((element, index )=> {

        // element.udapte();
        element.udapte();
        
    })

}

circleCreater();
animated();






