import * as L from './lang'

export function typecheck(e: L.Exp): L.Typ {
  switch (e.tag) {
    case 'unit': { return L.unit }
    case 'num':{ return L.tynat }
    case 'bool':{ return L.tybool }
    // case 'pair': { }
    case 'not':{ if (e.exp.tag === 'bool') {
      return L.tybool
    } else {
    throw new Error('Typechecker Error: unexpected type!') }
    }
    case 'plus':{ if (e.e1.tag === 'num' && e.e2.tag === 'num'){
      return L.tynat
    } else if (typecheck(e.e1).tag === 'nat' && typecheck(e.e2).tag === 'nat'){
      return L.tynat
    }else{
      throw new Error('Typechecker Error: unexpected type!')
    }
  }
    case 'eq': return L.tybool
    case 'and':{  
      if (typecheck(e.e1).tag === 'bool' && typecheck(e.e2).tag === 'bool') {
        return L.tybool
      }
      else {
        throw new Error('Typechecker Error: unexpected type!')
      }
    }
    case 'or':  {  
      if (typecheck(e.e1).tag === 'bool' && typecheck(e.e2).tag === 'bool'){
        return L.tybool
      } else{
        throw new Error('Typechecker Error: unexpected type!')
      }
    }
    case 'if':   {  
      if (typecheck(e.e1).tag === 'bool' && typecheck(e.e2) === typecheck(e.e3)) {
        return typecheck(e.e2)
      } else {
        throw new Error('Typechecker Error: unexpected type!')
      }
    }
    case 'pair': {
      const ty1 = typecheck(e.e1)
      const ty2 = typecheck(e.e2)
      return L.pairTyp(ty1, ty2)
    }
  }

  return L.tybool
}