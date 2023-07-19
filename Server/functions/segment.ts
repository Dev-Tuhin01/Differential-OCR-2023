function tokenizeLatex(latexString: string): (string | number)[] {
  const tokenRegex =
    /\\[a-zA-Z]+|[\+\-\*\/=]|[0-9]+(?:\.[0-9]*)?|((?<!\\)\{[^{}]*\})|\[|\]|\(|\)|[a-zA-Z]+|./g;
  const numRegex = /^[0-9]+(?:\.[0-9]*)?$/;

  // Tokenize the LaTeX string
  const tokens = latexString.match(tokenRegex);

  if (!tokens) {
    return [];
  }

  // Process the tokens and format the output as an array
  const mathTokens: (string | number)[] = [];
  tokens.forEach((token) => {
    // Handle numbers
    if (numRegex.test(token)) {
      mathTokens.push(parseFloat(token));
    }
    // Handle special characters like braces, brackets, etc.
    else if (/[\{\}\[\]\(\)]/.test(token)) {
      mathTokens.push(token);
    }
    // Handle backslash commands like \frac, \sqrt, etc.
    else if (/^\\[a-zA-Z]+$/.test(token)) {
      if (token === "\\frac") {
        // Skip "\frac" command and its arguments
        return;
      } else {
        // Skip other backslash commands but keep their arguments
        mathTokens.push(token.slice(1));
      }
    } else if (token.startsWith("{") && token.endsWith("}")) {
      // Remove curly braces and recursively tokenize the content inside them
      const innerContent = token.slice(1, -1);
      const innerTokens = tokenizeLatex(innerContent);
      mathTokens.push(...innerTokens);
    } else {
      // Return any other token as it is (variables, functions, operators, etc.)
      mathTokens.push(token);
    }
  });

  return mathTokens;
}
export default tokenizeLatex;
