// @flow
import Action from './Action'
import Grid from '../Grid'
import Player from '../entity/Player'

export default class Agent {

    player: string

    constructor(player: string) {
        this.player = player
    }

    act(game: Grid): Action {
        throw new Error('not implemented')
    }
}
