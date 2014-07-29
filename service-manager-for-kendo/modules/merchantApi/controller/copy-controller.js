framework.angular.controllers.controller("merchantApiCopyCtrl",function($scope,merchantApiRES){
    merchantApiRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(projects) {
        $scope.project = projects.model;
        $scope.$broadcast("allproject",$scope.project);
    });

    $scope.save = function(invalid) {
        if(invalid){
            alert('错误信息：必填信息不能为空,请检查表单项!');
            return;
        }
        var tab_scope = angular.element("#portlet_tab2").scope();
        var _serviceDefinitionIds=new Array();
        $.each( tab_scope.serviceDefinitionVo, function(i,n){
            _serviceDefinitionIds.push(n.id);
        });
        $scope.project.serviceDefinitionIds=_serviceDefinitionIds;
        merchantApiRES.save({'method':"add"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('温馨提示：操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败'+project.respDesc);
            }
        }, function (err) {
            alert('服务器端返回错误，提交失败');
        });
    };
})
.controller("tab2Ctrl",function($scope,serviceRES){
    $scope.$on("allproject",function(event,data){
        var allServiceDefinitionVos=new Array();//所有的数据
        var serviceDefinitionIds=new Array();
        if(data.serviceDefinitionVo!=null)
        {
            serviceDefinitionIds = data.serviceDefinitionVo;
            $scope.serviceDefinitionVo = data.serviceDefinitionVo;
        }
        //刷新1
        var reload = function(_allServiceDefinitionVos){

            $.each(serviceDefinitionIds, function(i,n){
                var id=serviceDefinitionIds[i].id;
                for(var j=0;j<_allServiceDefinitionVos.length;j++)
                {
                    var allsid =_allServiceDefinitionVos[j].id;
                    if(id==allsid)
                    {
                        _allServiceDefinitionVos.splice(j,1);
                        return;
                    }
                }
            });
            var dropDataAdapter = new $.jqx.dataAdapter({localdata: _allServiceDefinitionVos ,datatype: "array"});
            var paginginformation = $(".gridselect").jqxGrid('getpaginginformation');
            $(".gridselect").jqxGrid('gotopage', paginginformation.pagenum);
            $(".gridselect").jqxGrid('databind', dropDataAdapter);
        };
        //刷新2
        var reload2 = function(_serviceDefinitionIds){
            $scope.serviceDefinitionVo=_serviceDefinitionIds;
            var dropDataAdapter2 = new $.jqx.dataAdapter({localdata: _serviceDefinitionIds,datatype: "array"});
            var paginginformation = $(".gridselected").jqxGrid('getpaginginformation');
            $(".gridselected").jqxGrid('gotopage', paginginformation.pagenum);
            $(".gridselected").jqxGrid('databind', dropDataAdapter2);
        };

        //多选框列
        var  selectItems=function(row, column, value){
            var htmlitem="<input type='checkbox' value='"+value+"' name='gridcheckbox' style='margin-left:6px'\>";
            return htmlitem;
        }

        //全选事件
        var select_all=function(){
            $("input[type=checkbox][name='gridcheckbox']").attr("checked","checked");
        }
        //反选事件
        var select_un =function(){
            $("input[type=checkbox][name='gridcheckbox']").each(function(){
                if($(this).attr("checked")=="checked"){
                    $(this).attr("checked",false);
                }
                else{
                    $(this).attr("checked","checked");
                }
            });
        }
        //多选框列2
        var selectItems2=function(row, column, value){
            var htmlitem2="<input type='checkbox' value='"+value+"' name='gridcheckbox2' style='margin-left:6px'\>";
            return htmlitem2;
        }
        //全选事件2
        var select_all2=function(){

            $("input[type=checkbox][name='gridcheckbox2']").attr("checked","checked");
        }
        //反选事件2
        var select_un2 =function(){
            $("input[type=checkbox][name='gridcheckbox2']").each(function(){
                if($(this).attr("checked")=="checked"){
                    $(this).attr("checked",false);
                }
                else{
                    $(this).attr("checked","checked");
                }
            });
        }

        //选择事件
        var bt_copy = function(){
            if($(":checked[name='gridcheckbox']").length <=0){
                alert('选择待选择的行');
            }
            $(":checked[name='gridcheckbox']").each(function(){
                var id= $(this).val();
                $.each( allServiceDefinitionVos, function(i,n){
                    if(n &&n.id==id)
                    {
                        //增加serviceDefinitionIds元素
                        serviceDefinitionIds.push(n);
                        //删除allServiceDefinitionVos元素
                        allServiceDefinitionVos.splice(i,1);
                        return;
                    }
                });
            });
            reload(allServiceDefinitionVos);
            reload2(serviceDefinitionIds);
        };
        //删除已选择的2
        var bt_de = function(){
            if($(":checked[name='gridcheckbox2']").length <=0){
                alert('选择删除的行');
            }
            $(":checked[name='gridcheckbox2']").each(function(){
                var id= $(this).val();
                $.each( serviceDefinitionIds, function(i,n){
                    if(n && n.id==id){
                        //增加allServiceDefinitionVos元素
                        allServiceDefinitionVos.push(n);
                        //删除serviceDefinitionIds元素
                        serviceDefinitionIds.splice(i,1);
                        return;
                    }
                });
            });
            reload(allServiceDefinitionVos);
            reload2(serviceDefinitionIds);
        };
        //异步调用数据
        var getarry=function(url){
            $.ajax({
                type: "Get",
                contentType: "application/json",
                url: url, //调用WebService的地址和方法名称组合 ---- WsURL/方法名
                data: "{}",
                dataType: 'json',   //WebService 会返回Json类型

                success: function(result) {     //回调函数，result，返回值
                    allServiceDefinitionVos = result.models;
                    reload(result.models);
                }
            });
        };
        var url = framework.getFinalURL('service/info.do','api/merchantApi_service_list.json');
        var sourceurl=url+"?method=list&";
        getarry(sourceurl);

        var grid1_source ={localdata:allServiceDefinitionVos,datatype: "array"};
        var dropDataAdapter = new $.jqx.dataAdapter(grid1_source);
        var gridselect =  $(".gridselect").jqxGrid({
            width: "100%",
            height:350,
            autoheight:false,
            source: dropDataAdapter,
            theme:"bootstrap",
            filterable:true,
            sortable: true,
            pagesize:10 ,
            pagesizeoptions: ['10', '20'] ,
            pageable:true,
            showstatusbar:true
            ,renderstatusbar: function (statusbar) {        //底部状态栏的按钮显示与事件处理
                var container = $("#tabCtrl-statusbar").tmpl();    //按钮的容器
                $(".J_bt_cp",container).click(function(){ bt_copy()});
                $(".J_select_all",container).click(function(){ select_all()});//全选
                $(".J_select_un",container).click(function(){ select_un()});//反选
                statusbar.append(container);
            }
            ,
            showtoolbar: true,
            toolbarheight:40,
            rendertoolbar: function (toolbar) {
                var search_fun = function(event){
                    sourceurl =url+"?method=list&"+$(".J_toolbar :input", toolbar).serialize();
                    getarry(sourceurl);
                };
                var html = $('#tabCtrl-toolbar').tmpl();
                toolbar.append(html);

                $(".J_bt_search",html).click(function(event){
                    search_fun(event);
                });
                $(".J_search",html).keydown(function(event){
                    if (event.keyCode == 13) {
                        search_fun(event);
                    }
                });
            }
            ,
            columns: [
                { text: '选择', datafield: 'id', width: "10%",align:'center',cellsrenderer:selectItems,filterable:false,sortable: false},
                { text: '类别', datafield: 'category', width:'30%'},
                { text: '方法', datafield: 'methodName', width:'30%' },
                { text: '版本', datafield: 'methodVersion' , width:'30%' }
            ]
        });
        var dropDataAdapter2 = new $.jqx.dataAdapter({localdata: serviceDefinitionIds ,datatype: "array"});
        $(".gridselected").jqxGrid({
            width: "100%",
            height:350,
            autoheight:false,
            source: dropDataAdapter2,
            theme: "bootstrap",
            sortable: false,
            pagesize:10 ,
            pagesizeoptions: ['10', '20'] ,
            pageable:true,
            showstatusbar:true
            ,renderstatusbar: function (statusbar) {        //底部状态栏的按钮显示与事件处理
                var container = $("#tab2Ctrl-statusbar").tmpl();    //按钮的容器
                $(".J_bt_de",container).click(function(){ bt_de()});
                $(".J_select_all",container).click(function(){ select_all2()});//全选
                $(".J_select_un",container).click(function(){ select_un2()});//反选
                statusbar.append(container);
            },
            columns: [
                { text: '选择', datafield: 'id', width: "10%",align:'center',cellsrenderer:selectItems2},
                { text: '类别', datafield: 'category', width:'30%'},
                { text: '方法', datafield: 'methodName', width:'30%' },
                { text: '版本', datafield: 'methodVersion' , width:'30%' }
            ]
        });
    });
});