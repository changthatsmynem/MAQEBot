import prompt from 'prompt-sync';

enum Direction {
    NORTH = 'N',
    EAST = 'E',
    SOUTH = 'S',
    WEST = 'W',
};

class MAQEBot {
    private positionX: number;
    private positionY: number;
    private direction: Direction;
    
    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.direction = Direction.NORTH;
    }

    private turnRight(): void {
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

    private turnLeft(): void {
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

    private walk(distance: number): void {
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

    public executeCommand(command: string): void {
        const regex = /(R|L|W\d+)/g;
        let match;
        while ((match = regex.exec(command)) !== null) {
            if (match[0] === 'R') {
                this.turnRight();
            } else if (match[0] === 'L') {
                this.turnLeft();
            } else if (match[0].startsWith('W')) {
                const distance = parseInt(match[0].substring(1), 10);
                this.walk(distance);
            }
        }
    }

    public printResult(): void {
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

const command = prompt({ sigint: true })('Enter the walking command: ');
bot.executeCommand(command);

bot.printResult();
