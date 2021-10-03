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
  : STRING
  ;

STRING
   : [a-zA-Z]+ | [0-9][a-zA-Z%]+
   ;

fragment DIGIT : [0-9];
DECIMAL : DIGIT+ '.'? DIGIT* | '.' DIGIT+;

WS
   : [ \t\r\n]+ -> skip
   ;
