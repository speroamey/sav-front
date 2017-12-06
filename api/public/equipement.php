<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \RedBeanPHP\R as R;

R::freeze(false);


$app->post('/equipement', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
         $equipement = R::dispense('equipement');
         $equipement->nom_equipement = $data['nom_equipement'];
         $equipement->delais_garantie = $data['delais_garantie'];
         $equipement->reference_equipement = $data['reference_equipement'];
         $equipement->marque_equipement=$data['marque_equipement'];
         $equipement->was_use=false;
     $id = R::store($equipement);
     if ($id) {
         # code...
         $data[id]=$id;
         $data[status]="success";
         $data[message]="Félicitation, l'equipement à été créé";
         return $response->withJson($data);
     }else{
         $response->status = "error";
         $response->message = "erreur d'enregistrement";
         return "erreur de création";
     }
});

$app->get('/equipement', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
    $all = R::find('equipement');
    $all_equipements = R::exportAll($all);
    // var_dump($all_equipements);
    return $response->withJson($all_equipements);
    // return $all_equipements;
});

$app->delete('/equipement/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    try{
			// Buscamos y borramos
	 		$equipement = R::load('equipement', $id);
			if ($equipement->id) {
				R::trash($equipement);
                return $response->withJson($id);
                // echo "everything done";
				// echo json_encode(array('status' => 'success', 'message' => 'Borrado correctamente'));
				} else {
			       throw new Exception('Error while deleting the equipement');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


$app->put('/equipement/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    $data= $request->getParsedBody();
    // var_dump($data);
    try{
	 		$equipement = R::load('equipement', $id);
			if ($equipement->id) {
                $equipement->nom_equipement = $data['nom_equipement'];
                $equipement->delais_garantie = $data['delais_garantie'];
                $equipement->reference_equipement = $data['reference_equipement'];
                $equipement->marque_equipement=$data['marque_equipement'];
				R::store($equipement);
                $res = R::load('equipement', $id);
                return $response->withJson($res);
				} else {
			       throw new Exception('Error while updating the equipement');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


?>
