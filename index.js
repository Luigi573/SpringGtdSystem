
/*
    @brief 构架一项的html(事实上根本用不着其他参数233

    @param["title"]
    @param["description"]
    @param["id"] 用于FINISH按钮
    @return html文本
 */
function construct_item_html(title,description,id) {
    var template = "<a href=\"#\" class=\"list-group-item list-item\">\n" +
        "                        <div class=\"row\">\n" +
        "                            <div class=\"col-xs-9 col-sm-9 col-md-9 col-lg-9\">\n" +
        "                                <h2 class=\"list-group-item-heading\">%title%</h2>\n" +
        "                                <p class=\"list-group-item-text\">%description%</p>\n" +
        "                            </div>\n" +
        "\n" +
        "                            <div class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\">\n" +
        "                                <div  class=\"item-finbtn\" onclick=\"item_finish(%id%)\">FINISH!</div>\n" +
        "\n" +
        "\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "\n" +
        "                    </a>";
    return template.replace("%title%",title).replace("%description%",description).replace("%id%",id);
    
}

/*
    @brief 加载某类型的全部项

    @param["type"]
    @param["status"]
    @return null
 */
function items_load(status,type) {
    $.ajax({
        type:"GET",
        url:"api/fetch.php",
        data:{status:status,type:type},
        dataType:"json",
        success: function(data){
            $("#item-list").empty();
            for(var i=0;i<data.length;i++){
                // console.log(data[i]["title"]);
                $("#item-list").append(construct_item_html(data[i]["title"],data[i]["description"],data[i]["id"]));
            }



        }
    });
}

/*
    @brief 设置某项的完成状态

    @param["id"]
    @return null
 */
function item_finish(id) {
    console.log(id+"finished!");
    $.ajax({
        type:"GET",
        url:"api/edit.php",
        data:{method:"edit",status:"2",id:id},
        dataType:"json"
    });

}

/*
* @brief 设置tab的背景颜色
*
* @param["tabid"]
* @return
*/
function set_tab_bgcolor(tabid) {
    $(".tab-item").css("background-color","white");
    $("#"+tabid).css("background-color","gray");

}

var set_time = 1500; //二十五分钟=1500秒
var update_interval;
var animate_interval;
var clock_flag=0; //番茄钟启动状态 0为停止，1为启动

/*
* @brief 番茄钟启动与停止
*
* @param[""]
* @return
*/
function toggle_clock() {
    if(clock_flag == 0){
        $(".clock-toggle").text("PAUSE");
        update_interval = setInterval("update_clock()",1000);
        clock_flag = 1;
    }else if(clock_flag == 1){
        clearInterval(update_interval);
        $(".clock-toggle").text("START");
        clock_flag = 0;
        set_time = 1500;

    }



}

/*
* @brief 更新时钟
*
* @param[""]
* @return 剩余时间(秒)
*/
function update_clock() {
    set_time--;
    var min = add_pre_zero(parseInt(set_time/60));
    var sec = add_pre_zero(parseInt(set_time%60));


    $(".clock-time").text(min+":"+sec);
    // console.log(set_time);





}

/*
* @brief 检查时钟是否到零并进行后续操作
*
* @param[""]
* @return
*/
function check_clock() {
    if(set_time == 0){
        clearInterval(update_interval);
        set_time = 1500;
        //动画效果

        animate_interval = setInterval("do_animate()",1000);
        $(".clock-toggle").text("START");

        clock_flag = 0;



    }

}

var anime_flag = 0 //动画效果标识，0为不强调，1为强调
/*
* @brief 执行动画效果
*
* @param[""]
* @return
*/
function do_animate() {
    if(anime_flag == 1){
        $(".clock").animate({
            backgroundColor:"#000"
        },500);
        $(".clock-title").animate({
            color: "fff"
        },500);
        $(".clock-time").animate({
            color: "fff"
        },500);
        anime_flag = 0;
    }
    else if(anime_flag == 0){
        $(".clock").animate({
            backgroundColor:"#fff"
        },500);
        $(".clock-title").animate({
            color: "#000"
        },500);
        $(".clock-time").animate({
            color: "#808080"
        },500);
        anime_flag = 1;
    }
}

/*
* @brief 日期时间补零
*
* @param["time"] 分或秒
* @return 补零结果
*/
function add_pre_zero(time) {
    if(time/10 < 1 || time == 0){
        time = "0" + time;
    }
    return time;
}

/*
* @brief 切换25分与5分模式
* 
* @param[""]
* @return
*/
function toggle_clock_type() {
    
}


/*
* @brief 更新board内容
*
* @param[""]
* @return
*/
function update_board() {
    $.ajax({
        type:"GET",
        url:"api/fetch.php",
        data:{type:"board"},
        dataType:"json",
        success: function(data){
            $("#board-content").html(data[0]["board_content"]);
            $("#board-content").css("font-size",data[0]["board_font_size"]+"px");
        }
    });

}

