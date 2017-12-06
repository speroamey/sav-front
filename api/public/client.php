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


$app->post('/client', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
         $client = R::dispense('client');
         $client->nom_client = $data[nom_client];
         $client->type_client = $data[type_client];
         $client->adresse_client = $data[adresse_client];
         $client->email_client = $data[email_client];
         $client->telephone_client=$data[telephone_client];

     $id = R::store($client);
     if ($id) {
         # code...
         $data[id]=$id;
         $data[status]="success";
         $data[message]="Félicitation, la client a été créé";
         return $response->withJson($data);
     }else{
         $response->status = "error";
         $response->message = "erreur d'enregistrement";
         return "erreur de création";
     }
});

$app->get('/client', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
    $all = R::find('client');
    $all_clients = R::exportAll($all);
    // var_dump($all_clients);
    return $response->withJson($all_clients);
    // return $all_clients;
});

$app->delete('/client/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    try{
			// Buscamos y borramos
	 		$client = R::load('client', $id);
			if ($client->id) {
				R::trash($client);
                return $response->withJson($id);
                // echo "everything done";
				// echo json_encode(array('status' => 'success', 'message' => 'Borrado correctamente'));
				} else {
			       throw new Exception('Error while deleting the client');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


$app->put('/client/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    $data= $request->getParsedBody();
    // var_dump($data);
    try{
	 		$client = R::load('client', $id);
			if ($client->id) {
                $client->nom_client = $data['nom_client'];
                $client->type_client = $data["type_client"];
                $client->adresse_client = $data["adresse_client"];
                $client->email_client = $data["email_client"];
                $client->telephone_client=$data["telephone_client"];
                //  var_dump($data);
				R::store($client);
                $res = R::load('client', $id);
                return $response->withJson($res);
				} else {
			       throw new Exception('Error while updating the client');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


?>
