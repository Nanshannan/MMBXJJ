/**
 * Created by wayne on 2017/9/7.
 */
$(function(){
    $("#category").on('click','.category-title li>a',function(){
        //找到兄弟元素让LI去切换显示
        $(this).siblings('ul').toggle();
        //找到父容器的兄弟元素下面的UL滑上去，哈哈
        $(this).parent().siblings('li').find('ul').slideUp();
        //获取当前点击的元素的自定义属性值
        var titleid = $(this).attr('data-title-id');
        categoryList(titleid,$(this));
    })
    categoryTitle();
})
    //获取分类标题
    function categoryTitle(){
        $.ajax({
            url:url+'api/getcategorytitle',
            success:function(data){
                var titleHtml = template("categoryTitleTpl",data);
                $('.category-title').html(titleHtml);
            }
        })
    }
    //获取分类标题下列表页
    function categoryList(titleid,ele){
        //如果当前点击的内容里有数据就不需要再次发送AJAX
        if(ele.siblings('ul').children().length==0){
            $.ajax({
                url:url+'api/getcategory',
                data:{titleid:titleid},
                success:function(data){
                    var listHtml = template('cateListTpl',data);
                    ele.siblings('ul').html(listHtml);
                    var num = ele.siblings('ul').children().length%3 || 3;
                    ele.siblings('ul').children('li:nth-last-child(-n+'+num+')').css('border-bottom','none');
                }
            })
        }
    }