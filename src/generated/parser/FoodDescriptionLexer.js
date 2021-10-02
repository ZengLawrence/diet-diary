// Generated from /Users/lawrencezeng/Projects/diet-diary/antlr4/food-description/FoodDescription.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002\b4\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0006\u0005 ",
    "\n\u0005\r\u0005\u000e\u0005!\u0003\u0005\u0003\u0005\u0006\u0005&\n",
    "\u0005\r\u0005\u000e\u0005\'\u0005\u0005*\n\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0007\u0006\u0007/\n\u0007\r\u0007\u000e\u00070\u0003\u0007",
    "\u0003\u0007\u0002\u0002\b\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006",
    "\u000b\u0007\r\b\u0003\u0002\u0006\u0004\u0002C\\c|\u0003\u00022;\u0005",
    "\u0002\'\'C\\c|\u0005\u0002\u000b\f\u000f\u000f\"\"\u00027\u0002\u0003",
    "\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007",
    "\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b",
    "\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0003\u000f",
    "\u0003\u0002\u0002\u0002\u0005\u0013\u0003\u0002\u0002\u0002\u0007\u0018",
    "\u0003\u0002\u0002\u0002\t)\u0003\u0002\u0002\u0002\u000b+\u0003\u0002",
    "\u0002\u0002\r.\u0003\u0002\u0002\u0002\u000f\u0010\u0007e\u0002\u0002",
    "\u0010\u0011\u0007w\u0002\u0002\u0011\u0012\u0007r\u0002\u0002\u0012",
    "\u0004\u0003\u0002\u0002\u0002\u0013\u0014\u0007e\u0002\u0002\u0014",
    "\u0015\u0007w\u0002\u0002\u0015\u0016\u0007r\u0002\u0002\u0016\u0017",
    "\u0007u\u0002\u0002\u0017\u0006\u0003\u0002\u0002\u0002\u0018\u0019",
    "\u0007u\u0002\u0002\u0019\u001a\u0007o\u0002\u0002\u001a\u001b\u0007",
    "c\u0002\u0002\u001b\u001c\u0007n\u0002\u0002\u001c\u001d\u0007n\u0002",
    "\u0002\u001d\b\u0003\u0002\u0002\u0002\u001e \t\u0002\u0002\u0002\u001f",
    "\u001e\u0003\u0002\u0002\u0002 !\u0003\u0002\u0002\u0002!\u001f\u0003",
    "\u0002\u0002\u0002!\"\u0003\u0002\u0002\u0002\"*\u0003\u0002\u0002\u0002",
    "#%\t\u0003\u0002\u0002$&\t\u0004\u0002\u0002%$\u0003\u0002\u0002\u0002",
    "&\'\u0003\u0002\u0002\u0002\'%\u0003\u0002\u0002\u0002\'(\u0003\u0002",
    "\u0002\u0002(*\u0003\u0002\u0002\u0002)\u001f\u0003\u0002\u0002\u0002",
    ")#\u0003\u0002\u0002\u0002*\n\u0003\u0002\u0002\u0002+,\t\u0003\u0002",
    "\u0002,\f\u0003\u0002\u0002\u0002-/\t\u0005\u0002\u0002.-\u0003\u0002",
    "\u0002\u0002/0\u0003\u0002\u0002\u00020.\u0003\u0002\u0002\u000201\u0003",
    "\u0002\u0002\u000212\u0003\u0002\u0002\u000223\b\u0007\u0002\u00023",
    "\u000e\u0003\u0002\u0002\u0002\u0007\u0002!\')0\u0003\b\u0002\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class FoodDescriptionLexer extends antlr4.Lexer {

    static grammarFileName = "FoodDescription.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'cup'", "'cups'", "'small'" ];
	static symbolicNames = [ null, null, null, null, "STRING", "DIGIT", "WS" ];
	static ruleNames = [ "T__0", "T__1", "T__2", "STRING", "DIGIT", "WS" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    }

    get atn() {
        return atn;
    }
}

FoodDescriptionLexer.EOF = antlr4.Token.EOF;
FoodDescriptionLexer.T__0 = 1;
FoodDescriptionLexer.T__1 = 2;
FoodDescriptionLexer.T__2 = 3;
FoodDescriptionLexer.STRING = 4;
FoodDescriptionLexer.DIGIT = 5;
FoodDescriptionLexer.WS = 6;



