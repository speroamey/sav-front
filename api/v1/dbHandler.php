<?php

class DbHandler {
    private $conn;
    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }
    /**
     * Fetching single record
     */
    public function getOneRecord($query) {
        $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
        return $result = $r->fetch_assoc();
    }

    public function getRecord($query) {
        $data=array();
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
         while($result=$r->fetch_assoc()){
             $data[]=$result;
         }
         return json_encode($data);
    }
    /**
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name) {

        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach($column_names as $desired_key){ // Check the obj received. If blank insert blank into the array.
           if(!in_array($desired_key, $keys)) {
                $$desired_key = '';
            }else{
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns.$desired_key.',';
            $values = $values."'".$$desired_key."',";
        }
        $query = "INSERT INTO ".$table_name."(".trim($columns,',').") VALUES(".trim($values,',').")";
        $r = $this->conn->query($query) or die($this->conn->error.__LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
            } else {
            return NULL;
        }
    }
public function getSession(){
    if (!isset($_SESSION)) {
        session_start();
    }
    $sess = array();
    if(isset($_SESSION['uid']))
    {
        $sess["uid"] = $_SESSION['uid'];
        $sess["name"] = $_SESSION['name'];
        $sess["email"] = $_SESSION['email'];
    }
    else
    {
        $sess["uid"] = '';
        $sess["name"] = 'Guest';
        $sess["email"] = '';
    }
    return $sess;
}
public function destroySession(){
    if (!isset($_SESSION)) {
    session_start();
    }
    if(isSet($_SESSION['uid']))
    {
        unset($_SESSION['uid']);
        unset($_SESSION['name']);
        unset($_SESSION['email']);
        $info='info';
        if(isSet($_COOKIE[$info]))
        {
            setcookie ($info, '', time() - $cookie_time);
        }
        $msg="Déconnexion réussie...";
    }
    else
    {
        $msg = "Vous n'étiez pas connecté...";
    }
    return $msg;
}



function update($query){
      $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
     return $r;
}

function delete($query){

    $r = $this->conn->query($query)or die($this->conn->error.__LINE__);
    return $r;
}


function select2($table, $columns, $where, $order){
    try{
        $a = array();
        $w = "";
        foreach ($where as $key => $value) {
            $w .= " and " .$key. " like :".$key;
            $a[":".$key] = $value;
        }
        $stmt = $this->conn->prepare("select ".$columns." from ".$table." where 1=1 ". $w." ".$order);
        $stmt->execute($a);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if(count($rows)<=0){
            $response["status"] = "warning";
            $response["message"] = "No data found.";
        }else{
            $response["status"] = "success";
            $response["message"] = "Data selected from database";
        }
            $response["data"] = $rows;
    }catch(PDOException $e){
        $response["status"] = "error";
        $response["message"] = 'Select Failed: ' .$e->getMessage();
        $response["data"] = null;
    }
    return $response;
}

}

?>
