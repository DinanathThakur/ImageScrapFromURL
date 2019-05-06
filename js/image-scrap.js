var system = require('system'), args = system.args, page = new WebPage();

page.onResourceRequested = function (requestData, request) {
    if ((/http:\/\/.+?\.css|js/gi).test(requestData['url'])
            || requestData.headers['Content-Type'] === 'text/css'
            || requestData.headers['Content-Type'] === 'text/javascript') {
        request.abort();
    }
};
page.onError = function (msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }
};
//page.onLoadFinished = function () {
////    window.setTimeout(function () {
//    var urls = page.evaluate(function () {
//        var image_urls = new Array;
//        var images = document.getElementsByTagName("img");
//        for (q = 0; q < images.length; q++) {
//            for (var i = 0, atts = images[q].attributes, n = atts.length, arr = []; i < n; i++) {
//                if ((/\.(jpg|png|gif|bmp|jpeg)/gi).test(atts[i].nodeValue)) {
//                    image_urls.push({src: atts[i].nodeValue, alt: images[q].alt});
//                }
//            }
//            image_urls.push({src: images[q].src, alt: images[q].alt});
//        }
//        return image_urls;
//    });
//    console.log(JSON.stringify(urls));
//    page.close();
//    phantom.exit();
////    }, 100);
//};
//page.open(args[1]);

page.open(args[1], function () {
    var urls = page.evaluate(function () {
        var image_urls = new Array;
        var images = document.getElementsByTagName("img");
        for (q = 0; q < images.length; q++) {
            for (var i = 0, atts = images[q].attributes, n = atts.length, arr = []; i < n; i++) {
                if ((/\.(jpg|png|gif|bmp|jpeg)/gi).test(atts[i].nodeValue)) {
                    image_urls.push({src: atts[i].nodeValue, alt: images[q].alt});
                }
            }
            image_urls.push({src: images[q].src, alt: images[q].alt});
        }
        return image_urls;
    });
    console.log(JSON.stringify(urls));
    page.close();
    phantom.exit();
});