<?php

    $username = $_GET["username"];
    $pass = $_GET["password"];

    // 连接数据库
    $conn = mysqli_connect('localhost:3307','root','123456','two');

    // sql语句
    $sql = "INSERT INTO day2 (user,psd) VALUES ('$username', '$pass')";

    // 执行并且得到一个结果
    $jg = mysqli_query($conn,$sql);

    // 进行判断
    if ($jg) {
        echo json_encode(array("error"=>0, "data" => "注册成功"));
    } else {
        echo json_encode(array("error"=>1, "data" => "注册失败"));
    }

?>