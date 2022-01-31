function additionalJSCode(){
  function $v(v){if(Number.isNaN(v*1)){throw {message: "'"+v+"' ist keine Zahl."}}else{return v*1}}
  Object.defineProperty(String.prototype,'len',{value: function(){return this.length;}, writeable: false});

  function onAction(element){
    if($main && $main.onAction){
      $main.onAction(element.component);
    }
  }

  class JComponent{
    constructor(x,y,width,height){
      this.x=x;
      this.y=y;
      this.width=width;
      this.height=height;
      this.$el=null;
      this.standardDisplayValue=null;
    }
    get visible(){
      return this.$el.visible;
    }
    set visible(v){
      this.$el.visible=v;
    }
    get value(){
      return this.$el.value;
    }
    set value(label){
      this.$el.value=label;
    }
  }

  class JButton extends JComponent{
    constructor(label,x,y,width,height){
      super(x,y,width,height);
      this.$el=ui.button(label,x,y,width,height);
      this.$el.component=this;
    }
  }

  class JLabel extends JComponent{
    constructor(text,x,y,width,height){
      super(x,y,width,height);
      this.$el=ui.label(text,x,y,width,height);
      this.$el.component=this;
    }
  }

  class JTextField extends JComponent{
    constructor(type,placeholder,x,y,width,height){
      super(x,y,width,height);
      this.$el=ui.input(type,placeholder,x,y,width,height);
      this.$el.component=this;
    }
  }

  class JTextArea extends JComponent{
    constructor(placeholder,x,y,width,height){
      super(x,y,width,height);
      this.$el=ui.textarea(placeholder,x,y,width,height);
      this.$el.component=this;
    }
  }
}