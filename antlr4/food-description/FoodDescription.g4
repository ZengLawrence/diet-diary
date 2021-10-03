grammar FoodDescription;
foodDescription
  : foodName (measurement)?
  ;
  
foodName
    : STRING+
    ;

measurement
    : quantity unit?
    ;

quantity
  : DECIMAL
  ;

unit
  : 'cup' | 'cups' 
  | 'ounce' | 'ounces' | 'oz'
  | 'tablespoon' | 'tablespoons' | 'tbsp'
  | 'mini' | 'small' | 'medium' | 'large'
  ;

STRING
   : [a-zA-Z]+ | [0-9][a-zA-Z%]+
   ;

fragment DIGIT : [0-9];
DECIMAL : DIGIT+ '.'? DIGIT* | '.' DIGIT+;

WS
   : [ \t\r\n]+ -> skip
   ;
