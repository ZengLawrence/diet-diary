grammar FoodDescription;
foodDescription
  : foodName measurement?
  ;
  
foodName
    : WORD (COMMA | WORD)*
    ;

measurement
    : quantity unit?
    ;

quantity
  : DECIMAL | FRACTION | WHOLE_NUMBER | WHOLE_NUMBER FRACTION
  ;

unit
  : WORD+ | WORD* LEFT_PAREN (WHOLE_NUMBER | FRACTION | WORD | SLASH | PERIOD)* RIGHT_PAREN?
  ;

WORD
   : [a-zA-Z-]+ | [0-9]+[a-zA-Z%-]+
   ;

fragment DIGIT : [0-9];
DECIMAL : DIGIT+ '.' DIGIT* | '.' DIGIT+;
FRACTION: DIGIT+ '/' DIGIT+;
WHOLE_NUMBER: DIGIT+;

LEFT_PAREN : '(';
RIGHT_PAREN : ')';
SLASH : '/';
PERIOD: '.';

COMMA : ',' -> channel(HIDDEN) ;

WS
   : [ \t\r\n]+ -> skip
   ;
