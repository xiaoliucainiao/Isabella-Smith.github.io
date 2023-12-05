 let up = document.querySelector('.sidebar li:last-of-type');
 up.addEventListener('click',function(){
            window.scrollTo(0,0)
 })
 let li = document.querySelectorAll('.nav ul li');
for(let i = 0 ; i < li.length ; i++){
    li[i].onclick=()=>{
        if(i==0){
            location.href='index.html'
        }
        if(i==1){
            location.href='allProducts.html'
        }
        if(i==2){
            location.href='dynamic.html'
        }
    }
}