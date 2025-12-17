const readline = require('readline');

let config = {
  processing: true
}

let numbers = [];
let operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b,
  '*': (a, b) => a * b
}

function parseInput(input) {
  let chars = input.split(" ");

  for (const char of chars) {
    switch (char) {
      case '+':
        if (numbers.length > 1) {
          let a = numbers.pop(), b = numbers.pop();
          let result = operations[char](a, b);
          numbers.push(result);
        } else {
          return numbers.pop();
        }
        break;
      case '-':
        if (numbers.length > 1) {
          let a = numbers.pop(), b = numbers.pop();
          let result = operations[char](a, b);
          numbers.push(result);
        } else {
          return numbers.pop();
        }
        break;
      case '/':
        if (numbers.length > 1) {
          let a = numbers.pop(), b = numbers.pop();
          let result = operations[char](a, b);
          numbers.push(result);
        } else {
          return numbers.pop();
        }
        break;
      case '*':
        if (numbers.length > 1) {
          let a = numbers.pop(), b = numbers.pop();
          let result = operations[char](a, b);
          numbers.push(result);
        } else {
          return numbers.pop();
        }
        break;
      default:
        const num = Number(char);

        if (Number.isFinite(num)) {
          numbers.push(num);
        }
        break;
    }
  }

  return numbers.pop();
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

(async () => {
  while (config.processing) {
    const input = await ask('> ');

    // Processing input 
    if (input === 'quit') {
      config.processing = false;
    }

    let output = parseInput(input);

    console.log(output);
  }
})();
