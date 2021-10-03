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
  : CUP 
  | OUNCE
  | TABLESPOON
  | TEASPOON
  | MINI | SMALL | MEDIUM | LARGE
  ;

CUP : 'cup' | 'cups';
OUNCE : 'ounce' | 'ounces' | 'oz';
TABLESPOON : 'tablespoon' | 'tablespoons' | 'tbsp';
TEASPOON : 'teaspoon' | 'teaspoons' | 'tsp';
MINI : 'mini';
SMALL : 'small';
MEDIUM : 'medium';
LARGE : 'large';

STRING
   : [a-zA-Z]+ | [0-9][a-zA-Z%]+
   ;

fragment DIGIT : [0-9];
DECIMAL : DIGIT+ '.'? DIGIT* | '.' DIGIT+;

WS
   : [ \t\r\n]+ -> skip
   ;
