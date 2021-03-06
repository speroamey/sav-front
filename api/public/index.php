<?php
require '../vendor/autoload.php';
// use \RedBeanPHP\R as R;
class_alias('\RedBeanPHP\R','R');
$db_host = "localhost";
$db_dbname = "sav_db";
$db_username = "root";
$db_password = "";
R::setup ('mysql:host='.$db_host.';dbname='.$db_dbname.';chartset=utf8',''.$db_username.'',''.$db_password.'');


$app = new Slim\App([
    "settings"  => [
        "determineRouteBeforeAppMiddleware" => true,
        "displayErrorDetails" => true
    ]
]);


// This is the middleware
// It will add the Access-Control-Allow-Methods header to every request
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});



// $app->add(function($request, $response, $next) {
//     $route = $request->getAttribute("route");
//
//     $methods = [];
//
//     if (!empty($route)) {
//         $pattern = $route->getPattern();
//
//         foreach ($this->router->getRoutes() as $route) {
//             if ($pattern === $route->getPattern()) {
//                 $methods = array_merge_recursive($methods, $route->getMethods());
//             }
//         }
//         //Methods holds all of the HTTP Verbs that a particular route handles.
//     } else {
//         $methods[] = $request->getMethod();
//     }
//
//     $response = $next($request, $response);
//
//
//     return $response->withHeader("Access-Control-Allow-Methods", implode(",", $methods));
// });

// require 'utils.php';
require 'authentication.php';
require 'prestation.php';
require 'client.php';
require 'technicien.php';
require 'equipement.php';
require 'plainte.php';
require 'traitement.php';
require 'smsmail.php';


$app->run();
