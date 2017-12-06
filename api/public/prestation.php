<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \RedBeanPHP\R as R;
use Twilio\Rest\Client;
$sid = 'SM85e1d799b975403eb63dffa38e827a6e';
$token = '6041b12555275968db0223b35880e871';
$client = new Client($sid, $token);
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
    //  $equipements = R::dispense('equipement');

     $prestation->libelle_prestation = $data['libelle_prestation'];
     $prestation->date_livraison = $data['date_livraison'];

    //  $prestation->technicien = $data['technicien'];
     $equipement_of_pres=$data['equipement'];
     $prestation->client=$data['client'];
     //
    //  $equipement = R::dispense( 'equipement' );

     $id = R::store($prestation);
     if ($id) {
         # code...
         foreach ($equipement_of_pres as $value) {
           $prestationequipement = R::dispense('prestationequipement');
        // $equipement = R::dispense('equipement');

           $equipement = R::findOne('equipement','reference_equipement =?',array($value));
           $prestations = R::load('prestation', $id);
           $date= date_create($prestations['date_livraison']);
           $duration=$equipement['delais_garantie'];
           date_add($date,date_interval_create_from_date_string("$duration months"));
           $prestationequipement->id_prestation = $id;
           $prestationequipement->date=$date;
           $prestationequipement->ref_equipement=$equipement['reference_equipement'];
           $idPrestEquip=R::store($prestationequipement);

           if($idPrestEquip){
            $equipement = R::findOne('equipement','reference_equipement =?',array($value));
            // echo $equipement;
            if($equipement){
                $equipement['was_use']=1;
                R::store($equipement);
            }
          }
          $dt=$date->format("d-m-Y");
          $sid = 'ACe80cc2550d7c3ba4c67d7cb71a73579f';
          $token = '6041b12555275968db0223b35880e871';
          $client = new Client($sid,$token);
          $client->messages->create('+22961725134',
              array('from' => '+13016405860',
                     'body' => "
                                Quality corporate vous Informe que la periode de guarantie de l'équipement $value de la prestation Numero $id arrive a sa fin le $dt"
                             )
                    );

          $to = "ameyspero@gmail.com";
          $subject = "Délais de garantie";
          $txt = "Bonjour Mr/Mme!
          Quality Co vous Informe que la periode de guarantie de l'équipement $value de la prestation Numero $id arrive a sa fin le $dt";
          $headers = "From: quality-corporate@gmail.com" . "\r\n" .
          "CC: ameyspero@gmail.com";

          mail($to,$subject,$txt,$headers);
         }

         $data['id']=$id;
         $data['status']="success";
         $data['message']="Félicitation, la prestation a été créé";
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
    return $response->withJson($all_prestations);
});


$app->get('/prestationdetail/{id}', function(Request $request, Response $response) {
    $idPrest= $request->getAttribute('id');
    // $all = R::find('prestationequipement');
    $all = R::find('prestationequipement','id_prestation =?',array($idPrest));
    // var_dump($all);
    $all_prestation_equipement = R::exportAll($all);
    return $response->withJson($all_prestation_equipement);
});

$app->delete('/prestation/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    try{
			// Buscamos y borramos
	 		$prestation = R::load('prestation', $id);
			if ($prestation->id) {
				R::trash($prestation);
                return $response->withJson($id);
                } else {
			       throw new Exception('Error while deleting the prestation');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


$app->put('/prestation/{id}', function(Request $request, Response $response) {

    $id= $request->getAttribute('id');
    $data= $request->getParsedBody();
    // var_dump($data);
    try{
	 		$prestation = R::load('prestation', $id);
			if ($prestation->id) {
                $prestation->libelle_prestation = $data['libelle_prestation'];
                $prestation->date_livraison = $data['date_livraison'];
                $prestation->delais_garantie = $data['delais_garantie'];
                $prestation->date_fin_garantie=$data['date_fin_garantie'];
                var_dump($prestation);
        		R::store($prestation);
                $res = R::load('prestation', $id);
                return $response->withJson($res);
                } else {
			       throw new Exception('Error while updating the prestation');
				}
		}catch (Exception $e) {

			echo "sorry retry again; something going wrong";
	}
});


?>
