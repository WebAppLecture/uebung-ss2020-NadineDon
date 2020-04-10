import { GameTemplate } from "./GameTemplate.js"
import { MovableGameObject, Ball } from "../GameObject.js";

export class FallingStones extends GameTemplate {

    start() {
        this.gameOver = false;
        this.player = new Ball(175, 450, 50, 50, "#6bd26b", 0, 0);
        this.bullets = [];
        this.stones = [];
    }

    bindControls() {
        this.inputBinding = {
        "left": this.player.left.bind(this.player),
        "right": this.player.right.bind(this.player),
        "up": this.player.up.bin(this.player),
        "down": this.player.down.bind(this.player),
        };
    }

    //"left": () => this.player.vx -= 1, //higher value --> more speed
   //"right": () => this.player.vx += 1,
    //"up": this.createProjectil(),
    left(bool) {
        this.player.vx -= 1;
    }

    right(bool) {
        this.player.vx += 1;
    }
    
    down(bool) {
        this.vy -= 1;
    }

    up(bool) {
        this.vy += 1;
    }

    createProjectil() {
        this.newProjectil = new MovableGameObject(...this.player); //copy values of player
        this.newProjectil.width = 10, this.newProjectil.height = 10, this.newProjectil.color = red;
        this.bullets.push(this.newProjectil);
    }

    update(ctx) {
        this.player.update();
        this.player.borderCollision(ctx); //implements bordercollision
        this.limitPlayerSpeed(); //limits the speed of player
        for (var projectil in this.bullets) { //increase y-coordinate of all projectils +1
            this.projectil.vy += 1;
        }
        super.update();
    }

    //copied parts of function limitBallSpeed of Pong-class
    limitPlayerSpeed() {
        this.maxPlayerSpeed = 2;
        this.player.vx = this.limit(this.player.vx, -this.maxPlayerSpeed, this.maxPlayerSpeed);
    }

    //copied limit-funciton of Pong-class
    limit(a, lower, upper) {
        if(a < lower) {
            return lower * 1.01;
        }
        if(a > upper) {
            return upper * 1.01;
        } 
        return a;
    }

    draw(ctx) {
        this.player.draw(ctx);
    }

    //static setter
    static get NAME() {
        return "Falling Stones XXL";
    }



}
