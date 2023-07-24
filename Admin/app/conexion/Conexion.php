<?php

$conexion = mysqli_connect(
    'localhost',                    
    'root',                       
    '',                           
    '4radio'   
);

if (!$conexion){
    die("No se puede conectar a la base de datos");
};

?>