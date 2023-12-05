//前端
$(() => {
  $.ajax({
    type: "post",
    url: "api/dynamic",
    dataType: "json",
    success: function (e) {
        //获取回显区域
        console.log(e);
        if(e==false){
            return
        }
            let $show = $('#show');
        let num=0.2
        $show.html("")
        for(let i = 0 ; i <e.length ; i++){
            $show.append(`
            <div class="text wow passight" data-wow-duration="${1+num}s">
                <img src="../../public/images/lunbo/${e[i].img}" alt="" class="left">
                <h4>${e[i].title}</h4>
                <p>发布日期：${e[i].time} 分类：全部资讯 店铺动态 </p>
                <span>${e[i].content}</span>
            </div>
            `)
            num+=0.2
        }
            // $show.innerHTML=`
            // <div class="text wow passight" data-wow-duration="1s">
            //     <img src="../../public/images/conter小.webp" alt="" class="left">
            //     <h4>我能力有限啊</h4>
            //     <p>发布日期：2020.09.01 分类：全部资讯 店铺动态 </p>
            //     <span>老板：你的白色底太暗了，再亮一点</span>
            // </div>
            // <div class="text wow passight" data-wow-duration="1.2s">
            //     <img src="../../public/images/conter小.webp" alt="" class="left">
            //     <h4>我能力有限啊</h4>
            //     <p>发布日期：2020.09.01 分类：全部资讯 店铺动态 </p>
            //     <span>老板：你的白色底太暗了，再亮一点</span>
            // </div>
            // `
        
    },
  });
     //赞助商
    $.ajax({
        type:'post',
        url:'api/friendlink',
        dataType:'json',
        success:function(e){
            //获取显示区域
            let show = document.querySelector('.friendlink .conter ');
            if(e.length!=0){
                show.innerHTML='';
            }
            if(e.length<8){
                 show.style.justifyContent= "space-evenly"
            }else{
                show.style.justifyContent="space-between"
            }
            for(let i = 0 ; i < e.length ;  i++){
                show.innerHTML+=`
                <img src = '../../public/images/friendlink/${e[i].img}'>
                `
            }
        },
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
});
