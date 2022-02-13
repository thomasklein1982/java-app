import { Error } from "../../classes/Error";
import { Scope } from "../../classes/Scope";
import { Source } from "../../classes/Source";
import { Java } from "../java";
import { Type } from "../../classes/Type";

/**wenn owner=null: top level identifier, ansonsten ist owner ein Objekt mit folgenden Eigenschaften: 
 * clazz: Clazz Die Klasse des Objektes in der Hierarchie darueber 
 * static: boolean Gibt an, ob das Objekt in der Hierarchie darueber eine Klasse ist, also ob der Identifier statisch sein muss
 * @param {*} node 
 * @param {Source} source 
 * @param {Scope} scope 
 * @param {Error[]} errors 
 * @param {Object} owner 
 * @returns 
 */
export function Identifier(node,source,scope,owner){
  let name;
  if(node.src){
    /**Spezialfall (Bug?) siehe ObjectCreationExpression */
    name=node.src;
  }else{
    name=source.getText(node);
  }
  if(!/^[a-zA-z0-9_]+$/.test(name)){
    throw source.createError("Der Bezeichner '"+name+"' ist ungültig. Ein Bezeichner darf nur aus Buchstaben, Ziffern und/oder Unterstrichen bestehen.",node);
  }
  let obj;
  let code=name;
  let type=null;
  if(owner && owner.type){
    if(owner.type.dimension>0){
      //Array!
      if(name!=="length"){
        throw source.createError("Ein Array hat keine Attribute außer der Länge 'length'.",node);
      }
      //scope.addTypeAnnotation(node.to,new Type(Java.datatypes.int,0),false);
      type=new Type(Java.datatypes.int,0);
    }else{
      let clazz;
      if(owner.static){
        clazz=owner.type;
      }else{
        clazz=owner.type.baseType;
      }
      obj=scope.getAttribute(name,owner.static,clazz);
      if(obj && obj.error){
        throw source.createError(obj.error,node);
      }
      type=obj.type;
      scope.addTypeAnnotation(node.to,type,false);
    }
  }else{
    //Top-Level
    obj=scope.getLocalVariable(name);
    if(!obj){
      obj=scope.getClazzByName(name);
      type=null;
      scope.addTypeAnnotation(node.to,new Type(obj,0),true);
    }else{
      type=obj.type;
      scope.addTypeAnnotation(node.to,type,false);
    }
    if(!obj){
      obj=scope.getAttribute(name,false);
      if(obj && obj.error){
        throw source.createError(obj.error,node);
      }else{
        code="this."+code;
        type=obj.type;
        scope.addTypeAnnotation(node.to,type,false);
      }
    }
    if(node.src){
      throw source.createError("Ein Ausdruck darf nicht mit '.' enden.",node.node);
    }
    if(!obj){
      throw source.createError("'"+name+"' ist undefiniert",node);
    }
  }
  
  return {
    code: code,
    object: obj,
    type: type
  };
}