<?php
include('./conexion/Conexion.php'); 


if(!empty($_POST['Listar'])){ // Listar Playlist

    $query = 'SELECT * FROM `playlist`';
    $Resultado = mysqli_query($conexion, $query);
    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
        $json[] = array(
            'IdPlaylist' => $row['IdPlaylist'],
            'Nombre' => $row['Nombre'],
            'Enlace' => $row['Enlace'],
            'Fecha' => $row['Fecha'],
            'Activo' => $row['Activo'],
            'Imagen' => $row['Imagen']
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;

}else if(!empty($_POST['Valor'])){ // Agregar Playlist
    $Nombre = $_POST['Nombre'];
    $Enlace = $_POST['Enlace'];
    $Fecha = $_POST['Fecha'];
    $Activo = $_POST['Activo'];
    $Imagen = $_POST['Imagen'];
    $Base64 = $_POST['Base64'];
    $MimeType = $_POST['MimeType'];
    
    $filepath = "../Imagenes/ImagenesPlaylist/$Imagen"; 
    file_put_contents($filepath,base64_decode($Base64));


    if($_POST['Valor'] == "Crear"){ // Agregar
        $query = "INSERT into playlist(Nombre, Enlace, Fecha, Activo, Imagen) VALUES ('$Nombre','$Enlace','$Fecha','$Activo','$Imagen')";
       
    }else{ // Actualizar
        $id = $_POST['Valor'];
        $query = "UPDATE  playlist SET Nombre = '$Nombre', Enlace = '$Enlace', Fecha = '$Fecha' ,  Activo = '$Activo', Imagen = '$Imagen' WHERE IdPlaylist = $id";
    }
    $result = mysqli_query($conexion, $query);
    
    if(!$result){
        echo 'No';
    }
    echo 'Ok';


}else if(!empty($_POST['id'])){// Eliminar Playlist
    $id = $_POST['id'];
    $queryDos = "SELECT Imagen FROM playlist WHERE IdPlaylist = $id";
    $resultDos = mysqli_query($conexion, $queryDos);
    
    while($row = mysqli_fetch_array($resultDos)){
        unlink("../Imagenes/ImagenesPlaylist/". $row['Imagen']);     
    }
    
    $query = "DELETE FROM playlist WHERE IdPlaylist = $id";
    $result = mysqli_query($conexion, $query);

    if(!$result  && !$resultDos){
        echo 'No';
    }
    echo 'Ok';
}else if(!empty($_POST['Editar'])){// Editar Playlist
    $id = $_POST['Editar'];
    
    $query = "SELECT * FROM `playlist` WHERE IdPlaylist = $id";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
        $json[] = array(
            'IdPlaylist' => $row['IdPlaylist'],
            'Nombre' => $row['Nombre'],
            'Enlace' => $row['Enlace'],
            'Fecha' => $row['Fecha'],
            'Activo' => $row['Activo'],
            'Imagen' => $row['Imagen']
        );
    }
    $jsonString = json_encode($json[0]);
    echo $jsonString;
}else if(!empty($_POST['Ver'])){// Lista las playlist en la pagina
   
    $query = "SELECT * FROM `playlist`  ORDER BY IdPlaylist DESC LIMIT 0, 5";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
       
        $json[] = array(
            'IdPlaylist' => $row['IdPlaylist'],
            'Nombre' => $row['Nombre'],
            'Enlace' => $row['Enlace'],
            'Fecha' => $row['Fecha'],
            'Activo' => $row['Activo'],
            'Imagen' => $row['Imagen']
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
}else if(!empty($_POST['Numero'])){// Numero de playlist creadas
    

    $query = "SELECT COUNT(*) fila FROM `playlist`";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
       
        $json[] = array(
            'Numero' => $row['fila'],
            
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
}

    



?>