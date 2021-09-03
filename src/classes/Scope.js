export class Scope{
  constructor(project,method){
    this.project=project;
    this.method=method;
    this.stack=[];
    this.indent="    ";
  }

  /**Liefert die lokale Variable zu diesem Namen zurueck, falls vorhanden */
  getLocalVariable(name){
    let searching=true;
    let index=this.stack.length-1;
    /**Lokalen Stack durchsuchen: */
    while(index>=0){
      let s=this.stack[index];
      index--;
      let obj=s[name];
      if(obj){
        return obj;
      }
    }
    return null;
  }

  getClazz(name){
    return this.project.getClazzByName(name);
  }

}