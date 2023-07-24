// (>‿◠) Jocz ♬♪♫




// ====== MENU =======


//Abrir menu
var activoNumero = 0;
function AbriMenu(activo) {
  if (activo == 0) {
    $('.rect_Uno').addClass('rotar_Uno');
    $('.rect_Dos').addClass('rotar_Dos');
    $('.menu-Oculto').animate({
      height: "100vh",
      top: "0",
    }, 500);
  } else{
    $('.rect_Uno').removeClass('rotar_Uno');
    $('.rect_Dos').removeClass('rotar_Dos');
    $('.menu-Oculto').animate({
      height: "0",
      top: "-300%"
    }, 500);
  }

}

//Abrir menu
var activoNumero = 0;
function AbriMenuTogle() {
  if (activoNumero == 0) {
    $('.rect_Uno').addClass('rotar_Uno');
    $('.rect_Dos').addClass('rotar_Dos');
    $('.menu-Oculto').animate({
      height: "100vh",
      top: "0",
    }, 500);
    activoNumero = 1;
  } else if (activoNumero == 1){
    $('.rect_Uno').removeClass('rotar_Uno');
    $('.rect_Dos').removeClass('rotar_Dos');
    $('.menu-Oculto').animate({
      height: "0",
      top: "-300%"
    }, 500);
    activoNumero = 0;
  }

}

// Navegacion

// Url de la navegación
$(function () {
  if (location.hash == "#Noticias") {
    MenuLeft(2);
  } else if (location.hash == "#Playlist") {
    MenuLeft(3);
  }else if (location.hash == "#Programacion") {
    MenuLeft(4);
  }else if (location.hash == "#Nosotros") {
    MenuLeft(5);
  } else {
    MenuLeft(1);
  }
});


//moverse entre las seciones con el scroll

// var Valorscroll = 0;

// window.onscroll = function () {
//   if (screen.width > 1050) {
//     if (window.scrollY % 1 == 0) {
//       var num = window.scrollY;
//       ScrolMenu(num);

//     } else {
//       var split = String(window.scrollY);
//       var num = split.split(".");
//       var numResta = num[0];
//       numResta = parseInt(numResta) + 1;
//       ScrolMenu(numResta);
//       console.log("Vertical: " + numResta);
//     }
//   }

// };


function ScrolMenu(Valorscroll){
  if (Valorscroll == 1) {
    MenuLeft(4);
  } else if (Valorscroll == 2) {
    MenuLeft(2);
  } else if (Valorscroll == 3) {
    MenuLeft(3);
  } else if (Valorscroll == 0) {
    MenuLeft(1);
  } 
}



// ========= Menu =============== 
function MenuLeft(valor) {
  $('html, body').animate({scrollTop: 0}, 600);
  switch (valor) {
    case 1:
      $('.B-Uno').addClass('Activo');
      $('.B-Dos').removeClass('Activo');
      $('.B-Tres').removeClass('Activo');
      $('.B-Cuatro').removeClass('Activo');

      $('.Portada').removeClass('hide');
      $('.Noticias').addClass('hide');
      $('.Playlist').addClass('hide');
      $('.Programacion').addClass('hide');
      $('.Nosotros').addClass('hide');

      history.pushState(null, "", " ");


      Noticas(2, 0);
      Noticas(1, 2);
      Noticas(2, 1);
      break;
    case 2:
      $('.B-Uno').removeClass('Activo');
      $('.B-Dos').addClass('Activo');
      $('.B-Tres').removeClass('Activo');
      $('.B-Cuatro').removeClass('Activo');

      $('.Portada').addClass('hide');
      $('.Noticias').removeClass('hide');
      $('.Playlist').addClass('hide');
      $('.Programacion').addClass('hide');
      $('.Nosotros').addClass('hide');

      history.pushState("index.html", "", "#Noticias");

      Noticas(2, 0);
      Noticas(1, 1);
      ListarNoticias(2);
      break;
    case 3:
      $('.B-Uno').removeClass('Activo');
      $('.B-Dos').removeClass('Activo');
      $('.B-Tres').addClass('Activo');
      $('.B-Cuatro').removeClass('Activo');

      $('.Portada').addClass('hide');
      $('.Noticias').addClass('hide');
      $('.Playlist').removeClass('hide');
      $('.Programacion').addClass('hide');
      $('.Nosotros').addClass('hide');

      history.pushState("index.html", "", "#Playlist");
      
      ListarPlaylist();
      Noticas(2, 1);

      break;
    case 4:
      $('.B-Uno').removeClass('Activo');
      $('.B-Dos').removeClass('Activo');
      $('.B-Tres').removeClass('Activo');
      $('.B-Cuatro').addClass('Activo');

      $('.Portada').addClass('hide');
      $('.Noticias').addClass('hide');
      $('.Playlist').addClass('hide');
      $('.Programacion').removeClass('hide');
      $('.Nosotros').addClass('hide');

      history.pushState("index.html", "", "#Programacion");
     
      ListarProgramas();
      ListarProgramasXDia();
      Noticas(2, 1);
      break;
      case 5:
        $('.B-Uno').removeClass('Activo');
        $('.B-Dos').removeClass('Activo');
        $('.B-Tres').removeClass('Activo');
        $('.B-Cuatro').removeClass('Activo');
  
        $('.Portada').addClass('hide');
        $('.Noticias').addClass('hide');
        $('.Playlist').addClass('hide');
        $('.Programacion').addClass('hide');
        $('.Nosotros').removeClass('hide');
  
        history.pushState("index.html", "", "#Nosotros");
        VerTripulacion(4);
        VerTripulacion(2);
        break;
  }

}
// Animacion con el mouse
function mousemove(event) {
  

  if (screen.width > 1050 && screen.width < 1690 ) {
    $(".Img_Uno_Fondo").css("top", "-200." - event.pageY / 100 + "px");
    $(".Img_Uno_Fondo").css("left", "-150." - event.pageX / 100 + "px");

    $(".Img_Uno_Montana").css("top", "270." - event.pageY / 300 + "px");
    $(".Img_Uno_Montana").css("left", "-110" - event.pageX / 300 + "px");

    $(".Img_Dos_Luna").css("top", "170." - event.pageY / 100 + "px");
    $(".Img_Dos_Luna").css("left", "220." - event.pageX / 100 + "px");

    $(".Img_Tres_Nueve_Uno").css("top", "10" - event.pageY / 80 + "px");
    $(".Img_Tres_Nueve_Uno").css("left", "400" - event.pageX / 80 + "px");

    $(".Img_Tres_Nueve_Dos").css("top", "100" - event.pageY / 50 + "px");
    $(".Img_Tres_Nueve_Dos").css("left", "0" - event.pageX / 50 + "px");

    $(".Img_Tres_Nueve_Oscura_Uno").css("top", "400" - event.pageY / 50 + "px");
    $(".Img_Tres_Nueve_Oscura_Uno").css("left", "-100" - event.pageY / 50 + "px");

    $(".Img_Tres_Nueve_Oscura_Dos").css("top", "400" - event.pageY / 70 + "px");
    $(".Img_Tres_Nueve_Oscura_Dos").css("left", "500" - event.pageY / 70 + "px");

    $(".Img_Tres_Nueve_Oscura_Tres").css("top", "280" - event.pageY / 70 + "px");
    $(".Img_Tres_Nueve_Oscura_Tres").css("left", "550" - event.pageY / 40 + "px");

  }else if(screen.width > 1700){

    $(".Img_Uno_Fondo").css("top", "-170." - event.pageY / 100 + "px");
    $(".Img_Uno_Fondo").css("left", "-180." - event.pageX / 100 + "px");

    // $(".Img_Uno_Montana").css("top", "400." - event.pageY / 100 + "px");
    // $(".Img_Uno_Montana").css("left", "260." - event.pageX / 100 + "px");

    $(".Img_Dos_Luna").css("top", "250." - event.pageY / 100 + "px");
    $(".Img_Dos_Luna").css("left", "260." - event.pageX / 100 + "px");

    $(".Img_Tres_Nueve_Uno").css("top", "100" - event.pageY / 80 + "px");
    $(".Img_Tres_Nueve_Uno").css("left", "550" - event.pageX / 80 + "px");

    $(".Img_Tres_Nueve_Dos").css("top", "100" - event.pageY / 50 + "px");
    $(".Img_Tres_Nueve_Dos").css("left", "-20" - event.pageX / 50 + "px");

    $(".Img_Tres_Nueve_Oscura_Uno").css("top", "520" - event.pageY / 50 + "px");
    $(".Img_Tres_Nueve_Oscura_Uno").css("left", "-100" - event.pageY / 50 + "px");

    $(".Img_Tres_Nueve_Oscura_Dos").css("top", "650" - event.pageY / 70 + "px");
    $(".Img_Tres_Nueve_Oscura_Dos").css("left", "500" - event.pageY / 70 + "px");

    $(".Img_Tres_Nueve_Oscura_Tres").css("top", "430" - event.pageY / 70 + "px");
    $(".Img_Tres_Nueve_Oscura_Tres").css("left", "650" - event.pageY / 40 + "px");

  }


}
window.addEventListener('mousemove', mousemove);


// =======================  NOTICIAS ==============

// Mostrar Noticias previews
function ListarNoticias(Id) {
  var Noticia = 1;
  $.post('./Admin/app/Noticias.php', { Noticia, Id }, function (response) {

    let json = $.parseJSON(response);
    var conteo = 0;
    $.each(json, function (key, value) {
      conteo = conteo + 1;
      if (conteo == 1) { 
        var htmlUno = '<a href="./Noticias/'+value.IdNoticia +'/'+value.enlace+'"><div class="animate__animated animate__slideInRight animate__fast"><div class="Noticias_new_View_Uno_bg"></div>' +
          '<img src="./Admin/Imagenes/ImagenesNoticias/' + value.Imagen + '" alt="' + value.Titulo + '">' +
          '<div class="Noticias_new_View_Uno_titulo">' +
          '<h1>' + value.NombreCategoria + '</h1>' +
          '<h2>' + value.Titulo + '</h2>' +
          '<h1>' + value.Nombre + '</h1>' +
          '</div></div></a>';

        $(".Noticias_new_View_Uno").empty();
        $('.Noticias_new_View_Uno').append(htmlUno);

      } else if (conteo == 2) {
        var htmlDos = '<a href="./Noticias/'+value.IdNoticia +'/'+value.enlace+'"><div class="animate__animated animate__slideInRight animate__fast"><div class="Noticias_new_View_Dos_titulo">' +
          '<h1>' + value.NombreCategoria + '</h1>' +
          '<h2>' + value.Titulo + '</h2>' +
          '<h1>' + value.Nombre + '</h1>' +
          '</div>' +
          '<div class="Noticias_new_View_Dos_bg"></div>' +
          '<img src="./Admin/Imagenes/ImagenesNoticias/' + value.Imagen + '" alt="' + value.Titulo + '"></div></a>';

        $(".Noticias_new_View_Dos_C_Uno").empty();
        $('.Noticias_new_View_Dos_C_Uno').append(htmlDos);

      } else if (conteo = 3) {
        var htmlTres = '<a href="./Noticias/'+value.IdNoticia +'/'+value.enlace+'"><div class="animate__animated animate__slideInRight animate__fast"><div class="Noticias_new_View_Dos_titulo">' +
          '<h1>' + value.NombreCategoria + '</h1>' +
          '<h2>' + value.Titulo + '</h2>' +
          '<h1>' + value.Nombre + '</h1>' +
          '</div>' +
          '<div class="Noticias_new_View_Dos_bg"></div>' +
          '<img src="./Admin/Imagenes/ImagenesNoticias/' + value.Imagen + '" alt="' + value.Titulo + '"></div></a>';
        $(".Noticias_new_View_Dos_C_Dos").empty();
        $('.Noticias_new_View_Dos_C_Dos').append(htmlTres);
      }

    });

  });
}

// Mostrr los previews de las noticas
var ContadorUno = 0;
var ContadorDos = 0;
var timerId;
function Noticas(valor, id) {

  if (valor == 1) {
    timerId = setInterval(function () {

      if (id == 1) {

        if (ContadorDos == 0) {
          ListarNoticias(0);
          ContadorDos = ContadorDos + 1;
        } else if (ContadorDos == 1) {
          ListarNoticias(3);
          ContadorDos = ContadorDos + 1;
        } else {
          ListarNoticias(6);
          ContadorDos = 0;
        }
      }

    }, 10000);
  } else {
    clearInterval(timerId);
  }
}

// =======================  PLAYLIST ==============
// Mostrar Playlist
function ListarPlaylist() {
  var Ver = 1;
  $.post('./Admin/app/Playlist.php', { Ver }, function (response) {
    let json = $.parseJSON(response);
    var conteo = 0;
    var htmlPlaylist = "";
    $.each(json, function (key, value) {
      conteo = conteo + 1;
      htmlPlaylist += '<div class="Playlist_Contenedor__Contenido  animate__animated animate__slideInLeft">' +
        '<a href="' + value.Enlace + '" target="_blank">' +
        '<div class="Playlist_Contenedor__Contenido_Img"> ' +
        '<img src="./Admin/Imagenes/ImagenesPlaylist/' + value.Imagen + '" alt="">' +
        '</div>' +
        '<div class="Playlist_Contenedor__Contenido_gb">' +
        '<img src="./assets/Img/video-play.png" alt="">' +
        '</div>' +
        '<div class="Playlist_Contenedor__Contenido_titulo">' +
        '<h2>' + value.Nombre + '</h2>' +
        '<p>Stereo Face</p>' +
        '</div></a>' +
        '</div>'
    });
    $(".P_Conte__Uno").empty();
    $('.P_Conte__Uno').append(htmlPlaylist);


  });
}

// =======================  Programas ==============
// Mostrar Programas
function ListarProgramas() {
  var Ver = 1;
  $.post('./Admin/app/Programas.php', { Ver }, function (response) {
    let json = $.parseJSON(response);
    var conteo = 0;
    var htmlPrograma = "";
    $.each(json, function (key, value) {
      conteo = conteo + 1;
      var HoraInicio = FormatoHora(value.HoraInicio);
      var HoraFinal = FormatoHora(value.HoraFinal);
      htmlPrograma += ' <div class="show_contenido ">' +
        '<div class="show_contenido__Imagen">' +
        '<img src="./Admin/Imagenes/ImagenesProgramas/' + value.ImagenPrograma + '" alt="">' +
        '</div>' +
        '<div class="show_contenido__Titulo">' +
        '<h2>' + value.NombrePrograma + '</h2>' +
        '<h3>' + value.NombreDia + '<span> de ' + HoraInicio + ' a ' + HoraFinal + '</span></h3>' +
        '</div>' +
        '</div>'
    });
    $(".show_contenido__div").empty();
    $('.show_contenido__div').append(htmlPrograma);


  });
}

// Mostrar Programas
function ListarProgramasXDia() {
  var DIA = 1;
  $.post('./Admin/app/Programas.php', { DIA }, function (response) {
    let json = $.parseJSON(response);
    var conteo = 0;
    var htmlProgramaDia = "";
    $.each(json, function (key, value) {
      conteo = conteo + 1;
      var HoraInicio = FormatoHora(value.HoraInicio);
      htmlProgramaDia += '<div class="show_Horarios__Contenido">' +
        '<h2>' + HoraInicio + '</h2>' +
        '<p>' + value.NombrePrograma + '</p>' +
        '<p class="sh_StereoFace">Stereo Face</p>' +
        '</div>'
    });
    $(".show_Horarios").empty();
    $('.show_Horarios').append(htmlProgramaDia);


  });
}

// =======================  PLAYLIST ==============
// Mostrar Playlist
function ListarStaff() {
  var Listar = 'Listar';
  $.post('./Admin/app/Usuarios.php', { Listar }, function (response) {
    let json = $.parseJSON(response);
    var htmlPlaylist = "";
    $.each(json, function (key, value) {
      
      htmlPlaylist += '<div class="Nosotros_Contendor_Equipo_div_Persona">'+
      '<img src="./Admin/Imagenes/ImagenesUsuarios/'+value.Foto+'" alt="">'+
      '<div class="Nosotros_Contendor_Equipo_div_Persona_Nombre">'+
      '<h2>' + value.Nombre + '</h2>'+
      '<h3>' + value.NombreCargo + '</h3>'+
      '</div>'+
      '</div>'

    });
    $(".div_Nosotros").empty();
    $('.div_Nosotros').append(htmlPlaylist);


  });
}


// Cambiar formato de la hora
function FormatoHora(time) {
  time = time.split(':'); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12)
    timeValue = "" + hours;
  else if (hours > 12)
    timeValue = "" + (hours - 12);
  else if (hours == 0)
    timeValue = "12";


  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM
  return timeValue;

}

// Reproductor

const audio = new Audio(
  "https://play14.tikast.com:22057/stream"
);


var valorReproductor = 0;
function Play() {
  if (valorReproductor == 0) {
    $('.Reproductor').removeClass('hide');
    $('.play').addClass('hide');
    audio.load();
    audio.play();
    audio.volume = 50 / 100;

    valorReproductor = valorReproductor + 1;
  } else {
    $('.Reproductor').addClass('hide');
    $('.play').removeClass('hide');
    audio.pause();
    valorReproductor = valorReproductor - 1;
  }

}

var NombreCancion = ""
setInterval(()=>{
  $('.Nombre_Cancion').text(NombreCancion);
	fetch('https://radio30.virtualtronics.com:2199/rpc/stereoface/streaminfo.get')
	.then(res => res.json())
	.then(data => {
    var Datos = data.data[0];
    $('.Nombre_Cancion').text(Datos.song);
    NombreCancion =  Datos.song;
    $(".Img_Cancion").attr("src", "");
    $(".Img_Cancion").attr("src", Datos.track.imageurl);
	})
}, 3000);

function ControlVolumen(){
  var Cantidad = $('.RangoVolumen').val();
  audio.volume = Cantidad/ 100;
}

function mostrarVolumen(){
  $('.RangoVolumen').removeClass('hide');
}

$(document).on("click",function(e) {

  var container = $(".volumen");
  var containerDos = $(".RangoVolumen");

     if (!container.is(e.target) && container.has(e.target).length === 0 && !containerDos.is(e.target) && containerDos.has(e.target).length === 0) {
      $('.RangoVolumen').addClass('hide')
     }
});



// ========= NOSOTROS =========


function VerTripulacion(id){
  $('html, body').animate({scrollTop: 0}, 600);
  if(id== 1){
    $('.Nosotros_Contendor_EnviarMusica').removeClass('hide');
    $('.Nosotros_Contendor_about').addClass('hide');
  }else if(id == 2){
    $('.Nosotros_Contendor_EnviarMusica').addClass('hide');
    $('.Nosotros_Contendor_about').removeClass('hide');
  }else if(id == 3){
    $('.Nosotros_Contendor_Equipo').removeClass('hide');
    $('.Nosotros_Contendor_about').addClass('hide');
    ListarStaff();
    
  }else if(id == 4){
    $('.Nosotros_Contendor_Equipo').addClass('hide');
    $('.Nosotros_Contendor_about').removeClass('hide');
    
  }
}


function ContinuarFormulario(id){
  $('html, body').animate({scrollTop: 0}, 600);
  if(id== 1){
    $('.Nosotros_Contendor_EnviarMusica_Formulario').addClass('hide');
    $('.EnviarMusica_Formulario_PasoDos').removeClass('hide');

  }else if(id == 2){
    $('.Nosotros_Contendor_EnviarMusica_Formulario').removeClass('hide');
    $('.EnviarMusica_Formulario_PasoDos').addClass('hide');
  }else if(id == 3){
    $('.EnviarMusica_Formulario_PasoSubirMusica ').removeClass('hide');
    $('.EnviarMusica_Formulario_PasoDos').addClass('hide');
  }else if(id == 4){
    $('.EnviarMusica_Formulario_PasoSubirMusica ').addClass('hide');
    $('.EnviarMusica_Formulario_PasoDos').removeClass('hide');
  }
}


// Validar formularios
function validadFormularios(id) {
  if (id == 1) {
    var nombreBanda = $('.nombreBanda').val();
    var nombreCancion = $('.nombreCancion').val();
    var generoMusical = $('.generoMusical').val();

    if (nombreBanda == "") {
      TiempoAdvertencia();

    } else if (nombreCancion == "") {
      TiempoAdvertencia();

    } else if (generoMusical == "") {
      TiempoAdvertencia();

    } else {
      $('.Advertencia').addClass('hide');
      ContinuarFormulario(1);
     
    }

  } else if (id == 2) {
    var nombreAutorizado = $('.nombreAutorizado').val();
    var ciudad = $('.ciudad').val();
    var pais = $('.pais').val();
    var correo = $('.correo').val();
    var telefono = $('.telefono').val();
    var firma = $('.firma').val();

    if (nombreAutorizado == "") {
      TiempoAdvertencia();

    } else if (ciudad == "") {
      TiempoAdvertencia();

    } else if (pais == "") {
      TiempoAdvertencia();

    } else if (correo == "") {
      TiempoAdvertencia();

    } else if (telefono == "") {
      TiempoAdvertencia();

    } else if (firma == "") {
      TiempoAdvertencia();

    } else {
      $('.Advertencia').addClass('hide');
      ContinuarFormulario(3);
    }
  }
}

function TiempoAdvertencia() {
  $('.Advertencia').removeClass('hide');

  setTimeout(function () {
    $('.Advertencia').addClass('hide');
  }, 5000);

}