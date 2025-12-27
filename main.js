// Import Node.js built-in module for reading input from the console
const readline = require('readline');

// Configuration object controlling whether the REPL loop continues running
let config = {
  processing: true
}

// Stack used for evaluating expressions in reverse polish notation (RPN style)
let stack = [];

// String of valid variable names (single uppercase letters)
let availableVariableNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Object to store variables bindings (e.g. {A : 4})
let variables = {}; 

// Map of supported arithmatic operations, each defined as a function
let operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b,
  '*': (a, b) => a * b
}

/**  
 *  Check if a given character is a valid variable name
 *  Returns the character itself if valid, otherwise undefined
 */
function checkIfVariable(character) {
  for (let index = 0; index < availableVariableNames.length; index++) {
    const char = availableVariableNames[index];
    
    if(char === character) return character;
  }
}

/** 
 *  Splits an input string into tokens separated by spaces.
 *  Example: "A B +" -> ["A", "B", "+"]
 */
function splitInput(input) {
  let tokens = [];

  let token = "";

  // Split the input by space
  for (let index = 0; index < input.length; index++) {
    if (input[index] === " ") {
      // Push completed token when encountering a space
      tokens.push(token);
      token = "";
    } else {
      // Build up current token
      token += input[index];
    }
  }

  // Push the final token if any remains
  if (token.length > 0) {
    tokens.push(token);
  }

  return tokens;
}

/**
 *  Parse and evaluate a line of input
 *  Supports arithmatic operations, variable assignment, search, and delete
 */
function parseInput(input) {
  let tokens = splitInput(input);

  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i]) {
      case '=':
        // Assignment: pop two items, assign second-to-last as variable name
        // last as value
        if (stack.length > 1) {
          let a = stack.pop(), b = stack.pop();

          variables[b] = a;
        }
        break;
      case '+':
        // Addition: pop two items, resolve variables if needed, push result
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
          // Edge case: not enough operands, return what ever is left
          return stack.pop();
        }
        break;
      case '-':
        // Subdivision (same pattern as addition)
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
        // Division (same pattern as addition)
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
        // Multiplication (same pattern as addition)
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
        // Lookup a variable by name
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
        // Delete a variable binding
        if (tokens.length > 1) {
          let key = tokens[i + 1];

          variables = Object.fromEntries(Object.entries(variables).filter(([k]) => k !== key));

          return `Removed ${key}`;
        } else {
          return `Please enter a variable name - DELETE [Your Variable]`;
        }
      default:
        // Default case: try to parse as number or variable
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

  // Return the last computed value
  return stack.pop();
}

/**
 *  Asks a question on the console and returns a Promise that resolves with the
 *  answer. This allows async/await usage for cleaner REPL loop.
 */
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

/**
 *  Main REPL loop: repeatedly ask for input, parse it, print result
 *  Terminates when user types 'quit'
 */
(async () => {
  while (config.processing) {
    const input = await ask('> ');

    // Exit condition
    if (input === 'quit') {
      config.processing = false;
    }
    
    // Parse and evaluate
    let output = parseInput(input);
    console.log(output);

    // Clear the stack
    stack = [];
  }
})();
