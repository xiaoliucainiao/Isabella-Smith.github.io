//前端
//新增
function Data(){
    let $place = $('.addwin form input').eq(0).val()
    let $placeID = $('.mask .addwin form input').eq(1).val()
    //判断数据
    if($place==''||$placeID==''){
        alert('请输入对应数据')
        return
    }
    //整合传递数据
    json={
        place:$place,
        placeID:$placeID,
    };
    $.ajax({
        type:'post',
        url:'api/place',
        data:JSON.stringify(json),
        dataType:'json',
        success:function(e){
            if(e==false){
                alert('地区或ID重复')
                return
            }
            alert('添加成功');
            location.reload();
        },
    })
};
//回显

$(function() {
    $('table').bootstrapTable({
        url: 'api/show',         //请求后台的URL
        method: 'post',                      //请求方式
        dataType: "json",                    //返回格式
        striped: true,                       //是否显示行间隔色
        cache: false,                        //是否使用缓存，默认为true
        pagination: true,                    //是否显示分页（*）
        // sortable: true,                     //是否启用排序
        // sortOrder: "asc",                   //排序方式
        // queryParams: oTableInit.queryParams,//传递参数（*）
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                        //每页的记录行数（*）
        pageList: [5, 5, 15, 20],         //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索
        // strictSearch: true,
        // showColumns: true,                  //是否显示所有的列（选择显示的列）
        // showRefresh: true,                  //是否显示刷新按钮
        // minimumCountColumns: 2,             //最少允许的列数
        // clickToSelect: true,                //是否启用点击选中行
        // height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        // showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
        // cardView: false,                    //是否显示详细视图
        // detailView: false,                   //是否显示父子表
        toolbar: '#toolbar',                //工具按钮用哪个容器
        columns: [
            {
                formatter:function (value, row, index) {
                    return '<input type="checkbox" value="'+row.id+'"  class="ck" onclick="fun()">';
                },
                title:'<input type="checkbox" id="check">',
                align:'center',
            }
            ,{
                field:'place',
                title:'地区',
                align:'center',
        },{
            field:'placeID',
            title:'地区ID',
            align:'center',
        },
        {    align:'center',
             field:'id',
            title: '操作',
            formatter:function(value,row,index){
                return [
                    `<button onclick=dele(${value}) class="btn btn-danger">删除</button>`+
                    `<button onclick=modify(${JSON.stringify(row)},${value})  class="btn btn-info">修改</button>`
                ]
            }
        }
    ],
    })
    //全选
    $("#check").click( function () {
            $('.ck').prop('checked',this.checked)
    })
    //批量修改和删除
     batch();
    function batch() {
                //批量修改
                //获取按钮
                let $modifys = $("#modifys");
                //  点击事件
                $modifys.click( function () {
                    let $checkall = $('.ck')
                //遍历选框
                let sum = 0; //标记数据
                let index = 0; //多选框value值
                //判断多选个数
                for (let i = 0; i < $checkall.length; i++) {
                    if ($checkall[i].checked == true) {
                    index = $checkall[i].value;
                    sum++;
                    }
                }
                if (sum > 1) {
                    alert("请选择单个修改");
                    sum = 0;
                    return;
                }
                if (sum == 0) {
                    // alert('请选择数据')
                    return;
                }
                $(".maskTwo").css('display','block')
                $.ajax({
                    type: "post",
                    url: "/api/modifysAfter",
                    data: index,
                    dataType: "json",
                    success: function (responseData) {
                    modify(responseData[0], responseData[1]);
                    },
                });
                });
                //批量删除
                let $dele = $("#dele"); //获得删除
                $dele.click( function () {
                let $checkall = $('.ck')
                let arr = []; //存储id
                //遍历选框
                for (let i = 0; i < $checkall.length; i++) {
                    if ($checkall[i].checked == true) {
                    arr.push($checkall[i].value);
                    }
                }
                if (arr == "") {
                    return;
                }
                $.ajax({
                    type: "post",
                    url: "/api/deleAfter",
                    data: JSON.stringify(arr) ,
                    dataType: "json",
                    success: function () {
                    alert("删除成功");
                    window.location.reload();
                    },
                });
                });
    }
    //强制登录以及免密登录
    $.ajax({
        type: "post",
        url: "api/cookie",
        dataType: "JSON",
        data: JSON.stringify(),
        success: function (response) {
            if(response==false){
                alert('请登录')
                window.location.href="login.html"
            }
        }
    });
})
//单独删除
function dele(e){
    $.ajax({
        type:'post',
        url:'api/dele',
        data: JSON.stringify(e),
        dataType:'json',
        success:function(){
            alert('删除成功')
            location.reload();
            return
        },
    })
}
//单独修改
function modify(e,index){
    let $place = $('.maskTwo .addwin form input').eq(0)
    let $placeID = $('.maskTwo .addwin form input').eq(1)
    // $('.maskTwo').css('display','block')
    $('#myModalT').modal('show');
    $("#modifys").attr("data-bs-target","#myModalT");
    //回显
    $place.val(e.place)
    $placeID.val(e.placeID)
      //获得修改点击按钮
      $('#xiugai').click(()=>{
         //整合数据
      json={
        place:$place.val(),
        placeID:$placeID.val(),
        id:e.id,
      }
      console.log(json);
    $.ajax({
        type:'post',
        url:'api/modify',
        data:JSON.stringify([json,index]),
        dataType:'json',
        success:function(e){
            if(e==false){
                alert('地区或ID重复');
                return
            }
            alert('修改成功');
            location.reload()
        },
    })
  })
}
//多选
function fun(){
    //定义空数组存储id
    let arr = [];
    $('#check').prop('checked',$('.ck:checked').length==$('.ck').length);

    return
}