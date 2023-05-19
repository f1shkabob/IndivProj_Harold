import { describe, expect, test } from '@jest/globals'
import * as L from '../src/lang'
import * as Sexp from '../src/sexp'
import * as Trans from '../src/translator'
import * as TC from '../src/typechecker'
import * as Interp from '../src/interpreter'
import * as Runtime from '../src/runtime'

function compile (src: string, typecheck: boolean = false): L.Prog {
  const prog = Trans.translateProg(Sexp.parse(src))
  if (typecheck) {
    TC.checkWF(Runtime.initialCtx, prog)
  }
  return prog
}

function compileAndPrint (src: string, typecheck: boolean = false): string {
  return L.prettyProg(compile(src, typecheck))
}

function compileAndInterpret (src: string, typecheck: boolean = false): Interp.Output {
  return Interp.execute(Runtime.makeInitialEnv(), compile(src, typecheck))
}

const prog1 = `
  (define x 1)
  (define y 1)
  (print (+ x y))
  (assign x 10)
  (print (+ x y))
`

const prog2 = `
  (define result 0)
  (define factorial
    (lambda n Nat
      (if (zero? n)
          1
          (* n (factorial (- n 1))))))
  (assign result (factorial 5))
  (print result)
`

const prog3 = `
  (define r (rec x 1 y (+ 2 4) z (* 3 10)))
  (print (field r y))
`
  
const prog4 = `(print (field (rec a 1 b 2 c 3 d 4 e 5) a))`

const prog5=
`(define r  (rec x 1 y 2 z 3))
  (print (field r y))`
  
  const prog6 = 
  `(define dur
    (union variant1 (10 + 10)))
  (print dur))`


const prog7 = 
  `(define b
    (union variant2 44))
  (print b))`


describe('testerinos', () => {
  test('prog1', () => {
    expect(compileAndInterpret(prog1, true)).toStrictEqual(['2', '11'])
  })
  test('prog2', () => {
    expect(compileAndInterpret(prog2, false)).toStrictEqual(['120'])
  })
  
  test('prog3', () => {
    expect(compileAndInterpret(prog3, true)).toStrictEqual(['6'])
  })

  test('prog4', () => {
    expect(compileAndInterpret(prog4, true)).toStrictEqual(['1'])
  })

  test('prog5', () => {
    expect(compileAndInterpret(prog5, true)).toStrictEqual(['2'])
  })

  test('prog6', () => {
    expect(compileAndInterpret(prog6, true)).toStrictEqual(['variant1', '20'])
  })

  test('prog7', () => {
    expect(compileAndInterpret(prog7, true)).toStrictEqual(['variant2', '44'])
  })

})

