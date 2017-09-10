/**
 * Created by wayne on 2017/9/6.
 */
$(function(){
    //通过事件委托的形式 添加点击事件
    $("#menu").on('click','.row>div:nth-child(8)',function(){
        $("#menu .row>div:nth-last-child(-n+4)").toggle();
    })
    getMenu();
    getRecommend();
})
function getMenu(){
    $.ajax({
       url:url+"api/getindexmenu",
        success:function(data){
            console.log(data);
            var menuHtml='';
            for(var i=0;i<data.result.length;i++){
                menuHtml+='<div class="col-xs-3">'+
                    '<a href="'+data.result[i].titlehref+'">'+
                      data.result[i].img+
                    '<p>'+data.result[i].name+'</p>'+
                    '</a></div>'

            }
            $("#menu .row").html(menuHtml);
            //方法1 页面渲染完毕后，直接添加点击事件。方法二（见上）
            //$("#menu .row>div:nth-child(8)").on('click',function(){
            //    $("#menu .row>div:nth-last-child(-n+4)").toggle();
            //})

        }
    })
}
//使用template.js模板
//function getRecommend(){
//    $.ajax({
//        url:url+'api/getmoneyctrl',
//        success:function(data){
//            var RecommendHTML= template("recommendTpl",data);
//            $(".recommend-list").html(RecommendHTML);
//        }
//    })
//}
//使用handlebars模板
function getRecommend(){
    $.ajax({
        url:url+'api/getmoneyctrl',
        success:function(data){
            var RecommendHTML=Handlebars.compile($("#recommendTpl").html());

            $(".recommend-list").html(RecommendHTML(data));
        }
    })
}





