<?php
/**
 * Created by PhpStorm.
 * User: Spring5700
 * Date: 2018/5/1
 * Time: 22:02
 */
    include_once  "config.php";
    include_once  "functions.php";

    if(!empty($_GET)) {
        if(!empty($_GET["type"])) {
            if ($_GET["type"] == "board") {
                echo fetch_board();
            }
            if (!empty($_GET["type"]) && !empty($_GET["status"])) {
                echo fetch_json($_GET["type"], $_GET["status"]);
            }
        }

    }else{
        echo "[]";
    }


    /*
     * @brief 连接数据库执行查询获取结果并处理为json格式
     *
     * @param[type] 类型
     * @param[status] 状态
     * @return json格式数据
     */
    function fetch_json($type='',$status=''){
        $sql = "SELECT * FROM items WHERE type='".$type."' AND status='".$status."' ORDER BY updatetime DESC;";
        $conn = connect_database();
        $result = mysqli_query($conn,$sql);
        $list = array();
        while($row = mysqli_fetch_array($result)){
            $list[] = $row;
        }
        $json = json_encode($list);

        mysqli_free_result($result);
        mysqli_close($conn);

        return json_encode($list);
        
    }

    /*
    * @brief 获取board内容
    *
    * @param[""]
    * @return board内容(json)
    */
    function fetch_board(){
        $sql = "SELECT * FROM board WHERE id='1'";
        $conn = connect_database();
        $result = mysqli_query($conn,$sql);
        $list = array();
        while($row = mysqli_fetch_array($result)){
            $list[] = $row;
        }
//        $json = json_encode($list);
        mysqli_free_result($result);
        mysqli_close($conn);

        return json_encode($list);
    }





