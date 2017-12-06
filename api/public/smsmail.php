<?php

$app->post('/sendmsg', function(Request $request, Response $response) {

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
?>
