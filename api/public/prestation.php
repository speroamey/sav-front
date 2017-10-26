<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \RedBeanPHP\R as R;
// require_once 'passwordHash.php';
// $db_host = "localhost";
// $db_dbname = "sav_db";
// $db_username = "root";
// $db_password = "virus";
// R::setup ('mysql:host='.$db_host.';dbname='.$db_dbname.';chartset=utf8',''.$db_username.'',''.$db_password.'');

// for production mode value should be passed to true
R::freeze(false);


$app->post('/prestation', function(Request $request, Response $response) {

    $data= $request->getParsedBody();

     $prestation = R::dispense('prestation');
     $prestation->libellePrestation = $data[libellePrestation];
     $prestation->dateLivraison = $data[dateLivraison];
     $prestation->delaisGarantie = $data[delaisGarantie];
    //  return $response->withJson($data);
    //  var_dump($data);
     $id = R::store($prestation);
     if ($id) {
         # code...
         $data[id]=$id;
         $data[status]="success";
         $data[message]="Félicitation, la prestation a été créé";
         return $response->withJson($data);
     }else{
         $response->status = "error";
         $response->message = "erreur d'enregistrement";
         return "erreur de création";
     }
});

$app->get('/prestation', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
    $all = R::find('prestation');
    $all_prestations = R::exportAll($all);
    // var_dump($all_prestations);
    return $response->withJson($all_prestations);
    // return $all_prestations;
});




?>
