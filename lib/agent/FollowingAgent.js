// @flow
import Action from './Action'
import Agent from './Agent'
import Grid from '../Grid'

export default class FollowingAgent extends Agent {

    act(game: Grid): Action {
        const ball = game.ball
        const player = game.players[this.player]

        const boundedAbove = ball.y - ball.radius >= player.y - player.height / 2
        const boundedBelow = ball.y + ball.radius <= player.y + player.height / 2

        let direction = null

        if (boundedAbove && boundedBelow) {
            direction = Action.DO_NOTHING
        } else if (boundedAbove) {
            direction = Action.MOVE_DOWN
        } else {
            direction = Action.MOVE_UP
        }

        return direction
    }
}