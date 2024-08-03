import prompt from 'prompt-sync';

enum Direction {
    North = 'N',
    East = 'E',
    South = 'S',
    West = 'W',
};

class MAQEBot {
    private positionX: number;
    private positionY: number;
    private directionIndex: number;
    private direction: Direction[];

    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.directionIndex = 0;
        this.direction = [Direction.North, Direction.East, Direction.South, Direction.West];
    }

    private turnRight(times: number = 1): void {
        this.directionIndex = (this.directionIndex + times) % this.direction.length;
    }

    private turnLeft(times: number = 1): void {
        this.directionIndex = (this.directionIndex - times + this.direction.length) % this.direction.length;
    }

    private walk(distance: number): void {
        const currentPosition = this.direction[this.directionIndex];
        switch (currentPosition) {
            case Direction.North:
                this.positionY += distance;
                break;
            case Direction.East:
                this.positionX += distance;
                break;
            case Direction.South:
                this.positionY -= distance;
                break;
            case Direction.West:
                this.positionX -= distance;
                break;
        }
    }

    private walkBack(distance: number): void {
        const currentPosition = this.direction[this.directionIndex];
        switch (currentPosition) {
            case Direction.North:
                this.positionY -= distance;
                break;
            case Direction.East:
                this.positionX -= distance;
                break;
            case Direction.South:
                this.positionY += distance;
                break;
            case Direction.West:
                this.positionX += distance;
                break;
        }
    }

    public executeCommand(command: string): void {
        const regex = /(R\d*|L\d*|W\d+|B\d+)/g;
        let match;
        while ((match = regex.exec(command)) !== null) {
            const cmd = match[0];
            if (cmd.startsWith('R')) {
                const times = parseInt(cmd.substring(1), 10) || 1;
                this.turnRight(times);
            } else if (cmd.startsWith('L')) {
                const times = parseInt(cmd.substring(1), 10) || 1;
                this.turnLeft(times);
            } else if (cmd.startsWith('W')) {
                const distance = parseInt(cmd.substring(1), 10);
                this.walk(distance);
            } else if (cmd.startsWith('B')) {
                const distance = parseInt(cmd.substring(1), 10);
                this.walkBack(distance);
            }
        }
        console.log(`X: ${this.positionX} Y: ${this.positionY} Direction: ${this.direction[this.directionIndex]}`);
    }
}

const bot = new MAQEBot();

const command = prompt({ sigint: true })('Enter the walking command: ');
bot.executeCommand(command);
