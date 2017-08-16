// @flow
import Ball from './entity/Ball'
import Direction from './Direction'
import Player from './entity/Player'

const MOVE_AMOUNT = 1

export default class Grid {

    width: number
    height: number
    ball: Ball
    players: Object

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        this.ball = new Ball(width, height)
        this.players = {
            [Player.ONE]: new Player(width, height, Player.ONE),
            [Player.TWO]: new Player(width, height, Player.TWO)
        }
    }

    move(player: string, direction: Direction): void {
        const displacement = direction === Direction.UP ? -1 : 1

        this.players[player].y += displacement * MOVE_AMOUNT
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(0,0,0)'
        context.fillRect(0, 0, this.width, this.height)

        this.ball.draw(context)

        const players = Object.values(this.players)
        players.forEach(player => player.draw(context))
    }
}