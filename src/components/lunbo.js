window.onload=()=>{
  //   //轮播图
    $.ajax({
      type:'post',
      url:'api/lunbos',
      data:null,
      dataType:'json',
      success:function(e){
        if(e==1){
          let images =["../../public/images/lunbo/lunbo-1.webp"]
        }
        // let index = -1;
        // let images = ["../../public/images/lunbo-1.webp", "../../public/images/lunbo-2.webp", "../../public/images/lunbo-3.webp","../../public/images/lunbo-4.webp"];
        // let slideshow = document.querySelector('.slideshow');
        // nextSlide()
        // function nextSlide() {
        //   // 计算下一张图片的索引
        //   index = (index + 1) % images.length;
          
        //   // 设置下一张图片为背景图片
        //   slideshow.style.backgroundImage = `url(${images[index]})`;
        // }
        
        // // 设置定时器，每隔2秒切换一张图片
        // setInterval(nextSlide, 3000);
      },
  })
//     let index = -1;
// let images = ["../../public/images/lunbo-1.webp", "../../public/images/lunbo-2.webp", "../../public/images/lunbo-3.webp","../../public/images/lunbo-4.webp"];
// let slideshow = document.querySelector('.slideshow');
// nextSlide()
// function nextSlide() {
//   // 计算下一张图片的索引
//   index = (index + 1) % images.length;
  
//   // 设置下一张图片为背景图片
//   slideshow.style.backgroundImage = `url(${images[index]})`;
// }

// // 设置定时器，每隔2秒切换一张图片
// setInterval(nextSlide, 3000);

      // var index = 0;
      // var images = document.querySelectorAll(".lunbo img");

      // function nextSlide() {
      //   // 隐藏当前图片
      //   images[index].classList.remove("active");

      //   // 计算下一张图片的索引
      //   index = (index + 1) % images.length;

      //   // 显示下一张图片
      //   images[index].classList.add("active");
      // }

      // // 设置定时器，每隔2秒切换一张图片
      // setInterval(nextSlide, 3000);
      // var index = 0;
      // function lunbo(){
      //     index ++ ;
      //     //判断index是否大于4
      //     if(index > 4){
      //         index = 1;
      //     }
      //     //获取img对象
      //     var img = document.getElementById("lunbo_img");
      //     img.style.opacity=1;
      //     img.src = `../../public/images/lunbo-${index}.webp`;
      // }
      // function fun(){
      //     var img = document.getElementById("lunbo_img");
      //     img.style.opacity=0;
      // }
      // setInterval(fun,1000);
      // //2.定义定时器
      // setInterval(lunbo,2000);
      // /*切记定时器里调用lunbo方法不能加(),setInterval(lunbo,2000);如果加()会执行lunbo（）方法，而导致定时器没用。*/
}
