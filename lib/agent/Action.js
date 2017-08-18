// @flow

export default class Action {

    static DO_NOTHING: Action
    static MOVE_UP: Action
    static MOVE_DOWN: Action
    static values: Function

    name: string

    constructor(name: string) {
        this.name = name
    }

    toString() {
        return this.name
    }
}

Action.DO_NOTHING = new Action('DO_NOTHING')
Action.MOVE_UP = new Action('MOVE_UP')
Action.MOVE_DOWN = new Action('MOVE_DOWN')

Action.values = () => [
    Action.DO_NOTHING,
    Action.MOVE_UP,
    Action.MOVE_DOWN
]