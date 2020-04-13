import { GameTemplate } from "./GameTemplate.js"
import { MovableGameObject, Ball, GameObject } from "../GameObject.js";

export class FallingStones extends GameTemplate {

    start() {
        //instance variables
        this.gameOver = false;
        this.player = new Ball(175, 450, 50, 50, "yellow", 0, 0);
        this.bullets = [];
        this.tickCounterStone = 0;
        this.tickCounterProjectil = 0;
        this.stones = [];
        this.points = 0;
        this.life = 5;
        if (this.gameOverText != 0) this.gameOverText.pop();
    }

    
    bindControls() {
        this.inputBinding = {
        "left": () => this.player.vx = -3, //higher number --> more speed
        "right": () => this.player.vx = 3,
        "up":   this.createProjectil.bind(this), //without bind it´s not possible to get this.bullets in createProjectil()
        };
    }

    createProjectil(bool) {
        if(bool && this.tickCounterProjectil >= 40) { //creates just one projectil per keypress, possible after 40 frames
            let projectil = new MovableGameObject(this.player.x, this.player.y, 10, 10, "red",0 , -6); //set coordinates of player position
            this.bullets.push(projectil),
            this.keydown = true,
            this.tickCounterProjectil = 0;
        } else {
            this.keydown = false;
        }
    }

    update(ctx) {
        this.player.update(ctx);
        this.player.borderCollision(ctx);
        for (let i = this.bullets.length -1 ; i >= 0 ; i--) {
            this.bullets[i].update(ctx); //update coordinates of all projectiles
            for (let m = this.stones.length -1; m >= 0; m--) {
                if (this.bullets[i].y >= this.stones[m].y && this.bullets[i].y <= this.stones[m].y + 100){
                    if (this.bullets[i].x >= this.stones[m].x && this.bullets[i].x <= this.stones[m].x + 50) {
                        this.bullets.splice(i, 1), //removes projectil and stone by contact
                        this.stones.splice(m, 1);
                        this.points++;
                        break;
                    }
                } 
            }
        }
        this.createStones();

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
            this.gameOverText.push("Points: " + this.points),
            this.gameOver=true;
        } 
        this.tickCounterStone++;
        this.tickCounterProjectil++;
    }

    createStones() {
        if (this.tickCounterStone % 80 == 0) { //creates first stone by 90ticks, creates stone by 150 ticks
            let stone = new MovableGameObject(Math.random()*350, -100, 50, 100, "grey", 0, 2);
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
        ctx.fillText("lifes: " + this.life, this.player.x + 10, this.player.y +25, 45, 45);
    }

    //static setter
    static get NAME() {
        return "Falling Stones XXL";
    }
}
