<?php
/**
 * Created by PhpStorm.
 * User: Spring5700
 * Date: 2018/5/1
 * Time: 22:02
 */

    include_once "config.php";
    include_once "functions.php";

    if(!empty($_GET)){
        if($_GET["method"] == "edit"){
            edit_item($_GET["id"],$_GET["title"],$_GET["description"],$_GET["type"],$_GET["status"]);
        }
        if($_GET["method"] == "add"){
            add_item($_GET["title"],$_GET["description"],$_GET["type"]);
//            var_dump($_GET);
        }
        if($_GET["method"] == "board"){
            change_board($_GET["board"],$_GET["size"]);
        }
    }



    /*
    * @brief 修改事项
    *
    * @param["id"]
    * @param["title"]
    * @param["description"]
    * @param["type"]
    * @param["status"]
    * @return
    */
    function edit_item($id,$title,$description,$type,$status){
        $conn = connect_database();
        if(!empty($title)){
            $sql = "UPDATE items SET title='".$title."' WHERE id=".$id;
            mysqli_query($conn,$sql);
        }
        if(!empty($description)){
            $sql = "UPDATE items SET description='".$description."' WHERE id=".$id;
            mysqli_query($conn,$sql);
        }
        if(!empty($type)){
            $sql = "UPDATE items SET type='".$type."' WHERE id=".$id;
            mysqli_query($conn,$sql);
        }
        if(!empty($status)){
            $sql = "UPDATE items SET status='".$status."' WHERE id=".$id;
            mysqli_query($conn,$sql);
        }

        mysqli_close($conn);
        return;
    }

    /*
    * @brief 增加事项
    *
    * @param["title"]
    * @param["description"]
    * @param["type"]
    * @return
    */
    function add_item($title,$description,$type){
        $sql = "INSERT INTO items (title,description,type,status) VALUES ('".$title."','".$description."','".$type."','1')";
        $conn = connect_database();
        mysqli_query($conn,$sql);
        mysqli_close($conn);
    }

    /*
    * @brief 更新board
    *
    * @param["board"] 新的board内容
    * @param["size"] 新的board字号大小
    * @return
    */
    function change_board($board,$size){
        $sql_clear = "truncate table board";
        $sql = "INSERT INTO board (board_content,board_font_size) VALUES ('".$board."','".$size."')";
        $conn = connect_database();
        mysqli_query($conn,$sql_clear);
        mysqli_query($conn,$sql);
        mysqli_close($conn);
    }

