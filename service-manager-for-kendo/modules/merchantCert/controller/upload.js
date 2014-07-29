function uploadCtrl(){
    var _cur=new Date();
    $LAB
        .script("upload/scripts/Default/jquery-ui-1.9.2.custom.min.js?t="+ _cur)
        .script("upload/scripts/Default/jquery.iframe-transport.js?t="+ _cur)
        .script("upload/scripts/Default/jquery.fileupload.js?t="+ _cur)
        .script("upload/scripts/Default/jquery.fileupload-ui.js?t="+ _cur)
        .script("upload/scripts/Default/application.js?t="+ _cur)
        .wait(function(){
//           console.log("upload相关JS加载成功");
//          $.getJSON($('#fileupload form').prop('action'), function (files) {
//                var fu = $('#fileupload').data('fileupload');
//                fu._adjustMaxNumberOfFiles(-files.length);
//                fu._renderDownload(files)
//                    .appendTo($('#fileupload .files'))
//                    .fadeIn(function () {
//                        // Fix for IE7 and lower:
//                        $(this).show();
//                    });
//            });

        });
};