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


$app->post('/technicien', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
         $technicien = R::dispense('technicien');
         $technicien->nom_technicien = $data['nom_technicien'];
         $technicien->prenom_technicien = $data['prenom_technicien'];
         $technicien->adresse_technicien = $data['adresse_technicien'];
         $technicien->email_technicien = $data['email_technicien'];
         $technicien->telephone_technicien=$data['telephone_technicien'];

     $id = R::store($technicien);
     if ($id) {
         # code...
         $data[id]=$id;
         $data[status]="success";
         $data[message]="Félicitation, la technicien a été créé";
         return $response->withJson($data);
     }else{
         $response->status = "error";
         $response->message = "erreur d'enregistrement";
         return "erreur de création";
     }
});

$app->get('/technicien', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
    $all = R::find('technicien');
    $all_techniciens = R::exportAll($all);
    // var_dump($all_techniciens);
    return $response->withJson($all_techniciens);
    // return $all_techniciens;
});

$app->delete('/technicien/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    try{
			// Buscamos y borramos
	 		$technicien = R::load('technicien', $id);
			if ($technicien->id) {
				R::trash($technicien);
                return $response->withJson($id);
                // echo "everything done";
				// echo json_encode(array('status' => 'success', 'message' => 'Borrado correctamente'));
				} else {
			       throw new Exception('Error while deleting the technicien');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


$app->put('/technicien/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    $data= $request->getParsedBody();
    // var_dump($data);
    try{
	 		$technicien = R::load('technicien', $id);
			if ($technicien->id) {
                $technicien->nom_technicien = $data['nom_technicien'];
                $technicien->prenom_technicien = $data["prenom_technicien"];
                $technicien->adresse_technicien = $data["adresse_technicien"];
                $technicien->email_technicien = $data["email_technicien"];
                $technicien->telephone_technicien=$data["telephone_technicien"];
                //  var_dump($data);
				R::store($technicien);
                $res = R::load('technicien', $id);
                return $response->withJson($res);
				} else {
			       throw new Exception('Error while updating the technicien');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


?>
