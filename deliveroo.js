/* SCRIPT FOR RETRIEVING DELIVEROO FOOD OPTIONS ~ TEBEL.SG */

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

casper.start('https://deliveroo.com.sg/', function() {
//      this.echo(this.getHTML());
//	this.echo('LOGGING IN: ' +  this.getTitle());
});

casper.then(function() {
//      this.echo(this.getHTML());
	this.click(x('//*[@class="page-header--nav-link page-header--button"]'));
	this.sendKeys(x('//*[@id="email"]'), 'user@gmail.com');
	this.sendKeys(x('//*[@id="password"]'), '12345678');
	this.click(x('//*[@class="page-header-login--login"]'));
});

casper.waitForSelector(x('//*[@class="page-header--nav-link icon-user"]'), function() {
//      this.echo(this.getHTML());
	if (casper.cli.has(0))
		{this.sendKeys(x('//*[@name="postcode"]'), casper.cli.raw.get(0).toString());}
	else
		{this.sendKeys(x('//*[@name="postcode"]'), '608838');}
	this.click(x('//*[@id="find_food"]'));

casper.wait(10000, function() {	
	this.capture('deliveroo.png');
        var fs = require('fs'); fs.write('deliveroo.txt', '', 'w');

//	if block to handle 2 different Deliveroo GUIs showing up randomly
if (this.exists(x('//*[@id="restaurants-deliverycount"]/h1')))
{
	var sLocation = this.fetchText(x('//*[@id="restaurants-deliverycount"]/h1'));
        var sTime = this.fetchText(x('//*[@class="restaurants--controls"]//*[@id="delivery_time"]//*[@selected]'));
	
	if ((sLocation.length > 0) && (sTime.length > 0))
	{
		this.echo('Earliest delivery for ' + sLocation + ' is ' + sTime + '. Available:');
        	this.echo('');
		fs.write('deliveroo.txt', 'Earliest delivery for ' + sLocation + ' is ' + sTime + '. Available:\n\n', 'a');
	}

	for (i = 1; i <=15; i++) {
		if (!this.exists(x('(//*[@class="restaurant-name"])[' + i + ']'))) {break;}
		var sName = this.fetchText(x('(//*[@class="restaurant-name"])[' + i + ']')).trim();
		var sType = this.fetchText(x('(//*[@class="detail-cat"])[' + i + ']')).trim();
                sType = sType.toUpperCase().replace(" • NEW","");
		this.echo(sName + ' (' + sType + ')');
		fs.write('deliveroo.txt', sName + ' (' + sType + ')\n', 'a');
	}

	this.click(x('//*[@class="header-icon icon-account"]'));
	this.click(x('//*[@class="li-last"]'));
//	this.echo('LOGGED OUT.');
}
else
{
        var sLocation = this.fetchText(x('//*[@class="restaurant-index-page--title"]'));
        var sTime = this.fetchText(x('//*[@name="day"]//*[@selected]'));

        if ((sLocation.length > 0) && (sTime.length > 0))
        {
                this.echo('Earliest delivery for ' + sLocation + ' is ' + sTime + '. Available:');
                this.echo('');
                fs.write('deliveroo.txt', 'Earliest delivery for ' + sLocation + ' is ' + sTime + '. Available:\n\n', 'a');
     
        
        for (i = 1; i <=15; i++) {
                if (!this.exists(x('(//*[@class="restaurant-index-page-tile--name"])[' + i + ']'))) {break;}
                var sName = this.fetchText(x('(//*[@class="restaurant-index-page-tile--name"])[' + i + ']')).trim();
                var sType = this.fetchText(x('(//*[@class="restaurant-index-page-tile--tag"])[' + i + ']')).trim();
                sType = sType.toUpperCase().replace(" • NEW","");
                this.echo(sName + ' (' + sType + ')');
                fs.write('deliveroo.txt', sName + ' (' + sType + ')\n', 'a');      
        }

        this.click(x('//*[@class="page-header--nav-link icon-user"]'));
        this.click(x('//*[@class="page-header-dropdown--text link-button"]'));
//      this.echo('LOGGED OUT.');
}

});
});

casper.run();
