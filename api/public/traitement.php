<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \RedBeanPHP\R as R;

R::freeze(false);


$app->post('/traitement', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
         $traitement = R::dispense('traitement');

         $traitement->plainte=$data['plainte'];
         $traitement->libelle_traitement = $data['libelle_traitement'];
         $traitement->technicien = $data['technicien'];
         $traitement->date_traitement=$data['date_traitement'];

     $id = R::store($traitement);
     if ($id) {
         # code...
         $data[id]=$id;
         $data[status]="success";
         $data[message]="Félicitation, l'traitement à été créé";
         return $response->withJson($data);
     }else{
         $response->status = "error";
         $response->message = "erreur d'enregistrement";
         return "erreur de création";
     }
});

$app->get('/traitement', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
    $all = R::find('traitement');
    $all_traitements = R::exportAll($all);
    // var_dump($all_traitements);
    return $response->withJson($all_traitements);
    // return $all_traitements;
});

$app->delete('/traitement/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    try{
			// Buscamos y borramos
	 		$traitement = R::load('traitement', $id);
			if ($traitement->id) {
				R::trash($traitement);
                return $response->withJson($id);
                // echo "everything done";
				// echo json_encode(array('status' => 'success', 'message' => 'Borrado correctamente'));
				} else {
			       throw new Exception('Error while deleting the traitement');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


$app->put('/traitement/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    $data= $request->getParsedBody();
    // var_dump($data);
    try{
	 	$traitement = R::load('traitement', $id);
	    if ($traitement->id) {

            $traitement->plainte=$data['plainte'];
            $traitement->libelle_traitement = $data['libelle_traitement'];
            $traitement->technicien = $data['technicien'];
            $traitement->date_traitement=$data['date_traitement'];

		    R::store($traitement);
            $res = R::load('traitement', $id);

            return $response->withJson($res);
			} else {
			  throw new Exception('Error while updating the traitement');
			}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


?>
