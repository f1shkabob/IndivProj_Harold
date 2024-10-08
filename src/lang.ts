/* eslint-disable spaced-comment */

/***** Abstract Syntax Tree ***************************************************/

// Types

// the big boy records
export type Typ = TyNat | TyBool | TyArr | TyRec | TyField | TyUnion
export type TyNat = { tag: 'nat' }
export type TyBool = { tag: 'bool' }
export type TyArr = { tag: 'arr'; inputs: Typ[]; output: Typ }
export type TyRec = { tag: 'rec'; values: Map<string, Typ> }
export type TyField = { tag: 'field'; e: TyRec; field: string }
export type TyUnion = { tag: 'union'; variants: Map<string, Typ> }

//lowercase records!
export const tynat: Typ = { tag: 'nat' }
export const tybool: Typ = { tag: 'bool' }
export const tyarr = (inputs: Typ[], output: Typ): TyArr => ({
  tag: 'arr',
  inputs,
  output,
})
export const tyrec = (values: Map<string, Typ>): TyRec => ({
  tag: 'rec',
  values,
})
export const tyfield = (e: TyRec, field: string): TyField => ({
  tag: 'field',
  e,
  field,
})
export const tyunion = (variants: Map<string, Typ>): TyUnion => ({
    tag: 'union',
    variants,
  })
  

// Expressions

export type Exp = Var | Num | Bool | Lam | App | If | Rec | Field | Union
export type Var = { tag: 'var'; value: string }
export type Num = { tag: 'num'; value: number }
export type Bool = { tag: 'bool'; value: boolean }
export type Lam = { tag: 'lam'; param: string; typ: Typ; body: Exp }
export type App = { tag: 'app'; head: Exp; args: Exp[] }
export type If = { tag: 'if'; e1: Exp; e2: Exp; e3: Exp }
export type Rec = { tag: 'rec'; exps: Map<string, Exp> }
export type Field = { tag: 'field'; e: Exp; field: string }
export type Union = { tag: 'union'; variant: string; e: Exp }

export const evar = (value: string): Var => ({ tag: 'var', value })
export const num = (value: number): Num => ({ tag: 'num', value })
export const bool = (value: boolean): Bool => ({ tag: 'bool', value })
export const lam = (param: string, typ: Typ, body: Exp): Lam => ({
  tag: 'lam',
  param,
  typ,
  body,
})
export const app = (head: Exp, args: Exp[]): App => ({ tag: 'app', head, args })
export const ife = (e1: Exp, e2: Exp, e3: Exp): If => ({
  tag: 'if',
  e1,
  e2,
  e3,
})
export const rec = (exps: Map<string, Exp>): Rec => ({ tag: 'rec', exps })
export const field = (e: Exp, field: string): Field => ({
  tag: 'field',
  e,
  field,
})
export const union = (variant: string, e: Exp): Union => ({
    tag: 'union',
    variant,
    e,
  })

// record literals
export type Value = Num | Bool | Prim | Closure | RecVal | Field | UnionVal
export type Prim = { tag: 'prim'; name: string; fn: (args: Value[]) => Value }
export type Closure = { tag: 'closure'; param: string; body: Exp; env: Env }
export type RecVal = { tag: 'recVal'; values: Map<string, Value> }
export type UnionVal = { tag: 'unionVal'; variant: string; e: Value }

export const prim = (name: string, fn: (args: Value[]) => Value): Prim => ({
  tag: 'prim',
  name,
  fn,
})
export const closure = (param: string, body: Exp, env: Env): Closure => ({
  tag: 'closure',
  param,
  body,
  env,
})
export const recVal = (values: Map<string, Value>): RecVal => ({tag: 'recVal', values})
export const unionVal = (variant: string, e: Value): UnionVal => ({
  tag: 'unionVal',
  variant, 
  e,
})
// Statements

export type Stmt = SDefine | SAssign | SPrint
export type SDefine = { tag: 'define'; id: string; exp: Exp }
export type SAssign = { tag: 'assign'; loc: Exp; exp: Exp }
export type SPrint = { tag: 'print'; exp: Exp }

export const sdefine = (id: string, exp: Exp): SDefine => ({
  tag: 'define',
  id,
  exp,
})
export const sassign = (loc: Exp, exp: Exp): SAssign => ({
  tag: 'assign',
  loc,
  exp,
})
export const sprint = (exp: Exp): SPrint => ({ tag: 'print', exp })

// Programs

export type Prog = Stmt[]

/***** Runtime Environment ****************************************************/

export class Env {
  private outer?: Env
  private bindings: Map<string, Value>

  constructor(bindings?: Map<string, Value>) {
    this.bindings = bindings || new Map()
  }

  has(x: string): boolean {
    return (
      this.bindings.has(x) || (this.outer !== undefined && this.outer.has(x))
    )
  }

  get(x: string): Value {
    if (this.bindings.has(x)) {
      return this.bindings.get(x)!
    } else if (this.outer !== undefined) {
      return this.outer.get(x)
    } else {
      throw new Error(`Runtime error: unbound variable '${x}'`)
    }
  }

  set(x: string, v: Value): void {
    if (this.bindings.has(x)) {
      throw new Error(`Runtime error: redefinition of variable '${x}'`)
    } else {
      this.bindings.set(x, v)
    }
  }

  update(x: string, v: Value): void {
    this.bindings.set(x, v)
    if (this.bindings.has(x)) {
      this.bindings.set(x, v)
    } else if (this.outer !== undefined) {
      return this.outer.update(x, v)
    } else {
      throw new Error(`Runtime error: unbound variable '${x}'`)
    }
  }

  extend1(x: string, v: Value): Env {
    const ret = new Env()
    ret.outer = this
    ret.bindings = new Map([[x, v]])
    return ret
  }
}

/***** Typechecking Context ***************************************************/

/** A context maps names of variables to their types. */
export type Ctx = Map<string, Typ>

/** @returns a copy of `ctx` with the additional binding `x:t` */
export function extendCtx(x: string, t: Typ, ctx: Ctx): Ctx {
  const ret = new Map(ctx.entries())
  ret.set(x, t)
  return ret
}

/***** Pretty-printer *********************************************************/

/** @returns a pretty version of the expression `e`, suitable for debugging. */
export function prettyExp(e: Exp): string {
  switch (e.tag) {
    case 'var':
      return `${e.value}`
    case 'num':
      return `${e.value}`
    case 'bool':
      return e.value ? 'true' : 'false'
    case 'lam':
      return `(lambda ${e.param} ${prettyTyp(e.typ)} ${prettyExp(e.body)})`
    case 'app':
      return `(${prettyExp(e.head)} ${e.args.map(prettyExp).join(' ')})`
    case 'if':
      return `(if ${prettyExp(e.e1)} ${prettyExp(e.e2)} ${prettyExp(e.e3)})`
    case 'rec':
      const flatMap = [...e.exps.entries()].flat()
      return `(rec ${flatMap})`
    case 'field':
      return `(field ${prettyExp(e.e)} ${e.field})`
    case 'union':
        return `(union ${e.variant} ${prettyExp(e.e)})`
  }
}

/** @returns a pretty version of the value `v`, suitable for debugging. */
export function prettyValue(v: Value): string {
  switch (v.tag) {
    case 'num':
      return `${v.value}`
    case 'bool':
      return v.value ? 'true' : 'false'
    case 'closure':
      return `<closure>`
    case 'prim':
      return `<prim ${v.name}>`
    case 'recVal':
      const flatMap = [...v.values.entries()].flat()
      return `<rec ${flatMap}>`
    case 'field':
      return `<field <rec> ${v.field}>`  
    case 'unionVal':
      return `${v.variant}, ${prettyValue(v.e)}`
  }
}

/** @returns a pretty version of the type `t`. */
export function prettyTyp(t: Typ): string {
  switch (t.tag) {
    case 'nat':
      return 'nat'
    case 'bool':
      return 'bool'
    case 'arr':
      return `(-> ${t.inputs.map(prettyTyp).join(' ')} ${prettyTyp(t.output)})`
    case 'rec':
      return 'rec'
    case 'field':
      return 'field'
    case 'union':
        return 'union'
  }
}

/** @returns a pretty version of the statement `s`. */
export function prettyStmt(s: Stmt): string {
  switch (s.tag) {
    case 'define':
      return `(define ${s.id} ${prettyExp(s.exp)})`
    case 'assign':
      return `(assign ${prettyExp(s.loc)} ${prettyExp(s.exp)}))`
    case 'print':
      return `(print ${prettyExp(s.exp)})`
  }
}

/** @returns a pretty version of the program `p`. */
export function prettyProg(p: Prog): string {
  return p.map(prettyStmt).join('\n')
}

/***** Equality ***************************************************************/

/** @returns true iff t1 and t2 are equivalent types */
export function typEquals(t1: Typ, t2: Typ): boolean {
  // N.B., this could be collapsed into a single boolean expression. But we
  // maintain this more verbose form because you will want to follow this
  // pattern of (a) check the tags and (b) recursively check sub-components
  // if/when you add additional types to the language.
  if (t1.tag === 'nat' && t2.tag === 'nat') {
    return true
  } else if (t1.tag === 'bool' && t2.tag === 'bool') {
    return true
  } else if (t1.tag === 'arr' && t2.tag === 'arr') {
    return (
      typEquals(t1.output, t2.output) &&
      t1.inputs.length === t2.inputs.length &&
      t1.inputs.every((t, i) => typEquals(t, t2.inputs[i]))
    )
    // equality case
  } else if (t1.tag === 'rec' && t2.tag === 'rec') {
    if (t1.values.size !== t2.values.size) {
      return false
    }
    for (const [field, type] of t1.values.entries()) {
      if (!t2.values.has(field) || !typEquals(type, t2.values.get(field)!)) {
        return false
      }
    }
    return true
  }
   else {
    return false
  }
}
