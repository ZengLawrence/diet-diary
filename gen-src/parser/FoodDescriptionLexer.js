// Generated from /Users/lawrencezeng/Projects/diet-diary/antlr4/food-description/FoodDescription.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002\u0006\u001f\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003",
    "\u0004\u0004\t\u0004\u0004\u0005\t\u0005\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0007\u0003\u0012\n\u0003",
    "\f\u0003\u000e\u0003\u0015\u000b\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0006\u0005\u001a\n\u0005\r\u0005\u000e\u0005\u001b\u0003\u0005",
    "\u0003\u0005\u0002\u0002\u0006\u0003\u0003\u0005\u0004\u0007\u0005\t",
    "\u0006\u0003\u0002\u0005\u0004\u0002C\\c|\u0003\u00022;\u0005\u0002",
    "\u000b\f\u000f\u000f\"\"\u0002 \u0002\u0003\u0003\u0002\u0002\u0002",
    "\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002\u0002",
    "\u0002\t\u0003\u0002\u0002\u0002\u0003\u000b\u0003\u0002\u0002\u0002",
    "\u0005\u000f\u0003\u0002\u0002\u0002\u0007\u0016\u0003\u0002\u0002\u0002",
    "\t\u0019\u0003\u0002\u0002\u0002\u000b\f\u0007e\u0002\u0002\f\r\u0007",
    "w\u0002\u0002\r\u000e\u0007r\u0002\u0002\u000e\u0004\u0003\u0002\u0002",
    "\u0002\u000f\u0013\t\u0002\u0002\u0002\u0010\u0012\t\u0002\u0002\u0002",
    "\u0011\u0010\u0003\u0002\u0002\u0002\u0012\u0015\u0003\u0002\u0002\u0002",
    "\u0013\u0011\u0003\u0002\u0002\u0002\u0013\u0014\u0003\u0002\u0002\u0002",
    "\u0014\u0006\u0003\u0002\u0002\u0002\u0015\u0013\u0003\u0002\u0002\u0002",
    "\u0016\u0017\t\u0003\u0002\u0002\u0017\b\u0003\u0002\u0002\u0002\u0018",
    "\u001a\t\u0004\u0002\u0002\u0019\u0018\u0003\u0002\u0002\u0002\u001a",
    "\u001b\u0003\u0002\u0002\u0002\u001b\u0019\u0003\u0002\u0002\u0002\u001b",
    "\u001c\u0003\u0002\u0002\u0002\u001c\u001d\u0003\u0002\u0002\u0002\u001d",
    "\u001e\b\u0005\u0002\u0002\u001e\n\u0003\u0002\u0002\u0002\u0005\u0002",
    "\u0013\u001b\u0003\b\u0002\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class FoodDescriptionLexer extends antlr4.Lexer {

    static grammarFileName = "FoodDescription.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'cup'" ];
	static symbolicNames = [ null, null, "STRING", "DIGIT", "WS" ];
	static ruleNames = [ "T__0", "STRING", "DIGIT", "WS" ];

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
FoodDescriptionLexer.STRING = 2;
FoodDescriptionLexer.DIGIT = 3;
FoodDescriptionLexer.WS = 4;



