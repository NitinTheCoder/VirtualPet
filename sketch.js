var dog,sadDog,happyDog, database;
var foodS,foodStock;
var ad;
var feed,dFood;
var foodObj
var lastFed;




function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

 feedTheDog=createButton("Feed The Dog");
 feedTheDog.position(700,95);
 feedTheDog.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

database.ref("feedTime").on("value",(data)=>{lastFed =data.val()})
  
 
console.log(lastFed)
textSize(15)
fill ("white")
if(lastFed>12)
{
  console.log(lastFed)
  
text("lastFeed:"+lastFed%12+"pm",350,30)
}else if(lastFed===0){
  text("lastFeed:12 am",350,30);
}else{
  text("lastFeed:"+lastFed+"am",350,30)
}
 
  drawSprites();
}



//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStorage=foodObj.getFoodStock();
  if(foodStorage<=0)
  {

    foodObj.updateFoodStock(foodStorage*0)
  }else{
    foodObj.updateFoodStock(foodStorage-1);
  }
  database.ref("/").update({Food:foodObj.getFoodStock(),feedime:hour ()});

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
