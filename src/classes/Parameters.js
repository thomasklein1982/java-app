import { Type } from "./Type";

export class ParameterList{
  constructor(method){
    this.method=method;
    this.parameters=[];
    this.minCount=-1;
  }
  get count(){
    return this.parameters.length;
  }
  define(data){
    this.parameters=[];
    for(let i=0;i<data.length;i++){
      let d=data[i];
      let p=new Parameter(this);
      p.define(d);
      this.parameters.push(p);
    }
  }
  getJavaScriptCode(){
    let code="(";
    for(let i=0;i<this.parameters.length;i++){
      if(i>0) code+=",";
      let p=this.parameters[i];
      code+=p.getJavaScriptCode()
    }
    code+=")";
    return code;
  }
  
  toString(){
    var t="";
    for(var i=0;i<this.parameters.length;i++){
      if(i>0) t+=", ";
      let p=this.parameters[i];
      t+=p.toString();
    }
    return t;
  }

  compile(node,source){
    let errors=[];
    node=node.firstChild;
    node=node.nextSibling;
    let names={};
    while(node.name==="FormalParameter"){
      let p=new Parameter(this);
      errors=errors.concat(p.compile(node,source));
      if(names[p.name]){
        errors.push(source.createError("Doppelter Parameter '"+p.name+"'.",node));  
      }else{
        this.parameters.push(p);
        names[p.name]=true;
      }
      node=node.nextSibling;
      if(node.name!==","){

      }else{
        node=node.nextSibling;
      }
    }
    if(node.type.isError || node.name!==")"){
      errors.push(source.createError("')' erwartet",node));
    }else{
      node=node.nextSibling;
    }
    return errors;
  }
}

export class Parameter{
  constructor(list){
    this.list=list;
    this.type=null;
    this.name=null;
  }

  getJavaScriptCode(){
    return this.name;
  }

  toString(){
    if(!this.type) return "???";
    return this.type.toString()+" "+this.name;
  };

  define(data){
    this.type=data.type;
    this.name=data.name;
  }

  compile(node,source){
    let errors=[];
    
    node=node.firstChild;
    if(node.name.indexOf("Type")>=0){
      this.type=Type.compile(node,source,this.list.method.clazz.project,errors);
    }else{

    }
    node=node.nextSibling;
    if(node.name==='Definition'){
      this.name=source.getText(node);
    }else{
      errors.push(source.createError("Parametername erwartet",node));
    }
    return errors;
  }
}