// @flow
import Game from './lib/Game'

const canvas: HTMLCanvasElement = document.getElementById('game')
const context = canvas.getContext('2d')

const game = new Game(canvas.width, canvas.height)
game.draw(context)