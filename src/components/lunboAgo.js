window.onload=()=>{
    // 轮播图
    $.ajax({
        type:'post',
        url:'api/lunbos',
        data:null,
        dataType:'json',
        success:function(e){
            let images
            if(e==1){
                 images =["../../public/images/lunbo/lunbo-1.webp"]
            }else{
                images=e[0]
            }
        let slideshow = document.querySelector('.slideshow');
        let title = document.querySelector('.slideshow span');
        let a = document.querySelector('.slideshow  a');
        let index = -1;
        nextSlide()
        function nextSlide() {
          // 计算下一张图片的索引
          index = (index + 1) % images.length;
          // 设置下一张图片为背景图片
          slideshow.style.backgroundImage = `url(${images[index]})`;
          title.innerText=`${e[1][index]}`
          a.href=`${e[2][index]}`
          a.innerText=`${e[3][index]}`
          title.classList.add("show");
         // 移除show类名，重置标题文字透明度
         setTimeout(() => {
            title.classList.remove("show");// 添加show类名，触发标题文字淡入效果
        }, 2000);
        }
        // 设置定时器，每隔2秒切换一张图片
        setInterval(nextSlide, 3000);
        },
    })
    // 关于我们
    $.ajax({
        type:'post',
        url:'api/Our',
        dataType:'json',
        success:function(e){
            //获取对应的显示区域
            if(e==1){return}
            let imgs = document.querySelector('.aboutUs .img ')
            let h1 = document.querySelector('.aboutUs .text h1')
            let a = document.querySelector('.aboutUs .text a')
            let span = document.querySelector('.aboutUs .text span ')
            imgs.style.backgroundImage=`url(../../public/images/lunbo/${e[0].img})`
            h1.innerHTML=`${e[0].title}`
            span.innerHTML=`${e[0].content}`
            a.href=`${e[0].herf}`
        },
    })
    //热卖商品1 
    $.ajax({
        type:'post',
        url:'api/shopp',
        dataType:'json',
        success:function(e){
            //获取显示区域
         let show = document.querySelector('.data-show')
         if(e==false){
            return
         }
         show.innerHTML=''
         
         for(let i = 0 ; i < e.length ; i++){
            show.innerHTML+=`
            <div>
                <img src="../../public/images/picture/${e[i].img}" alt="">
                <p>${e[i].name}</p>
                <span>￥${e[i].money}</span>
            </div>
            `
            if(e.length<4){
                show.style.justifyContent='flex-start'
             }else{
                show.style.justifyContent='space-between'
             }
         }
        },
    })
    // 热卖商品2
     $.ajax({
        type:'post',
        url:'api/hotSelling',
        dataType:'json',
        success:function(e){
            //获取渲染区域
           let content= document.querySelector('.data-commodityBom .left')
           if(e.length==0){
            return 
           }
           if(e.length<2){
                content.innerHTML+=`
                <div class="text">
              <img src="../../public/images/lunbo/lunbo-2.webp" alt="" class="left">
              <div>
                	${e[0].title}<br>
                  <span>发布日期：${e[0].time}</span><br><br>
                  <p>${e[0].content}</p>
                </div>
                </div>
                <div class="text">
                <div class="img">

                </div>
                </div>
                `
                return
           }
            //遍历渲染
            for(let i = 0 ; i < e.length ; i++){
                content.innerHTML+=`
                <div class="text">
              <img src="../../public/images/lunbo/${e[i].img}" alt="" class="left">
                <div>
                	${e[i].title}<br>
                  <span>发布日期：${e[i].time}</span><br><br>
                  <p>${e[i].content}</p>
                </div>
                </div>
                `
                if(i==2){
                    return
                }
            }
        },
    })
    // 热卖商品2右图
    $.ajax({
        type:'post',
        url:'api/hotSellingR',
        dataType:'json',
        success:function(e){
            //获取展示区域
           let imgShow =  document.querySelector('.data-commodityBom .data-show .right');
           imgShow.style.backgroundImage=`url(../../public/images/lunbo/${e[0].img})`
        },
    })
    //背景附着上图
    $.ajax({
        type:'post',
        url:'api/bglistT',
        dataType:'json',
        success:function(e){
            //获取显示区域
            let title = document.querySelector('.bglist .pic strong ');
            let span = document.querySelector('.bglist .pic span ');
            let imgUrl = document.querySelector('.bglist .pic');
            title.innerHTML=`${e[0].title}`
            span.innerHTML=`${e[0].content}`
            imgUrl.style.backgroundImage=`url(../../public/images/lunbo/${e[0].img})`
        },
    })
    //背景图片中
    $.ajax({
        type:'post',
        url:'api/bglistC',
        dataType:'json',
        success:function(e){
            //获取显示区域
            let title = document.querySelector('.bglist .picTwo strong ');
            let span = document.querySelector('.bglist .picTwo span ');
            let imgUrl = document.querySelector('.bglist .picTwo');
            title.innerHTML=`${e[0].title}`
            span.innerHTML=`${e[0].content}`
            imgUrl.style.backgroundImage=`url(../../public/images/lunbo/${e[0].img})`
        },
    })
    //背景图片下
    $.ajax({
        type:'post',
        url:'api/bglistB',
        dataType:'json',
        success:function(e){
            //获取显示区域
            let show = document.querySelector('.bglist .picSur');
            let strong = document.querySelector('.bglist .picSur strong');
            let span = document.querySelector('.bglist .picSur span');
            let a = document.querySelector('.bglist .picSur a');
            //渲染本地
            show.style.backgroundImage=`url(../../public/images/lunbo/${e[0].img})`;
            strong.innerHTML=e[0].title;
            span.innerHTML=e[0].content;
            a.href=e[0].herf;
            a.innerHTML=e[0].text;
        },
    })
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
}