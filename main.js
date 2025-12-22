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

function splitInput(input) {
  let tokens = [];

  let token = "";

  // Split the input by space
  for (let index = 0; index < input.length; index++) {
    if (input[index] === " ") {
      tokens.push(token);
      token = "";
    } else {
      token += input[index];
    }
  }

  // Catch the final token
  if (token.length > 0) {
    tokens.push(token);
  }

  return tokens;
}

function parseInput(input) {
  let tokens = splitInput(input);

  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i]) {
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

          let result = operations[tokens[i]](num1, num2);
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

          let result = operations[tokens[i]](num1, num2);
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

          let result = operations[tokens[i]](num1, num2);
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

          let result = operations[tokens[i]](num1, num2);
          stack.push(result);
        } else {
          return stack.pop();
        }
        break;
      case 'SEARCH':
        if (tokens.length > 1) {
          let value = variables[tokens[i + 1]];

          if (value === undefined) {
            return `${tokens[i + 1]}: Doesn't exist`;
          }

          return variables[tokens[i + 1]];
        } else {
          return `Please enter a variable name - SEARCH [Your Variable]`;
        }
      case 'DELETE':
        if (tokens.length > 1) {
          let key = tokens[i + 1];

          variables = Object.fromEntries(Object.entries(variables).filter(([k]) => k !== key));

          return `Removed ${key}`;
        } else {
          return `Please enter a variable name - DELETE [Your Variable]`;
        }
      default:
        const num = Number(tokens[i]);

        if (Number.isFinite(num)) {
          stack.push(num);
        }

        if (checkIfVariable(tokens[i])) {
          stack.push(tokens[i]);
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
