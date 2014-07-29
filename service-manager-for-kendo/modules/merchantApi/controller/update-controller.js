framework.angular.controllers.controller("merchantApiUpdateCtrl",function($scope,$rootScope,merchantApiRES){
    merchantApiRES.get({
        method:"detail",
        id : $.query.get("id")
    }, function(projects) {
        $scope.project = projects.model;
        $scope.$broadcast("allproject",$scope.project);
        $rootScope.loading = false;      //返回数据，关闭显示loading
    });

    $scope.save = function(invalid) {
        if(invalid){
            alert('错误信息：必填信息不能为空,请检查表单项!');
            return;
        }
        $rootScope.loading = true;      //提交按钮时，设置显示loading
        var tab_scope = angular.element("#portlet_tab2").scope();
        var _serviceDefinitionIds=new Array();
        $.each( tab_scope.serviceDefinitionVo, function(i,n){
            _serviceDefinitionIds.push(n.id);
        });
        $scope.project.serviceDefinitionIds=_serviceDefinitionIds;
//        console.log("tab_scope.serviceDefinitionVo",tab_scope.serviceDefinitionVo);
//        console.log("$scope.project.serviceDefinitionIds",$scope.project.serviceDefinitionIds);
//        console.log("serviceDefinitionIds数量",$scope.project.serviceDefinitionIds.length);
//        console.log("serviceDefinitionIds",$scope.project.serviceDefinitionIds);
        merchantApiRES.save({'method':"update"},$scope.project, function(project) {
            if(project.respCode=="00"){
                alert('温馨提示：操作成功');
                location.href="list.shtml";
            }else {
                alert('操作失败'+project.respDesc);
            }
            $rootScope.loading = false;      //返回数据，关闭显示loading
        }, function (err) {
            alert('服务器端返回错误，提交失败');
            $rootScope.loading = false;      //返回数据，关闭显示loading
        });
    };
})
.controller("gridCtrl",function($scope){
    $scope.$on("allproject",function(event,data){
        var allServiceDefinitionVos=new Array();//所有的数据
        var serviceDefinitionIds=new Array();
        if(data.serviceDefinitionVo!=null)
        {
            serviceDefinitionIds = data.serviceDefinitionVo;
            $scope.serviceDefinitionVo = data.serviceDefinitionVo;
        }


           //刷新
        var reload = function(){
            var gridright= $(".gridselected");
            var rows = gridright.jqxGrid('getrows');
            serviceDefinitionIds = rows;
            $scope.serviceDefinitionVo=rows;
//            console.log("serviceDefinitionIds",serviceDefinitionIds.length);
        };
        //选择事件
        $scope.bt_copy = function(){
            var gridleft= $(".gridselect");
            var gridright= $(".gridselected");
            var _rowindexes = gridleft.jqxGrid('getselectedrowindexes');
            var  rows=[];
            var  rowsdate=[];
            if(_rowindexes.length>0)
            {
                for(var i=0;i<_rowindexes.length;i++)
                {
                    var details = gridleft.jqxGrid('getrowdata',_rowindexes[i]);
                    var id = gridleft.jqxGrid('getrowid', _rowindexes[i]);
                    //判断该项是否已经被选择过
                    if(details.category!=null)
                    {
                        var rowdata={id:"",category:"",methodName:"",methodVersion:""};
                        rowdata.id=details.id;
                        rowdata.category=details.category;
                        rowdata.methodName=details.methodName;
                        rowdata.methodVersion=details.methodVersion;
                        rows.push(details);
                        rowsdate.push(rowdata);
                    }
                }

                //右边Grid添加数据
                gridright.jqxGrid('beginupdate');
                if(rowsdate.length>0)
                {
                    gridright.jqxGrid('addrow', null, rowsdate);
                    reload();
                }
                gridright.jqxGrid('endupdate');

                //左边Grid清除数据
                gridleft.jqxGrid('beginupdate');
                for(var i=0;i<rows.length;i++)
                {
                    //把已经被选中的数据除了id字段，都清除掉！
                    rows[i].category=null;
                    rows[i].methodName=null;
                    rows[i].methodVersion=null;
                    gridleft.jqxGrid('updaterow',rows[i].uid,rows[i]);
                }
                gridleft.jqxGrid('endupdate');
                gridleft.jqxGrid('clearselection');
            }
            else
            {
                alert("您没有选择添加的接口！");
            }
        };
        //删除已选择的2
        $scope.bt_de = function(){
            var gridleft= $(".gridselect");
            var gridright= $(".gridselected");
            var _rowindexes = gridright.jqxGrid('getselectedrowindexes');
            var  rowsdate=[];
            var rowid=[];
            if(_rowindexes.length>0)
            {
                gridright.jqxGrid('beginupdate');
                for(var i=0;i<_rowindexes.length;i++)
                {
                    var details = gridright.jqxGrid('getrowdata',_rowindexes[i]);
                    var id = gridright.jqxGrid('getrowid', _rowindexes[i]);
                    rowsdate.push(details);
                    rowid.push(id);
                }
                //删除Grid2被选中的行
                gridright.jqxGrid('deleterow', rowid);
                gridright.jqxGrid('endupdate');
                gridright.jqxGrid('clearselection');


                //把被选中的数据插入到已选的Grid1列表
//              gridleft.jqxGrid('addrow', null, rowsdate);
                gridleft.jqxGrid('beginupdate');
                var rows = gridleft.jqxGrid('getrows');
                for(var i=0;i<rowsdate.length;i++)
                {
                     var id=rowsdate[i].id;
                     $.each(rows, function(j){
                         if(!rows[j]){
                             return;
                         }
                         if(id == rows[j].id&&rows[j].category==null){
                             rows[j].category=rowsdate[i].category;
                             rows[j].methodName=rowsdate[i].methodName;
                             rows[j].methodVersion=rowsdate[i].methodVersion;
                             gridleft.jqxGrid('updaterow',rows[j].uid,rows[j]);
                         }

                     });

                }
                gridleft.jqxGrid('endupdate');

                reload();
            }
            else
            {
                alert("您没有选择要删除的接口！");
            }

        };


        var clearLeftGrid = function(obj,target_obj){
            var rows = obj.jqxGrid('getrows');
            var target_rows = target_obj.jqxGrid('getrows');
            obj.jqxGrid('beginupdate');
            if(rows.length>target_rows.length)
            {
            	$.each(rows, function(i){
             	   if(!rows[i]){
     	              return;
     	           }
     	           var id = rows[i].id;
     	           $.each(target_rows, function(j){
     	//              console.log(id,target_rows[j].id);
     	              if(id == target_rows[j].id){
     	                  //删除左边grid指定的行
     	            	  var rowid = obj.jqxGrid('getrowid', i);
                          rows[i].category=null;
                          rows[i].methodName=null;
                          rows[i].methodVersion=null;
                          obj.jqxGrid('updaterow',rowid,rows[i]);
                          return;
     	              }
     	          });
     	        });
            }
            else
        	{
            	$.each(target_rows, function(i){
              	   if(!target_rows[i]){
      	              return;
      	           }
      	           var id = target_rows[i].id;
      	           $.each(rows, function(j){
      	        	 if(!rows[j]){
         	              return;
         	           }
      	              if(id == rows[j].id){
      	                  //删除左边grid指定的行
      	            	  var rowid = obj.jqxGrid('getrowid', j);
                          rows[j].category=null;
                          rows[j].methodName=null;
                          rows[j].methodVersion=null;

      	                  obj.jqxGrid('updaterow',rowid,rows[j]);
                          return;
      	              }
      	          });
      	        });
        	}
            obj.jqxGrid('endupdate');
            obj.jqxGrid('clearselection')
//           console.log("rowids11111",rowids);
//           obj.jqxGrid('deleterow',rowids);

        }

        //左边Grid功能-------------------------------
        var totalrecords=0;
        var url = framework.getFinalURL('service/info.do?method=list','api/merchantApi_service_list.json');
        var leftgrid_dataAdapter = {
            datatype: "json",
            url: url,
            sortcolumn: 'id',
            sortdirection: 'desc',
            cache: false,
            datafields:[
                { name: 'id', type: 'int'},
                { name: 'category', type: 'string'},
                { name: 'methodName', type: 'string'},
                { name: 'methodVersion', type: 'string'}
            ],
            beforeprocessing: function (data) {
                if(data!=null)
                {
                    leftgrid_dataAdapter.totalrecords = data.totalRows;
                    totalrecords=data.totalRows;
                }else{
                    leftgrid_dataAdapter.totalrecords = 0;
                }
            }
        };

        var leftgrid_source = new $.jqx.dataAdapter(leftgrid_dataAdapter);
        $(".gridselect").jqxGrid({
            width: "100%",
            autoheight:true,
            source: leftgrid_source,
            theme:"bootstrap",
            filterable:true,
            sortable: true,
            pagesize:15 ,
            pagesizeoptions:[10,15,30],
            pageable:true,
            selectionmode:"multiplerowsextended",
            columnsresize: true,
            altrows: true,
            virtualmode: true,
            rendergridrows: function (args) {
                 return args.data;
            },
            showtoolbar: true,
            toolbarheight:40,
            rendertoolbar: function (toolbar) {
                var search_fun = function(event){
                	leftgrid_dataAdapter.url =url+"&"+$(".J_toolbar :input", toolbar).serialize();
                	$(".gridselect").jqxGrid('databind', leftgrid_dataAdapter);
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
            },
            columns: [
                { text: '主键ID', datafield: 'id', width:'10%'},
                { text: '类别', datafield: 'category', width:'30%'},
                { text: '方法', datafield: 'methodName', width:'30%' },
                { text: '版本', datafield: 'methodVersion' , width:'30%' }
            ]
        });
        $(".gridselect").on("bindingcomplete", function (event) {
//            console.log('bindingcomplete');
            clearLeftGrid($(".gridselect"),$(".gridselected"));
        });
        //左边Grid功能  END-------------------------------

        var dropDataAdapter2 = new $.jqx.dataAdapter({
            localdata: serviceDefinitionIds ,
            datafields:[
            { name: 'id', type: 'int'},
            { name: 'category', type: 'string'},
            { name: 'methodName', type: 'string'},
            { name: 'methodVersion', type: 'string'}
        ],datatype: "array"});
        $(".gridselected").jqxGrid({
            width: "100%",
            autoheight:true,
            source: dropDataAdapter2,
            theme: "bootstrap",
            sortable: true,
            selectionmode:"multiplerowsextended",
            pagesize:15 ,
            pagesizeoptions:[10,15,30],
            pageable:true,
            columns: [
                { text: '主键ID', datafield: 'id', width:'10%'},
                { text: '类别', datafield: 'category', width:'30%'},
                { text: '方法', datafield: 'methodName', width:'30%' },
                { text: '版本', datafield: 'methodVersion' , width:'30%' }
            ]
        });
    });
});
