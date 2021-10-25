'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Constants = {
    // dimensions in "cells"
    GAME_WIDTH: 10,
    GAME_HEIGHT: 20,
    BLOCK_WIDTH: 4,
    BLOCK_HEIGHT: 4,
    ROTATION_COUNT: 4
};

var pieces = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
var isRotation = function (num) {
    return num >= 0 && num < Constants.ROTATION_COUNT;
};
var getBlocks = function (piece) {
    switch (piece) {
        case 'I':
            return [
                [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0]
                ]
            ];
        case 'J':
            return [
                [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [1, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0]
                ]
            ];
        case 'L':
            return [
                [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [1, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 1, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ];
        case 'O':
            return [
                [
                    [1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [1, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            ];
        case 'S':
            return [
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [1, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 1, 0],
                    [1, 1, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0]
                ]
            ];
        case 'T':
            return [
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ]
            ];
        case 'Z':
            return [
                [
                    [0, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [1, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 1, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ]
            ];
        default: {
            var exhaustiveCheck = piece;
            throw new Error("Unhandled color case: " + exhaustiveCheck);
        }
    }
};
var getClassName = function (piece) {
    switch (piece) {
        case 'I':
            return 'piece-i';
        case 'J':
            return 'piece-j';
        case 'L':
            return 'piece-l';
        case 'O':
            return 'piece-o';
        case 'S':
            return 'piece-s';
        case 'T':
            return 'piece-t';
        case 'Z':
            return 'piece-z';
        case 'ghost':
            return 'piece-preview';
        default: {
            var exhaustiveCheck = piece;
            throw new Error("Unhandled piece case: " + exhaustiveCheck);
        }
    }
};

var GAME_HEIGHT = Constants.GAME_HEIGHT, GAME_WIDTH = Constants.GAME_WIDTH;
var serializeCoords = function (_a) {
    var x = _a.x, y = _a.y;
    return x + "," + y;
};
function buildMatrix() {
    var matrix = new Array(GAME_HEIGHT);
    for (var y = 0; y < matrix.length; y++) {
        matrix[y] = buildGameRow();
    }
    return matrix;
}
function buildGameRow() {
    return new Array(GAME_WIDTH).fill(null);
}
var addPieceToBoard = function (matrix, positionedPiece, isGhost) {
    if (isGhost === void 0) { isGhost = false; }
    var piece = positionedPiece.piece, rotation = positionedPiece.rotation, position = positionedPiece.position;
    var block = getBlocks(piece)[rotation];
    var filledCells = block.reduce(function (output, row, y) {
        return output.concat(row.map(function (cell, x) {
            return cell ? { x: x + position.x, y: y + position.y } : false;
        }));
    }, []);
    var filled = new Set(filledCells
        .map(function (value) { return (value ? serializeCoords(value) : ''); })
        .filter(Boolean));
    var value = isGhost ? 'ghost' : piece;
    return matrix.map(function (row, y) {
        return row.map(function (cell, x) {
            return filled.has(serializeCoords({ x: x, y: y })) ? value : cell;
        });
    });
};
function setPiece(matrix, positionedPiece) {
    var _matrix = addPieceToBoard(matrix, positionedPiece);
    // TODO: purify
    var linesCleared = clearFullLines(_matrix);
    return [_matrix, linesCleared];
}
function clearFullLines(matrix) {
    var linesCleared = 0;
    for (var y = 0; y < matrix.length; y++) {
        // it's a full line
        if (every(matrix[y])) {
            // so rip it out
            matrix.splice(y, 1);
            matrix.unshift(buildGameRow());
            linesCleared += 1;
        }
    }
    return linesCleared;
}
function every(list) {
    for (var i = 0; i < list.length; i++) {
        if (!list[i])
            return false;
    }
    return true;
}
function isEmptyPosition(matrix, positionedPiece) {
    var piece = positionedPiece.piece, rotation = positionedPiece.rotation, position = positionedPiece.position;
    var blocks = getBlocks(piece)[rotation];
    for (var x = 0; x < Constants.BLOCK_WIDTH; x++) {
        for (var y = 0; y < Constants.BLOCK_HEIGHT; y++) {
            var block = blocks[y][x];
            var matrixX = x + position.x;
            var matrixY = y + position.y;
            // might not be filled, ya know
            if (block) {
                // make sure it's on the matrix
                if (matrixX >= 0 && matrixX < GAME_WIDTH && matrixY < GAME_HEIGHT) {
                    // make sure it's available
                    if (!matrix[matrixY] || matrix[matrixY][matrixX]) {
                        // that square is taken by the matrix already
                        return false;
                    }
                }
                else {
                    // there's a square in the block that's off the matrix
                    return false;
                }
            }
        }
    }
    return true;
}
function assert(value) {
    if (!value)
        throw new Error('assertion failed');
}
function tryMove(move) {
    return function (gameBoard, positionedPiece) {
        var updatedPiece = move(positionedPiece);
        if (isEmptyPosition(gameBoard, updatedPiece)) {
            return updatedPiece;
        }
    };
}
var moveLeft = tryMove(function (positionedPiece) {
    var newPosition = __assign(__assign({}, positionedPiece.position), { x: positionedPiece.position.x - 1 });
    return __assign(__assign({}, positionedPiece), { position: newPosition });
});
var moveRight = tryMove(function (positionedPiece) {
    var newPosition = __assign(__assign({}, positionedPiece.position), { x: positionedPiece.position.x + 1 });
    return __assign(__assign({}, positionedPiece), { position: newPosition });
});
var moveDown = tryMove(function (positionedPiece) {
    var newPosition = __assign(__assign({}, positionedPiece.position), { y: positionedPiece.position.y + 1 });
    return __assign(__assign({}, positionedPiece), { position: newPosition });
});
var flipClockwise = tryMove(function (positionedPiece) {
    var _a;
    var rotation = (((_a = positionedPiece.rotation) !== null && _a !== void 0 ? _a : 0) + 1) % Constants.ROTATION_COUNT;
    assert(isRotation(rotation));
    return __assign(__assign({}, positionedPiece), { rotation: rotation });
});
var flipCounterclockwise = tryMove(function (positionedPiece) {
    var _a;
    var rotation = ((_a = positionedPiece.rotation) !== null && _a !== void 0 ? _a : 0) - 1;
    if (rotation < 0)
        rotation += Constants.ROTATION_COUNT;
    assert(isRotation(rotation));
    return __assign(__assign({}, positionedPiece), { rotation: rotation });
});
function hardDrop(gameBoard, positionedPiece) {
    var position = __assign({}, positionedPiece.position);
    while (isEmptyPosition(gameBoard, __assign(__assign({}, positionedPiece), { position: position }))) {
        position.y += 1;
    }
    // at this point, we just found a non-empty position, so let's step back
    position.y -= 1;
    return __assign(__assign({}, positionedPiece), { position: position });
}

function create(minimumLength) {
    return fill({
        minimumLength: minimumLength,
        queue: [],
        bucket: []
    });
}
function fill(pieceQueue) {
    var local = [];
    var bucket = pieceQueue.bucket;
    while (local.length + pieceQueue.queue.length < pieceQueue.minimumLength) {
        var _a = pullFromBucket(bucket), piece = _a[0], updatedBucket = _a[1];
        local.push(piece);
        bucket = updatedBucket;
    }
    return __assign(__assign({}, pieceQueue), { queue: pieceQueue.queue.concat(local) });
}
function getNext(pieceQueue) {
    if (!pieceQueue.queue.length) {
        throw new Error('Unexpected empty queue');
    }
    var next = pieceQueue.queue[0];
    var queue = pieceQueue.queue.slice(1);
    return {
        piece: next,
        queue: fill(__assign(__assign({}, pieceQueue), { queue: queue }))
    };
}
function pullFromBucket(bucket) {
    var local = bucket.slice(0);
    if (local.length === 0) {
        // fill the bucket
        pieces.forEach(function (piece) {
            // 4 is just the number of each type of piece. it's arbitrary, not magic, okay.
            for (var i = 0; i < 4; i++) {
                local.push(piece);
            }
        });
    }
    return [local.splice(randomNumber(local.length), 1)[0], local];
}
function randomNumber(under) {
    return Math.floor(Math.random() * under);
}

var getLevel = function (game) { return Math.floor(game.lines / 10) + 1; };
var update = function (game, action) {
    var _a, _b;
    switch (action) {
        case 'RESTART': {
            return init();
        }
        case 'PAUSE': {
            return game.state === 'PLAYING' ? __assign(__assign({}, game), { state: 'PAUSED' }) : game;
        }
        case 'RESUME': {
            return game.state === 'PAUSED' ? __assign(__assign({}, game), { state: 'PLAYING' }) : game;
        }
        case 'TOGGLE_PAUSE': {
            if (game.state === 'PLAYING')
                return __assign(__assign({}, game), { state: 'PAUSED' });
            if (game.state === 'PAUSED')
                return __assign(__assign({}, game), { state: 'PLAYING' });
            return game;
        }
        case 'HARD_DROP': {
            if (game.state !== 'PLAYING')
                return game;
            var piece = hardDrop(game.matrix, game.piece);
            return lockInPiece(__assign(__assign({}, game), { piece: piece }));
        }
        case 'TICK':
        case 'MOVE_DOWN': {
            if (game.state !== 'PLAYING')
                return game;
            var updated = applyMove(moveDown, game);
            if (game.piece === updated.piece) {
                return lockInPiece(updated);
            }
            else {
                return updated;
            }
        }
        case 'MOVE_LEFT': {
            return applyMove(moveLeft, game);
        }
        case 'MOVE_RIGHT': {
            return applyMove(moveRight, game);
        }
        case 'FLIP_CLOCKWISE': {
            return applyMove(flipClockwise, game);
        }
        case 'FLIP_COUNTERCLOCKWISE': {
            return applyMove(flipCounterclockwise, game);
        }
        case 'HOLD': {
            if (game.state !== 'PLAYING')
                return game;
            if (game.heldPiece && !game.heldPiece.available)
                return game;
            // Ensure the held piece will fit on the matrix
            if (game.heldPiece &&
                !isEmptyPosition(game.matrix, __assign(__assign({}, game.piece), { piece: game.heldPiece.piece }))) {
                return game;
            }
            var next = getNext(game.queue);
            var newPiece = (_b = (_a = game.heldPiece) === null || _a === void 0 ? void 0 : _a.piece) !== null && _b !== void 0 ? _b : next.piece;
            return __assign(__assign({}, game), { heldPiece: { piece: game.piece.piece, available: false }, piece: initializePiece(newPiece), queue: newPiece === next.piece ? next.queue : game.queue });
        }
    }
};
var lockInPiece = function (game) {
    var _a = setPiece(game.matrix, game.piece), matrix = _a[0], linesCleared = _a[1];
    var next = getNext(game.queue);
    var piece = initializePiece(next.piece);
    return __assign(__assign({}, game), { state: isEmptyPosition(matrix, piece) ? game.state : 'LOST', matrix: matrix, piece: piece, heldPiece: game.heldPiece
            ? __assign(__assign({}, game.heldPiece), { available: true }) : undefined, queue: next.queue, lines: game.lines + linesCleared, points: game.points + addScore(linesCleared) });
};
var pointsPerLine = 100;
var addScore = function (additionalLines) {
    // what's this called?
    if (additionalLines === 4) {
        return pointsPerLine * 10;
    }
    else {
        return additionalLines * pointsPerLine;
    }
};
var initialPosition = {
    x: Constants.GAME_WIDTH / 2 - Constants.BLOCK_WIDTH / 2,
    y: 0
};
var initializePiece = function (piece) {
    return {
        position: initialPosition,
        piece: piece,
        rotation: 0
    };
};
var applyMove = function (move, game) {
    if (game.state !== 'PLAYING')
        return game;
    var afterFlip = move(game.matrix, game.piece);
    return afterFlip ? __assign(__assign({}, game), { piece: afterFlip }) : game;
};
var init = function () {
    var queue = create(5);
    var next = getNext(queue);
    return {
        state: 'PLAYING',
        points: 0,
        lines: 0,
        matrix: buildMatrix(),
        piece: initializePiece(next.piece),
        heldPiece: undefined,
        queue: next.queue
    };
};
// Good display of merging piece + matrix
function viewMatrix(game) {
    var gameBoard = game.matrix;
    // set the preview
    gameBoard = addPieceToBoard(gameBoard, hardDrop(gameBoard, game.piece), true);
    // set the actual piece
    return addPieceToBoard(gameBoard, game.piece);
}

var Context = React__default["default"].createContext(init());

function GameboardView() {
    var game = React__default["default"].useContext(Context);
    var matrix = viewMatrix(game);
    return (React__default["default"].createElement("table", { className: "game-board" },
        React__default["default"].createElement("tbody", null, matrix.map(function (row, i) {
            var blocksInRow = row.map(function (block, j) {
                var classString = "game-block " + (block ? getClassName(block) : 'block-empty');
                return React__default["default"].createElement("td", { key: j, className: classString });
            });
            return React__default["default"].createElement("tr", { key: i }, blocksInRow);
        }))));
}

var defaultBlock = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
var PieceView = function (_a) {
    var piece = _a.piece;
    /* eslint-disable prefer-destructuring */
    var blocks = piece ? getBlocks(piece)[0] : defaultBlock;
    var rows = blocks.map(function (row, i) {
        var blocksInRow = row.map(function (block, j) {
            var classString = 'game-block ';
            if (piece && block) {
                classString += getClassName(piece);
            }
            else {
                classString += 'block-empty';
            }
            return React__default["default"].createElement("td", { key: j, className: classString });
        });
        return React__default["default"].createElement("tr", { key: i }, blocksInRow);
    });
    return (React__default["default"].createElement("table", { className: "piece-view" },
        React__default["default"].createElement("tbody", null, rows)));
};

function HeldPiece() {
    var heldPiece = React__default["default"].useContext(Context).heldPiece;
    return React__default["default"].createElement(PieceView, { piece: heldPiece === null || heldPiece === void 0 ? void 0 : heldPiece.piece });
}

function PieceQueue() {
    var queue = React__default["default"].useContext(Context).queue;
    return (React__default["default"].createElement("div", null, queue.queue.map(function (piece, i) { return (React__default["default"].createElement(PieceView, { piece: piece, key: i })); })));
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var keymaster = createCommonjsModule(function (module) {
(function(global){
  var k,
    _handlers = {},
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    // modifier keys
    _MODIFIERS = {
      '⇧': 16, shift: 16,
      '⌥': 18, alt: 18, option: 18,
      '⌃': 17, ctrl: 17, control: 17,
      '⌘': 91, command: 91
    },
    // special keys
    _MAP = {
      backspace: 8, tab: 9, clear: 12,
      enter: 13, 'return': 13,
      esc: 27, escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40,
      del: 46, 'delete': 46,
      home: 36, end: 35,
      pageup: 33, pagedown: 34,
      ',': 188, '.': 190, '/': 191,
      '`': 192, '-': 189, '=': 187,
      ';': 186, '\'': 222,
      '[': 219, ']': 221, '\\': 220
    },
    code = function(x){
      return _MAP[x] || x.toUpperCase().charCodeAt(0);
    },
    _downKeys = [];

  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

  // IE doesn't support Array#indexOf, so have a simple replacement
  function index(array, item){
    var i = array.length;
    while(i--) if(array[i]===item) return i;
    return -1;
  }

  // for comparing mods before unassignment
  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  var modifierMap = {
      16:'shiftKey',
      18:'altKey',
      17:'ctrlKey',
      91:'metaKey'
  };
  function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  }
  // handle keydown event
  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
        _downKeys.push(key);
    }

    // if a modifier key, set the key.<modifierkeyname> property to true and return
    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
    if(key in _mods) {
      _mods[key] = true;
      // 'assignKey' from inside this closure is exported to window.key
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    updateModifierKey(event);

    // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused
    if(!assignKey.filter.call(this, event)) return;

    // abort if no potentially matching shortcuts found
    if (!(key in _handlers)) return;

    scope = getScope();

    // for each potential shortcut
    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i];

      // see if it's in the current scope
      if(handler.scope == scope || handler.scope == 'all'){
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;
        for(k in _mods)
          if((!_mods[k] && index(handler.mods, +k) > -1) ||
            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
        // call the handler and stop the event if neccessary
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler)===false){
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  }
  // unset modifier keys on keyup
  function clearModifier(event){
    var key = event.keyCode, k,
        i = index(_downKeys, key);

    // remove key from _downKeys
    if (i >= 0) {
        _downKeys.splice(i, 1);
    }

    if(key == 93 || key == 224) key = 91;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  }
  function resetModifiers() {
    for(k in _mods) _mods[k] = false;
    for(k in _MODIFIERS) assignKey[k] = false;
  }
  // parse and assign shortcut
  function assignKey(key, scope, method){
    var keys, mods;
    keys = getKeys(key);
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }

    // for each shortcut
    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');
      if (key.length > 1){
        mods = getMods(key);
        key = [key[key.length-1]];
      }
      // convert to keycode and...
      key = key[0];
      key = code(key);
      // ...store handler
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
    }
  }
  // unbind all handlers for given key in current scope
  function unbindKey(key, scope) {
    var multipleKeys, keys,
      mods = [],
      i, j, obj;

    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
        key = keys[keys.length - 1];
      }

      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }
      if (!_handlers[key]) {
        return;
      }
      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i];
        // only clear handlers if correct scope and mods match
        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  }
  // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.
  function isPressed(keyCode) {
      if (typeof(keyCode)=='string') {
        keyCode = code(keyCode);
      }
      return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
      return _downKeys.slice(0);
  }

  function filter(event){
    var tagName = (event.target || event.srcElement).tagName;
    // ignore keypressed in any elements that support keyboard data input
    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  // initialize key.<modifier> to false
  for(k in _MODIFIERS) assignKey[k] = false;

  // set current scope (default 'all')
  function setScope(scope){ _scope = scope || 'all'; }  function getScope(){ return _scope || 'all' }
  // delete all handlers for a given scope
  function deleteScope(scope){
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);
        else i++;
      }
    }
  }
  // abstract key logic for assign and unassign
  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');
    if ((keys[keys.length - 1]) == '') {
      keys[keys.length - 2] += ',';
    }
    return keys;
  }

  // abstract mods logic for assign and unassign
  function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
    mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
  }

  // cross-browser events
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event); });
  }
  // set the handlers globally on document
  addEvent(document, 'keydown', function(event) { dispatch(event); }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
  addEvent(document, 'keyup', clearModifier);

  // reset modifiers to false whenever the window is (re)focused.
  addEvent(window, 'focus', resetModifiers);

  // store previously defined key
  var previousKey = global.key;

  // restore previously defined key and return reference to our key object
  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  }

  // set window.key and window.key.set/get/deleteScope, and the default filter
  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;

  module.exports = assignKey;

})(commonjsGlobal);
});

/* global document */
var callbacks = [];
var isPressed = false;
document.addEventListener('keydown', function (e) {
    if (e.shiftKey && !isPressed) {
        isPressed = e.shiftKey;
        callCallbacks();
    }
    return true;
});
document.addEventListener('keyup', function (e) {
    if (!e.shiftKey && isPressed) {
        isPressed = e.shiftKey;
    }
    return true;
});
function callCallbacks() {
    callbacks.forEach(function (callback) {
        callback();
    });
}
var DetectShift = {
    bind: function (callback) {
        callbacks.push(callback);
    },
    unbind: function (callback) {
        var index = callbacks.indexOf(callback);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    }
};

var useKeyboardControls = function (keyboardMap, dispatch) {
    React__default["default"].useEffect(function () {
        var keyboardDispatch = Object.entries(keyboardMap).reduce(function (output, _a) {
            var key = _a[0], action = _a[1];
            output[key] = function () { return dispatch(action); };
            return output;
        }, {});
        addKeyboardEvents(keyboardDispatch);
        return function () { return removeKeyboardEvents(keyboardDispatch); };
    }, [keyboardMap, dispatch]);
};
function addKeyboardEvents(keyboardMap) {
    Object.keys(keyboardMap).forEach(function (k) {
        if (k === 'shift') {
            DetectShift.bind(keyboardMap[k]);
        }
        else {
            keymaster(k, keyboardMap[k]);
        }
    });
}
function removeKeyboardEvents(keyboardMap) {
    Object.keys(keyboardMap).forEach(function (k) {
        if (k === 'shift') {
            DetectShift.unbind(keyboardMap[k]);
        }
        else {
            keymaster.unbind(k);
        }
    });
}

var defaultKeyboardMap = {
    down: 'MOVE_DOWN',
    left: 'MOVE_LEFT',
    right: 'MOVE_RIGHT',
    space: 'HARD_DROP',
    z: 'FLIP_COUNTERCLOCKWISE',
    x: 'FLIP_CLOCKWISE',
    up: 'FLIP_CLOCKWISE',
    p: 'TOGGLE_PAUSE',
    c: 'HOLD',
    shift: 'HOLD'
};
// https://harddrop.com/wiki/Tetris_Worlds#Gravity
var tickSeconds = function (level) {
    return Math.pow((0.8 - (level - 1) * 0.007), (level - 1));
};
function Tetris(props) {
    var _a;
    var _b = React__default["default"].useReducer(update, init()), game = _b[0], dispatch = _b[1];
    var keyboardMap = (_a = props.keyboardControls) !== null && _a !== void 0 ? _a : defaultKeyboardMap;
    useKeyboardControls(keyboardMap, dispatch);
    var level = getLevel(game);
    React__default["default"].useEffect(function () {
        var interval;
        if (game.state === 'PLAYING') {
            interval = window.setInterval(function () {
                dispatch('TICK');
            }, tickSeconds(level) * 1000);
        }
        return function () {
            window.clearInterval(interval);
        };
    }, [game.state, level]);
    var controller = React__default["default"].useMemo(function () { return ({
        pause: function () { return dispatch('PAUSE'); },
        resume: function () { return dispatch('RESUME'); },
        hold: function () { return dispatch('HOLD'); },
        hardDrop: function () { return dispatch('HARD_DROP'); },
        moveDown: function () { return dispatch('MOVE_DOWN'); },
        moveLeft: function () { return dispatch('MOVE_LEFT'); },
        moveRight: function () { return dispatch('MOVE_RIGHT'); },
        flipClockwise: function () { return dispatch('FLIP_CLOCKWISE'); },
        flipCounterclockwise: function () { return dispatch('FLIP_COUNTERCLOCKWISE'); },
        restart: function () { return dispatch('RESTART'); }
    }); }, [dispatch]);
    return (React__default["default"].createElement(Context.Provider, { value: game }, props.children({
        HeldPiece: HeldPiece,
        Gameboard: GameboardView,
        PieceQueue: PieceQueue,
        points: game.points,
        linesCleared: game.lines,
        state: game.state,
        level: level,
        controller: controller
    })));
}

module.exports = Tetris;
