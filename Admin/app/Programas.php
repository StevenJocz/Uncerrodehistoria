<?php
include('./conexion/Conexion.php'); 


if(!empty($_POST['Listar'])){ // Listar Programas

    $query = 'SELECT * FROM `programas` INNER JOIN `dia` ON programas.Dia=dia.IdDia';
    $Resultado = mysqli_query($conexion, $query);
    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
        $json[] = array(
            'IdPrograma' => $row['IdPrograma'],
            'NombrePrograma' => $row['NombrePrograma'],
            'Dia' => $row['Dia'],
            'HoraInicio' => $row['HoraInicio'],
            'HoraFinal' => $row['HoraFinal'],
            'ImagenPrograma' => $row['ImagenPrograma'],
            'NombreDia' => $row['NombreDia']
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;

}else if(!empty($_POST['Valor'])){ // Agregar Programas
    $NombrePrograma = $_POST['NombrePrograma'];
    $Dia = $_POST['Dia'];
    $HoraInicio = $_POST['HoraInicio'];
    $HoraFinal = $_POST['HoraFinal'];
    $ImagenPrograma = $_POST['ImagenPrograma'];
    $Base64 = $_POST['Base64'];
    $MimeType = $_POST['MimeType'];
    
    $filepath = "../Imagenes/ImagenesProgramas/$ImagenPrograma"; 
    file_put_contents($filepath,base64_decode($Base64));


    if($_POST['Valor'] == "Crear"){ // Agregar
        $query = "INSERT into programas(NombrePrograma, Dia, HoraInicio,  HoraFinal, ImagenPrograma) VALUES ('$NombrePrograma','$Dia','$HoraInicio','$HoraFinal','$ImagenPrograma')";
       
    }else{ // Actualizar
        $id = $_POST['Valor'];
        $query = "UPDATE  programas SET NombrePrograma = '$NombrePrograma', Dia = '$Dia', HoraInicio = '$HoraInicio' ,  HoraFinal = '$HoraFinal', ImagenPrograma = '$ImagenPrograma' WHERE IdPrograma = $id";
    }
    $result = mysqli_query($conexion, $query);
    
    if(!$result){
        echo 'No';
    }
    echo 'Ok';


}else if(!empty($_POST['id'])){// Eliminar Noticias
    $id = $_POST['id'];
    $queryDos = "SELECT ImagenPrograma FROM programas WHERE IdPrograma = $id";
    $resultDos = mysqli_query($conexion, $queryDos);
    
    while($row = mysqli_fetch_array($resultDos)){
        unlink("../Imagenes/ImagenesProgramas/". $row['Imagen']);     
    }
    
    $query = "DELETE FROM programas WHERE IdPrograma = $id";
    $result = mysqli_query($conexion, $query);

    if(!$result  && !$resultDos){
        echo 'No';
    }
    echo 'Ok';
}else if(!empty($_POST['Editar'])){// Editar Noticias
    $id = $_POST['Editar'];
    
    $query = "SELECT * FROM `programas` INNER JOIN `dia` ON programas.Dia=dia.IdDia WHERE IdPrograma = $id";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
        $json[] = array(
            'IdPrograma' => $row['IdPrograma'],
            'NombrePrograma' => $row['NombrePrograma'],
            'Dia' => $row['Dia'],
            'HoraInicio' => $row['HoraInicio'],
            'HoraFinal' => $row['HoraFinal'],
            'ImagenPrograma' => $row['ImagenPrograma'],
            'NombreDia' => $row['NombreDia'],
        );
    }
    $jsonString = json_encode($json[0]);
    echo $jsonString;
}else if(!empty($_POST['Ver'])){// Lista los programas en la pagina
   
    $query = "SELECT * FROM `programas` INNER JOIN `dia` ON Dia.IdDia = programas.Dia ORDER BY IdPrograma DESC LIMIT 0, 4";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
       
        $json[] = array(
            'IdPrograma' => $row['IdPrograma'],
            'NombrePrograma' => $row['NombrePrograma'],
            'Dia' => $row['Dia'],
            'NombreDia' => $row['NombreDia'],
            'HoraInicio' => $row['HoraInicio'],
            'HoraFinal' => $row['HoraFinal'],
            'ImagenPrograma' => $row['ImagenPrograma']
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
}else if(!empty($_POST['DIA'])){// Lista los programas por días en la pagina
   
    $query = "SELECT * FROM `programas` WHERE Dia = DAYOFWEEK(curTime())";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
       
        $json[] = array(
            'NombrePrograma' => $row['NombrePrograma'],
            'HoraInicio' => $row['HoraInicio'],
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
}

    



?>