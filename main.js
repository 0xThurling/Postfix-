const readline = require('readline');

let config = {
  processing: true
}

let stack = [];

let availableVariableNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let variables = {}; 

let operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b,
  '*': (a, b) => a * b
}

function checkIfVariable(character) {
  for (let index = 0; index < availableVariableNames.length; index++) {
    const char = availableVariableNames[index];
    
    if(char === character) return character;
  }
}

function parseInput(input) {
  let chars = input.split(" ");

  for (let i = 0; i < chars.length; i++) {
    switch (chars[i]) {
      case '=':
        if (stack.length > 1) {
          let a = stack.pop(), b = stack.pop();

          variables[b] = a;
        }
        break;
      case '+':
        if (stack.length > 1) {
          let a = stack.pop(), b = stack.pop();

          let num1 = b, num2 = a;

          if (b in variables) {
            num1 = variables[b];
          }

          if (a in variables) {
            num2 = variables[a];
          }

          let result = operations[chars[i]](num1, num2);
          stack.push(result);
        } else {
          return stack.pop();
        }
        break;
      case '-':
        if (stack.length > 1) {
          let a = stack.pop(), b = stack.pop();

          let num1 = b, num2 = a;

          if (b in variables) {
            num1 = variables[b];
          }

          if (a in variables) {
            num2 = variables[a];
          }

          let result = operations[chars[i]](num1, num2);
          stack.push(result);
        } else {
          return stack.pop();
        }
        break;
      case '/':
        if (stack.length > 1) {
          let a = stack.pop(), b = stack.pop();

          let num1 = b, num2 = a;

          if (b in variables) {
            num1 = variables[b];
          }

          if (a in variables) {
            num2 = variables[a];
          }

          let result = operations[chars[i]](num1, num2);
          stack.push(result);
        } else {
          return stack.pop();
        }
        break;
      case '*':
        if (stack.length > 1) {
          let a = stack.pop(), b = stack.pop();

          let num1 = b, num2 = a;

          if (b in variables) {
            num1 = variables[b];
          }

          if (a in variables) {
            num2 = variables[a];
          }

          let result = operations[chars[i]](num1, num2);
          stack.push(result);
        } else {
          return stack.pop();
        }
        break;
      default:
        const num = Number(chars[i]);

        if (Number.isFinite(num)) {
          stack.push(num);
        }

        if (checkIfVariable(chars[i])) {
          stack.push(chars[i]);
        }
        break;
    }
  }

  return stack.pop();
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

    // Clear the stack
    stack = [];
  }
})();
