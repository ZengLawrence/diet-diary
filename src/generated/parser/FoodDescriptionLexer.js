// Generated from /Users/lawrencezeng/Projects/diet-diary/antlr4/food-description/FoodDescription.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002\n]\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0007\u0006\u00073\n\u0007\r\u0007\u000e\u0007",
    "4\u0003\u0007\u0003\u0007\u0006\u00079\n\u0007\r\u0007\u000e\u0007:",
    "\u0005\u0007=\n\u0007\u0003\b\u0003\b\u0003\t\u0006\tB\n\t\r\t\u000e",
    "\tC\u0003\t\u0005\tG\n\t\u0003\t\u0007\tJ\n\t\f\t\u000e\tM\u000b\t\u0003",
    "\t\u0003\t\u0006\tQ\n\t\r\t\u000e\tR\u0005\tU\n\t\u0003\n\u0006\nX\n",
    "\n\r\n\u000e\nY\u0003\n\u0003\n\u0002\u0002\u000b\u0003\u0003\u0005",
    "\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\u0002\u0011\t\u0013",
    "\n\u0003\u0002\u0006\u0004\u0002C\\c|\u0003\u00022;\u0005\u0002\'\'",
    "C\\c|\u0005\u0002\u000b\f\u000f\u000f\"\"\u0002d\u0002\u0003\u0003\u0002",
    "\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002",
    "\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002",
    "\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002",
    "\u0002\u0002\u0002\u0013\u0003\u0002\u0002\u0002\u0003\u0015\u0003\u0002",
    "\u0002\u0002\u0005\u0019\u0003\u0002\u0002\u0002\u0007\u001e\u0003\u0002",
    "\u0002\u0002\t$\u0003\u0002\u0002\u0002\u000b+\u0003\u0002\u0002\u0002",
    "\r<\u0003\u0002\u0002\u0002\u000f>\u0003\u0002\u0002\u0002\u0011T\u0003",
    "\u0002\u0002\u0002\u0013W\u0003\u0002\u0002\u0002\u0015\u0016\u0007",
    "e\u0002\u0002\u0016\u0017\u0007w\u0002\u0002\u0017\u0018\u0007r\u0002",
    "\u0002\u0018\u0004\u0003\u0002\u0002\u0002\u0019\u001a\u0007e\u0002",
    "\u0002\u001a\u001b\u0007w\u0002\u0002\u001b\u001c\u0007r\u0002\u0002",
    "\u001c\u001d\u0007u\u0002\u0002\u001d\u0006\u0003\u0002\u0002\u0002",
    "\u001e\u001f\u0007u\u0002\u0002\u001f \u0007o\u0002\u0002 !\u0007c\u0002",
    "\u0002!\"\u0007n\u0002\u0002\"#\u0007n\u0002\u0002#\b\u0003\u0002\u0002",
    "\u0002$%\u0007o\u0002\u0002%&\u0007g\u0002\u0002&\'\u0007f\u0002\u0002",
    "\'(\u0007k\u0002\u0002()\u0007w\u0002\u0002)*\u0007o\u0002\u0002*\n",
    "\u0003\u0002\u0002\u0002+,\u0007n\u0002\u0002,-\u0007c\u0002\u0002-",
    ".\u0007t\u0002\u0002./\u0007i\u0002\u0002/0\u0007g\u0002\u00020\f\u0003",
    "\u0002\u0002\u000213\t\u0002\u0002\u000221\u0003\u0002\u0002\u00023",
    "4\u0003\u0002\u0002\u000242\u0003\u0002\u0002\u000245\u0003\u0002\u0002",
    "\u00025=\u0003\u0002\u0002\u000268\t\u0003\u0002\u000279\t\u0004\u0002",
    "\u000287\u0003\u0002\u0002\u00029:\u0003\u0002\u0002\u0002:8\u0003\u0002",
    "\u0002\u0002:;\u0003\u0002\u0002\u0002;=\u0003\u0002\u0002\u0002<2\u0003",
    "\u0002\u0002\u0002<6\u0003\u0002\u0002\u0002=\u000e\u0003\u0002\u0002",
    "\u0002>?\t\u0003\u0002\u0002?\u0010\u0003\u0002\u0002\u0002@B\u0005",
    "\u000f\b\u0002A@\u0003\u0002\u0002\u0002BC\u0003\u0002\u0002\u0002C",
    "A\u0003\u0002\u0002\u0002CD\u0003\u0002\u0002\u0002DF\u0003\u0002\u0002",
    "\u0002EG\u00070\u0002\u0002FE\u0003\u0002\u0002\u0002FG\u0003\u0002",
    "\u0002\u0002GK\u0003\u0002\u0002\u0002HJ\u0005\u000f\b\u0002IH\u0003",
    "\u0002\u0002\u0002JM\u0003\u0002\u0002\u0002KI\u0003\u0002\u0002\u0002",
    "KL\u0003\u0002\u0002\u0002LU\u0003\u0002\u0002\u0002MK\u0003\u0002\u0002",
    "\u0002NP\u00070\u0002\u0002OQ\u0005\u000f\b\u0002PO\u0003\u0002\u0002",
    "\u0002QR\u0003\u0002\u0002\u0002RP\u0003\u0002\u0002\u0002RS\u0003\u0002",
    "\u0002\u0002SU\u0003\u0002\u0002\u0002TA\u0003\u0002\u0002\u0002TN\u0003",
    "\u0002\u0002\u0002U\u0012\u0003\u0002\u0002\u0002VX\t\u0005\u0002\u0002",
    "WV\u0003\u0002\u0002\u0002XY\u0003\u0002\u0002\u0002YW\u0003\u0002\u0002",
    "\u0002YZ\u0003\u0002\u0002\u0002Z[\u0003\u0002\u0002\u0002[\\\b\n\u0002",
    "\u0002\\\u0014\u0003\u0002\u0002\u0002\f\u00024:<CFKRTY\u0003\b\u0002",
    "\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class FoodDescriptionLexer extends antlr4.Lexer {

    static grammarFileName = "FoodDescription.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'cup'", "'cups'", "'small'", "'medium'", 
                         "'large'" ];
	static symbolicNames = [ null, null, null, null, null, null, "STRING", 
                          "DECIMAL", "WS" ];
	static ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", "STRING", 
                      "DIGIT", "DECIMAL", "WS" ];

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
FoodDescriptionLexer.T__3 = 4;
FoodDescriptionLexer.T__4 = 5;
FoodDescriptionLexer.STRING = 6;
FoodDescriptionLexer.DECIMAL = 7;
FoodDescriptionLexer.WS = 8;



