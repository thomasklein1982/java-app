import { Type } from "../../classes/Type";
import { CompileFunctions } from "../CompileFunctions";
import { ArgumentList } from "./ArgumentList";
import { Identifier } from "./Identifier";
import { TypeName } from "./TypeName";

/**
 * 
 * @param {*} node 
 * @param {Source} source 
 * @param {Scope} scope 
 */
export function ObjectCreationExpression(node,source,scope){
  let code;
  let root=node;
  node=node.firstChild;
  if(node.name!=='new'){
    let c=source.src.charAt(root.to-1);
    if(c==="."){
      /**Seltsames Verhalten? Hier scheinen alle Ausdruecke zu landen, die mit einem . enden */
      console.log(source.getText(root));
      let src=source.getText(root);
      src=src.substring(0,src.length-1);
      return Identifier({node: root, src: src, from: root.from,to: root.to-1},source,scope);
    }
  }
  node=node.nextSibling;
  if(node.name!=='TypeName'){

  }
  
  let typename=TypeName(node,source,scope);
  node=node.nextSibling;
  if(node.name!=='ArgumentList'){
    
  }
  let al=ArgumentList(node,source,scope);
  code="new "+typename.code;
  if(!typename.type.isNative()){
    code="await $App.asyncFunctionCall("+code+"(),'$constructor',["+al.code.substring(1,al.code.length-1)+"])";
  }else{
    code+=al.code;
  }
  return {
    code,
    clazz: typename.type,
    type: new Type(typename.type,0)
  };
  // let method=scope.getMethod(mn,al.list,owner.static,owner.clazz);
  // if(method.error){
  //   throw (source.createError(method.error,node));
  // }
  // return {
  //   method,arguments: al, code
  // }
}