<?php
include('./conexion/Conexion.php'); 


if(!empty($_POST['Listar'])){ // Listar Usuarios

    $query = 'SELECT * FROM `usuarios`';
    $Resultado = mysqli_query($conexion, $query);
    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
        $json[] = array(
            'IdUsuario' => $row['IdUsuario'],
            'Nombre' => $row['Nombre'],
            'Clave' => $row['Clave'],
            'Foto' => $row['Foto'],
            'IdCargo' => $row['IdCargo']
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;

}else if(!empty($_POST['Valor'])){ // Agregar Usuarios
    $Nombre = $_POST['Nombre'];
    $Clave = $_POST['Clave'];
    $Foto = $_POST['Foto'];
    $IdCargo = $_POST['IdCargo'];
    $Base64 = $_POST['Base64'];
    $MimeType = $_POST['MimeType'];
    
    $filepath = "../Imagenes/ImagenesUsuarios/$Foto"; 
    file_put_contents($filepath,base64_decode($Base64));


    if($_POST['Valor'] == "Crear"){ // Agregar
        $query = "INSERT into usuarios(Nombre, Clave, Foto, IdCargo) VALUES ('$Nombre','$Clave','$Foto','$IdCargo')";
       
    }else{ // Actualizar
        $id = $_POST['Valor'];
        $query = "UPDATE  playlist SET Nombre = '$Nombre', Clave = '$Clave', Foto = '$Foto' ,  IdCargo = '$IdCargo' WHERE IdUsuario = $id";
    }
    $result = mysqli_query($conexion, $query);
    
    if(!$result){
        echo 'No';
    }
    echo 'Ok';


}else if(!empty($_POST['id'])){// Eliminar Usuarios
    $id = $_POST['id'];
    $queryDos = "SELECT Foto FROM usuarios WHERE IdUsuario = $id";
    $resultDos = mysqli_query($conexion, $queryDos);
    
    while($row = mysqli_fetch_array($resultDos)){
        unlink("../Imagenes/ImagenesUsuarios/". $row['Foto']);     
    }
    
    $query = "DELETE FROM usuarios WHERE IdUsuario = $id";
    $result = mysqli_query($conexion, $query);

    if(!$result  && !$resultDos){
        echo 'No';
    }
    echo 'Ok';
}else if(!empty($_POST['Editar'])){// Editar Usuarios
    $id = $_POST['Editar'];
    
    $query = "SELECT * FROM usuarios WHERE IdUsuario = $id";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
        $json[] = array(
            'IdUsuario' => $row['IdUsuario'],
            'Nombre' => $row['Nombre'],
            'Clave' => $row['Clave'],
            'Foto' => $row['Foto'],
            'IdCargo' => $row['IdCargo']
        );
    }
    $jsonString = json_encode($json[0]);
    echo $jsonString;
}
    



?>