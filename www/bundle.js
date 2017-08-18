/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Action = __webpack_require__(1);

var _Action2 = _interopRequireDefault(_Action);

var _Ball = __webpack_require__(5);

var _Ball2 = _interopRequireDefault(_Ball);

var _Player = __webpack_require__(2);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MOVE_AMOUNT = 1;

var Grid = function () {
    function Grid(width, height) {
        _classCallCheck(this, Grid);

        this.width = width;
        this.height = height;

        this.ball = new _Ball2.default(width, height);

        //const velocityX = Math.floor(Math.random() * 2) > 0 ? 1 : -1
        //const velocityY = Math.floor(Math.random() * 2) > 0 ? 1 : -1

        var velocityX = Math.floor(Math.random() * 2) > 0 ? 1 : -1;
        var velocityY = -1;

        this.ballVelocity = {
            x: velocityX,
            y: velocityY
        };

        this.players = {
            ONE: new _Player2.default(width, height, _Player2.default.ONE),
            TWO: new _Player2.default(width, height, _Player2.default.TWO)
        };
    }

    _createClass(Grid, [{
        key: 'move',
        value: function move(player, action) {
            if (action === _Action2.default.DO_NOTHING) {
                return;
            }

            var displacement = action === _Action2.default.MOVE_UP ? -1 : 1;
            this.players[player].y += displacement * MOVE_AMOUNT;
        }
    }, {
        key: 'update',
        value: function update() {
            var _this = this;

            if (this.winningPlayer() !== null) {
                return;
            }

            var ball = this.ball;
            ball.x += this.ballVelocity.x;
            ball.y += this.ballVelocity.y;

            var players = Object.values(this.players);
            players.forEach(function (player) {
                var boundedLeft = ball.x - ball.radius > player.x - Math.floor(player.width / 2);
                var boundedRight = ball.x - ball.radius < player.x + Math.floor(player.width / 2);

                var boundedAbove = ball.y - ball.radius > player.y - player.height;
                var boundedBelow = ball.y - ball.radius < player.y + player.height;

                var checks = [boundedLeft, boundedRight, boundedAbove, boundedBelow];

                // cheap hack instead of determining collision properly
                if (checks.every(function (check) {
                    return check;
                })) {
                    _this.ballVelocity.x = -_this.ballVelocity.x;
                    _this.ballVelocity.y = -_this.ballVelocity.y;
                }
            });
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            context.fillStyle = 'rgb(0,0,0)';
            context.fillRect(0, 0, this.width, this.height);

            this.ball.draw(context);

            var players = Object.values(this.players);
            players.forEach(function (player) {
                return player.draw(context);
            });
        }
    }, {
        key: 'winningPlayer',
        value: function winningPlayer() {
            var ball = this.ball;
            var player1 = this.players[_Player2.default.ONE];
            var player2 = this.players[_Player2.default.TWO];

            var player1Win = ball.x + ball.radius > player2.x + Math.floor(player2.width / 2);
            var player2Win = ball.x - ball.radius < player1.x - Math.floor(player1.width / 2);

            if (player1Win) {
                return _Player2.default.ONE;
            } else if (player2Win) {
                return _Player2.default.TWO;
            } else {
                return null;
            }
        }
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function () {
    function Action(name) {
        _classCallCheck(this, Action);

        this.name = name;
    }

    _createClass(Action, [{
        key: 'toString',
        value: function toString() {
            return this.name;
        }
    }]);

    return Action;
}();

exports.default = Action;


Action.DO_NOTHING = new Action('DO_NOTHING');
Action.MOVE_UP = new Action('MOVE_UP');
Action.MOVE_DOWN = new Action('MOVE_DOWN');

Action.values = function () {
    return [Action.DO_NOTHING, Action.MOVE_UP, Action.MOVE_DOWN];
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = __webpack_require__(3);

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOVE_AMOUNT = 1;

var Player = function (_Entity) {
    _inherits(Player, _Entity);

    function Player(width, height, who) {
        _classCallCheck(this, Player);

        var playerWidth = Math.floor(width / 20);
        var playerHeight = Math.floor(height / 4);

        var margin = Math.floor(width / 20);

        var x0 = who == Player.ONE ? margin : width - margin - playerWidth;
        var y0 = Math.floor(width / 2);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x0, y0));

        _this.width = playerWidth;
        _this.height = playerHeight;
        return _this;
    }

    _createClass(Player, [{
        key: 'draw',
        value: function draw(context) {
            context.fillStyle = 'rgb(255, 255, 255)';

            var y = this.y - Math.floor(this.height / 2);
            context.fillRect(this.x, y, this.width, this.height);
        }
    }]);

    return Player;
}(_Entity3.default);

Player.ONE = 'ONE';
Player.TWO = 'TWO';

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
    function Entity(x, y) {
        _classCallCheck(this, Entity);

        this.x = x;
        this.y = y;
    }

    _createClass(Entity, [{
        key: 'distance',
        value: function distance(other) {
            var distanceX = this.x - other.x;
            var distanceY = this.y - other.y;

            return Math.sqrt(distanceX * distanceX - distanceY * distanceY);
        }
    }, {
        key: 'draw',
        value: function draw(context) {
            throw new Error('not implemented');
        }
    }]);

    return Entity;
}();

exports.default = Entity;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Grid = __webpack_require__(0);

var _Grid2 = _interopRequireDefault(_Grid);

var _FollowingAgent = __webpack_require__(6);

var _FollowingAgent2 = _interopRequireDefault(_FollowingAgent);

var _QLearningAgent = __webpack_require__(7);

var _QLearningAgent2 = _interopRequireDefault(_QLearningAgent);

var _Player = __webpack_require__(2);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MOVES_PER_FRAME = 10;

var ticks = 0;
var sumTicks = 0;

var games = 0;
var wins = 0;

var summary = document.getElementById('summaryWins');
var canvas = document.getElementById('game');

if (summary === null || canvas === null) {
    throw new Error('Could not find necessary DOM elements');
}

var context = canvas.getContext('2d');

var game = new _Grid2.default(canvas.width, canvas.height);
var agents = [new _FollowingAgent2.default(_Player2.default.ONE), new _QLearningAgent2.default(_Player2.default.TWO, canvas.width, canvas.height)];

function draw() {
    for (var i = 0; i < MOVES_PER_FRAME; ++i) {
        ++ticks;

        agents.forEach(function (agent) {
            var direction = agent.act(game);
            game.move(agent.player, direction);
        });

        game.update();

        var winningPlayer = game.winningPlayer();
        if (winningPlayer !== null) {
            sumTicks += ticks;
            ticks = 0;

            ++games;
            if (winningPlayer === _Player2.default.TWO) {
                ++wins;
            }

            var percentageWon = (wins / games * 100).toFixed(2);
            var averageTicks = Math.floor(sumTicks / games);
            summary.textContent = wins + '/' + games + ' (' + percentageWon + ') - average game is ' + averageTicks + ' ticks';

            game = new _Grid2.default(canvas.width, canvas.height);
        }
    }

    game.draw(context);
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = __webpack_require__(3);

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ball = function (_Entity) {
    _inherits(Ball, _Entity);

    function Ball(width, height) {
        _classCallCheck(this, Ball);

        var radius = Math.floor(width / 50);
        var x = Math.floor(width / 2) - radius;
        var y = Math.floor(height / 2) - radius;

        var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, x, y));

        _this.radius = radius;
        return _this;
    }

    _createClass(Ball, [{
        key: 'draw',
        value: function draw(context) {
            context.fillStyle = 'rgb(255, 255, 255)';

            var x = this.x + this.radius;
            var y = this.y + this.radius;

            context.beginPath();
            context.arc(x, y, this.radius, 0, 2 * Math.PI, true);
            context.fill();
        }
    }]);

    return Ball;
}(_Entity3.default);

exports.default = Ball;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Action = __webpack_require__(1);

var _Action2 = _interopRequireDefault(_Action);

var _Agent2 = __webpack_require__(8);

var _Agent3 = _interopRequireDefault(_Agent2);

var _Grid = __webpack_require__(0);

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FollowingAgent = function (_Agent) {
    _inherits(FollowingAgent, _Agent);

    function FollowingAgent() {
        _classCallCheck(this, FollowingAgent);

        return _possibleConstructorReturn(this, (FollowingAgent.__proto__ || Object.getPrototypeOf(FollowingAgent)).apply(this, arguments));
    }

    _createClass(FollowingAgent, [{
        key: 'act',
        value: function act(game) {
            var ball = game.ball;
            var player = game.players[this.player];

            var boundedAbove = ball.y - ball.radius >= player.y - player.height / 2;
            var boundedBelow = ball.y + ball.radius <= player.y + player.height / 2;

            var direction = null;

            if (boundedAbove && boundedBelow) {
                direction = _Action2.default.DO_NOTHING;
            } else if (boundedAbove) {
                direction = _Action2.default.MOVE_DOWN;
            } else {
                direction = _Action2.default.MOVE_UP;
            }

            return direction;
        }
    }]);

    return FollowingAgent;
}(_Agent3.default);

exports.default = FollowingAgent;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Action = __webpack_require__(1);

var _Action2 = _interopRequireDefault(_Action);

var _Agent2 = __webpack_require__(8);

var _Agent3 = _interopRequireDefault(_Agent2);

var _Grid = __webpack_require__(0);

var _Grid2 = _interopRequireDefault(_Grid);

var _Q = __webpack_require__(9);

var _Q2 = _interopRequireDefault(_Q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LEARNING_RATE = 0.3;
var DISCOUNT_FACTOR = 0.5;
var THRESHOLD = 0.8;

var QLearningAgent = function (_Agent) {
    _inherits(QLearningAgent, _Agent);

    function QLearningAgent(player, width, height) {
        _classCallCheck(this, QLearningAgent);

        var _this = _possibleConstructorReturn(this, (QLearningAgent.__proto__ || Object.getPrototypeOf(QLearningAgent)).call(this, player));

        _this.q = new _Q2.default({
            actions: ['DO_NOTHING', 'MOVE_UP', 'MOVE_DOWN'],
            reward: _this.reward
        });
        return _this;
    }

    _createClass(QLearningAgent, [{
        key: 'act',
        value: function act(game) {
            var ball = game.ball;

            var player = game.players[this.player];

            var state = {
                ballX: game.ball.x,
                ballY: game.ball.y,
                playerY: player.y
            };

            return _Action2.default[this.q.act(state)];
        }
    }, {
        key: 'reward',
        value: function reward(action, state, lastState) {
            return Math.abs(state.ballY - state.playerY) - Math.abs(lastState.ballY - lastState.playerY);
        }
    }]);

    return QLearningAgent;
}(_Agent3.default);

exports.default = QLearningAgent;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Action = __webpack_require__(1);

var _Action2 = _interopRequireDefault(_Action);

var _Grid = __webpack_require__(0);

var _Grid2 = _interopRequireDefault(_Grid);

var _Player = __webpack_require__(2);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Agent = function () {
    function Agent(player) {
        _classCallCheck(this, Agent);

        this.player = player;
    }

    _createClass(Agent, [{
        key: 'act',
        value: function act(game) {
            throw new Error('not implemented');
        }
    }]);

    return Agent;
}();

exports.default = Agent;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LEARNING_RATE = 0.2;
var DISCOUNT_FACTOR = 0.9;
var THRESHOLD = 0.9;

var Q = function () {
    function Q(options) {
        _classCallCheck(this, Q);

        this.actions = options.actions;
        this.table = {};

        this.reward = options.reward;
    }

    _createClass(Q, [{
        key: 'lookupTable',
        value: function lookupTable(hash) {
            var _this = this;

            // lazily initialize table entry
            if (typeof this.table[hash] == 'undefined') {
                console.log('MISS');

                this.table[hash] = {};
                this.actions.forEach(function (action) {
                    return _this.table[hash][action] = Math.random();
                });
            } else {
                console.log('HIT');
            }

            return this.table[hash];
        }
    }, {
        key: 'act',
        value: function act(state) {
            var moveRandomly = Math.random() > THRESHOLD;
            var action = null;

            if (moveRandomly) {
                var actionIndex = Math.floor(Math.random() * this.actions.length);
                action = this.actions[actionIndex];
            } else {
                var hash = JSON.stringify(state);
                var weights = this.lookupTable(hash);

                action = Object.keys(weights).reduce(function (best, current) {
                    return weights[best] > weights[current] ? best : current;
                });
            }

            if (typeof this.lastState !== 'undefined') {
                this.adjustWeight(state);
            }

            this.lastState = state;
            this.lastAction = action;

            return action;
        }
    }, {
        key: 'estimate',
        value: function estimate(state) {
            var hash = JSON.stringify(state);
            var weights = this.lookupTable(hash);
            return Object.values(weights).reduce(function (largest, weight) {
                return Math.max(largest, weight);
            });
        }
    }, {
        key: 'adjustWeight',
        value: function adjustWeight(state) {
            var hash = JSON.stringify(this.lastState);
            var weights = this.lookupTable(hash);

            var lastWeight = weights[this.lastAction];
            var reward = this.reward(this.lastAction, this.lastState, state);
            var estimate = this.estimate(state);

            weights[this.lastAction] = lastWeight + LEARNING_RATE * (reward + DISCOUNT_FACTOR * estimate - lastWeight);
        }
    }]);

    return Q;
}();

exports.default = Q;

/***/ })
/******/ ]);