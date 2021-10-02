grammar FoodDescription;
foodDescription
  : foodName (measurement)?
  ;
  
foodName
    : STRING STRING*
    ;

measurement
    : quantity unit
    ;

quantity
  : DIGIT+
  ;

unit
  : 'cup'
  ;

STRING
   : [a-zA-Z] [a-zA-Z]*
   ;

DIGIT : [0-9];

WS
   : [ \t\r\n]+ -> skip
   ;
