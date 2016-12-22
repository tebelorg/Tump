/* SCRIPT FOR RETRIEVING URL LIST INFO ~ TEBEL.SG */

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

casper.start('http://www.startofhappiness.com/personal-development-blogs/', function() {
//      this.echo(this.getHTML());
	this.echo(this.getTitle());
});

casper.waitForSelector(x('(//*[@id="tablepress-pdblogs-2016"]//*[@class="column-2"]//a)[100]'), function() {
//      this.echo(this.getHTML());
        this.capture('scraplist.png');
	var sURL = ''; var fs = require('fs');

        for (i = 1; i <=100; i++) {
		sURL = this.getElementAttribute(x('(//*[@id="tablepress-pdblogs-2016"]//*[@class="column-2"]//a)[' + i + ']'),'href');
		if (sURL.charAt(sURL.length-1) == '/') sURL = sURL.substr(0,sURL.length-1);
		this.echo(sURL); fs.write('scraplist.csv', sURL + "\n", 'a');
	}
});

casper.run();
