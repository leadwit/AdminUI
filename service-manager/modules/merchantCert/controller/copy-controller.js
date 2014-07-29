(function($) {
    var ngmod = angular.module("framework.controllers", ["framework.merchantCertService"]);

    ngmod.controller("merchantCertCopyCtrl",function($scope,merchantCertRES){

        merchantCertRES.get({
            method:"detail",
            id : $.query.get("id")
        }, function(detailPproject) {
            $scope.project = detailPproject.model;
            $scope.project.isModifyPrivKey="0";
            project.aliveTime
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
            }
            $scope.project.fileUrl=$("#fileUrl").val();
            $scope.project.fileName=$("#fileName").val();

            merchantCertRES.save({'method':"add"},$scope.project, function(project) {
                if(project.respCode=="00"){
                    alert('操作成功');
                    location.href="list.shtml";
                }else {
                    alert('操作失败'+project.respDesc);
                }
            });
        };
        //单击商户选择时，控制上传控件显示
        $scope.Upload_ClickCertType=function(){

            if($("#certType_mer").attr("checked")=="checked")
            {
                $("#td_upload").show();
                $(".J_pubKeyValue").show();
                $(".J_aliveTime").show();
                $(".J_destoryTime").show();

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