// @flow
import Action from './Action'
import Agent from './Agent'
import Grid from '../Grid'

export default class SedentaryAgent extends Agent {

    act(game: Grid): Action {
        return Action.DO_NOTHING
    }
}