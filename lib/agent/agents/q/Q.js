// @flow

const LEARNING_RATE = 0.2
const DISCOUNT_FACTOR = 0.9
const THRESHOLD = 0.9

type QOptions = {|
    actions: Array<string>,
    reward: (string, Object, Object) => number
|}

export default class Q {

    lastState: Object
    lastAction: string

    actions: Array<string>
    table: Object

    reward: (string, Object, Object) => number

    constructor(options: QOptions) {
        this.actions = options.actions
        this.table = {}

        this.reward = options.reward
    }

    lookupTable(hash: string): Object {
        // lazily initialize table entry
        if (typeof this.table[hash] == 'undefined') {
            console.log('MISS')

            this.table[hash] = {}
            this.actions.forEach(action =>
                this.table[hash][action] = Math.random()
            )
        } else {
            console.log('HIT')
        }

        return this.table[hash]
    }

    act(state: Object): string {
        const moveRandomly = Math.random() > THRESHOLD
        let action = null

        if (moveRandomly) {
            const actionIndex = Math.floor(Math.random() * this.actions.length)
            action = this.actions[actionIndex]
        } else {
            const hash = JSON.stringify(state)
            const weights = this.lookupTable(hash)

            action = Object.keys(weights).reduce((best, current) =>
                weights[best] > weights[current] ? best : current
            )
        }

        if (typeof this.lastState !== 'undefined') {
            this.adjustWeight(state)
        }

        this.lastState = state
        this.lastAction = action

        return action
    }

    estimate(state: Object): number {
        const hash = JSON.stringify(state)
        const weights = this.lookupTable(hash)
        return Object.values(weights).reduce((largest, weight) => Math.max(largest, weight))
    }

    adjustWeight(state: Object): void {
        const hash = JSON.stringify(this.lastState)
        const weights = this.lookupTable(hash)

        const lastWeight = weights[this.lastAction]
        const reward = this.reward(this.lastAction, this.lastState, state)
        const estimate = this.estimate(state)

        weights[this.lastAction] = lastWeight + LEARNING_RATE
            * (reward + DISCOUNT_FACTOR * estimate - lastWeight)
    }
}