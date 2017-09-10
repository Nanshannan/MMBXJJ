/**
 * Created by wayne on 2017/9/9.
 */
$(function(){

    //获取url传入参数
    function getUrl(){
        var getUrl = {};
        var str = window.location.href;  //http://182.254.146.100:3000/api/getcategorybyid?categoryid=0&pageid=1;
        var num = str.indexOf('?'); //能够拿到?所在的索引
        var str = str.substr(num+1);//categoryid=0&hehe=5
        var strsz = str.split('&');//['categoryid=0','hehe=5'];
        for(var i=0;i<strsz.length;i++){
            var item = strsz[i];  //'categoryid=0'
            var itemsz = strsz[i].split('='); //['categoryid','0']
            getUrl[itemsz[0]] = itemsz[1];
        }
        return getUrl;
    }
    getproductTitle(getUrl().categoryid);
    getproductList(getUrl().categoryid,getUrl().pageid);
    //获取名称
    function getproductTitle(categoryid){
        $.ajax({
            url:url+'api/getcategorybyid',
            data:{categoryid:categoryid},
            success:function(data){
                $('#navcontent .categorytitle').html(data.result[0].category);
            }
        })
    }
    //获取列表的函数
    function getproductList(categoryid,pageid){
        //console.log(pageid); //1  2  3
        $.ajax({
            url:url+'api/getproductlist',
            data:{
                categoryid:categoryid,
                pageid:pageid
            },
            success:function(data){
                var productListHTML = template('productListTpl',data);
                $("#recommend .recommend-list").html(productListHTML);
                //option部分的操作
                var datapage = data.pagesize;  //10条数据
                var Count = data.totalCount;   //总共有多少条数据
                //得到总页数
                var page = Math.ceil(Count/datapage); //4
                var option='';
                for(var i=0;i<page;i++){
                    if((i+1) == pageid){
                        option+= '<option value="'+(i+1)+'" selected>&nbsp;'+(i+1)+'/'+page+'&nbsp;</option>';
                    }else{
                        option+= '<option value="'+(i+1)+'" >&nbsp;'+(i+1)+'/'+page+'&nbsp;</option>';
                    }
                }
                $('#selectContent').html(option);
                $('#selectContent').on('change',function(){
                    //console.log(pageid)
                    //getproductList(categoryid,$(this).val());

                    window.location.href = 'productlist.html?categoryid='+categoryid+'&pageid='+$(this).val();
                });
                var pre = 'productlist.html?categoryid='+categoryid+'&pageid='+(+pageid-1);
                var next = 'productlist.html?categoryid='+categoryid+'&pageid='+(+pageid+1);

                if(pageid==1){
                     pre = 'productlist.html?categoryid='+categoryid+'&pageid=1';
                }
                if(pageid==page){
                    next = 'productlist.html?categoryid='+categoryid+'&pageid='+page;
                }
                $('.pre a').attr('href',pre);
                $('.next a').attr('href',next);
            }
        })

    }
})