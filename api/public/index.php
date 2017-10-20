<?php
require '../vendor/autoload.php';
// use \Psr\Http\Message\ServerRequestInterface as Request;
// use \Psr\Http\Message\ResponseInterface as Response;
//
// require '../vendor/autoload.php';
$app = new Slim\App([
    "settings"  => [
        "determineRouteBeforeAppMiddleware" => true,
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



$app->add(function($request, $response, $next) {
    $route = $request->getAttribute("route");

    $methods = [];

    if (!empty($route)) {
        $pattern = $route->getPattern();

        foreach ($this->router->getRoutes() as $route) {
            if ($pattern === $route->getPattern()) {
                $methods = array_merge_recursive($methods, $route->getMethods());
            }
        }
        //Methods holds all of the HTTP Verbs that a particular route handles.
    } else {
        $methods[] = $request->getMethod();
    }

    $response = $next($request, $response);


    return $response->withHeader("Access-Control-Allow-Methods", implode(",", $methods));
});

require 'authentication.php';

// // $app = new \Slim\App;
// // This Slim setting is required for the middleware to work
// $app = new Slim\App([
//     "settings"  => [
//         "determineRouteBeforeAppMiddleware" => true,
//     ]
// ]);
// use \RedBeanPHP\R as R;
//
// $db_host = "localhost";
// $db_dbname = "slim";
// $db_username = "root";
// $db_password = "virus";
// R::setup ('mysql:host='.$db_host.';dbname='.$db_dbname.';chartset=utf8',''.$db_username.'',''.$db_password.'');
//
// R::freeze(true);
// // $app->response->headers->set('Content-Type', 'application/json');
//
// header("Access-Control-Allow-Origin: *");
// // $app->get('/', function (Request $request, Response $response) {
// //     $response->getBody()->write("Hello, This here is the API'S entry point");
// //     return $response;
// // });
//
// $app->get('/all', function () use($app) {
// 								$all = R::find('usuarios');
// 								$all_users = R::exportAll($all);
// 								echo json_encode($all_users);
// 							});
//
//
// $app->get('/hello/{name}', function (Request $request, Response $response) {
//     $name = $request->getAttribute('name');
//     $response->getBody()->write("Hello, $name");
//     return $response;
// });
$app->run();
