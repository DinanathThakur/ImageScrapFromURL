<?php
if (!($url = $_GET['url'] ?? false)) {
    exit("Please pass url to fetch images");
}
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    exit('Invalid URL');
}

require_once 'ImageScrap.php';

$imageScrapObject = new ImageScrap();
$output = $imageScrapObject->getImages($url);

echo "<pre>";
print_r($output);
die('Test');