/**
 * CSC 312
 * Lab 3: Sensible Syntax
 * 
 * Common utilities for parsing
 */

/**
 * Our parsing pass in our simple addition interpreter was essentially in the
 * recursive descent style discussed today. In that implementation, you saw the
 * benefit of a little bit of software architecture to make the code a bit more
 * readable. The `chomp` function allowed us to consume expected input from the
 * string in a declarative fashion.
 * 
 * An alternative approach favored by many compilers is to introduce a phase of
 * lexing into the parsing process. Lexing can be thought of as a function that
 * takes the initial source string as input and produces a list of tokens as
 * output. A token is a semantically relevant chunk of text separated by
 * lexically insignificant characters, usually whitespace. Thus the effect of
 * lexing process is to:
 * 
 * (a) Remove all whitespace from the input and
 * (b) Group up relevant characters into tokens.
 * 
 * Consequently, when we implement our parsing passes in terms of a lexical
 * stream rather than a raw string, our code frequently looks cleaner.
 * 
 * Below, complete the implementation of the `lex` function and fill in a
 * suitable test suite for the lexer in `test/test.ts`. It is important to
 * test each pass of your compiler independently so that you can isolate any
 * bugs that arise!
 */

/**
 * @param state the current state of the parser
 * @param src the string we are parsing
 * @param target the target character we are chomping 
 * 
 * Checks to see if the character we are analyzing in `src` according to `state`
 * is `target`. If so, advances `state` one character forward. Otherwise, throws
 * an error.
 */


/** Information that is tracked during the parsing process. */
export type ParserState = {
    /** The current index of source code the parser is inspecting. */
    i: number
  }
  
  /**
   * @param state the current state of the parser
   * @param src the string we are parsing
   * @param target the target character we are chomping
   *
   * Checks to see if the character we are analyzing in `src` according to `state`
   * is `target`. If so, advances `state` one character forward. Otherwise, throws
   * an error.
   */
  function chomp(st: ParserState, s: string, ch: string): void {
    if (s[st.i] === ch){
      st.i += 1
    } else {
      throw new Error('Unexpected Value')
    }
  }
  
  /**
   * @returns an initial parser state suitable to start the parsing process
   */
  export function mkInitialState(): ParserState {
    return { i: 0 }
  }
  
  /** A semantically relevant chunk of text */
  export type Token = string
  
  
  
  /**
   * @returns a collection of tokens, chunks of meaningful text, from input `src`.
   */
  export function lex (src: string): Token[] {
    const state = mkInitialState()
    const tokens: Token[] = []
    let numStr = "";
    while (state.i < src.length) {
      if (src[state.i] === " ") {
        state.i += 1;
      }
      else if (/\d/.test(src[state.i])) {
        while (/\d/.test(src[state.i]) && state.i < src.length) {
          numStr += src[state.i];
          state.i += 1;
        }
        tokens.push(numStr); 
        numStr = "";
      }
      else if (src[state.i] === "i"){
        state.i += 1;
        chomp(state, src, "f")
        tokens.push("if");
      } 
      else if (src[state.i] === "t" && src[state.i + 1] === "r"){
        state.i += 2;
        chomp(state, src, "u")
        chomp(state, src, "e")      
        tokens.push('true')
      }
      else if (src[state.i] === "t" && src[state.i + 1] === "h"){
        state.i += 2;
        chomp(state, src, "e")
        chomp(state, src, "n")      
        tokens.push('then')
      }
      else if (src[state.i] === "e"){
        state.i += 1;
        chomp(state, src, "l")
        chomp(state, src, "s")
        chomp(state, src, "e")      
        tokens.push('else')
      }
      else if (src[state.i] === "f"){
        state.i += 1;
        chomp(state, src, "a")
        chomp(state, src, "l")
        chomp(state, src, "s")
        chomp(state, src, "e")         
        tokens.push('false')
      }
      else if (src[state.i] === "&"){
        state.i += 1;
        chomp(state, src, "&")        
        tokens.push('&&')
      }
      else if (src[state.i] === "|"){
        state.i += 1;
        chomp(state, src, "|")   
        tokens.push('||')
      }
      else if (src[state.i] === "="){
        state.i += 1;
        chomp(state, src, "=")     
        tokens.push('==')
      }
      else if (src[state.i] === "+"){    
        tokens.push('+')
        state.i += 1;
      }
      else if (src[state.i] === "!"){    
        tokens.push('!')
        state.i += 1;
      }
      else if (src[state.i] === "("){     
        tokens.push('(')
        state.i += 1;
      }
      else if (src[state.i] === ")"){    
        tokens.push(')')
        state.i += 1;
      }
     }
      return tokens
      }
   