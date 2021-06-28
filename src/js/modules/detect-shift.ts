/* global document */

type Callback = () => void;
const callbacks: Callback[] = [];
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
  bind(callback: Callback): void {
    callbacks.push(callback);
  },

  unbind(callback: Callback): void {
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
};
