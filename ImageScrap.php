<?php

class ImageScrap
{
    private $downloadedImageFolder = 'DownloadedImage';
    private $downloadFolder;

    public function __construct()
    {
        $this->downloadFolder = getcwd() . DIRECTORY_SEPARATOR . $this->downloadedImageFolder;
    }

    public function getImages($url)
    {
        $this->downloadFolder .= DIRECTORY_SEPARATOR . parse_url($url)['host'];

        $images = json_decode($this->getPageDetails($url)['data'], true);

        if (!empty($images)) {
            foreach ($images as $index => $image) {
                if ($src = $image['src'] ?? false) {
                    $parsedURL = parse_url($src);
                    $pathInfo = pathinfo($parsedURL['path']);
                    $destinationFolder = $this->downloadFolder . DIRECTORY_SEPARATOR . $pathInfo['dirname'];
                    $filePath = $destinationFolder . DIRECTORY_SEPARATOR . $pathInfo['basename'];

                    if (!is_dir($destinationFolder)) {
                        mkdir($destinationFolder, 0777, true);
                    }

                    file_put_contents($filePath, file_get_contents($src));
                }

            }
        }
        return $images;
    }

    public function getPageDetails($url)
    {
        exec('phantomjs  /js/image-scrap.js ' . $url . '  2>&1', $outPut, $error);
        if (!$error) {
            $result['data'] = $outPut[0];
            $result['status'] = 'success';
            $result['msg'] = '';
        } else {
            $result['data'] = null;
            $result['status'] = 'error';
            $result['msg'] = $outPut;
        }
        return $result;
    }

}
