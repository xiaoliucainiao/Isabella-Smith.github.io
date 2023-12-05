//前端
//图片回显
// let imgName
// let $file = $('.addwin input[type=file]')
// let $img = $('.addwin img')
// $file.change(function (event) {
//     // let $file = $(event.target.files[0]);
//     // imgName =$(event.target.files[0].name);
//     let file = $('.addwin input[type=file]').val();
//   let pos = file.lastIndexOf('\\');
//   let filename = file.substring(pos + 1);

//       $img.prop('src',`../../public/images/picture/${filename}`);
//       //  sort=hex_md5(e.target.result)

//   });
let imgName;
let file = $('.addwin input[type=file]');
let img = $('.addwin img');
file.on('change', function(event) {
  let file = event.target.files[0];
  imgName = event.target.files[0].name;
  let reader = new FileReader();
  reader.onload = function(e) {
    img.attr('src', e.target.result);
    // sort=hex_md5(e.target.result)
  };
  reader.readAsDataURL(file);
});

function lunboData(){
    let name =$('.mask input[type=text]').eq(0).val();
    let money =$('.mask input[type=text]').eq(1).val();
    let Type =$('.mask select').eq(0).val();
    let place =$('.mask select').eq(1).val();
    //判断数据
    if(img.src==''|| money=='' ){
        alert('请输入对应数据')
        return
    }
    if(place==''||Type==''){
        alert('请先添加地址')
        return
    }
    //整合传递数据
    json={
        img:imgName,
        name:name,
        money:money,
        TypeID:Type,
        placeID:place,
    };
    $.ajax({
        type:'post',
        url:'api/Shop',
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
  //地区商品分类下拉框回显
     //获取回显区域
     let type = document.querySelectorAll('.addwin form select')[0]
     let place = document.querySelectorAll('.addwin form select')[1]
     $.ajax({
         type:'post',
         url:'api/showShop',
         dataType:'json',
         success:function(e){
            //e[0]地区  //e[1]分类
            //e[0]地区
            for(let i = 0 ; i < e[0].length ; i++){
                place.innerHTML+=`
            <option value='${e[0][i].placeID}'>${e[0][i].place}</option>
            `
            }
            //分类
            for(let j = 0 ; j < e[1].length ; j++){
                type.innerHTML+=`
            <option value='${e[1][j].TypeID}'>${e[1][j].Type}</option>
            `
            }
         },
     })
     //数据回显
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
              field:'id',
              title:'<input type="checkbox" id="check">',
              align:'center',
              formatter:function (value, row, index) {
                return '<input type="checkbox" value="'+row.id+'"  class="ck" onclick="fun()">';
            },
          }
          ,{
              field:'img',
              formatter:function (value, row, index) {
                return '<img src="../../public/images/picture/'+row.img+'">';
            },
              title:'商品图片',
              align:'center',
      },{
          field:'placeID',
          title:'地区',
          align:'center',
          formatter:function (value, row, index) {
            return `${places(row.placeID)}`;
        },
      }
      ,{
        field:'TypeID',
        title:'分类',
        align:'center',
        formatter:function (value, row, index) {
          return  `${tpe(row.TypeID)}`;
      },
      },{
        field:'name',
        title:'商品名称',
        align:'center',
    },{
      field:'money',
      title:'商品价格',
      align:'center',
      },
      {   field:'id',
        align:'center',
          title: '操作',
          formatter:function(value,row,index){
            return [
              `<button onclick=dele(${row.id}) class="btn btn-danger">删除</button>`+
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
}
//单独删除
function dele(e){
  console.log(e);
    $.ajax({
        type:'post',
        url:'api/dele',
        data:JSON.stringify(e) ,
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
  $('#myModalT').modal('show');
    $("#modifys").attr("data-bs-target","#myModalT");
    let imgName
    let file = $('.maskTwo .addwin input[type=file]')[0];
    let img = $('.maskTwo .addwin img')[0];
    let name = $('.maskTwo input[type=text]')[0]
    let money = $('.maskTwo input[type=text]')[1]
    img.src=`../../public/images/picture/${e.img}`;
    name.value=e.name
    money.value=e.money
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
       
        let title = document.querySelectorAll('.maskTwo input[type=text]')[0].value
        if(title==''||title===undefined){
            alert('请输入对应数据');
            return
        }
         //整合数据
      json={
        name:name.value,
        img:imgName,
        money:money.value,
        placeID:e.placeID,
        TypeID:e.TypeID,
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
//多选
function fun(){
  //定义空数组存储id
  $('#check').prop('checked',$('.ck:checked').length==$('.ck').length);
}