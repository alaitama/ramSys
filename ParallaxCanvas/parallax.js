
/*
var divParallax = document.getElementById("parallax");

var grassCanvas = document.getElementById("grass");
var grassCtx = grassCanvas.getContext("2d");
*/
var divParallax = null;
var grassCanvas = null;
var grassCtx = null;

//Time refresh
var then;

//Sizes
var WIDTH = 0;
var HEIGHT = 0;
var DEBUG = false;

//GRASS IMAGE
var grassReady = false;
var grassImage = new Image();
grassImage.onload = function () {
    grassReady = true;
};
grassImage.src = "./images/grass.png";
//desplazamiento cesped
var grassDelay = 0;

//TREE IMAGE
var treeReady = false;
var treeImage = new Image();
treeImage.onload = function () {
    treeReady = true;
};
treeImage.src = "./images/arbol.png";
//desplazamiento arbol
var treeDelay = 10;

//CIPRES IMAGE
var cipresReady = false;
var cipresImage = new Image();
cipresImage.onload = function () {
    cipresReady = true;
};
cipresImage.src = "./images/cipres.png";
//desplazamiento cipres
var cipresDelay = 200;


var initParallax = function() {
    
    divParallax = document.getElementById("parallax");
    
    WIDTH = divParallax.offsetWidth;
    HEIGHT = divParallax.offsetHeight;
    
    // Create the canvas
    grassCanvas = document.createElement("canvas");
    grassCtx = grassCanvas.getContext("2d");
    
    grassCanvas.width = WIDTH;
    grassCanvas.height = HEIGHT;
    
    divParallax.appendChild(grassCanvas);
    
    //grassWidth = grassImage.width;
    //grassHeight = grassImage.height;
    
    if(DEBUG) {
        console.log("Size of parallax: width=" + WIDTH + ", height=" + HEIGHT);
        console.log("Size of grassImage: width=" + grassWidth + ", height=" + grassHeight);
    }
    
};

var render = function() {
    
    if(DEBUG)
        console.log("Init render()");
    
    //Limpiamos pantalla
    grassCtx.clearRect ( 0 , 0 , WIDTH , HEIGHT );
    
    //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    /*
        img	Specifies the image, canvas, or video element to use	 
        sx	Optional. The x coordinate where to start clipping	
        sy	Optional. The y coordinate where to start clipping	
        swidth	Optional. The width of the clipped image	
        sheight	Optional. The height of the clipped image	
        x	The x coordinate where to place the image on the canvas	
        y	The y coordinate where to place the image on the canvas	
        width	Optional. The width of the image to use (stretch or reduce the image)	
        height	Optional. The height of the image to use (stretch or reduce the image)	
    */
    //grassCtx.drawImage(grassImage, grassDelay, 0, grassWidth-grassDelay, grassHeight, 0, HEIGHT - grassHeight, grassWidth, grassHeidht);
    
    //Dibujamos cipreses
    if (cipresReady) {
        
        cipresWidth = cipresImage.width;
        cipresHeight = cipresImage.height;
        
        //console.log("ready");
        grassCtx.save();
        grassCtx.translate(cipresDelay * -1, HEIGHT - cipresHeight);
        grassCtx.drawImage(cipresImage, 0, 0);
        grassCtx.restore();
        
        
        //Miramos si la imagen completa todo el ancho, sino rellenamos
        
        posWidth = cipresWidth-cipresDelay;
        while(posWidth < WIDTH) {
            grassCtx.drawImage(cipresImage, posWidth, HEIGHT - cipresHeight);
            posWidth += cipresWidth;
        }
    }
    
    //Dibujamos arboles
    if (treeReady) {
        
        treeWidth = treeImage.width;
        treeHeight = treeImage.height;
        
        //console.log("ready");
        grassCtx.save();
        grassCtx.translate(treeDelay * -1, HEIGHT - treeHeight);
        grassCtx.drawImage(treeImage, 0, 0);
        grassCtx.restore();
        
        
        //Miramos si la imagen completa todo el ancho, sino rellenamos
        
        posWidth = treeWidth-treeDelay;
        while(posWidth < WIDTH) {
            grassCtx.drawImage(treeImage, posWidth, HEIGHT - treeHeight);
            posWidth += treeWidth;
        }
    }
    else {
        console.log("grassImage no preparada");
    }
    
    //Dibujamos cesped
    if (grassReady) {
        //console.log("ready");
        grassCtx.save();
        grassCtx.translate(grassDelay * -1, HEIGHT - grassImage.height);
        grassCtx.drawImage(grassImage, 0, 0);
        grassCtx.restore();
        
        
        //Miramos si la imagen completa todo el ancho, sino rellenamos
        
        var posWidth = grassImage.width-grassDelay;
        while(posWidth < WIDTH) {
            grassCtx.drawImage(grassImage, posWidth, HEIGHT - grassImage.height);
            posWidth += grassImage.width;
        }
    }
    else {
        console.log("grassImage no preparada");
    }
    
    
        
};

var update = function(modifier) {
    
    //console.log(modifier);
    grassDelay += 50 * modifier ;
    if(grassDelay > grassImage.width) {
        grassDelay -= grassImage.width;
    }
    
    treeDelay += 20 * modifier ;
    if(treeDelay > treeImage.width) {
        treeDelay -= treeImage.width;
    }
    
    cipresDelay += 6 * modifier ;
    if(cipresDelay > cipresImage.width) {
        cipresDelay -= cipresImage.width;
    }
    
};


// The main game loop
var main = function() {
    var now = Date.now();
   	var delta = now - then;

    update(delta / 1000);
	//calculateFps(now);
    render();
    
    then = now;
    
    requestAnimationFrame(main);

};

var start = function() {
    then = Date.now();

    existsRequestAnimationFrame();
    //setInterval(main, 1000/60);
    //main();
    requestAnimationFrame(main);
};

function existsRequestAnimationFrame() {
    raf = window.mozRequestAnimationFrame    ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame     ||
          window.oRequestAnimationFrame      ||
          window.requestAnimationFrame;
    if(raf)
        console.log("Existe requestAnimationFrame");
    else
        console.log("No existe requestAnimationFrame");
};
