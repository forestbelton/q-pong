// @flow
import Action from '../../Action'
import Agent from '../../Agent'
import Grid from '../../../Grid'
import Q from './Q'

const LEARNING_RATE = 0.3
const DISCOUNT_FACTOR = 0.5
const THRESHOLD = 0.8

export default class QLearningAgent extends Agent {

    q: Q

    constructor(player: string, width: number, height: number) {
        super(player)

        this.q = new Q({
            actions: ['DO_NOTHING', 'MOVE_UP', 'MOVE_DOWN'],
            reward: this.reward
        })
    }

    act(game: Grid): Action {
        const { ball } = game
        const player = game.players[this.player]

        const state = {
            ballX: game.ball.x,
            ballY: game.ball.y,
            playerY: player.y,
        }

        return Action[this.q.act(state)]
    }

    reward(action: string, state: Object, lastState: Object): number {
        return Math.abs(state.ballY - state.playerY)
            - Math.abs(lastState.ballY - lastState.playerY)
    }
}