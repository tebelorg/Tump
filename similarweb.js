/* SCRIPT FOR RETRIEVING SIMILARWEB INFO ~ TEBEL.SG */

var casper = require('casper').create({
	verbose: false,
	logLevel: 'debug',
	waitTimeout: 30000,
     	viewportSize: {
        	width: 1366,
        	height: 768
 	},
	pageSettings: {
     		"loadImages": true,
      		"loadPlugins": true,         
		"localToRemoteUrlAccessEnabled": false,
      		"webSecurityEnabled": true,
 	     	"ignoreSslErrors": false
//            	"userAgent": 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10'
    	}
});

var x = require('casper').selectXPath;
var sStatistics = '';

casper.start('https://www.similarweb.com/website/' + casper.cli.raw.get(0).toString(), function() {
//      this.echo(this.getHTML());
	this.echo(this.getTitle());
});

casper.waitForSelector(x('(//*[contains(@class,"rankingItem-value js-countable")])[3]'), function() {
//      this.echo(this.getHTML());
	var sGlobalRank = this.fetchText(x('(//*[contains(@class,"rankingItem-value js-countable")])[1]')).trim().replace(/,/g,"").replace("#","");
	var sCountryRank = this.fetchText(x('(//*[contains(@class,"rankingItem-value js-countable")])[2]')).trim().replace(/,/g,"").replace("#","");
	var sCategoryRank = this.fetchText(x('(//*[contains(@class,"rankingItem-value js-countable")])[3]')).trim().replace(/,/g,"").replace("#","");
	sStatistics = casper.cli.raw.get(0).toString() + ',' + sGlobalRank + ',' + sCountryRank + ',' + sCategoryRank;
});

casper.waitForSelector(x('(//*[contains(@class,"engagementInfo-value")])[4]'), function() {
//      this.echo(this.getHTML());
        this.capture('similarweb.png');
	var sVisits = this.fetchText(x('(//*[contains(@class,"engagementInfo-value")])[1]')).trim().replace(",","");
	var sDuration = this.fetchText(x('(//*[contains(@class,"engagementInfo-value")])[2]')).trim().replace(",","");
	var sPages = this.fetchText(x('(//*[contains(@class,"engagementInfo-value")])[3]')).trim().replace(",","");
	var sBounce = this.fetchText(x('(//*[contains(@class,"engagementInfo-value")])[4]')).trim().replace(",","");
	sStatistics += ',' + sVisits + ',' + sDuration + ',' + sPages + ',' + sBounce;
	sStatistics += ',' + 'https://www.similarweb.com/website/' + casper.cli.raw.get(0).toString();	

        this.echo(sStatistics);
        var fs = require('fs'); fs.write('similarweb.csv', sStatistics + "\n", 'a');
});

casper.run();
