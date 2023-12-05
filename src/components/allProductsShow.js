//前端
// 获取回显区域
window.onload=()=>{
    //分类 和产地回显
    let ultype = $('#shopType')
    let ulplace = $('#shopPlace')
    $.ajax({
        type:'post',
        url:'api/sho',
        dataType:'json',
        success:function(e){
            if(e==false){
                return
            }
            //e[0]地区  e[1]分类
            ultype.html('')
            ulplace.html('')
            for(let i = 0 ; i < e[1].length ; i++){
                ultype.append(`
                <li onclick=fun(${e[1][i].TypeID})>${e[1][i].Type}</li>
                `)
            }
            for(let j = 0 ; j < e[0].length ; j++){
                ulplace.append(`
                <li onclick=chandi(${e[0][j].placeID})>${e[0][j].place}</li>
                `)
            }
        },
    })
    //商品回显
    let show = $('.commodityShow')
    $.ajax({
        type:'post',
        url:'api/show',
        dataType:'json',
        success:function(e){
            if(e==false){
                return
            }
            if(e.length<4){
                show.css('justifyContent','flex-start')
            }else{
                show.css('justifyContent','space-between')
            }
            show.html('')
            //遍历数据
            for(let i = 0 ; i<e.length ; i++){
                show.append(
                    `
                <div>
            <img src="../../public/images/picture/${e[i].img}" alt=""><br>
            <span>$${e[i].money}</span><br>
            <p>${e[i].name}</p>
            <span onclick =shop(${e[i].id}) style="cursor: pointer;">立即购买</span>
            </div>
            `
                )
            }
        }
    })
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
//商品点击回显 分类
function fun(e){
    $.ajax({
        type:'post',
        url:'api/sp',
        data:JSON.stringify(e) ,
        dataType:'json',
        success:function(e){
            //回显数据
            //获取回显区域
            let show = $('.commodityShow')
            if(e.length<4){
                show.css('justifyContent','flex-start')
            }else{
                show.css('justifyContent','space-between')
            }
            show.html('')
             for(let i = 0 ; i<e.length ; i++){
                show.append(`
                <div>
            <img src="../../public/images/picture/${e[i].img}" alt=""><br>
            <span>$${e[i].money}</span><br>
            <p>${e[i].name}</p>
            <span onclick =shop(${e[i].id}) style="cursor: pointer;">立即购买</span>
            </div>
            `)
            }
        },
    })
}
//产地
function chandi(e){
    $.ajax({
        type:'post',
        url:'api/spl',
        data:JSON.stringify(e) ,
        dataType:'json',
        success:function(e){
            //回显数据
            //获取回显区域
            let show = $('.commodityShow')
            if(e.length<4){
                show.css('justifyContent','flex-start')
            }else{
                show.css('justifyContent','space-between')
            }
            show.html(``)
             for(let i = 0 ; i < e.length ; i++){
                show.append(`
                <div>
            <img src="../../public/images/picture/${e[i].img}" alt=""><br>
            <span>$${e[i].money}</span><br>
            <p>${e[i].name}</p>
            <span onclick =shop(${e[i].id}) style="cursor: pointer;">立即购买</span>
            </div>
            `)
            }
        },
    })
}
//购物车添加
function shop(e){
    $.ajax({
        type:'post',
        url:'api/shop',
        data:JSON.stringify(e),
        dataType:'json',
        success:function(event){
            if(event==1){
                alert('购物车已有这个宝贝');
                return
            }
            alert('添加成功')
        },
    })
}
//查询
look()
function look(){
    //获取商品显示区域
    let $show = $('.commodityShow')
    // 获取按钮
    let $button = $('.container .top button ');
    //添加点击事件
    $button.click(function () {
        //获取输入框
    let $input = $('.container .top input').val()
    if($input==''){
        alert('请输入内容')
        return
    }
        $.ajax({
            type: "post",
            url: "api/looks",
            data: $input,
            dataType: "JSON",
            success: function (e) {
                if(e==false){
                    return
                }
               if(e==''||e==undefined){
                alert('查无果');
                return
               }
               //展示数据
                $show.html(`
                <div>
            <img src="../../public/images/picture/${e.img}" alt=""><br>
            <span>$${e.money}</span><br>
            <p>${e.name}</p>
            <span onclick =shop(${e.id}) style="cursor: pointer;">立即购买</span>
            </div>
            `)
            }
        });
    });
    
}