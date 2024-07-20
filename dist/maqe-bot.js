"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
var Direction;
(function (Direction) {
    Direction["NORTH"] = "N";
    Direction["EAST"] = "E";
    Direction["SOUTH"] = "S";
    Direction["WEST"] = "W";
})(Direction || (Direction = {}));
;
class MAQEBot {
    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.direction = Direction.NORTH;
    }
    turnRight() {
        switch (this.direction) {
            case Direction.NORTH:
                this.direction = Direction.EAST;
                break;
            case Direction.EAST:
                this.direction = Direction.SOUTH;
                break;
            case Direction.SOUTH:
                this.direction = Direction.WEST;
                break;
            case Direction.WEST:
                this.direction = Direction.NORTH;
                break;
        }
    }
    turnLeft() {
        switch (this.direction) {
            case Direction.NORTH:
                this.direction = Direction.WEST;
                break;
            case Direction.WEST:
                this.direction = Direction.SOUTH;
                break;
            case Direction.SOUTH:
                this.direction = Direction.EAST;
                break;
            case Direction.EAST:
                this.direction = Direction.NORTH;
                break;
        }
    }
    walk(distance) {
        switch (this.direction) {
            case Direction.NORTH:
                this.positionY += distance;
                break;
            case Direction.EAST:
                this.positionX += distance;
                break;
            case Direction.SOUTH:
                this.positionY -= distance;
                break;
            case Direction.WEST:
                this.positionX -= distance;
                break;
        }
    }
    executeCommand(command) {
        const regex = /(R|L|W\d+)/g;
        let match;
        while ((match = regex.exec(command)) !== null) {
            if (match[0] === 'R') {
                this.turnRight();
            }
            else if (match[0] === 'L') {
                this.turnLeft();
            }
            else if (match[0].startsWith('W')) {
                const distance = parseInt(match[0].substring(1), 10);
                this.walk(distance);
            }
        }
    }
    printResult() {
        let finalDirection = '';
        switch (this.direction) {
            case Direction.NORTH:
                finalDirection = 'North';
                break;
            case Direction.EAST:
                finalDirection = 'East';
                break;
            case Direction.SOUTH:
                finalDirection = 'South';
                break;
            case Direction.WEST:
                finalDirection = 'West';
                break;
        }
        console.log(`X: ${this.positionX} Y: ${this.positionY} Direction: ${finalDirection}`);
    }
}
const bot = new MAQEBot();
const command = (0, prompt_sync_1.default)({ sigint: true })('Enter the walking command: ');
bot.executeCommand(command);
bot.printResult();
