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
function uploademo(config){
    var error=config[0].error;
    if(error==null||error=="")
    {
        $("#td_upload").hide();
        var categoryList=config[0].apiVo.categoryList;
        var defineList=config[0].apiVo.defineList;
        var listInfoList=config[0].apiVo.listInfoList;
        var otherFieldList=config[0].apiVo.otherFieldList;
        var simpleFieldList=config[0].apiVo.simpleFieldList;
        var structureInfoList=config[0].apiVo.structureInfoList;
        var fileName=config[0].apiVo.name;
        if(fileName!=null||fileName!="")
        {
            $("#fileName").val(fileName);
        }
        //不需要嵌套
        if(categoryList.length>0)
        {
            $("#categoryList").show();
            $("#categoryList-Template").tmpl(categoryList).appendTo("#categoryList-table>tbody");
        }
        if(listInfoList.length>0)
        {
            $("#listInfoList").show();
            $("#listInfoList-Template").tmpl(listInfoList).appendTo("#listInfoList-table>tbody");
        }
        if(otherFieldList.length>0)
        {
            $("#otherFieldList").show();
            $("#otherFieldList-Template").tmpl(otherFieldList).appendTo("#otherFieldList-table>tbody");
        }
        if(simpleFieldList.length>0)
        {
            $("#simpleFieldList").show();
            $("#simpleFieldList-Template").tmpl(simpleFieldList).appendTo("#simpleFieldList-table>tbody");
        }

        //需要嵌套
        if(defineList.length>0)
        {
            $("#defineList").show();
            $("#defineList-Template").tmpl(defineList).appendTo("#defineList-table>tbody");
        }
        if(structureInfoList.length>0)
        {
            $("#structureInfoList").show();
            $("#structureInfoList-Template").tmpl(structureInfoList).appendTo("#structureInfoList-table>tbody");
        }
        try{
            uiCompile.resizeFrame();
        }catch(e){}
    }


};