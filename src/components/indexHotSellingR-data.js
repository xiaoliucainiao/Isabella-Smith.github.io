//前端
//图片回显
let imgName
let file = document.querySelector('.addwin input[type=file]');
let img = document.querySelector('.addwin img')
file.addEventListener("change", function (event) {
    let file = event.target.files[0];
    imgName = event.target.files[0].name;
    let reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
      //  sort=hex_md5(e.target.result)
    };
    reader.readAsDataURL(file);
  });
//新增
function lunboData(){
    //判断数据
    if(img.src==''){
        alert('请输入对应数据')
        return
    }
    //整合传递数据
    json={
        img:imgName,
    };
    $.ajax({
        type:'post',
        url:'api/hotSellingR',
        data:JSON.stringify(json),
        dataType:'json',
        success:function(e){
            if(e==false){
                alert('图片名字重复')
                return
            }
            alert('添加成功');
            location.reload();
        },
    })
};
//回显
window.onload=()=>{
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
    //回显
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
                field:'img',
                title:'图片',
                align:'center',
                formatter:function(value,row,index){
                    return `<img src="../../public/images/lunbo/${row.img}">`
                }
        }
        ,
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




    
}
//单独删除
function dele(e){
    $.ajax({
        type:'post',
        url:'api/dele',
        data:JSON.stringify(e),
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
    let imgName
    let file = document.querySelector('.maskTwo .addwin input[type=file]');
    let img = document.querySelector('.maskTwo .addwin img');
    $('#myModalT').modal('show');
    $("#modifys").attr("data-bs-target","#myModalT");
    img.src=`../../public/images/lunbo/${e.img}`;
    //图片回显
    file.addEventListener("change", function (event) {
        let file = event.target.files[0];
        imgName = event.target.files[0].name;
        let reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target.result;
          //  sort=hex_md5(e.target.result)
        };
        reader.readAsDataURL(file);
      });
      if(imgName==''||imgName==undefined){
        imgName=e.img
      }
      //获得修改点击按钮
      $('#xiugai').click(()=>{
         //整合数据
      json={
        img:imgName,
        id:e.id,
      }
    $.ajax({
        type:'post',
        url:'api/modify',
        data:JSON.stringify([json,index]),
        dataType:'json',
        success:function(e){
            alert('修改成功');
            location.reload()
        },
    })
  })
}
function fun(){
    $('#check').prop('checked',$('.ck:checked').length==$('.ck').length);
    return
}