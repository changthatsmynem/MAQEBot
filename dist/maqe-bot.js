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
    turnRight(times = 1) {
        for (let i = 0; i < times; i++) {
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
    }
    turnLeft(times = 1) {
        for (let i = 0; i < times; i++) {
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
    walkBack(distance) {
        switch (this.direction) {
            case Direction.NORTH:
                this.positionY -= distance;
                break;
            case Direction.EAST:
                this.positionX -= distance;
                break;
            case Direction.SOUTH:
                this.positionY += distance;
                break;
            case Direction.WEST:
                this.positionX += distance;
                break;
        }
    }
    executeCommand(command) {
        const regex = /(R\d*|L\d*|W\d+|B\d+)/g;
        let match;
        while ((match = regex.exec(command)) !== null) {
            const cmd = match[0];
            if (cmd.startsWith('R')) {
                const times = parseInt(cmd.substring(1), 10) || 1;
                this.turnRight(times);
            }
            else if (cmd.startsWith('L')) {
                const times = parseInt(cmd.substring(1), 10) || 1;
                this.turnLeft(times);
            }
            else if (cmd.startsWith('W')) {
                const distance = parseInt(cmd.substring(1), 10);
                this.walk(distance);
            }
            else if (cmd.startsWith('B')) {
                const distance = parseInt(cmd.substring(1), 10);
                this.walkBack(distance);
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
