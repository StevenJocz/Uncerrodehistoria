<?php



if(!empty($_POST['Numero'])){// numero de Noticias creadas
    
    $rutaUno= "../Imagenes/ImagenesNoticias/";
    $totalUno = count(glob($rutaUno.'{*}', GLOB_BRACE));

    $rutaDos= "../Imagenes/ImagenesPlaylist/";
    $totalDos = count(glob($rutaDos.'{*}', GLOB_BRACE));

    $rutaTres= "../Imagenes/ImagenesUsuarios/";
    $totalTres = count(glob($rutaTres.'{*}', GLOB_BRACE));

    $rutaCua= "../Imagenes/ImagenesProgramas/";
    $totalCua = count(glob($rutaCua.'{*}', GLOB_BRACE));

    $total = $totalUno + $totalDos + $totalTres + $totalCua;

    $jsonString = json_encode($total);
    echo $jsonString;
   

}else if(!empty($_POST['Login'])){
    
    $Correo = base64_decode($_POST['Correo']);
    $Clave = base64_decode($_POST['Clave']);

    $base = new PDO('mysql:host=localhost; dbname=4radio', 'root', '');

    $base->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql="SELECT * FROM `usuarios` WHERE Correo= :Correo AND Clave= :Clave";

    $resultado=$base->prepare($sql);

    $Correo=htmlentities(addslashes(base64_decode($_POST['Correo'])));

    $Clave=htmlentities(addslashes(base64_decode($_POST['Clave'])));

    $resultado->bindValue(":Correo", $Correo);

    $resultado->bindValue(":Clave", $Clave);

    $resultado->execute();

    $numero_registro=$resultado->rowCount();

    if($numero_registro !=0){

        session_start();
        
        $_SESSION["Correo"]=$_POST["Correo"];
         echo "Si";


    }else{
        echo "No";
    }
        
}else if(!empty($_POST['Sesion'])){

    session_start();

    if(!isset($_SESSION["Correo"])){

        echo "No";
    }else{
        echo "Si";
    }


}
else if(!empty($_POST['CerrarSesion'])){

    session_start();

    session_destroy();

    echo "No";
    

}
    
    
?>