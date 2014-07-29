//核心类。系统公共代码封装
function datetime(){
/**
 *  Angular编译完成且页面显示完毕后的操作
 *  优化各种组件及其他操作
 */
    //优化各种组件
    var startDate = new Date();
    $('.form_datetime').datetimepicker({
        language:'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        startTime:startDate,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    $('.start_datetime').datetimepicker({
        language:'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startTime:startDate,
        minView: 0,
        maxView: 1,
        forceParse: 0,
        minuteStep: 5

    }) .on('changeDate', function(ev){
            startDate = $('.start_datetime').data('date');
            endDate = $('.end_datetime').data('date');
            $('.end_datetime').datetimepicker({
                language:'zh-CN',
                weekStart: 1,
                autoclose: 1,
                todayHighlight: 1,
                minView: 0,
                maxView: 1,
                startDate:startDate,
                minuteStep: 5
            });
        });

    $("input").change(function(){
        $(this).trigger("input");
    });

    //优化组件 End

};
var cms = new datetime();         //实例化核心类，便于其他地方调用