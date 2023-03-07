import * as L from './lang'
import { Token } from './common.js'

type ParserState = { index: number };



/**
 * @param state the current state of the parser
 * @param src the string we are parsing
 * @param target the target character we are chomping
 *
 * Checks to see if the character we are analyzing in `src` according to `state`
 * is `target`. If so, advances `state` one character forward. Otherwise, throws
 * an error.
 */
function chomp(st: ParserState, src: Token[], token: Token): void {
  if (src[st.index] === token) {
    st.index++;
  } else {
    throw new Error(
      `Parsing Error when parsing string <${src}> at state ${st.index} for target ${token}.`
    );
  }
}




function parseExpHelper(state: ParserState, src: Token[]): L.Exp {
  if (state.index >= src.length) {
    throw new Error("Unexpected end of input");
  } else {
    let token = src[state.index];
      if (/\d/.test(token)) {
        chomp(state, src, token);
        return L.num(Number(token));
      }
      else if (token == 'true'){
        chomp(state, src, "true");
            return L.bool(true);
      }
      else if (token == 'false'){
        chomp(state, src, "false");
            return L.bool(false);
      }
      else if (token === '('){
        chomp(state, src, "(");
        let next_token = src[state.index];
        switch (next_token) {
          case "+":
            chomp(state, src, "+");
            let e1: L.Exp = parseExpHelper(state, src);
            let e2: L.Exp = parseExpHelper(state, src);
            let ret = L.plus(e1,e2);
            chomp(state, src, ")");
            return ret;
          case "||":
            chomp(state, src, "||");
            let e3: L.Exp = parseExpHelper(state, src);
            let e4: L.Exp = parseExpHelper(state, src);
            let ret2 = L.or(e3,e4);
            chomp(state, src, ")");
            return ret2;
          case "==":
            chomp(state, src, "==");
            let e5: L.Exp = parseExpHelper(state, src);
            let e6: L.Exp = parseExpHelper(state, src);
            let ret3 = L.eq(e5,e6);
            chomp(state, src, ")");
            return ret3;
          case "&&":
            chomp(state, src, "&&");
            let e7: L.Exp = parseExpHelper(state, src);
            let e8: L.Exp = parseExpHelper(state, src);
            let ret4 = L.and(e7,e8);
            chomp(state, src, ")");
            return ret4;
          case "if":
            chomp(state, src, "if");
            let e10: L.Exp = parseExpHelper(state, src);
            chomp(state, src, "then");
            let e11: L.Exp = parseExpHelper(state, src);
            chomp(state, src, "else");
            let e12: L.Exp = parseExpHelper(state, src);
            let ret6 = L.ife(e10,e11,e12);
            chomp(state, src, ")");
            return ret6;
          default:
            throw new Error(
              `Expect a token, but got <${token}>!`
              );
      }} else {
        console.log(`Unexpected character: [${token}].`);
        throw new Error(`Unexpected character: ${token}`);
      }
  }
}



/**
 * @param src the input program in s-expression syntax
 * @returns the `Exp` corresponding to the provided input program
 */
export function parseExp(src: Token[]): L.Exp {
  // TODO: implement me!
  const st = { index: 0 };
  const ret = parseExpHelper(st, src);
  if (st.index !== src.length) {
    throw new Error("Unexpected characters at end of input");
  } else {
    return ret;
  }
}