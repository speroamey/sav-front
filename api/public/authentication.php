<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \RedBeanPHP\R as R;
require_once 'passwordHash.php';
$db_host = "localhost";
$db_dbname = "sav_db";
$db_username = "root";
$db_password = "virus";
R::setup ('mysql:host='.$db_host.';dbname='.$db_dbname.';chartset=utf8',''.$db_username.'',''.$db_password.'');

// for production mode value should be passed to true
R::freeze(false);


$app->post('/register', function(Request $request, Response $response) {

    $data= $request->getParsedBody();

     $user = R::dispense('user');
     $user->username = $data[username];
     $user->password = $data[password];

     $isUserExists = R::findOne('user', 'username = ? ', [$user->username] );
      echo "$isUserExists";

    if(empty($isUserExists)){
        $user->password= passwordHash::hash($user->password);
        $user->username= $user->username;
        $id = R::store($user);

        if ($id != NULL) {
            $response->status = "success";
            $response->message = "Félicitation, Votre compte est créé";
            echo "Félicitation, Votre compte est créé";
            // return $response->withJson($response,200);
        } else {
            $response->status  = "error";
            $response->message  = "Désolé. veuillez réessayer";
            echo "désolé. veuillez réessayer";
            // return $response->withJson($response,201);
        }
    }else{
        $response->status = "error";
        $response->message = "un utilisateur ayant ces identifiant existe déja!";
        echo "un utilisateur ayant ces identifiant existe déja ";
        // return $response->withJson($responsstatus)
    }







});

$app->post('/login', function(Request $request, Response $response)  {
     $data= $request->getParsedBody();
     $password = $data[password];
     $user->username = $data[username];
     $user = R::findOne('user', 'username = ? ', [$user->username] );
    // $user = $db->getOneRecord("select uid,name,password,email,created from customers_auth where phone='$email' or email='$email'");
    if (!empty($user)) {
        // echo "$user";
        if(passwordHash::check_password($user->password,$password)){
            return $response->withJson($user,200);
            if (!isset($_SESSION)) {
                session_start();
            }
        // $_SESSION['uid'] = $user['uid'];
        // $_SESSION['email'] = $email;
        // $_SESSION['name'] = $user['name'];
            } else {
              echo "ERROR";
                $message='Login failed. Incorrect credentials';
                return $response->withJson($message,401);
            }
        }else {
            $message='Utilisateur non identifié';
            return $response->withJson($message,401);
        }
    // echoResponse(200, $response);
});

// $app->post('/signUp', function() use ($app) {
//     $response = array();
//     $r = json_decode($app->request->getBody());
//     verifyRequiredParams(array('email', 'name', 'password'),$r->customer);
//     require_once 'passwordHash.php';
//     $db = new DbHandler();
//     $phone = $r->customer->phone;
//     $name = $r->customer->name;
//     $email = $r->customer->email;
//     $address = $r->customer->address;
//     $password = $r->customer->password;
//     $isUserExists = $db->getOneRecord("select 1 from customers_auth where  email='$email' or name='$name'");
//     if(!$isUserExists){
//         $r->customer->password = passwordHash::hash($password);
//         $tabble_name = "customers_auth";
//         $column_names = array('phone', 'name', 'email', 'password', 'city', 'address');
//         $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
//         if ($result != NULL) {
//             $response["status"] = "success";
//             $response["message"] = "Félicitation, Votre compte est créé";
//             $response["uid"] = $result;
//             if (!isset($_SESSION)) {
//                 session_start();
//             }
//             $_SESSION['uid'] = $response["uid"];
//             $_SESSION['phone'] = $phone;
//             $_SESSION['name'] = $name;
//             $_SESSION['email'] = $email;
//             echoResponse(200, $response);
//         } else {
//             $response["status"] = "error";
//             $response["message"] = "Désolé. veuillez réessayer";
//             echoResponse(201, $response);
//         }
//     }else{
//         $response["status"] = "error";
//         $response["message"] = "Cet utilisateur ayant ces identifiant existe déja!";
//         echoResponse(201, $response);
//     }
// });
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Connexion réussie";
    echoResponse(200, $response);
});

// Products
$app->get('/products/:id', function($id) {

  $db = new DbHandler();
  $rows = $db->getRecord("select * from products WHERE uid='$id'");
     print $rows;
    // echoResponse(200, $rows);
});

$app->get('/productsTechnology', function() {
  $db = new DbHandler();
    $rows = $db->getRecord("select * from products WHERE category='technologie' AND status='Active'");
    print $rows;
    // echoResponse(200, $rows);
});

$app->get('/productsImmobilier', function() {
  $db = new DbHandler();
    $rows = $db->getRecord("select * from products WHERE category='immobilier' AND status='Active'");
    print $rows;
    // echoResponse(200, $rows);
});

$app->get('/productsAgroAlimentaire', function() {
  $db = new DbHandler();
    $rows = $db->getRecord("select * from products WHERE category='agro-alimentaire' AND status='Active'");
    print $rows;
    // echoResponse(200, $rows);
});


$app->get('/productsDivers', function() {
  $db = new DbHandler();
    $rows = $db->getRecord("select * from products WHERE category='divers' AND status='Active'");
    print $rows;
    // echoResponse(200, $rows);
});


$app->post('/products', function() use ($app) {
    $r = json_decode($app->request->getBody());
    print_r($_POST);
    if(isset($_POST)){
  $name=$_POST['name'];
  $description=$_POST['description'];
  $stock=$_POST['stock'];
  $prix=$_POST['prix'];
  $category=$_POST['categorie'];
  $telephone=$_POST['telephone'];
  $status=$_POST['status'];
  $uid=$_POST['uid'];

  if(isset($_FILES['file']['name'])){
    $img_name=uniqid('img-'.date('Ymd').'-');
  print_r($img_name);
    move_uploaded_file($_FILES['file']['tmp_name'], '../../partials/posters/'.$img_name);
  }else{
    $img_name="default.jpg";
    $error="pas de fichier image trouver";
    echo json_encode($error);
  }
  $response = array();
  $db= new DbHandler();
  $tabble_name = "products";
  $column_names = array('name','uid','description','price','stock','status','category','telephone','image');
  $product= array("name"=>$name,"uid"=>$uid,"description"=>$description,"stock"=>$stock, "price"=>$prix,"category"=>$category,"telephone"=>$telephone,"status"=>$status,"image"=>$img_name);
  $obj=(object)$product;
  // print_r($obj);
  $result = $db->insertIntoTable($obj, $column_names, $tabble_name);


}
});

//Modification du status en active ou inactive
$app->put('/products/:id', function($id) use ($app) {
    $decode = json_decode($app->request->getBody());
    $data=$decode->status;
    print_r($decode);
    $condition = array('id'=>$id);
    $column_names ="status";
    $db= new DbHandler();
    $rows = $db->update("update products SET status='$data' where id='$id'");
    if($rows["status"]=="success")
        $rows["message"] = "Product information updated successfully.";
    // echoResponse(200, $rows);
});

//Modification du produit
$app->put('/productsS/:id', function($id) use ($app) {
    $decode = json_decode($app->request->getBody());
    $db= new DbHandler();
    $category = $decode->product->category;
    $telephone = $decode->product->telephone;
    $description = $decode->product->description;
    $name = $decode->product->name;
    $stock = $decode->product->stock;
    $price = $decode->product->price;
      // $packing = $decode->product->packing;
    // $packing = $decode->product->packing;
    // $data=$decode->status;
    print_r($stock);
    // $condition = array('id'=>$id);
    // $column_names ="status";
    // $db= new DbHandler();
     $rows = $db->update("update products SET description='$description',stock='$stock',price='$price',category='$category',telephone='$telephone' where id='$id'");
    // if($rows["status"]=="success")
    //     $rows["message"] = "Product information updated successfully.";
    // echoResponse(200, $rows);
});


$app->delete('/products/:id', function($id) {
    // $decode = json_decode($app->request->getBody());
    // print_r($data);
    $db= new DbHandler();
    $rows = $db->delete("DELETE FROM products where id='$id'");
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    // echoResponse(200, $rows);
});


?>
