-- phpMyAdmin SQL Dump
	-- version 4.2.5
	-- http://www.phpmyadmin.net
 
	SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
	SET time_zone = "+00:00";
 
	--
	-- Base de données :  `slim`
	--
 
	-- --------------------------------------------------------
 
	--
	-- Structure de la table `usuarios`
	--
 
	CREATE TABLE `usuarios` (
	`id` INT(9) NOT NULL,
	  `nombre` VARCHAR(50) NOT NULL DEFAULT '',
	  `apellidos` VARCHAR(100) NOT NULL DEFAULT '',
	  `email` VARCHAR(255) NOT NULL DEFAULT '',
	  `alta` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;
 
	--
	-- Contenu de la table `usuarios`
	--
 
	INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `alta`) VALUES
	(4, 'Bob', 'Obama', 'bobobama@whitehouse.gouv', '2014-10-31 07:37:35'),
	(12, 'Damian', 'Winograd', 'dwg@whitehouse.gov', '2014-11-03 04:34:41'),
	(7, 'Ramon', 'Castro', 'ramonc@hotmail.com', '2014-10-31 08:23:43'),
	(9, 'Barack', 'Obama', 'bo@whitehouse.gov', '2014-11-03 04:15:22'),
	(10, 'Michelle', 'Obama', 'mo@whitehouse.gov', '2014-11-03 04:15:41');
 
	--
	-- Index pour les tables exportées
	--
 
	--
	-- Index pour la table `usuarios`
	--
	ALTER TABLE `usuarios`
	 ADD PRIMARY KEY (`id`);
