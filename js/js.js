/**
 * Created by Administrator on 2016/8/30.
 */
/*index*/
/*nav下拉菜单*/
$('.nav li,.nav dd').each(function(){
    $(this).hover(
        function(){
            $(this).children("dl").hide().slideDown();
        },
        function(){
            $(this).children("dl").hide().slideUp();
        }
    );
})

/*flash*/
var fadeObj={
    flashNode:$('.flash'),
    flashLeft:$('.flash_left'),
    flashRight:$('.flash_right'),
    flashImgLis:$('.flash_img li'),
    flashBtnLis:$('.flash_btn li'),
    LisCur:"current",
    fadeInOut:function(nowPos,oldPos){
        fadeObj.flashBtnLis.eq(nowPos).addClass(fadeObj.LisCur);
        fadeObj.flashBtnLis.eq(oldPos).removeClass();
        fadeObj.flashImgLis.eq(nowPos).stop().fadeIn();
        fadeObj.flashImgLis.eq(oldPos).stop().fadeOut();
    },
    auto:null
}

fadeObj.flashNode.hover(//移入移出
    function(){//移入
        fadeObj.flashLeft.show();
        fadeObj.flashRight.show();
        window.clearInterval(fadeObj.auto);
    },
    function(){//移出
        fadeObj.flashLeft.hide();
        fadeObj.flashRight.hide();
        fadeObj.auto=window.setInterval(function(){//自动
            fadeObj.flashRight.click();
        },3000);
    }
);
fadeObj.flashBtnLis.mouseenter(function(){//页面切换
    if($(this).hasClass("current")){
        return;
    }
    var nowPos=$(this).index();//新位置
    var oldPos=$('.flash_btn .current').index();//旧位置
    fadeObj.fadeInOut(nowPos,oldPos);
});
fadeObj.flashRight.click(function(){//右按钮
    var lastPos=fadeObj.flashBtnLis.length-1;
    var oldPos=$('.flash_btn .current').index();//旧位置
    var nowPos=oldPos==lastPos?0:oldPos+1;
    fadeObj.fadeInOut(nowPos,oldPos);
});
fadeObj.flashLeft.click(function(){//左按钮
    var lastPos=fadeObj.flashBtnLis.length-1;
    var oldPos=$('.flash_btn .current').index();//旧位置
    var nowPos=oldPos==0?lastPos:oldPos-1;
    fadeObj.fadeInOut(nowPos,oldPos);
});
fadeObj.auto=window.setInterval(function(){//自动
    fadeObj.flashRight.click();
},3000);
/*iconMove*/
var iconListDl=$('.iconList dl')
iconListDl.mouseenter(function(){
    if($(this).hasClass('current')){
        return;
    }
    var nowPos=$(this).index();
    var oldPos=$('.iconList .current').index();
    iconListDl.eq(nowPos).stop().addClass('current').animate({width:"502px"},1000);
    iconListDl.eq(oldPos).stop().removeClass('current').animate({width:"160px"},1000);
});
/*aboutUs*/
/*left*/
var aboutUsLeftA=$('.aboutUs_left a');
aboutUsLeftA.mouseenter(function(){
   $(this).children('p').animate({ top:"0px"},'normal');
   $(this).children('img').animate({ width:"110%",height:"110%", margin:"-10px"},'normal');
})
aboutUsLeftA.mouseleave(function(){
    $(this).children('p').stop().animate({ top:"241px"},'normal');
    $(this).children('img').stop().animate({ width:"491px", margin:"0px"},'normal');
})
/*right*/
var rightBtnLeft=$('.aboutUs .rightList_btn .btn_left');
var rightBtnRight=$('.aboutUs .rightList_btn .btn_right');
var rightLiWidth=$('.rightList li').width();
rightBtnLeft.click(function(){//向左
    var rightLiLast =$('.rightList li:last');
    rightLiLast.css("margin-left",-rightLiWidth+"px").prependTo(rightLiLast.parent()).show(function(){$(this).css("margin-left","0px")});
});
rightBtnRight.click(function(){//向右
    var rightLiFirst =$('.rightList li:first');
    rightLiFirst.show(function(){
        $(this).css({marginLeft:-rightLiWidth+"px"})
    }).appendTo(rightLiFirst.parent()).css({marginLeft:"0px"});
})
var moveAuto=window.setInterval(function(){//自动
    rightBtnRight.click();
},3000);
$('.aboutUs_right,.btn_right,.btn_left').hover(
    function(){//移出
        window.clearInterval(moveAuto);
    },
    function(){//移入
        moveAuto=window.setInterval(function(){
            rightBtnRight.click();
        },3000);
    }
);
/*ourClient*/
var btnLeft=$('.ourClient .rightList_btn .btn_left');
var btnRight=$('.ourClient .rightList_btn .btn_right');
var ourClientLiWidth=$('.ourClient_list li').width();
//console.log(ourClientLiWidth);
btnLeft.click(function(){//向左
    var ourClientLiLast =$('.ourClient_list li:last');
    ourClientLiLast.stop().css("margin-left",-ourClientLiWidth+"px").prependTo(ourClientLiLast.parent()).animate({marginLeft:"0px"},1000);
});
btnRight.click(function(){//向右
    var ourClientLiFirst =$('.ourClient_list li:first');
    ourClientLiFirst.stop().animate({marginLeft:-ourClientLiWidth+"px"},1000,function(){
        $(this).css({marginLeft:"0px"}).appendTo($(this).parent())
    })
})
/*top*/
var topNode=$('.top');
window.onscroll=function(){
    var winHeight=$(window).height();//可视窗口的高度
    var scrollTopNum=$(window).scrollTop();//滚动条滚去的距离
    if(scrollTopNum>=winHeight){
        topNode.show();
    }
    else{
        topNode.hide();
    }
}
/*products*/
$('.products_nav li').click(function(){
    $(this).addClass("current").siblings(".current").removeClass("current");
    var className=$(this).attr("data");
    //console.log(className);
    if(className=="all"){
        $('.products_list').children().slideDown();
    }
    else{
        $('.products_list').children("."+className).slideDown();
        $('.products_list').children("."+className).siblings("dl:not(."+className+")").slideUp();
    }
});

