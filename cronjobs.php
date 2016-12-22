<?php

/* SCRIPT FOR VERIFYING EXECUTION OF CRONJOBS ~ TEBEL.SG */

$result = ""; date_default_timezone_set('Asia/Singapore'); // use following per job to check if job log file is updated
if (date('Y-m-d') !== date('Y-m-d',filemtime("/full_path_on_your_server/weather.log"))) $result = $result . "Weather_API, ";

if ($result == "")
	echo "All jobs ran today" . "\n"; // do not take any further action
else
{
	$result = substr($result, 0, strlen($result) - 2);
	echo $result . " didn't run today. ";
	$_GET['OUTPUT'] = "TEXT";
	$_GET['SENDTO'] = "your_email@gmail.com"; $_GET['SENDFROM'] = "Your Name <your_email@gmail.com>";
	$_GET['SUBJECT'] = "CronJobs Alert"; $_GET['MESSAGE'] = $result . " didn't run today.";
	sendmail_service();
}

/* SENDMAIL SERVICE */
function sendmail_service() { // call mailer REST API to send email
        ob_start(); include('/full_path_on_your_server/mailer.php');
        $php_result = ob_get_contents(); ob_end_clean(); echo $php_result;
}

?>
