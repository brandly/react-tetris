(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key2 of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key2) && key2 !== "default")
          __defProp(target, key2, { get: () => module[key2], enumerable: !(desc = __getOwnPropDesc(module, key2)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/keymaster/keymaster.js
  var require_keymaster = __commonJS({
    "node_modules/keymaster/keymaster.js"(exports, module) {
      (function(global) {
        var k, _handlers = {}, _mods = { 16: false, 18: false, 17: false, 91: false }, _scope = "all", _MODIFIERS = {
          "\u21E7": 16,
          shift: 16,
          "\u2325": 18,
          alt: 18,
          option: 18,
          "\u2303": 17,
          ctrl: 17,
          control: 17,
          "\u2318": 91,
          command: 91
        }, _MAP = {
          backspace: 8,
          tab: 9,
          clear: 12,
          enter: 13,
          "return": 13,
          esc: 27,
          escape: 27,
          space: 32,
          left: 37,
          up: 38,
          right: 39,
          down: 40,
          del: 46,
          "delete": 46,
          home: 36,
          end: 35,
          pageup: 33,
          pagedown: 34,
          ",": 188,
          ".": 190,
          "/": 191,
          "`": 192,
          "-": 189,
          "=": 187,
          ";": 186,
          "'": 222,
          "[": 219,
          "]": 221,
          "\\": 220
        }, code = function(x) {
          return _MAP[x] || x.toUpperCase().charCodeAt(0);
        }, _downKeys = [];
        for (k = 1; k < 20; k++)
          _MAP["f" + k] = 111 + k;
        function index(array, item) {
          var i = array.length;
          while (i--)
            if (array[i] === item)
              return i;
          return -1;
        }
        function compareArray(a1, a2) {
          if (a1.length != a2.length)
            return false;
          for (var i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i])
              return false;
          }
          return true;
        }
        var modifierMap = {
          16: "shiftKey",
          18: "altKey",
          17: "ctrlKey",
          91: "metaKey"
        };
        function updateModifierKey(event) {
          for (k in _mods)
            _mods[k] = event[modifierMap[k]];
        }
        ;
        function dispatch(event) {
          var key2, handler, k2, i, modifiersMatch, scope;
          key2 = event.keyCode;
          if (index(_downKeys, key2) == -1) {
            _downKeys.push(key2);
          }
          if (key2 == 93 || key2 == 224)
            key2 = 91;
          if (key2 in _mods) {
            _mods[key2] = true;
            for (k2 in _MODIFIERS)
              if (_MODIFIERS[k2] == key2)
                assignKey[k2] = true;
            return;
          }
          updateModifierKey(event);
          if (!assignKey.filter.call(this, event))
            return;
          if (!(key2 in _handlers))
            return;
          scope = getScope();
          for (i = 0; i < _handlers[key2].length; i++) {
            handler = _handlers[key2][i];
            if (handler.scope == scope || handler.scope == "all") {
              modifiersMatch = handler.mods.length > 0;
              for (k2 in _mods)
                if (!_mods[k2] && index(handler.mods, +k2) > -1 || _mods[k2] && index(handler.mods, +k2) == -1)
                  modifiersMatch = false;
              if (handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch) {
                if (handler.method(event, handler) === false) {
                  if (event.preventDefault)
                    event.preventDefault();
                  else
                    event.returnValue = false;
                  if (event.stopPropagation)
                    event.stopPropagation();
                  if (event.cancelBubble)
                    event.cancelBubble = true;
                }
              }
            }
          }
        }
        ;
        function clearModifier(event) {
          var key2 = event.keyCode, k2, i = index(_downKeys, key2);
          if (i >= 0) {
            _downKeys.splice(i, 1);
          }
          if (key2 == 93 || key2 == 224)
            key2 = 91;
          if (key2 in _mods) {
            _mods[key2] = false;
            for (k2 in _MODIFIERS)
              if (_MODIFIERS[k2] == key2)
                assignKey[k2] = false;
          }
        }
        ;
        function resetModifiers() {
          for (k in _mods)
            _mods[k] = false;
          for (k in _MODIFIERS)
            assignKey[k] = false;
        }
        ;
        function assignKey(key2, scope, method) {
          var keys, mods;
          keys = getKeys(key2);
          if (method === void 0) {
            method = scope;
            scope = "all";
          }
          for (var i = 0; i < keys.length; i++) {
            mods = [];
            key2 = keys[i].split("+");
            if (key2.length > 1) {
              mods = getMods(key2);
              key2 = [key2[key2.length - 1]];
            }
            key2 = key2[0];
            key2 = code(key2);
            if (!(key2 in _handlers))
              _handlers[key2] = [];
            _handlers[key2].push({ shortcut: keys[i], scope, method, key: keys[i], mods });
          }
        }
        ;
        function unbindKey(key2, scope) {
          var multipleKeys, keys, mods = [], i, j, obj;
          multipleKeys = getKeys(key2);
          for (j = 0; j < multipleKeys.length; j++) {
            keys = multipleKeys[j].split("+");
            if (keys.length > 1) {
              mods = getMods(keys);
              key2 = keys[keys.length - 1];
            }
            key2 = code(key2);
            if (scope === void 0) {
              scope = getScope();
            }
            if (!_handlers[key2]) {
              return;
            }
            for (i = 0; i < _handlers[key2].length; i++) {
              obj = _handlers[key2][i];
              if (obj.scope === scope && compareArray(obj.mods, mods)) {
                _handlers[key2][i] = {};
              }
            }
          }
        }
        ;
        function isPressed2(keyCode) {
          if (typeof keyCode == "string") {
            keyCode = code(keyCode);
          }
          return index(_downKeys, keyCode) != -1;
        }
        function getPressedKeyCodes() {
          return _downKeys.slice(0);
        }
        function filter(event) {
          var tagName = (event.target || event.srcElement).tagName;
          return !(tagName == "INPUT" || tagName == "SELECT" || tagName == "TEXTAREA");
        }
        for (k in _MODIFIERS)
          assignKey[k] = false;
        function setScope(scope) {
          _scope = scope || "all";
        }
        ;
        function getScope() {
          return _scope || "all";
        }
        ;
        function deleteScope(scope) {
          var key2, handlers, i;
          for (key2 in _handlers) {
            handlers = _handlers[key2];
            for (i = 0; i < handlers.length; ) {
              if (handlers[i].scope === scope)
                handlers.splice(i, 1);
              else
                i++;
            }
          }
        }
        ;
        function getKeys(key2) {
          var keys;
          key2 = key2.replace(/\s/g, "");
          keys = key2.split(",");
          if (keys[keys.length - 1] == "") {
            keys[keys.length - 2] += ",";
          }
          return keys;
        }
        function getMods(key2) {
          var mods = key2.slice(0, key2.length - 1);
          for (var mi = 0; mi < mods.length; mi++)
            mods[mi] = _MODIFIERS[mods[mi]];
          return mods;
        }
        function addEvent(object, event, method) {
          if (object.addEventListener)
            object.addEventListener(event, method, false);
          else if (object.attachEvent)
            object.attachEvent("on" + event, function() {
              method(window.event);
            });
        }
        ;
        addEvent(document, "keydown", function(event) {
          dispatch(event);
        });
        addEvent(document, "keyup", clearModifier);
        addEvent(window, "focus", resetModifiers);
        var previousKey = global.key;
        function noConflict() {
          var k2 = global.key;
          global.key = previousKey;
          return k2;
        }
        global.key = assignKey;
        global.key.setScope = setScope;
        global.key.getScope = getScope;
        global.key.deleteScope = deleteScope;
        global.key.filter = filter;
        global.key.isPressed = isPressed2;
        global.key.getPressedKeyCodes = getPressedKeyCodes;
        global.key.noConflict = noConflict;
        global.key.unbind = unbindKey;
        if (typeof module !== "undefined")
          module.exports = assignKey;
      })(exports);
    }
  });

  // src/js/components/tetris.tsx
  var import_react7 = __toModule(__require("react"));

  // src/js/components/gameboard.tsx
  var import_react2 = __toModule(__require("react"));

  // src/js/constants.ts
  var constants_default = {
    GAME_WIDTH: 10,
    GAME_HEIGHT: 20,
    BLOCK_WIDTH: 4,
    BLOCK_HEIGHT: 4,
    ROTATION_COUNT: 4
  };

  // src/js/models/Piece.ts
  var pieces = ["I", "J", "L", "O", "S", "T", "Z"];
  var isRotation = (num) => num >= 0 && num < constants_default.ROTATION_COUNT;
  var getBlocks = (piece) => {
    switch (piece) {
      case "I":
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
      case "J":
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
      case "L":
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
      case "O":
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
      case "S":
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
      case "T":
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
      case "Z":
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
        const exhaustiveCheck = piece;
        throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
      }
    }
  };
  var getClassName = (piece) => {
    switch (piece) {
      case "I":
        return "piece-i";
      case "J":
        return "piece-j";
      case "L":
        return "piece-l";
      case "O":
        return "piece-o";
      case "S":
        return "piece-s";
      case "T":
        return "piece-t";
      case "Z":
        return "piece-z";
      case "ghost":
        return "piece-preview";
      default: {
        const exhaustiveCheck = piece;
        throw new Error(`Unhandled piece case: ${exhaustiveCheck}`);
      }
    }
  };

  // src/js/models/Matrix.ts
  var { GAME_HEIGHT, GAME_WIDTH } = constants_default;
  var serializeCoords = ({ x, y }) => `${x},${y}`;
  function buildMatrix() {
    const matrix = new Array(GAME_HEIGHT);
    for (let y = 0; y < matrix.length; y++) {
      matrix[y] = buildGameRow();
    }
    return matrix;
  }
  function buildGameRow() {
    return new Array(GAME_WIDTH).fill(null);
  }
  var addPieceToBoard = (matrix, positionedPiece, isGhost = false) => {
    const { piece, rotation, position } = positionedPiece;
    const block = getBlocks(piece)[rotation];
    const filledCells = block.reduce((output, row, y) => output.concat(row.map((cell, x) => cell ? { x: x + position.x, y: y + position.y } : false)), []);
    const filled = new Set(filledCells.map((value2) => value2 ? serializeCoords(value2) : "").filter(Boolean));
    const value = isGhost ? "ghost" : piece;
    return matrix.map((row, y) => row.map((cell, x) => {
      return filled.has(serializeCoords({ x, y })) ? value : cell;
    }));
  };
  function setPiece(matrix, positionedPiece) {
    const _matrix = addPieceToBoard(matrix, positionedPiece);
    const linesCleared = clearFullLines(_matrix);
    return [_matrix, linesCleared];
  }
  function clearFullLines(matrix) {
    let linesCleared = 0;
    for (let y = 0; y < matrix.length; y++) {
      if (every(matrix[y])) {
        matrix.splice(y, 1);
        matrix.unshift(buildGameRow());
        linesCleared += 1;
      }
    }
    return linesCleared;
  }
  function every(list) {
    for (let i = 0; i < list.length; i++) {
      if (!list[i])
        return false;
    }
    return true;
  }
  function isEmptyPosition(matrix, positionedPiece) {
    const { piece, rotation, position } = positionedPiece;
    const blocks = getBlocks(piece)[rotation];
    for (let x = 0; x < constants_default.BLOCK_WIDTH; x++) {
      for (let y = 0; y < constants_default.BLOCK_HEIGHT; y++) {
        const block = blocks[y][x];
        const matrixX = x + position.x;
        const matrixY = y + position.y;
        if (block) {
          if (matrixX >= 0 && matrixX < GAME_WIDTH && matrixY < GAME_HEIGHT) {
            if (!matrix[matrixY] || matrix[matrixY][matrixX]) {
              return false;
            }
          } else {
            return false;
          }
        }
      }
    }
    return true;
  }
  function assert(value) {
    if (!value)
      throw new Error("assertion failed");
  }
  function tryMove(move) {
    return function(gameBoard, positionedPiece) {
      const updatedPiece = move(positionedPiece);
      if (isEmptyPosition(gameBoard, updatedPiece)) {
        return updatedPiece;
      }
    };
  }
  var moveLeft = tryMove((positionedPiece) => {
    const newPosition = {
      ...positionedPiece.position,
      x: positionedPiece.position.x - 1
    };
    return { ...positionedPiece, position: newPosition };
  });
  var moveRight = tryMove((positionedPiece) => {
    const newPosition = {
      ...positionedPiece.position,
      x: positionedPiece.position.x + 1
    };
    return { ...positionedPiece, position: newPosition };
  });
  var moveDown = tryMove((positionedPiece) => {
    const newPosition = {
      ...positionedPiece.position,
      y: positionedPiece.position.y + 1
    };
    return { ...positionedPiece, position: newPosition };
  });
  var flipClockwise = tryMove((positionedPiece) => {
    const rotation = ((positionedPiece.rotation ?? 0) + 1) % constants_default.ROTATION_COUNT;
    assert(isRotation(rotation));
    return { ...positionedPiece, rotation };
  });
  var flipCounterclockwise = tryMove((positionedPiece) => {
    let rotation = (positionedPiece.rotation ?? 0) - 1;
    if (rotation < 0)
      rotation += constants_default.ROTATION_COUNT;
    assert(isRotation(rotation));
    return { ...positionedPiece, rotation };
  });
  function hardDrop(gameBoard, positionedPiece) {
    const position = { ...positionedPiece.position };
    while (isEmptyPosition(gameBoard, { ...positionedPiece, position })) {
      position.y += 1;
    }
    position.y -= 1;
    return { ...positionedPiece, position };
  }

  // src/js/modules/piece-queue.ts
  function create(minimumLength) {
    return fill({
      minimumLength,
      queue: [],
      bucket: []
    });
  }
  function fill(pieceQueue) {
    const local = [];
    let bucket = pieceQueue.bucket;
    while (local.length + pieceQueue.queue.length < pieceQueue.minimumLength) {
      const [piece, updatedBucket] = pullFromBucket(bucket);
      local.push(piece);
      bucket = updatedBucket;
    }
    return {
      ...pieceQueue,
      queue: pieceQueue.queue.concat(local)
    };
  }
  function getNext(pieceQueue) {
    if (!pieceQueue.queue.length) {
      throw new Error("Unexpected empty queue");
    }
    const next = pieceQueue.queue[0];
    const queue = pieceQueue.queue.slice(1);
    return {
      piece: next,
      queue: fill({
        ...pieceQueue,
        queue
      })
    };
  }
  function pullFromBucket(bucket) {
    const local = bucket.slice(0);
    if (local.length === 0) {
      pieces.forEach((piece) => {
        for (let i = 0; i < 4; i++) {
          local.push(piece);
        }
      });
    }
    return [local.splice(randomNumber(local.length), 1)[0], local];
  }
  function randomNumber(under) {
    return Math.floor(Math.random() * under);
  }

  // src/js/models/Game.ts
  var getLevel = (game) => Math.floor(game.lines / 10) + 1;
  var update = (game, action) => {
    switch (action) {
      case "RESTART": {
        return init();
      }
      case "PAUSE": {
        return game.state === "PLAYING" ? { ...game, state: "PAUSED" } : game;
      }
      case "RESUME": {
        return game.state === "PAUSED" ? { ...game, state: "PLAYING" } : game;
      }
      case "TOGGLE_PAUSE": {
        if (game.state === "PLAYING")
          return { ...game, state: "PAUSED" };
        if (game.state === "PAUSED")
          return { ...game, state: "PLAYING" };
        return game;
      }
      case "HARD_DROP": {
        if (game.state !== "PLAYING")
          return game;
        const piece = hardDrop(game.matrix, game.piece);
        return lockInPiece({ ...game, piece });
      }
      case "TICK":
      case "MOVE_DOWN": {
        if (game.state !== "PLAYING")
          return game;
        const updated = applyMove(moveDown, game);
        if (game.piece === updated.piece) {
          return lockInPiece(updated);
        } else {
          return updated;
        }
      }
      case "MOVE_LEFT": {
        return applyMove(moveLeft, game);
      }
      case "MOVE_RIGHT": {
        return applyMove(moveRight, game);
      }
      case "FLIP_CLOCKWISE": {
        return applyMove(flipClockwise, game);
      }
      case "FLIP_COUNTERCLOCKWISE": {
        return applyMove(flipCounterclockwise, game);
      }
      case "HOLD": {
        if (game.state !== "PLAYING")
          return game;
        if (game.heldPiece && !game.heldPiece.available)
          return game;
        if (game.heldPiece && !isEmptyPosition(game.matrix, {
          ...game.piece,
          piece: game.heldPiece.piece
        })) {
          return game;
        }
        const next = getNext(game.queue);
        const newPiece = game.heldPiece?.piece ?? next.piece;
        return {
          ...game,
          heldPiece: { piece: game.piece.piece, available: false },
          piece: initializePiece(newPiece),
          queue: newPiece === next.piece ? next.queue : game.queue
        };
      }
    }
  };
  var lockInPiece = (game) => {
    const [matrix, linesCleared] = setPiece(game.matrix, game.piece);
    const next = getNext(game.queue);
    const piece = initializePiece(next.piece);
    return {
      ...game,
      state: isEmptyPosition(matrix, piece) ? game.state : "LOST",
      matrix,
      piece,
      heldPiece: game.heldPiece ? { ...game.heldPiece, available: true } : void 0,
      queue: next.queue,
      lines: game.lines + linesCleared,
      points: game.points + addScore(linesCleared)
    };
  };
  var pointsPerLine = 100;
  var addScore = (additionalLines) => {
    if (additionalLines === 4) {
      return pointsPerLine * 10;
    } else {
      return additionalLines * pointsPerLine;
    }
  };
  var initialPosition = {
    x: constants_default.GAME_WIDTH / 2 - constants_default.BLOCK_WIDTH / 2,
    y: 0
  };
  var initializePiece = (piece) => {
    return {
      position: initialPosition,
      piece,
      rotation: 0
    };
  };
  var applyMove = (move, game) => {
    if (game.state !== "PLAYING")
      return game;
    const afterFlip = move(game.matrix, game.piece);
    return afterFlip ? { ...game, piece: afterFlip } : game;
  };
  var init = () => {
    const queue = create(5);
    const next = getNext(queue);
    return {
      state: "PLAYING",
      points: 0,
      lines: 0,
      matrix: buildMatrix(),
      piece: initializePiece(next.piece),
      heldPiece: void 0,
      queue: next.queue
    };
  };
  function viewMatrix(game) {
    let gameBoard = game.matrix;
    gameBoard = addPieceToBoard(gameBoard, hardDrop(gameBoard, game.piece), true);
    return addPieceToBoard(gameBoard, game.piece);
  }

  // src/js/context.ts
  var import_react = __toModule(__require("react"));
  var Context = import_react.default.createContext(init());

  // src/js/components/gameboard.tsx
  function GameboardView() {
    const game = import_react2.default.useContext(Context);
    const matrix = viewMatrix(game);
    return /* @__PURE__ */ import_react2.default.createElement("table", {
      className: "game-board"
    }, /* @__PURE__ */ import_react2.default.createElement("tbody", null, matrix.map((row, i) => {
      const blocksInRow = row.map((block, j) => {
        const classString = `game-block ${block ? getClassName(block) : "block-empty"}`;
        return /* @__PURE__ */ import_react2.default.createElement("td", {
          key: j,
          className: classString
        });
      });
      return /* @__PURE__ */ import_react2.default.createElement("tr", {
        key: i
      }, blocksInRow);
    })));
  }

  // src/js/components/held-piece.tsx
  var import_react4 = __toModule(__require("react"));

  // src/js/components/piece-view.tsx
  var import_react3 = __toModule(__require("react"));
  var defaultBlock = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  var PieceView = ({ piece }) => {
    const blocks = piece ? getBlocks(piece)[0] : defaultBlock;
    const rows = blocks.map((row, i) => {
      const blocksInRow = row.map((block, j) => {
        let classString = "game-block ";
        if (piece && block) {
          classString += getClassName(piece);
        } else {
          classString += "block-empty";
        }
        return /* @__PURE__ */ import_react3.default.createElement("td", {
          key: j,
          className: classString
        });
      });
      return /* @__PURE__ */ import_react3.default.createElement("tr", {
        key: i
      }, blocksInRow);
    });
    return /* @__PURE__ */ import_react3.default.createElement("table", {
      className: "piece-view"
    }, /* @__PURE__ */ import_react3.default.createElement("tbody", null, rows));
  };
  var piece_view_default = PieceView;

  // src/js/components/held-piece.tsx
  function HeldPiece() {
    const { heldPiece } = import_react4.default.useContext(Context);
    return /* @__PURE__ */ import_react4.default.createElement(piece_view_default, {
      piece: heldPiece?.piece
    });
  }

  // src/js/components/piece-queue.tsx
  var import_react5 = __toModule(__require("react"));
  function PieceQueue3() {
    const { queue } = import_react5.default.useContext(Context);
    return /* @__PURE__ */ import_react5.default.createElement("div", null, queue.queue.map((piece, i) => /* @__PURE__ */ import_react5.default.createElement(piece_view_default, {
      piece,
      key: i
    })));
  }

  // src/js/hooks/useKeyboardControls.ts
  var import_react6 = __toModule(__require("react"));
  var import_keymaster = __toModule(require_keymaster());

  // src/js/modules/detect-shift.ts
  var callbacks = [];
  var isPressed = false;
  document.addEventListener("keydown", (e) => {
    if (e.shiftKey && !isPressed) {
      isPressed = e.shiftKey;
      callCallbacks();
    }
    return true;
  });
  document.addEventListener("keyup", (e) => {
    if (!e.shiftKey && isPressed) {
      isPressed = e.shiftKey;
    }
    return true;
  });
  function callCallbacks() {
    callbacks.forEach((callback) => {
      callback();
    });
  }
  var detect_shift_default = {
    bind(callback) {
      callbacks.push(callback);
    },
    unbind(callback) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  };

  // src/js/hooks/useKeyboardControls.ts
  var useKeyboardControls = (keyboardMap, dispatch) => {
    import_react6.default.useEffect(() => {
      const keyboardDispatch = Object.entries(keyboardMap).reduce((output, [key2, action]) => {
        output[key2] = () => dispatch(action);
        return output;
      }, {});
      addKeyboardEvents(keyboardDispatch);
      return () => removeKeyboardEvents(keyboardDispatch);
    }, [keyboardMap, dispatch]);
  };
  function addKeyboardEvents(keyboardMap) {
    Object.keys(keyboardMap).forEach((k) => {
      if (k === "shift") {
        detect_shift_default.bind(keyboardMap[k]);
      } else {
        (0, import_keymaster.default)(k, keyboardMap[k]);
      }
    });
  }
  function removeKeyboardEvents(keyboardMap) {
    Object.keys(keyboardMap).forEach((k) => {
      if (k === "shift") {
        detect_shift_default.unbind(keyboardMap[k]);
      } else {
        import_keymaster.default.unbind(k);
      }
    });
  }

  // src/js/components/tetris.tsx
  var defaultKeyboardMap = {
    down: "MOVE_DOWN",
    left: "MOVE_LEFT",
    right: "MOVE_RIGHT",
    space: "HARD_DROP",
    z: "FLIP_COUNTERCLOCKWISE",
    x: "FLIP_CLOCKWISE",
    up: "FLIP_CLOCKWISE",
    p: "TOGGLE_PAUSE",
    c: "HOLD",
    shift: "HOLD"
  };
  var tickSeconds = (level) => (0.8 - (level - 1) * 7e-3) ** (level - 1);
  function Tetris(props) {
    const [game, dispatch] = import_react7.default.useReducer(update, init());
    const keyboardMap = props.keyboardControls ?? defaultKeyboardMap;
    useKeyboardControls(keyboardMap, dispatch);
    const level = getLevel(game);
    import_react7.default.useEffect(() => {
      let interval;
      if (game.state === "PLAYING") {
        interval = window.setInterval(() => {
          dispatch("TICK");
        }, tickSeconds(level) * 1e3);
      }
      return () => {
        window.clearInterval(interval);
      };
    }, [game.state, level]);
    const controller = import_react7.default.useMemo(() => ({
      pause: () => dispatch("PAUSE"),
      resume: () => dispatch("RESUME"),
      hold: () => dispatch("HOLD"),
      hardDrop: () => dispatch("HARD_DROP"),
      moveDown: () => dispatch("MOVE_DOWN"),
      moveLeft: () => dispatch("MOVE_LEFT"),
      moveRight: () => dispatch("MOVE_RIGHT"),
      flipClockwise: () => dispatch("FLIP_CLOCKWISE"),
      flipCounterclockwise: () => dispatch("FLIP_COUNTERCLOCKWISE"),
      restart: () => dispatch("RESTART")
    }), [dispatch]);
    return /* @__PURE__ */ import_react7.default.createElement(Context.Provider, {
      value: game
    }, props.children({
      HeldPiece,
      Gameboard: GameboardView,
      PieceQueue: PieceQueue3,
      points: game.points,
      linesCleared: game.lines,
      state: game.state,
      level,
      controller
    }));
  }
})();
