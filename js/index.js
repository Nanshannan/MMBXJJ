/**
 * Created by wayne on 2017/9/6.
 */
$(function(){
    //ͨ���¼�ί�е���ʽ ��ӵ���¼�
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
            //����1 ҳ����Ⱦ��Ϻ�ֱ����ӵ���¼��������������ϣ�
            //$("#menu .row>div:nth-child(8)").on('click',function(){
            //    $("#menu .row>div:nth-last-child(-n+4)").toggle();
            //})

        }
    })
}
//ʹ��template.jsģ��
//function getRecommend(){
//    $.ajax({
//        url:url+'api/getmoneyctrl',
//        success:function(data){
//            var RecommendHTML= template("recommendTpl",data);
//            $(".recommend-list").html(RecommendHTML);
//        }
//    })
//}
//ʹ��handlebarsģ��
function getRecommend(){
    $.ajax({
        url:url+'api/getmoneyctrl',
        success:function(data){
            var RecommendHTML=Handlebars.compile($("#recommendTpl").html());

            $(".recommend-list").html(RecommendHTML(data));
        }
    })
}





