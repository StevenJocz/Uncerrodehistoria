<?php
include('./conexion/Conexion.php'); 


if(!empty($_POST['Listar'])){ // Listar Noticias

    $query = 'SELECT * FROM `noticias` INNER JOIN `autor` ON noticias.IdAutor=autor.IdAutor INNER JOIN `categorias` ON noticias.IdCategoria=categorias.IdCategoria';
    $Resultado = mysqli_query($conexion, $query);
    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
        $json[] = array(
            'IdNoticia' => $row['IdNoticia'],
            'Titulo' => $row['Titulo'],
            'IdCategoria' => $row['IdCategoria'],
            'Fecha' => $row['Fecha'],
            'IdAutor' => $row['IdAutor'],
            'Imagen' => $row['Imagen'],
            'Contenido' => $row['Contenido'],
            'Nombre' => $row['Nombre'],
            'NombreCategoria' => $row['NombreCategoria'],
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;

}else if(!empty($_POST['Valor'])){ // Agregar Noticias
    $Titulo = $_POST['Titulo'];
    $Url = $_POST['url'];
    $IdCategoria = $_POST['IdCategoria'];
    $Fecha = $_POST['Fecha'];
    $IdAutor = $_POST['IdAutor'];
    $Imagen = $_POST['Imagen'];
    $Contenido = $_POST['Contenido'];
    $Base64 = $_POST['Base64'];
    $MimeType = $_POST['MimeType'];

    $filepath = "../Imagenes/ImagenesNoticias/$Imagen"; 
    file_put_contents($filepath,base64_decode($Base64));


    if($_POST['Valor'] == "Crear"){
        $query = "INSERT into noticias(Titulo, IdCategoria, Fecha,  IdAutor, Imagen, Contenido, enlace) VALUES ('$Titulo','$IdCategoria','$Fecha','$IdAutor','$Imagen','$Contenido', '$Url')";
       
    }else{
        $id = $_POST['Valor'];
        $query = "UPDATE  noticias SET  Titulo = '$Titulo', IdCategoria = '$IdCategoria' ,Fecha = '$Fecha',  IdAutor = '$IdAutor', Imagen = '$Imagen', Contenido = '$Contenido', enlace = '$Url' WHERE IdNoticia = $id";
    }
    $result = mysqli_query($conexion, $query);
    
    if(!$result){
        echo 'No';
    }
    echo 'Ok';


}else if(!empty($_POST['id'])){// Eliminar Noticias
    $id = $_POST['id'];
    $queryDos = "SELECT Imagen FROM noticias WHERE IdNoticia = $id";
    $resultDos = mysqli_query($conexion, $queryDos);
   
    while($row = mysqli_fetch_array($resultDos)){
        unlink("../Imagenes/ImagenesNoticias/". $row['Imagen']);     
    }
    
    $query = "DELETE FROM noticias WHERE IdNoticia = $id";
    $result = mysqli_query($conexion, $query);

    if(!$result  && !$resultDos){
        echo 'No';
    }
    echo 'Ok';
}else if(!empty($_POST['Editar'])){// Editar Noticias
    $id = $_POST['Editar'];
    
    $query = "SELECT * FROM noticias INNER JOIN `autor` ON noticias.IdAutor=autor.IdAutor INNER JOIN `categorias` ON noticias.IdCategoria=categorias.IdCategoria WHERE IdNoticia = $id";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
        $json[] = array(
            'IdNoticia' => $row['IdNoticia'],
            'Titulo' => $row['Titulo'],
            'IdCategoria' => $row['IdCategoria'],
            'Fecha' => $row['Fecha'],
            'IdAutor' => $row['IdAutor'],
            'Imagen' => $row['Imagen'],
            'Contenido' => $row['Contenido'],
            'Nombre' => $row['Nombre'],
            'NombreCategoria' => $row['NombreCategoria'],

        );
    }
    $jsonString = json_encode($json[0]);
    echo $jsonString;
    
}
else if(!empty($_POST['Ver'])){// Lista las Noticias para la pagina  home
    $id = $_POST['Id'];

    $query = "SELECT * FROM noticias INNER JOIN `autor` ON noticias.IdAutor=autor.IdAutor INNER JOIN `categorias` ON noticias.IdCategoria=categorias.IdCategoria ORDER BY IdNoticia DESC LIMIT $id, 1";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
       
        $json[] = array(
            'IdNoticia' => $row['IdNoticia'],
            'Titulo' => $row['Titulo'],
            'IdCategoria' => $row['IdCategoria'],
            'Fecha' => $row['Fecha'],
            'IdAutor' => $row['IdAutor'],
            'Imagen' => $row['Imagen'],
            'Contenido' => $row['Contenido'],
            'Nombre' => $row['Nombre'],
            'NombreCategoria' => $row['NombreCategoria'],
            'enlace' => $row['enlace'],
        );
    }
    $jsonString = json_encode($json[0]);
    echo $jsonString;
}
else if(!empty($_POST['Noticia'])){// Lista las Noticias para la pagina  home
    $id = $_POST['Id'];

    $query = "SELECT * FROM noticias INNER JOIN `autor` ON noticias.IdAutor=autor.IdAutor INNER JOIN `categorias` ON noticias.IdCategoria=categorias.IdCategoria ORDER BY IdNoticia DESC LIMIT $id, 3";
    $Resultado = mysqli_query($conexion, $query);

    if(!$Resultado){
        die("Error".mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($Resultado)){
       
        $json[] = array(
            'IdNoticia' => $row['IdNoticia'],
            'Titulo' => $row['Titulo'],
            'IdCategoria' => $row['IdCategoria'],
            'Fecha' => $row['Fecha'],
            'IdAutor' => $row['IdAutor'],
            'Imagen' => $row['Imagen'],
            'Contenido' => $row['Contenido'],
            'Nombre' => $row['Nombre'],
            'NombreCategoria' => $row['NombreCategoria'],
            'enlace' => $row['enlace'],
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
}
else if(!empty($_POST['Numero'])){// numero de Noticias creadas
    

    $query = "SELECT COUNT(*) fila FROM `noticias`";
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