/*I will need to know how to:
1. Create a and Resize my canvas depending on my project requirement
2. What kind of Drawing Elements and how do I do it.
3. Animating Elements, how to move elements from one place to another and possibly make it smooth.
4.Interacting with Elements, im thinking mouse move mouse down click or touch on phone event listeners.
*/

// creating and resizing canvas
console.log("app.js is connected")
let canvas = document.querySelector("canvas");
console.log(canvas);
// alter the width and height of the canvas
// there is a slight margin by default because some elements have it alrady applied to it.
// if inspecting the body it will show a margin of 8px.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ********* Drawing a simple box rectangle ***************
// returning a drawing context to a variable called ctx
// pretty much creating a super object passing a lot of methods and functions in which I can use to draw within my canvas
// my magic paint brush.
// 2d elements that will be able to be mainpulated within a 2d space. 
let ctx = canvas.getContext("2d");

// for(let i = 0; i < 3; i++){
//     let x = Math.random() * innerWidth;
//     let y = Math.random() * innerHeight;
//     ctx.fillRect(x, y, 50, 50 )
// }
// first function is fillRect(1,2,3,4) takes in 4 values x, y, width, height.
// ctx.fillStyle = "white";
// ctx.fillRect(100, 200, 100, 100);
// ctx.fillStyle = "blue";
// ctx.fillRect(300, 200, 100, 100);
// ctx.fillStyle = "red"
// ctx.fillRect(500, 200, 100, 100);

// to change a rectangle color have to use .fillStyle
// ctx.fillStyle = "green";
/* Different Canvas Objects 
1.Rectangles
2.Lines
3.Arcs/Circles
4.Besier Curves
5.Images
6.Text
Going to try and do the first 3
*/

//            x    y   width height
// ctx.fillRect(100, 100, 100, 100);


// ********* drawing a Line ***********
// this means to start a path now connect this path to anything proceeding.
// ctx.beginPath();
// moveTo(x, y) takes an x & y coordiante for its arguments.
// this point is invisible intill the stroke method is called to go from point to point. 
// ctx.moveTo(50, 400);
// ctx.lineTo(400, 50);
// ctx.lineTo(300, 10);
// this is where the line can change color and gain css attributes by 
// can be "rgba()"" text "blue" color value or hexcode #
// ctx.strokeStyle = "#fff";
// diagonal line has been drawn when stroke is called.
// ctx.stroke();

// ************* Drawing an arc at 360 or circle *************
// ctx.beginPath();
// arc takes an x, y, and is radius, startAngle, endAngle, clockwise true or false not much of a big deal
// Note the startAngle and endAngle take degrees in radian
//      x     y   radius startAngle:0 and want endAngle to stop at 2pi radian so its called Math.PI * 2 to get the full arc.
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false) // <-- just the outline so now need to fill the outline using a stroke or fill property
// ctx.strokeStyle = "#000";
// ctx.stroke(); // the previous line is still connecting to this stroke() with the circle so initialize this circle with beginPath() to start a new one

// creating multiple circles
// to determine how many times I want this forloop to run start with a variable
// then run this for loop as long as i < 3 so it means 3 times. starts at 0 and then run the forloop till is equal to 3 
// and in order to increment i use i++
// what it looks like
// start at 0 it runs through the code ctx... then when its done it increments up by 1 because of i++ then i variable from 0 turns into 1 and so on till it equeals 3
// draws out circles on top of each other looking darker. 
// for (let i = 0; i < 3; i++) {
//     // to change location of circles so its not stacking on top of each other make x and y variables.
//     let x = Math.random() * window.innerWidth;// circles will show in the left corner because it goes up to 0 and 1
//     let y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false) // <-- just the outline so now need to fill the outline using a stroke or fill property
//     ctx.strokeStyle = "red";
//     ctx.stroke();
// }

// ******** Adding inner activity to canvas is eventListeners ********
// need to get x and y value of mouse
// set this with mousemove eventListener
let mouse = {
    x: undefined,
    y: undefined,
}
// used for circles
let maxRadius = 50;
let minRadius = 5;

// creating colorArray to change circle colors
const colorArray = [
    "green",
    "blue",
    "white",
    "red",
    "yellow",
];
console.log(colorArray.length);
// there will be a function called in javascript and
// the function wil happen when the event is current. 
// to monitor an eventListener of the mouse movement called mousemove
// and then will need a function to be called whenever this event occurs
// adding an anonimous function
// getting circles to ineract need some geometry get distance between mouse position and distance between each individual circle.
// if the distance between mouse position and individual circle is less than 50 make circle grow if greater than 50 the circle shrinks down back to its original size.
// can be done through eventListener
window.addEventListener("mousemove",
    // anonimous function always has something called an event argument
    function (event) {
        // console.log("moving mouse right now")
        // console.log(event);
        // mouse.x will be equal to event.x property
        mouse.x = event.x;
        mouse.y = event.y;
        // console.log(mouse);
    }
)

// ******** Object oriented Javascript *************
// this is to make random circles appear on screen to have the same attributes created on the bottom to bounce around 
// ******** Getting circles to move on the screen ********
// ctx.beginPath()
// ctx.arc(300, 300, 50, 0, Math.PI * 2, false);
// ctx.strokeStyle = "000";
// ctx.stroke();
// functions name starts with a capitol to indicate its an javascript object
function Circle(x, y, dx, dy, radius) {
    // circle will need its own x and y value with this.x and this.y
    // where do I get this x value? passing in x to our Circle function each time we instantiate a new circle
    // each time I create a new circle pass in the x argument
    // the x argument travles to the x and setting the x to this.x
    // these x and y values are useless if not used any where so need create method within object
    this.x = x;
    this.y = y;
    // these are the velocity and each circle will have its own speed
    this.dx = dx;
    this.dy = dy;
    // forgot to give my circle its own radius in here to be referenced seperatly from any other circle
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    // instead of being equal to a property like and x and y set it to a anonymous function and is going to include whatever content is inside
    // whenever draw function is being called want to make sure its drawing a circle. 
    this.draw = function () {
        // this function aims to draw the circle when this.draw is called
        // console.log("circle 🐮")
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // need to change ctx.fillStyle so each fill style will be equeal to one of the random colorArray
        // first need to access colorArray
        // then need to specify random index from 0 to 4
        // colorArray.length is 5
        // to get random number use Math.random() and multiply that with colorArray.length
        // to get a random index from colorArray is colorArray[Math.random() * colorArray.length]
        ctx.fillStyle = this.color;
        // ctx.strokeStyle = "#000";
        // ctx.stroke();
        ctx.fill();
    }
    // want to make sure that first circle is drawn then change the property
    // can call this.draw method inside update method
    // instead of having one draw function going to have an update function
    // equal to an anonymous function as well
    this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            // change dx to this.dx to make sure its reference the circles properites
            this.dx = -this.dx;
        } else if (this.y + this.radius > innerWidth || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        // interactivty
        // if this is less than 50 grow radius of cricle 
        // all circles to right of mouse are growing 
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50
        ) {
            // add new conditional within conditional to not make it look too lengthy
            // if each individual circles radius is no greater than 44 then increment this.radius ++1
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
            // else if only subtract 1 from the radius circle is greater than 2
            // 2 so that the radius dont turn into nothing and at least be 2pixels wide in radius
            // circles will start at 2 pixels wide
        } else if (this.radius > minRadius) {
            // make circles not disapear
            this.radius -= 1;
        }
        this.draw();
    }
}
const circleArray = [];
// want to create multiple circles on screen.
//circleArray will store all the circles created
// this wont cover all use cases
for (let i = 0; i < 50; i++) {
    // variable for radius to be used to make the circle bounce from the edge instead of its center
    // changed to from 30 to Math.random if get lowest value from 0 to 3 and + 1 will be the lowest value will be gettinga range of 1 through 4
    let radius = Math.random() * 3 + 1 ;

    // throw in circle 
    // creating a variable /object with a new Circle that has x and y 200 
    // let circle = new Circle(200, 200, 3, 3, 30);
    // giving the circles randomness
    // wanna make sure x coordinate is greather than the radius to stop it from being stuc on the walls add + radius on to the end
    // its also to make sure when the circles spawn in a location that its greater than circles radius so it doesnt get caught along the sides
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    // creating a variable for y starting point
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    // creating an x velocity
    // the greatest value of Math.random() is from 0 to 1, so if it subtracts .5 from it turns into .5 and once it goes to he lowest value 0 it turns into -.5
    // and with this simple arithmatic function can get a negative or positive value. 
    let dx = (Math.random() - 0.5) * 4;
    // creating a veloicty for y so circle can move around. 
    let dy = (Math.random() - 0.5) * 4;
    // using circleArray.push(new Circle()) each time this forloop is iterated through.
    circleArray.push(new Circle(x, y, dx, dy, radius));

}
// console.log(circleArray);
// if I wanted to fire this draw function take the circle object and call the draw method
// circle.draw();

// need to make a function called animate and putting 
// it inside requestAnimationFrame function so its recursive 
// and calls itself over and over giving it the animation loop
// let x = Math.random() * innerWidth;
// // creating a variable for y starting point
// let y = Math.random() * innerHeight;
// // creating an x velocity
// // the greatest value of Math.random() is from 0 to 1, so if it subtracts .5 from it turns into .5 and once it goes to he lowest value 0 it turns into -.5
// // and with this simple arithmatic function can get a negative or positive value. 
// let dx = (Math.random() - 0.5) * 8;
// // creating a veloicty for y so circle can move around. 
// let dy = (Math.random() - 0.5) * 8;
// // variable for radius to be used to make the circle bounce from the edge instead of its center
// let radius = 30;

function animate() {
    // once calling he animate function the requestAnimationFrame function will create a loop
    // wanna create a loop and what function do I want to call to loop through
    // what it looks like call requestionAnimationFrame function -> then call animate function and -> inside animate is the requestAnimationFrame function has animate looping througha again
    requestAnimationFrame(animate);
    // console.log("bob")
    // the arc x value is moving however it is creating a streak because the canvas isnt being cleared
    // clearRect with an x and y of 0 and set it to the screens innerWidth and innerheight;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // to get circles drawn on screen again make another for loop
    for (let i = 0; i < circleArray.length; i++) {
        // to access all individual items in the array 
        // first access the circleArray and to access each individual index its circleArray[i]
        // when it calls the first circle it has an update function so call .update
        // and this will loop through 20 times since specified in the first loop
        circleArray[i].update()
    }

    // circle.update();
    // the way animation works is by refreshing the page. so have to create something constantly refreshing the page 
    // the circles x and y value incrementally little by little by 1, so gives me illusion that the circle is moving
    // grab circle code and place in animate function this can be used later to maybe create the shooting effect.
    // ctx.beginPath();
    // ctx.arc(x, y, radius, 0, Math.PI * 2, false); // since the x and y value of the circle is hard coded it is not being moved there creating circles on top of each other while the animate function is constantly looping
    // ctx.strokeStyle = "purple";
    // ctx.stroke()
    // x coord is moving at 1 pixel each time animate function is called. 
    // x += dx;
    // y += dy;
    // logic to make the circle bounce off the end screen, this can be used for hit detection later
    // if the x is greater than the innerWidth take the variable dx controling its x value to turn negative going the other way.
    // now the circle is bouncing back but it comes back from the radius center of the circleand want it to bounch of the edge of circle

    // circle somtimes get stuck wobbling on the corner in a straight line and I think its because the logic
    // if (x + radius > innerWidth || x - radius < 0) {
    //     dx = -dx;
    // } else if (y + radius > innerWidth || y - radius < 0) {
    //     dy = -dy;
    // }
}
// nothing works yet intill I put data in to show where the circle will move
animate();
