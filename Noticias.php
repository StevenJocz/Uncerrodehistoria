<?php

include('./Admin/app/conexion/Conexion.php'); 

    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $query = "SELECT * FROM noticias INNER JOIN `autor` ON noticias.IdAutor=autor.IdAutor INNER JOIN `categorias` ON noticias.IdCategoria=categorias.IdCategoria WHERE IdNoticia = $id";
        $Resultado = mysqli_query($conexion, $query);

        if(!$Resultado){
            die("Error".mysqli_error($conexion));
        }
    
        if(mysqli_num_rows($Resultado) == 1)
        {
            $row = mysqli_fetch_array($Resultado);
            $IdNoticia = $row['IdNoticia'];
            $Titulo = $row['Titulo'];
            $IdCategoria = $row['IdCategoria'];
            $Fecha = $row['Fecha'];
            $IdAutor = $row['IdAutor'];
            $Imagen = $row['Imagen'];
            $Contenido = $row['Contenido'];
            $Nombre = $row['Nombre'];
            $NombreCategoria = $row['NombreCategoria'];
        }
    }
    
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stereo Face</title>
    <link rel="shortcut icon" href="/4toRadio/assets/Img/favicon.png">
    <link rel="stylesheet" href="/4toRadio/assets/Estilos.css">
    <link rel="stylesheet" href="/4toRadio/assets/responsive.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <script src="/4toRadio/assets/Js/jquery.js"></script>
    <script src="/4toRadio/assets/Js/js.js"></script>
    <script src="/4toRadio/assets/Js/jsView.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.7/fullpage.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.7/fullpage.js"></script>
    
</head>
<body>
    <!-- (>‿◠) Jocz♬♪♫ -->
    <!-- ============= HEADER ============ -->
    <header class="menu">
        <div class="menu-Contenido">
            <a class="menu-a" href="">Stereo Face</a>
            <div class="menu-Iconos">
                <i class="fa-solid fa-circle-play iconos play" onclick="Play()"></i>

                <div class="Reproductor animate__animated animate__flipInX hide">
                    <div class="Reproductor_Control">
                        <div class="Control_Img">
                            <img class="Img_Cancion" src="https://acegif.com/wp-content/uploads/loading-25.gif" alt=""
                                onclick="Play()">
                        </div>
                        <div class="Reproductor_Control_Contenedor">
                            <i class="fa-solid fa-circle-pause iconos pausa" onclick="Play()"></i>
                            <i class="fa-solid fa-volume-high volumen" onclick="mostrarVolumen()"></i>

                            <div class="Control_Volumen">
                                <input type="range" class="RangoVolumen focused hide" min="1" max="100" value="50"
                                    orient="vertical" onchange="ControlVolumen();">
                            </div>
                        </div>
                        <div class="Reproductor_Control_P">
                            <p class="Nombre_Cancion">Cargando...</p>
                        </div>

                    </div>
                </div>
                <div class="Menu_Dos">
                    <i class="fa-brands fa-facebook iconos"></i>
                    <i class="fa-brands fa-instagram iconos"></i>
                    <a onclick="MenuLeftDos(1)">Home</a>
                    <span onclick="MenuLeftDos(5);">Enviar*</span>
                </div>

                <div class="burger" onclick="AbriMenuTogle();">
                    <div class="rect_Uno"></div>
                    <div class="rect_Dos"></div>
                </div>
            </div>
        </div>
    </header>

     <!-- ============= MENU OCULTO ============ -->
    <nav class="menu-Oculto">
        <ul>
            <li onclick="MenuLeftDos(1);">HOME</li>
            <li onclick="MenuLeftDos(4);">PROGRAMACIÓN</li>
            <li onclick="MenuLeftDos(2);">NOTICIAS</li>
            <li onclick="MenuLeftDos(3);">PLAYLIST</li>
            <li onclick="MenuLeftDos(5);">NOSOTROS</li>
            <li>CONTACTO</li>
            
        </ul>
    </nav>

    <!-- ============= NAV LEFT ============ -->
    <section class="navegacion-left">
        <div class="navegacion--left-Barra B-Uno Activo" onclick="MenuLeftDos(1);"></div>
        <div class="navegacion--left-Barra B-Cuatro" onclick="MenuLeftDos(4);"></div>
        <div class="navegacion--left-Barra B-Dos" onclick="MenuLeftDos(2);"></div>
        <div class="navegacion--left-Barra B-Tres"  onclick="MenuLeftDos(3);"></div>
        <p class="scrollDown">Creado por Steven Jocz</p>
    </section>
        <main class="view_Noticias">
            <section class="view_Noticias_Contenedor animate__animated animate__slideInLeft">
                <div class="view_Noticias_Contenedor_Encabezado">
                    <h1><?php echo $Titulo?></h1>
                    <img src="/4toRadio/Admin/Imagenes/ImagenesNoticias/<?php echo $Imagen?>" alt="">
                    <div class="view_Noticias_Contenedor_Encabezado_info">
                        <h3><?php echo $Nombre?></h3> 
                        <h3><?php echo $Fecha?></h3>
                    </div>
                    <h2 class="TextCategoria"><?php echo $NombreCategoria?></h2>
                </div>
                <div class="view_Noticias_Contenedor_Cuerpo">
                    <?php echo $Contenido?>
                </div>
            </section>
            <section class="view_Noticias_Recientes ">
               
                <h2>RECIENTE</h2>
                <?php  
                    include("./Admin/app/conexion/Conexion.php"); 
                    $query = "SELECT * FROM noticias ORDER BY IdNoticia DESC LIMIT 1, 1";
                    $result_blog = mysqli_query($conexion, $query);
                    while($row = mysqli_fetch_array($result_blog)){ ?>
                    <a href="/4toRadio/Noticias/<?php echo $row['IdNoticia']?>/<?php echo $row['enlace']?>"> 
                        <div class="view_Noticias_Recientes_Contenido">
                            <img src="/4toRadio/Admin/Imagenes/ImagenesNoticias/<?php echo $row['Imagen']?>" alt="">
                            <div class="view_Noticias_Recientes_Contenido_BG"></div>
                            <div class="view_Noticias_Recientes_Contenido_info">
                                <h1><?php echo $row['Titulo']?></h1>
                            </div>
                        </div>
                    </a>
                <?php  }?>
                <div class="view_Noticias_Recientes_publicidad">
                    <img src="/4toRadio/assets/Img/PAUTA-CON-NOSOTROS.png" alt="">
                </div>
                <?php  
                    include("./Admin/app/conexion/Conexion.php"); 
                    $query = "SELECT * FROM noticias ORDER BY IdNoticia DESC LIMIT 1";
                    $result_blog = mysqli_query($conexion, $query);
                    while($row = mysqli_fetch_array($result_blog)){ ?>
                    <a href="/4toRadio/Noticias/<?php echo $row['IdNoticia']?>/<?php echo $row['enlace']?>"> 
                        <div class="view_Noticias_Recientes_Contenido">
                            <img src="/4toRadio/Admin/Imagenes/ImagenesNoticias/<?php echo $row['Imagen']?>" alt="">
                            <div class="view_Noticias_Recientes_Contenido_BG"></div>
                            <div class="view_Noticias_Recientes_Contenido_info">
                                <h1><?php echo $row['Titulo']?></h1>
                            </div>
                        </div>
                    </a>
                <?php  }?>
                
            </section>
        </main>

    <!-- (>‿◠) Jocz ♬♪♫ -->
</body>

</html>