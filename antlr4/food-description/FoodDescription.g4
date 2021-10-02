grammar FoodDescription;
foodDescription
  : foodName (measurement)?
  ;
  
foodName
    : STRING STRING*
    ;

measurement
    : quantity unit?
    ;

quantity
  : DIGIT+
  ;

unit
  : 'cup' | 'small'
  ;

STRING
   : [a-zA-Z]+ | [0-9][a-zA-Z%]+
   ;

DIGIT : [0-9];

WS
   : [ \t\r\n]+ -> skip
   ;
