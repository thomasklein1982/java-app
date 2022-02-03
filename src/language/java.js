import {PrimitiveType} from "../classes/PrimitiveType";
import { Clazz } from "../classes/Clazz";
import { defineApp } from "./datatypes/App.js";
import { defineGenericClazz } from "./datatypes/GenericClazz";
import { appjsdata } from "../functions/snippets";
import { defineString } from "./datatypes/string";
import { defineUIClazzes } from "./datatypes/UI";

let boolean=new PrimitiveType("boolean",null,false,"Ein 'boolean' (dt: 'Wahrheitswert') kann nur true oder false sein.",true);
let double=new PrimitiveType("double",null,0.0,"Ein 'double' ist eine Kommazahl.");
let int=new PrimitiveType("int",double,0,"Ein 'Integer' ist eine ganze Zahl.");
let char=new PrimitiveType("char",int,32,"Ein 'Character' (dt: 'Zeichen') ist ein einzelnes Zeichen (z. B. Buchstabe, Ziffer, Leerzeichen usw.).");
let Object=new Clazz("Object");
Object.cannotBeInstantiated=true;
const String=new Clazz("String");
String.cannotBeInstantiated=true;
let Gamepad=new Clazz("Gamepad");
Gamepad.cannotBeInstantiated=true;
let UI=new Clazz("UI");
UI.cannotBeInstantiated=true;
let Path=new Clazz("Path");
Path.cannotBeInstantiated=true;
let Mouse=new Clazz("Mouse");
Mouse.cannotBeInstantiated=true;
let Console=new Clazz("Console");
Console.cannotBeInstantiated=true;
let JComponent=new Clazz("JComponent");
JComponent.cannotBeInstantiated=true;
let JButton=new Clazz("JButton");
let JTextField=new Clazz("JTextField");
let JLabel=new Clazz("JLabel");
let JTextArea=new Clazz("JTextArea");
let JCombobox=new Clazz("JCombobox");
let App=new Clazz("App");


//let Record=new Clazz("Record");
//let Matrix=new Clazz("Matrix");
//let Sound=new Clazz("Sound");
//let Image=new Clazz("Image");
//let System=new Clazz("System");
//let PrintStream=new Clazz("PrintStream");
/*typ für int-literale:*/
//let rawint=new PrimitiveType("rawint");


let datatypes={
  boolean, double, int, char, Object, String, App, Gamepad, UI, Mouse, Console, JButton, JLabel, JTextArea, JTextField, JCombobox, JComponent,Path
};

let clazzes={
  Object, String, App, Gamepad, JComponent,JButton, JLabel, JTextArea, JTextField,JCombobox
}

export const Java={
  datatypes,
  clazzes
};

defineString(String,Java);
defineGenericClazz(Gamepad,appjsdata.objects.gamepad,Java);
// defineJComponent(JComponent,Java);
// defineJButton(JButton,Java);
// defineJLabel(JLabel,Java);
defineApp(App,Java);
defineUIClazzes(Java);

console.log(App);