// Generated from /Users/lawrencezeng/Projects/diet-diary/antlr4/food-description/FoodDescription.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import FoodDescriptionListener from './FoodDescriptionListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\n \u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0003\u0002",
    "\u0005\u0002\u000f\n\u0002\u0003\u0003\u0003\u0003\u0007\u0003\u0013",
    "\n\u0003\f\u0003\u000e\u0003\u0016\u000b\u0003\u0003\u0004\u0003\u0004",
    "\u0005\u0004\u001a\n\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0002\u0002\u0007\u0002\u0004\u0006\b\n\u0002\u0003",
    "\u0003\u0002\u0003\u0007\u0002\u001d\u0002\f\u0003\u0002\u0002\u0002",
    "\u0004\u0010\u0003\u0002\u0002\u0002\u0006\u0017\u0003\u0002\u0002\u0002",
    "\b\u001b\u0003\u0002\u0002\u0002\n\u001d\u0003\u0002\u0002\u0002\f\u000e",
    "\u0005\u0004\u0003\u0002\r\u000f\u0005\u0006\u0004\u0002\u000e\r\u0003",
    "\u0002\u0002\u0002\u000e\u000f\u0003\u0002\u0002\u0002\u000f\u0003\u0003",
    "\u0002\u0002\u0002\u0010\u0014\u0007\b\u0002\u0002\u0011\u0013\u0007",
    "\b\u0002\u0002\u0012\u0011\u0003\u0002\u0002\u0002\u0013\u0016\u0003",
    "\u0002\u0002\u0002\u0014\u0012\u0003\u0002\u0002\u0002\u0014\u0015\u0003",
    "\u0002\u0002\u0002\u0015\u0005\u0003\u0002\u0002\u0002\u0016\u0014\u0003",
    "\u0002\u0002\u0002\u0017\u0019\u0005\b\u0005\u0002\u0018\u001a\u0005",
    "\n\u0006\u0002\u0019\u0018\u0003\u0002\u0002\u0002\u0019\u001a\u0003",
    "\u0002\u0002\u0002\u001a\u0007\u0003\u0002\u0002\u0002\u001b\u001c\u0007",
    "\t\u0002\u0002\u001c\t\u0003\u0002\u0002\u0002\u001d\u001e\t\u0002\u0002",
    "\u0002\u001e\u000b\u0003\u0002\u0002\u0002\u0005\u000e\u0014\u0019"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class FoodDescriptionParser extends antlr4.Parser {

    static grammarFileName = "FoodDescription.g4";
    static literalNames = [ null, "'cup'", "'cups'", "'small'", "'medium'", 
                            "'large'" ];
    static symbolicNames = [ null, null, null, null, null, null, "STRING", 
                             "DECIMAL", "WS" ];
    static ruleNames = [ "foodDescription", "foodName", "measurement", "quantity", 
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
	        if(_la===FoodDescriptionParser.DECIMAL) {
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 21;
	        this.quantity();
	        this.state = 23;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << FoodDescriptionParser.T__0) | (1 << FoodDescriptionParser.T__1) | (1 << FoodDescriptionParser.T__2) | (1 << FoodDescriptionParser.T__3) | (1 << FoodDescriptionParser.T__4))) !== 0)) {
	            this.state = 22;
	            this.unit();
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



	quantity() {
	    let localctx = new QuantityContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, FoodDescriptionParser.RULE_quantity);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 25;
	        this.match(FoodDescriptionParser.DECIMAL);
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 27;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << FoodDescriptionParser.T__0) | (1 << FoodDescriptionParser.T__1) | (1 << FoodDescriptionParser.T__2) | (1 << FoodDescriptionParser.T__3) | (1 << FoodDescriptionParser.T__4))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
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


}

FoodDescriptionParser.EOF = antlr4.Token.EOF;
FoodDescriptionParser.T__0 = 1;
FoodDescriptionParser.T__1 = 2;
FoodDescriptionParser.T__2 = 3;
FoodDescriptionParser.T__3 = 4;
FoodDescriptionParser.T__4 = 5;
FoodDescriptionParser.STRING = 6;
FoodDescriptionParser.DECIMAL = 7;
FoodDescriptionParser.WS = 8;

FoodDescriptionParser.RULE_foodDescription = 0;
FoodDescriptionParser.RULE_foodName = 1;
FoodDescriptionParser.RULE_measurement = 2;
FoodDescriptionParser.RULE_quantity = 3;
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

	quantity() {
	    return this.getTypedRuleContext(QuantityContext,0);
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



class QuantityContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FoodDescriptionParser.RULE_quantity;
    }

	DECIMAL() {
	    return this.getToken(FoodDescriptionParser.DECIMAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.enterQuantity(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FoodDescriptionListener ) {
	        listener.exitQuantity(this);
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
FoodDescriptionParser.QuantityContext = QuantityContext; 
FoodDescriptionParser.UnitContext = UnitContext; 
