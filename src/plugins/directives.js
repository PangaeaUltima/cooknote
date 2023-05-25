export const singleLetter = {
  mounted(el) {
    el.addEventListener('input', handleInput);
  },
  beforeUnmount(el) {
    el.removeEventListener('input', handleInput);
  }
};

function handleInput(event) {
  const inputValue = event.target.value;
  if (inputValue.length > 1) {
    event.target.value = inputValue.slice(0, 1);
  }
}