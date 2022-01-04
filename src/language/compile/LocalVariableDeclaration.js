import { CompileFunctions } from "../CompileFunctions";
import { Identifier } from "./Identifier";
import { StringLiteral } from "./StringLiteral";
import { VariableDeclarator } from "./VariableDeclarator";

export function LocalVariableDeclaration(node,source,scope){
  let code;
  node=node.firstChild;
  console.log(node);
  if(node.name!=="PrimitiveType" || node.name!=="TypeName"){

  }
  let type=CompileFunctions.get(node,source)(node,source,scope);
  code="let ";
  type=type.type;
  node=node.nextSibling;
  if(!node.name==="VariableDeclarator"){

  }
  let vdekl=VariableDeclarator(node,source,scope);
  try{
    scope.pushLocalVariable(vdekl.name,type);
  }catch(e){
    throw (source.createError(e,node));
  }
  if(vdekl.type){
    if(!vdekl.type.isSubtypeOf(type)){
      throw source.createError("Einer Variablen vom Typ '"+type.name+"' kann kein Wert vom Typ '"+vdekl.type.name+"' zugewiesen werden.",node);
    }
  }
  code+=vdekl.code;
  
  return {
    code,
    type
  };
}