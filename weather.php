<?php

/* SCRIPT FOR EXTRACTING WEATHER FORECAST INFO ~ TEBEL.SG */

//GET WEATHER DATA FROM DATA.GOV.SG API
$sgweather = get_data('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast');

//echo $sgweather . "\n";
$forecast = get_value($sgweather,'forecast',"\"");
$forecast = str_replace(array("(",")"),"",$forecast);
$temp_high = get_child_value($sgweather,'temperature','high',",");
$temp_low = get_child_value($sgweather,'temperature','low',"}");

//output results for use if required data can be found
if ($forecast != 'NA' && $temp_high != 'NA' && $temp_low != 'NA')
{
	$sgweather = '24h Forecast - ' . $forecast . ' (' . $temp_low . '-' . $temp_high . '°C)'; 
	$weatherfile = fopen("weather.txt",'w');
	fwrite($weatherfile, $sgweather); fclose($weatherfile);
        echo $sgweather . "\n";
}

/* GET DATA FROM URL */
function get_data($url) {
        $ch = curl_init();
        $timeout = 30;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $headers = array("Cache-Control: no-cache","Pragma: no-cache","api-key: REGISTER FOR KEY AT https://data.gov.sg");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);

        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
}

/* GET VALUE FROM JSON */
function get_value($content,$key,$end) {
        $start_pos = strpos($content,$key);
        if (!$start_pos) return "NA"; //return Not Available if not found
	$start_pos = $start_pos + strlen($key) + 3;
        $temp_result = substr($content,$start_pos);
	$end_pos = strpos($temp_result,$end);
        return substr($temp_result,0,$end_pos);
}

/* GET CHILD VALUE FROM JSON */
function get_child_value($content,$key,$child,$end) {
        $start_pos = strpos($content,$key);
        if (!$start_pos) return "NA"; //return Not Available if not found
        $start_pos = $start_pos + strlen($key) + 3;
        $temp_result = "START_OF_CHILD_BODY:" . substr($content,$start_pos);

        $start_pos = strpos($temp_result,$child);
        if (!$start_pos) return "NA"; //return Not Available if not found
	$start_pos = $start_pos + strlen($child) + 2;
	$temp_result = substr($temp_result,$start_pos);
        $end_pos = strpos($temp_result,$end);
        return substr($temp_result,0,$end_pos);
}

?>
