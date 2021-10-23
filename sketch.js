//Create variables here
var dog, dogImage, happyDog, foodS, database, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var food;
var gameState;
function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  houseImage = loadImage("images/house.png")
  milkImage = loadImage("images/Milk.png");
  bedroomImage = loadImage("images/BedRoom.png");
  gardenImage = loadImage("images/Garden.png");
  washroomImage = loadImage("images/WashRoom.png");
  deadDogImage = loadImage("images/deadDog.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(440,400);
  //dog.addImage(dogImage);
  dog.scale = 0.2;
  food = new Food();

  database = firebase.database();
  foodStockRef = database.ref('Food');
  foodStockRef.on("value", function(data){
    foodS = data.val();
    food.updateFoodStock(foodS);
    
  });
  
  gameStateRef = database.ref('gameState');
  gameStateRef.on("value", function(data){
    gameState = data.val();
  });
  
  feedPet = createButton("Feed Pet");
  feedPet.position(500,60);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600, 60);
  addFood.mousePressed(addFoods);

  
  
  
}


function draw() {  
  currentTime = hour();
  if (currentTime - lastFed ===4){
    gameState = "hungry";
    background(houseImage);
    updateState(gameState);
    dog.visible = true;
    dog.addImage(dogImage);
    food.display();
    feedPet.show();
    addFood.show();
  }
  if(currentTime - lastFed <= 1){
    gameState = "playing";
    updateState(gameState);
    background(gardenImage);
    dog.visible = false;
    feedPet.hide();
    addFood.hide();
  }
  if(currentTime - lastFed === 2 ){
    gameState = "bathing";
    updateState(gameState);
    background(washroomImage);
    dog.visible = false;
    feedPet.hide();
    addFood.hide();
  }

  if(currentTime - lastFed === 3){
    gameState = "sleeping";
    updateState(gameState);
    background(bedroomImage);
    dog.visible = false;
    feedPet.hide();
    addFood.hide();
  }

  if(currentTime - lastFed === 0){
    gameState = "eating";
    updateState(gameState);
    background(houseImage);
    dog.visible = true;
    dog.addImage(happyDogImage);
    addFood.show();
    food.display();
  }
  
  if(currentTime - lastFed === 5){
    gameState = "dead";
    background(houseImage);
    dog.visible = true;
    dog.addImage(deadDogImage);
    addFood.show();
    feedPet.hide();
    food.display();
  }
  
  feedTime = database.ref('FeedTime');
  feedTime.on("value", function(data){
    lastFed = data.val();
  });
  textSize(15);
  if(lastFed > 12){
    text('Last Fed : ' + lastFed%12 + "PM", 350,30);
  } else if(lastFed === 0) {
    text("Last Fed : 12 AM", 350,30);
  } else {
    text('Last Fed : ' + lastFed + "AM", 350,30);
  }

 


 drawSprites();
  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function feedDog(){
  if(gameState !== "dead"){
    dog.addImage(happyDogImage);
    image(milkImage,dog.x - 100, dog.y,70,70);
    if(food.getFoodStock() <= 0) {
      dog.addImage(dogImage);
    } else {
      food.updateFoodStock(food.getFoodStock() - 1);
    }
    
    database.ref('/').update({
      Food : food.getFoodStock(),
      FeedTime : hour()
    })
  }
  
}

function updateState(x){
  database.ref('/').update({
    gameState : x
  });
}



