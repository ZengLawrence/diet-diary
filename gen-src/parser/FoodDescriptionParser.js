// Generated from /Users/lawrencezeng/Projects/diet-diary/antlr4/food-description/FoodDescription.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import FoodDescriptionListener from './FoodDescriptionListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0006\"\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0003\u0002",
    "\u0005\u0002\u000f\n\u0002\u0003\u0003\u0003\u0003\u0007\u0003\u0013",
    "\n\u0003\f\u0003\u000e\u0003\u0016\u000b\u0003\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0005\u0006\u0005\u001c\n\u0005\r\u0005\u000e\u0005",
    "\u001d\u0003\u0006\u0003\u0006\u0003\u0006\u0002\u0002\u0007\u0002\u0004",
    "\u0006\b\n\u0002\u0002\u0002\u001f\u0002\f\u0003\u0002\u0002\u0002\u0004",
    "\u0010\u0003\u0002\u0002\u0002\u0006\u0017\u0003\u0002\u0002\u0002\b",
    "\u001b\u0003\u0002\u0002\u0002\n\u001f\u0003\u0002\u0002\u0002\f\u000e",
    "\u0005\u0004\u0003\u0002\r\u000f\u0005\u0006\u0004\u0002\u000e\r\u0003",
    "\u0002\u0002\u0002\u000e\u000f\u0003\u0002\u0002\u0002\u000f\u0003\u0003",
    "\u0002\u0002\u0002\u0010\u0014\u0007\u0004\u0002\u0002\u0011\u0013\u0007",
    "\u0004\u0002\u0002\u0012\u0011\u0003\u0002\u0002\u0002\u0013\u0016\u0003",
    "\u0002\u0002\u0002\u0014\u0012\u0003\u0002\u0002\u0002\u0014\u0015\u0003",
    "\u0002\u0002\u0002\u0015\u0005\u0003\u0002\u0002\u0002\u0016\u0014\u0003",
    "\u0002\u0002\u0002\u0017\u0018\u0005\b\u0005\u0002\u0018\u0019\u0005",
    "\n\u0006\u0002\u0019\u0007\u0003\u0002\u0002\u0002\u001a\u001c\u0007",
    "\u0005\u0002\u0002\u001b\u001a\u0003\u0002\u0002\u0002\u001c\u001d\u0003",
    "\u0002\u0002\u0002\u001d\u001b\u0003\u0002\u0002\u0002\u001d\u001e\u0003",
    "\u0002\u0002\u0002\u001e\t\u0003\u0002\u0002\u0002\u001f \u0007\u0003",
    "\u0002\u0002 \u000b\u0003\u0002\u0002\u0002\u0005\u000e\u0014\u001d"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class FoodDescriptionParser extends antlr4.Parser {

    static grammarFileName = "FoodDescription.g4";
    static literalNames = [ null, "'cup'" ];
    static symbolicNames = [ null, null, "STRING", "DIGIT", "WS" ];
    static ruleNames = [ "foodDescription", "foodName", "measurement", "number", 
                         "unit" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = FoodDescriptionParser.ruleNames;
        this.literalNames = FoodDescriptionParser.literalNames;
        this.symbolicNames = FoodDescriptionParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	foodDescription() {
	    let localctx = new FoodDescriptionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, FoodDescriptionParser.RULE_foodDescription);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 10;
	        this.foodName();
	        this.state = 12;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===FoodDescriptionParser.DIGIT) {
	            this.state = 11;
	            this.measurement();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	foodName() {
	    let localctx = new FoodNameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, FoodDescriptionParser.RULE_foodName);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 14;
	        this.match(FoodDescriptionParser.STRING);
	        this.state = 18;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===FoodDescriptionParser.STRING) {
	            this.state = 15;
	            this.match(FoodDescriptionParser.STRING);
	            this.state = 20;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	measurement() {
	    let localctx = new MeasurementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, FoodDescriptionParser.RULE_measurement);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 21;
	        this.number();
	        this.state = 22;
	        this.unit();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	number() {
	    let localctx = new NumberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, FoodDescriptionParser.RULE_number);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 25; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 24;
	            this.match(FoodDescriptionParser.DIGIT);
	            this.state = 27; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===FoodDescriptionParser.DIGIT);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	unit() {
	    let localctx = new UnitContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, FoodDescriptionParser.RULE_unit);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 29;
	        this.match(FoodDescriptionParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

FoodDescriptionParser.EOF = antlr4.Token.EOF;
FoodDescriptionParser.T__0 = 1;
FoodDescriptionParser.STRING = 2;
FoodDescriptionParser.DIGIT = 3;
FoodDescriptionParser.WS = 4;

FoodDescriptionParser.RULE_foodDescription = 0;
FoodDescriptionParser.RULE_foodName = 1;
FoodDescriptionParser.RULE_measurement = 2;
FoodDescriptionParser.RULE_number = 3;
FoodDescriptionParser.RULE_unit = 4;

class FoodDescriptionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FoodDescriptionParser.RULE_foodDescription;
    }

	foodName() {
	    return this.getTypedRuleContext(FoodNameContext,0);
	};

	measurement() {
	    return this.getTypedRuleContext(MeasurementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.enterFoodDescription(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.exitFoodDescription(this);
		}
	}


}



class FoodNameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FoodDescriptionParser.RULE_foodName;
    }

	STRING = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(FoodDescriptionParser.STRING);
	    } else {
	        return this.getToken(FoodDescriptionParser.STRING, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.enterFoodName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.exitFoodName(this);
		}
	}


}



class MeasurementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FoodDescriptionParser.RULE_measurement;
    }

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	unit() {
	    return this.getTypedRuleContext(UnitContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.enterMeasurement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.exitMeasurement(this);
		}
	}


}



class NumberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FoodDescriptionParser.RULE_number;
    }

	DIGIT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(FoodDescriptionParser.DIGIT);
	    } else {
	        return this.getToken(FoodDescriptionParser.DIGIT, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.exitNumber(this);
		}
	}


}



class UnitContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FoodDescriptionParser.RULE_unit;
    }


	enterRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.enterUnit(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.exitUnit(this);
		}
	}


}




FoodDescriptionParser.FoodDescriptionContext = FoodDescriptionContext; 
FoodDescriptionParser.FoodNameContext = FoodNameContext; 
FoodDescriptionParser.MeasurementContext = MeasurementContext; 
FoodDescriptionParser.NumberContext = NumberContext; 
FoodDescriptionParser.UnitContext = UnitContext; 
