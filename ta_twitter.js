/* OUTPUT CASPERJS SCRIPT FOR TA.GUI FRAMEWORK ~ TEBEL.SG */

// casperjs (phantomjs) browser settings
var x = require('casper').selectXPath;
var casper = require('casper').create({
verbose: false, logLevel: 'debug',
waitTimeout: 10000,
viewportSize: {width: 1366, height: 768},
pageSettings: {loadImages: true, loadPlugins: true,
localToRemoteUrlAccessEnabled: false, webSecurityEnabled: true, ignoreSslErrors: false}});

// assign parameters to p1-p9 variables
var p1 = casper.cli.raw.get(0); var p2 = casper.cli.raw.get(1); var p3 = casper.cli.raw.get(2);
var p4 = casper.cli.raw.get(3); var p5 = casper.cli.raw.get(4); var p6 = casper.cli.raw.get(5);
var p7 = casper.cli.raw.get(6); var p8 = casper.cli.raw.get(7); var p9 = casper.cli.raw.get(8);

// save start time to measure execution time
var automation_start_time = Date.now(); casper.echo('\nSTART - automation started - ' + Date().toLocaleString());

// initialise other global variables
var save_text_count = 0; var snap_image_count = 0;

// for saving text information to file
function save_text(file_name,info_text) {
if (!file_name) {save_text_count++; file_name = 'text' + save_text_count.toString() + '.txt';}
var fs = require('fs'); fs.write(file_name, info_text, 'w');}

// for saving snapshots of website to file
function snap_image() {snap_image_count++; return ('image' + snap_image_count.toString() + '.png');}

// for adding synchronous suspend capability
function sleep(delay_in_ms) {var start_time = new Date().getTime();
for (var sleep_count = 0; sleep_count < 1e7; sleep_count++)
{if ((new Date().getTime() - start_time) > delay_in_ms) break;}}
 
// finding best match for given locator
function tx(locator) {
if (casper.exists(x(locator))) return x(locator);
if (casper.exists(x('//*[contains(@id,"'+locator+'")]'))) return x('//*[contains(@id,"'+locator+'")]');
if (casper.exists(x('//*[contains(@name,"'+locator+'")]'))) return x('//*[contains(@name,"'+locator+'")]');
if (casper.exists(x('//*[contains(@class,"'+locator+'")]'))) return x('//*[contains(@class,"'+locator+'")]');
if (casper.exists(x('//*[contains(@title,"'+locator+'")]'))) return x('//*[contains(@title,"'+locator+'")]');
if (casper.exists(x('//*[contains(text(),"'+locator+'")]'))) return x('//*[contains(text(),"'+locator+'")]');
else return x('/html');}

// checking if given locator is found
function check_tx(locator) {
if (casper.exists(x(locator))) return true;
if (casper.exists(x('//*[contains(@id,"'+locator+'")]'))) return true;
if (casper.exists(x('//*[contains(@name,"'+locator+'")]'))) return true;
if (casper.exists(x('//*[contains(@class,"'+locator+'")]'))) return true;
if (casper.exists(x('//*[contains(@title,"'+locator+'")]'))) return true;
if (casper.exists(x('//*[contains(text(),"'+locator+'")]'))) return true;
else return false;}

casper.start('https://twitter.com', function() {
this.echo('https://twitter.com' + ' - ' + this.getTitle() + '\n');});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
{this.echo('enter signin-email | user@gmail.com');
casper.waitFor(function check() {return check_tx('signin-email');},
function then() {this.sendKeys(tx('signin-email'),'user@gmail.com');},
function timeout() {this.echo('ERROR - cannot find signin-email').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
{this.echo('enter signin-password | 12345678');
casper.waitFor(function check() {return check_tx('signin-password');},
function then() {this.sendKeys(tx('signin-password'),'12345678');},
function timeout() {this.echo('ERROR - cannot find signin-password').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
{this.echo('click btn primary-btn flex-table-btn js-submit');
casper.waitFor(function check() {return check_tx('btn primary-btn flex-table-btn js-submit');},
function then() {this.click(tx('btn primary-btn flex-table-btn js-submit'));},
function timeout() {this.echo('ERROR - cannot find btn primary-btn flex-table-btn js-submit').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
{this.echo('click Icon Icon--dm Icon--large');
casper.waitFor(function check() {return check_tx('Icon Icon--dm Icon--large');},
function then() {this.click(tx('Icon Icon--dm Icon--large'));},
function timeout() {this.echo('ERROR - cannot find Icon Icon--dm Icon--large').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');
casper.waitFor(function check() {return check_tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]');},
function then() {this.click(tx('(//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]'));},
function timeout() {this.echo('ERROR - cannot find (//*[@class="DMInbox-conversationItem"]//*[@class="DMInboxItem-snippet "])[1]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');
casper.waitFor(function check() {return check_tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]');},
function then() {this.click(tx('//*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]'));},
function timeout() {this.echo('ERROR - cannot find //*[@class="DMActivity-toolbar"]//*[@class="Icon Icon--dots"]').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click Leave conversation');
casper.waitFor(function check() {return check_tx('Leave conversation');},
function then() {this.click(tx('Leave conversation'));},
function timeout() {this.echo('ERROR - cannot find Leave conversation').exit();});}});

casper.then(function() {
{this.echo('snap page');
this.capture(snap_image());}
this.echo('wait 500');});

casper.wait(500, function() {
{this.echo('click DMDeleteConversation-confirm caution-btn');
casper.waitFor(function check() {return check_tx('DMDeleteConversation-confirm caution-btn');},
function then() {this.click(tx('DMDeleteConversation-confirm caution-btn'));},
function timeout() {this.echo('ERROR - cannot find DMDeleteConversation-confirm caution-btn').exit();});}});

casper.then(function() {
this.echo('\n' + this.getCurrentUrl() + ' - ' + this.getTitle());
this.echo('FINISH - automation finished - ' + ((Date.now()-automation_start_time)/1000).toFixed(1) + 's\n');});

casper.run();
