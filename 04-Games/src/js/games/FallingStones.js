import { GameTemplate } from "./GameTemplate.js"
import { MovableGameObject, Ball, GameObject } from "../GameObject.js";

export class FallingStones extends GameTemplate {

    start() {
        //instance variables
        this.gameOver = false;
        this.player = new Ball(175, 450, 50, 50, "yellow", 0, 0);
        this.bullets = [];
        this.tickCounter = 0;
        this.stones = [];
        this.points = 0;
        this.life = 5;
    }

    
    bindControls() {
        let keypress = false;
        this.inputBinding = {
        "left": () => this.player.vx = -3, //higher number --> more speed
        "right": () => this.player.vx = 3,
        "up":   this.createProjectil.bind(this), //without bind it´s not possible to get this.bullets in createProjectil()
        };
    }

    createProjectil() {
        if (this.keydown == false && this.tickCounter % 1000 >= 40) { //creates projectil just for keydown, not for keyup
            let projectil = new MovableGameObject(this.player.x, this.player.y, 10, 10, "red",0 , -1); //set coordinates of player position
            this.bullets.push(projectil),
            this.keydown = true,
            this.tickCounter = 0;
        } else {
            this.keydown = false;
        }
    }

    update(ctx) {
        this.player.update(ctx);
        this.player.borderCollision(ctx);
        for (let i = 0; i < this.bullets.length; ++i) {
            this.bullets[i].update(ctx); //update coordinates of all projectiles
            for (let m = 0; m < this.stones.length; ++m) {
                if (this.bullets[i].y >= this.stones[m].y && this.bullets[i].y <= this.stones[m].y + 100){
                    if (this.bullets[i].x >= this.stones[m].x && this.bullets[i].x <= this.stones[m].x + 50) {
                        this.bullets.splice(i, 1), //removes projectil and stone by contact
                        this.stones.splice(m, 1);
                        this.points++;
                    }
                } 
            }
        }
        if(this.bullets.length > 0 && this.bullets[0].y == 0) { //delete projectil at end of screen
            this.bullets.shift()
        }
        for (let k = 0; k < this.stones.length; ++k) {
            this.stones[k].update(ctx);
        }
        if(this.stones.length > 0 && this.stones[0].y == 500) { //delete stone at end of screen
            this.stones.shift(),
            this.life--;
        }
        if (this.life == 0) {
            this.gameOverText.push("Points " + this.points),
            this.gameOver=true;
        }
        this.createStones.bind(this);
        this.tickCounter++;
        this.createStones(); 
    }

    createStones() {
        if (this.tickCounter == 10) {
            let stone = new MovableGameObject(Math.random()*350, -50, 50, 100, "grey", 0, 1);
            this.stones.push(stone);
        }
        else if (this.tickCounter % 180 == 0) {
            let stone = new MovableGameObject(Math.random()*350, -50, 50, 100, "grey", 0, 1);
            this.stones.push(stone);
        }
    }

    draw(ctx) {
        this.player.draw(ctx);
        for (let l = 0; l < this.bullets.length; ++l) {
            this.bullets[l].draw(ctx);
        }
        for (let j = 0; j < this.stones.length; ++j) {
            this.stones[j].draw(ctx);
        }
        ctx.fillText("points " + this.points, this.player.x + 10, this.player.y +25, 45, 45);
    }

    //static setter
    static get NAME() {
        return "Falling Stones XXL";
    }
}
