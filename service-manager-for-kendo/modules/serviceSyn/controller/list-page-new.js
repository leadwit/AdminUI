framework.angular.controllers.controller("pageCtrl",function($scope,$rootScope,uploadRES){
    $rootScope.loading = false;
    //重置
    $scope.resetting = function() {
        $("#fileName").val("");
        location.reload();
    }
    //提交
    $scope.save = function() {
        var fileName=$("#fileName").val();
        if(fileName!=null&&fileName!="")
        {
            $rootScope.loading = true;     //打开loading提示
            uploadRES.save({'fileName':fileName,'impDataType':"S"},{'fileName':fileName,'impDataType':"S"},function(project) {
                if(project.respCode=="00"){
                    alert('温馨提示：导入操作成功');
                    location.href="list.shtml";
                }else {
                    alert('导入操作失败'+project.respDesc);
                }
                $rootScope.loading = false;     //关闭loading提示
            }, function (err) {
                alert('服务器端返回错误，提交失败');
                $rootScope.loading = false;     //关闭loading提示
            });
        }else{
            alert('提交失败，您还没有选择导入的文件！');
        }
    }

});