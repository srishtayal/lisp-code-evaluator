interface LispNode {
  type: 'expression' | 'number';
  value: string | number | LispNode[];
}

interface ParseResult {
  valid: boolean;
  node?: LispNode;
  error?: {
    message: string;
    help?: string;
  };
}

export function parseLisp(input: string): ParseResult {
  input = input.trim();
  
  if (!input) {
    return { 
      valid: false, 
      error: {
        message: "Empty expression",
        help: "Enter a Lisp expression like (add 5 10)"
      }
    };
  }
  
  // Check for balanced parentheses
  const openCount = (input.match(/\(/g) || []).length;
  const closeCount = (input.match(/\)/g) || []).length;
  
  if (openCount !== closeCount) {
    return { 
      valid: false, 
      error: {
        message: "Mismatched parentheses",
        help: "Make sure all opening parentheses have matching closing ones."
      }
    };
  }
  
  // Basic validation for outer parentheses
  if (!input.startsWith('(') || !input.endsWith(')')) {
    return { 
      valid: false, 
      error: {
        message: "Expression must be enclosed in parentheses",
        help: "Wrap your expression in parentheses like (operator arg1 arg2)"
      }
    };
  }
  
  try {
    const node = parseExpression(input);
    return { valid: true, node };
  } catch (error) {
    if (error instanceof Error) {
      return { 
        valid: false, 
        error: {
          message: error.message,
          help: "Check your syntax and try again."
        }
      };
    }
    
    return { 
      valid: false, 
      error: {
        message: "Unknown parsing error",
        help: "There's an issue with your expression that couldn't be identified."
      }
    };
  }
}

function parseExpression(expr: string): LispNode {
  expr = expr.trim();
  
  // If it's just a number
  if (!expr.startsWith('(')) {
    const num = Number(expr);
    if (isNaN(num)) {
      throw new Error(`Invalid token: ${expr}`);
    }
    return { type: 'number', value: num };
  }
  
  // Remove outer parentheses
  const inner = expr.slice(1, -1).trim();
  if (!inner) {
    throw new Error("Empty expression");
  }
  
  // Split into tokens, handling nested expressions
  const tokens: string[] = [];
  let current = '';
  let depth = 0;
  
  for (let i = 0; i < inner.length; i++) {
    const char = inner[i];
    
    if (char === '(') {
      depth++;
      current += char;
    } else if (char === ')') {
      depth--;
      current += char;
    } else if (char === ' ' && depth === 0) {
      if (current) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }
  
  if (current) {
    tokens.push(current);
  }
  
  if (tokens.length < 1) {
    throw new Error("Expression must have an operator");
  }
  
  const operator = tokens[0];
  
  // Validate operator
  if (!['add', 'subtract', 'multiply', 'divide'].includes(operator)) {
    throw new Error(`Unknown operator: ${operator}`);
  }
  
  // Parse arguments
  const args: LispNode[] = [];
  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith('(')) {
      args.push(parseExpression(token));
    } else {
      const num = Number(token);
      if (isNaN(num)) {
        throw new Error(`Invalid number: ${token}`);
      }
      args.push({ type: 'number', value: num });
    }
  }
  
  if (args.length < 2) {
    throw new Error(`Operator ${operator} requires at least 2 arguments`);
  }
  
  return {
    type: 'expression',
    value: [{ type: 'number', value: operator }, ...args]
  };
}

export function lispToJS(node: LispNode): string {
  if (node.type === 'number') {
    return node.value.toString();
  }
  
  const values = node.value as LispNode[];
  const operator = values[0].value.toString();
  const args = values.slice(1);
  
  // Convert each argument to JS
  const jsArgs = args.map(arg => {
    if (arg.type === 'expression') {
      return `(${lispToJS(arg)})`;
    }
    return arg.value.toString();
  });
  
  // Map Lisp operators to JS operators
  const operatorMap: Record<string, string> = {
    'add': '+',
    'subtract': '-',
    'multiply': '*',
    'divide': '/'
  };
  
  const jsOperator = operatorMap[operator];
  if (!jsOperator) {
    throw new Error(`Unknown operator: ${operator}`);
  }
  
  return jsArgs.join(` ${jsOperator} `);
}

export function evaluateLisp(expression: string): number | null {
  const parseResult = parseLisp(expression);
  
  if (!parseResult.valid || !parseResult.node) {
    return null;
  }
  
  const jsExpression = lispToJS(parseResult.node);
  
  try {
    // Using Function instead of eval for better security
    const result = new Function(`return ${jsExpression}`)();
    
    if (typeof result !== 'number' || isNaN(result)) {
      throw new Error('Evaluation did not result in a number');
    }
    
    return result;
  } catch (error) {
    console.error('Evaluation error:', error);
    return null;
  }
}
