grammar FoodDescription;
foodDescription
  : foodName (measurement)?
  ;
  
foodName
    : STRING STRING*
    ;

measurement
    : number unit
    ;

number
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
