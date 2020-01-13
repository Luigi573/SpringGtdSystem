<?php
/**
 * Created by PhpStorm.
 * User: Spring5700
 * Date: 2018/6/8
 * Time: 19:38
 */
    include_once "config.php";

    function connect_database(){
        return mysqli_connect(mysql_host,mysql_user,mysql_password,mysql_database,mysql_port);
    }