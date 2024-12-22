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
  : WORD+ | WORD LEFT_PARENTHESES (WHOLE_NUMBER | WORD)+ RIGHT_PARENTHESES
  ;

WORD
   : [a-zA-Z-]+ | [0-9]+[a-zA-Z%-]+
   ;

fragment DIGIT : [0-9];
DECIMAL : DIGIT+ '.' DIGIT* | '.' DIGIT+;
FRACTION: DIGIT+ '/' DIGIT+;
WHOLE_NUMBER: DIGIT+;

LEFT_PARENTHESES : '(';
RIGHT_PARENTHESES : ')';

COMMA : ',' -> channel(HIDDEN) ;

WS
   : [ \t\r\n]+ -> skip
   ;
