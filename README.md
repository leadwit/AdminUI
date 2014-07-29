# AdminUI
##AngularJS+KendoUI/jQWidgets+bootstrapUI+jQuery


# 特别注意！
>修改后台UI要修改.shtml文件
修改后，执行grunt ssi生成.html文件！
grunt watch监听文件修改自动运行grunt ssi

## gruntfile.js
用于将.shtml生成.html文件，主要是为了处理.shtml里的include指令。

#ChangeLog
### #20140728
>kendo-grid如下操作：
1 增加date-format操作
2 完善watch
3 完善LAB资源加载的wait事件
4 增加sort