import { fetchRandomVerse } from './bible.js';

function typeString(id, text, speed) {
    return new Promise((resolve) => {
        const element = document.getElementById(id);
        let index = 0;

        function type() {
            if (index < text.length) {
              element.textContent += text.charAt(index);
              index++;
              setTimeout(type, speed);
            } 
            else {
              resolve(); 
            }
        }
        type();
      });
  }
  
async function runTyping() {
    await typeString('title', 'Welcome home, Austin.', 65);
    await typeString('bible', 'Read the Word: ', 50);
    await fetchRandomVerse().then(verse => (typeString('bible', verse, 20)));
}

runTyping();
  