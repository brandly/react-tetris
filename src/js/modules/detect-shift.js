/* global document */
const callbacks = [];
let isPressed = false;

document.addEventListener('keydown', (e) => {
  if (e.shiftKey && !isPressed) {
    isPressed = e.shiftKey;
    callCallbacks();
  }

  return true;
});

document.addEventListener('keyup', (e) => {
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

export default {
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
