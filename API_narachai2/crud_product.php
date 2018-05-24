<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once("config/db.php");
require_once("cmd/exec.php");


$db = new Database();
$strConn = $db->getConnection();
$strExe = new ExecSQL($strConn);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // get post body content
$content = file_get_contents('php://input');
    // parse JSON
$user = json_decode($content, true);

$action = $user['cmd'];
$p_code = $user['p_code'];


/*

$action = $_GET['cmd'];
$p_code = $_GET['p_code'];

*/
switch ($action){
    
    case "select" :
    
        $sql = " SELECT * FROM tbl_product ";
        if($p_code != null){
            $sql.= " WHERE p_code = '".$p_code."' ";
        }
        $stmt = $strExe->populateData($sql);

        $sql2 = " tbl_product ";
        if($p_code != null){
            $sql2.= " WHERE p_code = '".$p_code."' ";
        }
        $row_count = $strExe->rowCount($sql2);

        $usersArray = array();
        if($row_count >0) {
            foreach($stmt as $row){
                $usersArray[] = $row;

                $item = array(
                    'p_code'=>$row['p_code'],
                    'p_name'=>$row['p_name'],
                    'p_source'=>$row['p_source'],
                    'p_process'=>$row['p_process'],
                    'p_mash'=>$row['p_mash']  
                );
                //array_push($usersArray[] ,$item);
            }
            echo json_encode([$usersArray,'status' => 'ok','message' => "ชื่อสินค้า : ".$row['p_name']."".
                                                                        "แหล่งผลิต : ".$row['p_source']."".
                                                                        "การผลิต : ".$row['p_process']."".
                                                                        "สารเคมี : ".$row['p_mash'] ]);
        }else {
            echo json_encode(['status' => 'error','message' => 'ไม่มีข้อมูลในระบบ']);
        }
    break;





 }

}

    






?>