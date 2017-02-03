/* System Z Prototype 1.8 - 8th Mar 2009
developed by Ken Soh using AmiBroker Formula Language (AFL)
original file extension .afl (renamed .js for syntax highlighting) */

DisplayMode = 1; // 0 - free, 1 - display, 2 - trading, 3 - raw
Candlestick = 1; // 0 - line mode, 1 - candlestick mode

/* BEGIN - OPTIONS Module */
// system z options
UseMACD = 1; UseStoch = 1; UseCole = 1; AdvancingStop = 1;

// system z parameters
NoiseLevel = 0.10; MajorEMA = 26; MACDFast = 4; MACDSlow = 8; MACDSignal = 4; StochEMA = 44;

// visualisation options
ShowTrend = 1; ShowSignals = 1; TrailingStop = 1; MovingAverages = 0; AutoChannel = 0; NDayHighLow = 0;

if (Displaymode == 1)
{ShowTrend = 1; ShowSignals = 0; TrailingStop = 0; MovingAverages = 0; AutoChannel = 0; NDayHighLow = 0;}
else if (Displaymode == 2)
{ShowTrend = 0; ShowSignals = 1; TrailingStop = 1; MovingAverages = 1; AutoChannel = 0; NDayHighLow = 0;}
else if (Displaymode == 3)
{ShowTrend = 0; ShowSignals = 0; TrailingStop = 0; MovingAverages = 0; AutoChannel = 0; NDayHighLow = 0;}

// obsolete - buy override short signal is better
OverrideShort = 1; ShortNoise = 0.06; 
/* END - OPTIONS Module */


/* BEGIN - COLE Module - developed by Roger Cole
Buy Signal  - when a stock makes three Rally Days in a row with larger Volume on each Day
Sell Signal - when a stock makes three Reaction Days in a row with larger Volume on each Day */
// session classification
RY  = H >  Ref(H, -1) AND L >= Ref(L, -1); // Rally Day
RX  = H <= Ref(H, -1) AND L <  Ref(L, -1); // Reaction Day
IN  = H <= Ref(H, -1) AND L >= Ref(L, -1); // Ignore Inside Day
OUT = H >  Ref(H, -1) AND L <  Ref(L, -1); // Ignore Outside Day
// add volume information
VolRY = Ref(V, - BarsSince(RY)); VolRX = Ref(V, - BarsSince(RX));
RYwithVol  = RY  AND V > IIf(RY, Ref(VolRY, -1), VolRY);  // Rally Day with Volume
RXwithVol  = RX  AND V > IIf(RX, Ref(VolRX, -1), VolRX);  // Reaction Day with Volume
// output - ColeDay/ColeVolume
PeriodRY = BarsSince(NOT RY); PeriodRX = BarsSince(NOT RX);
ColeDay  = ValueWhen(RX OR RY, Sum(RY, PeriodRY) - Sum(RX, PeriodRX));
PeriodV    = BarsSince(V < Ref(V, -1) AND (RX OR RY));
ColeVolume = ValueWhen(RX OR RY, Sum (RX+RY, PeriodV) +1);
/* END - COLE Module - developed by Roger Cole */


/* BEGIN - SHORT Module */
// short on macd crossing if price below major ema 
MACDShort = Cross(Signal(MACDFast, MACDSlow, MACDSignal), MACD(MACDFast, MACDSlow))
          AND Close < EMA(Close, MajorEMA);

// short on stochastic crossing lower if price below major ema
StochShort = Cross(StochD(),StochK()) AND (Close < EMA(Close, StochEMA))
             AND ((ValueWhen(Cross(StochD(),StochK()),StochK(),1))
               < (ValueWhen(Cross(StochD(),StochK()),StochK(),2)));

// short on selldown four days with increased volume (ignoring inside days)
ColeShort = ColeDay <= -4  AND ColeVolume >= 4;

// sell on short signals (macd, stochastic, cole)
Short = (UseMACD AND MACDShort) OR (UseStoch AND StochShort) OR (UseCole AND ColeShort);

// non-retracing trailing stop initialisation
ShortStop[0] = (1 + ShortNoise) * Close[0];
ShortStop[BarCount - 1] = (1 + ShortNoise) * Close[BarCount - 1];

// stop based on negation of latest entry price
for( i = 1; i < BarCount; i++) 
	{
		if (Short[i])
			ShortStop[i] = Min(ShortStop[i-1], (1 + ShortNoise) * Close[i]);
		else
			ShortStop[i] = ShortStop[i-1];

		Cover[i] = Close[i] > ShortStop[i];
		if (Short[i]) Cover[i] = False;

		j = i - 1;
		if (Short[i])
			{while ((Cover[j] == False AND Short[j] == False) AND j>0) {j--;}
			if (Cover[j]) ShortStop[i] = (1 + ShortNoise) * Close[i]; }
	}

// retracing trailing stop based on latest entry price
if (!AdvancingStop)
	{ShortStop = (1 + ShortNoise) * ValueWhen(Short, Close);
	Cover = Close > ShortStop; }
/* END - SHORT Module */


/* BEGIN - LONG Module */
// long on macd crossing if price above major ema
MACDBuy = Cross(MACD(MACDFast, MACDSlow), Signal(MACDFast, MACDSlow, MACDSignal))
          AND Close > EMA(Close, MajorEMA);

// long on stochastic crossing higher if price above major ema
StochBuy = Cross(StochK(),StochD()) AND (Close > EMA(Close, StochEMA))
           AND ((ValueWhen(Cross(StochK(),StochD()),StochK(),1))
             > (ValueWhen(Cross(StochK(),StochD()),StochK(),2)));

// long on rallying four days with increased volume (ignoring inside days)
ColeBuy = ColeDay >= 4  AND ColeVolume >= 4;

// buy on long signals (macd, stochastic, cole)
Buy = (UseMACD AND MACDBuy) OR (UseStoch AND StochBuy) OR (UseCole AND ColeBuy);

// non-retracing trailing stop initialisation
Stop[0] = (1 - NoiseLevel) * Close[0];
Stop[BarCount - 1] = (1 - NoiseLevel) * Close[BarCount - 1];

// stop based on negation of latest entry price
for( i = 1; i < BarCount; i++) 
	{
		// ignore buy signal if short position still open
		if (OverrideShort == 0)
			if (Buy[i])
				{
				j = i - 1;
				while ((Short[j] == False AND Cover[j] == False) AND j>0) {j--;}
				if (Short[j]) Buy[i] = False; }

		if (Buy[i])
			Stop[i] = Max(Stop[i-1], (1 - NoiseLevel) * Close[i]);
		else
			Stop[i] = Stop[i-1];

		Sell[i] = Close[i] < Stop[i];
		if (Buy[i]) Sell[i] = False;

		j = i - 1;
		if (Buy[i])
			{while ((Sell[j] == False AND Buy[j] == False) AND j>0) {j--;}
			if (Sell[j]) Stop[i] = (1 - NoiseLevel) * Close[i]; }
	}

// retracing trailing stop based on latest entry price
if (!AdvancingStop)
	{Stop = (1 - NoiseLevel) * ValueWhen(Buy, Close);
	Sell = Close < Stop; }
/* END - LONG Module */


/* BEGIN - OTHERS Module */
// position size 100% of capital
SetPositionSize(100, spsPercentOfEquity);

// ignore short signal if long position still open
for( i = 1; i < BarCount; i++) 
{
	j = i - 1;
	if (Short[i])
		{while ((Sell[j] == False AND Buy[j] == False) AND j>0) {j--;}
		if (Buy[j]) Short[i] = False; }
}

// set cover to buy signal, reduce whipsaw in shorts
if (OverrideShort == 1) Cover = Buy; //Short = Sell;

// remove extra signals
Buy = ExRem(Buy, Sell); 
Sell = ExRem(Sell, Buy); 
Short = ExRem(Short, Cover); 
Cover = ExRem(Cover, Short);

// execute trade next morning after signal
SetTradeDelays(1, 1, 1, 1);
BuyPrice = Open; SellPrice = Open; ShortPrice = Open; CoverPrice = Open;

// show buy and sell signals on chart
if (ShowSignals == 1) {
//shape = Buy * shapeUpArrow + Sell * shapeDownArrow;
//shape = Short * shapeSmallDownTriangle + Cover * shapeSmallUpTriangle;
longShapes = Buy * shapeUpArrow + Sell * shapeDownArrow;
PlotShapes(longShapes, IIf(Buy, colorBrightGreen, colorRed ), 0, IIf(Buy, Low, High )); 
shortShapes = Short * shapeHollowDownArrow + Cover * shapeHollowUpArrow;
PlotShapes(shortShapes, IIf(Cover, colorBrightGreen, colorRed ), 0, IIf(Cover, Low, High )); }

// show current trend for visualisation
if (Buy[0]) CandleColor[0] = ColorRGB(100, 240, 100); // green color
else if (Cover[0]) CandleColor[0] = ColorRGB(100, 136, 186); // blue color
if (Short[0]) CandleColor[0] = ColorRGB(240, 100, 100); // red color
else if (Sell[0]) CandleColor[0] = ColorRGB(100, 136, 186); // blue color
for( i = 1; i < BarCount; i++) 
	{ 	j = i;
		while ((Sell[j] == False AND Buy[j] == False AND
				Short[j] == False AND Cover[j] == False) AND j>0) {j--;}
		if (Buy[j]) CandleColor[i] = ColorRGB(100, 240, 100);
		else if (Cover[j]) CandleColor[i] = ColorRGB(100, 136, 186);
		if (Short[j]) CandleColor[i] = ColorRGB(240, 100, 100);
		else if (Sell[j]) CandleColor[i] = ColorRGB(100, 136, 186); }
if (ShowTrend == 1) 
Plot(Close, "Close", CandleColor, IIf(Candlestick, 64, 4)); 
else Plot(Close, "Close", ColorRGB(50, 50, 50), IIf(Candlestick, 64, 4)); 

// trailing stop for visualisation
if (TrailingStop == 1) {
Plot(Stop, "Stop", colorOrange,  32); }

// moving averages for visualisation
if (MovingAverages == 1) {
Plot(EMA(C, MACDFast),StrFormat(NumToStr(MACDFast, 1) + "EMA"), colorRed, 1);
Plot(EMA(C, MACDSlow),StrFormat(NumToStr(MACDSlow, 1) + "EMA"), ColorRGB(250, 152, 152), 1);
Plot(EMA(C, 13),"13EMA", ColorRGB(250,210,210),1);
Plot(EMA(C, MajorEMA),StrFormat(NumToStr(MajorEMA, 1) + "EMA"), colorBlue, 1);
Plot(EMA(C, (StochEMA + MajorEMA)/2-1),StrFormat(NumToStr((StochEMA + MajorEMA)/2-1, 1) + "EMA"),  ColorRGB(160, 160, 255), 1);
Plot(EMA(C, StochEMA),StrFormat(NumToStr(StochEMA, 1) + "EMA"), ColorRGB(220, 220, 252), 1); }

// autochannel for visualisation
if (AutoChannel == 1) {
R = EMA (C, 16) + 1.618 * ATR(16);
S = EMA (C, 16) - 1.618 * ATR(16);
Plot(R, "R", colorLightGrey, 32);
Plot(S, "S", colorLightGrey, 32); }

// n-day highs/lows for visualisation
if (NDayHighLow == 1) {
nHigh = HHV(High, MajorEMA);
nLow = LLV(Low, MajorEMA);
Plot(nHigh, StrFormat(NumToStr(MajorEMA, 1) + "-High"), colorBlack, 32);
Plot(nLow, StrFormat(NumToStr(MajorEMA, 1) + "-Low"), colorBlack, 32); }
/* END - OTHERS Module */

/* BEGIN - Strategy Information
System Z Strategy (trend-following system)
Buy on long impulse with cutloss stop at 10%
Raise stop on next entry signal if its higher

Short System Strategy
If not long, short on sell impulse 
Cover when system give buy signal

Long Impulse Conditions
1. MACD (4,8,4) crossing with price above 26EMA OR
2. Stochastic (14,3,3) higher crossing with price above 44EMA OR
3. Rallying four straight days with increasing volume (inside days ignored)
   END - Strategy Information */

/* BEGIN - Revision Information
	prototype 1.8 - long/short system
	prototype 1.7 - user & trader mode 
	prototype 1.6 - finalise buy signals
	prototype 1.5 - negation trailing stop
	prototype 1.4 - inc cole breakout signal
	prototype 1.3 - port system to short-term
	prototype 1.2 - finetune system parameters
	prototype 1.1 - entry strategy & basic exit
   END - Revision Information */