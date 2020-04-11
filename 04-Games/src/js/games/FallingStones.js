import { GameTemplate } from "./GameTemplate.js"
import { MovableGameObject, Ball, GameObject } from "../GameObject.js";

export class FallingStones extends GameTemplate {

    start() {
        this.gameOver = false;
        this.player = new Ball(175, 450, 50, 50, "yellow", 0, 0);
        this.bullets = [];
        this.stones = [];
    }

    bindControls() {
        this.inputBinding = {
        "left": () => this.player.vx = -2, //higher value --> more speed
        "right": () => this.player.vx = 2,
        "up":  this.createProjectil.bind(this), //without bind it´s not possible to get this.bullets in createProjectil()
        };
    }

    createProjectil() {
        let newProjectil = new MovableGameObject(this.player.x, this.player.y, 10, 10, "red",0 , -3); //set coordinates of player position
        this.bullets.push(newProjectil);
        
        console.log(this.bullets);
    }

    update(ctx) {
        this.player.update();
        this.player.borderCollision(ctx); //implements bordercollision
        //this.limitPlayerSpeed(); //limits the speed of player
        for (let projectil in this.bullets) { //update coordinates of bullets
            projectil.update;

            if(projectil.y > ctx.canvas.height) {
                this.bullets.shift;
            }
        }


    }

    draw(ctx) {
        this.player.draw(ctx);
        for (let projectil in this.bullets) {
            projectil.draw;
        }
    }

    //static setter
    static get NAME() {
        return "Falling Stones XXL";
    }
}
