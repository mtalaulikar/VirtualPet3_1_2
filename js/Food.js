class Food {
    constructor(){
        this.image = loadImage("images/FoodStock.png");
        this.foodStock=0;
        this.lastFed;
        this.foodStockRef;
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(x){
        this.foodStock = x;
    }

    deductFood(foodS){
        foodS = foodS - 1;
    }

    display(){
        
        var x = 40, y=220;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodStock !=0){
            for(var i = 0; i<this.foodStock; i++){
                if(i % 5 === 0){
                    x = 30,
                    y = y+ 80;
                }
                image(this.image, x, y, 40,40);
                x = x+30;
            }
        }
    }
}