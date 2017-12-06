<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \RedBeanPHP\R as R;

R::freeze(false);


$app->post('/plainte', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
         $plainte = R::dispense('plainte');
         $plainte->prestation=$data['prestation'];
         $plainte->description_plainte = $data['description_plainte'];
         $plainte->date_plainte=$data['date_plainte'];

     $id = R::store($plainte);
     if ($id) {
         # code...
         $data[id]=$id;
         $data[status]="success";
         $data[message]="Félicitation, l'plainte à été créé";
         return $response->withJson($data);
     }else{
         $response->status = "error";
         $response->message = "erreur d'enregistrement";
         return "erreur de création";
     }
});

$app->get('/plainte', function(Request $request, Response $response) {

    $data= $request->getParsedBody();
    $all = R::find('plainte');
    $all_plaintes = R::exportAll($all);
    return $response->withJson($all_plaintes);
});

$app->delete('/plainte/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    try{
			// Buscamos y borramos
	 		$plainte = R::load('plainte', $id);
			if ($plainte->id) {
				R::trash($plainte);
                return $response->withJson($id);
                // echo "everything done";
				// echo json_encode(array('status' => 'success', 'message' => 'Borrado correctamente'));
				} else {
			       throw new Exception('Error while deleting the plainte');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


$app->put('/plainte/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    $data= $request->getParsedBody();
    // var_dump($data);
    try{
	 		$plainte = R::load('plainte', $id);
			if ($plainte->id) {
                $plainte->prestation=$data['prestation'];
                $plainte->description_plainte = $data['description_plainte'];
                $plainte->date_plainte=$data['date_plainte'];
				R::store($plainte);
                $res = R::load('plainte', $id);
                return $response->withJson($res);
				} else {
			       throw new Exception('Error while updating the plainte');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


?>
