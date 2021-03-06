import { Block } from "./compile/Block";
import { MethodInvocation } from "./compile/MethodInvocation";
import { ExpressionStatement } from "./compile/ExpressionStatement";
import { StringLiteral } from "./compile/StringLiteral";
import { IntegerLiteral } from "./compile/IntegerLiteral";
import { FloatingPointLiteral } from "./compile/FloatingPointLiteral.js";
import { BooleanLiteral } from "./compile/BooleanLiteral";
import { ArgumentList } from "./compile/ArgumentList";
import {Identifier} from "./compile/Identifier";
import { FieldAccess } from "./compile/FieldAccess";
import { ObjectCreationExpression } from "./compile/ObjectCreationExpression";
import { TypeName } from "./compile/TypeName";
import { ScopedTypeName } from "./compile/ScopedTypeName";
import { LocalVariableDeclaration } from "./compile/LocalVariableDeclaration";
import { PrimitiveType } from "./compile/PrimitiveType";
import { AssignmentExpression } from "./compile/AssignmentExpression";
import { VariableDeclarator } from "./compile/VariableDeclarator";
import { BinaryExpression } from "./compile/BinaryExpression";
import { ParenthesizedExpression } from "./compile/ParenthesizedExpression";
import { ArrayCreationExpression } from "./compile/ArrayCreationExpression";
import { Dimension } from "./compile/Dimension";
import { ArrayAccess } from "./compile/ArrayAccess";
import {IfStatement  } from "./compile/IfStatement";
import {ArrayType} from "./compile/ArrayType";
import { ForStatement } from "./compile/ForStatement";
import { LineComment } from "./compile/LineComment";
import { ThisExpression } from "./compile/ThisExpression";
import { ReturnStatement } from "./compile/ReturnStatement";
import { UpdateExpression } from "./compile/UpdateExpression";
import {Null} from "./compile/Null";
import { WhileStatement } from "./compile/WhileStatement";
import { ArrayInitializer } from "./compile/ArrayInitializer";
import { UnaryExpression } from "./compile/UnaryExpression";

function doNothing(){}

export const CompileFunctions={
  get(node,source){
    if(node.type.isError){
      throw source.createError("Syntax-Fehler", node);
    }
    let name=node.name==="null"? "Null" : (node.name==="this"? "ThisExpression" : node.name);
    let compile=this.functions[name];
    if(!compile){
      throw source.createError("Unbekanntes Sprachkonstrukt. Sorry, ich verstehe das (noch) nicht :( ["+node.name+"]", node);
    }
    return compile;
  },
  functions: {
    MethodInvocation,ExpressionStatement,StringLiteral,ArgumentList,Identifier,FieldAccess,IntegerLiteral,FloatingPointLiteral, BooleanLiteral, ObjectCreationExpression, TypeName, LocalVariableDeclaration, PrimitiveType, AssignmentExpression, IntegerLiteral, VariableDeclarator, BinaryExpression, ParenthesizedExpression, ArrayCreationExpression, Dimension, ArrayAccess, IfStatement, ArrayType, ForStatement, LineComment, ThisExpression, ReturnStatement, UpdateExpression, Null, WhileStatement, ArrayInitializer, UnaryExpression, Block, ScopedTypeName
  }
}