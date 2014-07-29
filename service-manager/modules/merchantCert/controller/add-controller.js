(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.merchantCertService"]);
    ngmod.controller("merchantCertAddCtrl",function($scope,merchantCertRES,merchantCertGRES){
        $scope.project = new Object();
        merchantCertGRES.get({
            method:"getClient"
        }, function(projects) {
            $scope.project=projects.model;
            $scope.project.status="1";
            $scope.project.certType="1";
        });

        $scope.save = function(invalid) {
            if(invalid){
                alert('错误信息：必填信息不能为空,请检查表单项!');
                return;
            }
            if($("#certType_sys").attr("checked")=="checked")
            {
                $("#td_upload").hide();
//                $(".J_pubKeyValue input").val();
//                $(".J_aliveTime input").val();
//                $(".J_destoryTime input").val();
            }else if($("#certType_mer").attr("checked")=="checked")
            {
                $(".J_isModifyPrivKey radio").val();
            }
            $scope.project.fileUrl=$("#fileUrl").val();
            $scope.project.fileName=$("#fileName").val();

            merchantCertRES.save({'method':"add"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    $.messager.alert('温馨提示','操作成功','success');
                    location.href="list.shtml";
                }else {
                    $.messager.alert('操作失败',project.respDesc,'error');
                }
            });
        };
        //单击商户选择时，控制上传控件显示
        $scope.Upload_ClickCertType=function(){
            $("#mainFrame").css('height','800');;
            if($("#certType_mer").attr("checked")=="checked")
            {
                $("#td_upload").show();
                $(".J_pubKeyValue").show();
                $(".J_aliveTime").show();
                $(".J_destoryTime").show();
                $(".J_isModifyPrivKey").hide();
            }
            else if($("#certType_sys").attr("checked")=="checked")
            {
                $("#td_upload").hide();
                $(".J_pubKeyValue").hide();
                $(".J_aliveTime").hide();
                $(".J_destoryTime").hide();
            }
        };
    });


})(jQuery);