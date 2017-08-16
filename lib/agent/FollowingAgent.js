// @flow
import Agent from './Agent'
import Direction from '../Direction'
import Grid from '../Grid'

export default class FollowingAgent extends Agent {

    decideMove(game: Grid): Direction {
        const ball = game.ball
        const player = game.players[this.player]

        const boundedAbove = ball.y - ball.radius >= player.y - player.height / 2
        const boundedBelow = ball.y + ball.radius <= player.y + player.height / 2

        let direction = null

        if (boundedAbove && boundedBelow) {
            direction = Direction.NONE
        } else if (boundedAbove) {
            direction = Direction.DOWN
        } else {
            direction = Direction.UP
        }

        return direction
    }
}