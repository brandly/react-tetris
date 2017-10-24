
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

function callCallbacks () {
  callbacks.forEach(function (callback) {
    callback();
  });
}

export default {
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
