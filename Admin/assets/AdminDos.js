function pageLoad() {

    // Estilos en los ddl
    $('.ddl').select2();
    $('.ddl').css('width', '100%');
   
}

if (document.addEventListener){
  Sesion();
}

function Sesion(){
  var Sesion = 1;
  $.post('./app/Generico.php',{ Sesion } , function(response){
      console.log(response);
      if(response == "No"){
          $(location).attr('href','../Admin/');
      }
  })
}
function CerrarSesion(){
  var CerrarSesion = 1;
  $.post('./app/Generico.php',{ CerrarSesion } , function(response){
      console.log(response);
      if(response == "No"){
          $(location).attr('href','../Admin/');
      }
  })

}
/*======== MENU ======*/

function Menu(valor){
    switch (valor) {
      case 1:
        $('.Home').removeClass('hide');
        $('.Noticias').addClass('hide');
        $('.Programas').addClass('hide');
        $('.Playlist').addClass('hide');
        $('.Staff').addClass('hide');
        $('.Configuracion').addClass('hide');
       
        break;
      case 2:
          $(".spinnerBackdrop").fadeIn();
          setTimeout(function(){
            $(".spinnerBackdrop").fadeOut();
            $('.Home').addClass('hide');
            $('.Noticias').removeClass('hide');
            $('.Programas').addClass('hide');
            $('.Playlist').addClass('hide');
            $('.Staff').addClass('hide');
            $('.Configuracion').addClass('hide');
            Listar_Noticia();
            $(".spinnerBackdrop").fadeOut();
        }, 1000);
        
        break;
      case 3:
        $(".spinnerBackdrop").fadeIn();
        setTimeout(function(){
            $('.Home').addClass('hide');
            $('.Noticias').addClass('hide');
            $('.Programas').removeClass('hide');
            $('.Playlist').addClass('hide');
            $('.Staff').addClass('hide');
            $('.Configuracion').addClass('hide');
            Listar_Programa();
            $(".spinnerBackdrop").fadeOut();
        }, 1000);
        break;
      case 4:
        $(".spinnerBackdrop").fadeIn();
        setTimeout(function(){
          $('.Home').addClass('hide');
          $('.Noticias').addClass('hide');
          $('.Programas').addClass('hide');
          $('.Playlist').removeClass('hide');
          $('.Staff').addClass('hide');
          $('.Configuracion').addClass('hide');
          Listar_Playlist()
          $(".spinnerBackdrop").fadeOut();
        }, 1000);
        break;
      case 5:
        $(".spinnerBackdrop").fadeIn();
        setTimeout(function(){
          $('.Home').addClass('hide');
          $('.Noticias').addClass('hide');
          $('.Programas').addClass('hide');
          $('.Playlist').addClass('hide');
          $('.Staff').removeClass('hide');
          $('.Configuracion').addClass('hide');
        Listar_Staff();
        $(".spinnerBackdrop").fadeOut();
      }, 1000);
        break;
      case 6:
        $('.Home').addClass('hide');
        $('.Noticias').addClass('hide');
        $('.Programas').addClass('hide');
        $('.Playlist').addClass('hide');
        $('.Staff').addClass('hide');
        $('.Configuracion').removeClass('hide');
        break;
    }
  
}


/*======================== Modales ==================*/
// Noticias 
function ModalNoticia(id){
    if(id==1){
        $('#ModalNoticias').modal('show');
        cargarTiny('#ContenidoNoticias', 700); 
        $('.btn_GuardarNoticia').removeClass('d-none');
        $('.btn_ActualizarNoticia').addClass('d-none');
    }else if(id==3){
      $('#ModalNoticias').modal('show');
      $('.btn_GuardarNoticia').addClass('d-none');
      $('.btn_ActualizarNoticia').removeClass('d-none');

    }else{
        $('#ModalNoticias').modal('hide');
        LimpiarModalNoticias();
    }
}

// Programas
function ModalProgramas(id){
  if(id==1){
      $('#ModalProgramas').modal('show');
      $('.btn_GuardarPrograma').removeClass('d-none');
      $('.btn_ActualizarPrograma').addClass('d-none');
  }else if(id==3){
    $('#ModalProgramas').modal('show');
    $('.btn_GuardarPrograma').addClass('d-none');
    $('.btn_ActualizarPrograma').removeClass('d-none');

  }else{
      $('#ModalProgramas').modal('hide');
      LimpiarModalPrograma();
  }
}

// Playlist
function ModalPlaylist(id){
  if(id==1){
      $('#ModalPlaylist').modal('show');
      $('.btn_GuardarPlaylist').removeClass('d-none');
      $('.btn_ActualizarPlaylist').addClass('d-none');
  }else if(id==3){
    $('#ModalPlaylist').modal('show');
    $('.btn_GuardarPlaylist').addClass('d-none');
    $('.btn_ActualizarPlaylist').removeClass('d-none');

  }else{
      LimpiarModalPlaylist()
      $('#ModalPlaylist').modal('hide');
  }
}

// Staff
function ModalStaff(id) {
  if (id == 1) {
    $('#ModalStaff').modal('show'); 
    $('.btn_GuardarStaff').removeClass('d-none');
    $('.btn_ActualizarStaff').addClass('d-none');
  } else if (id == 3) {
    $('#ModalStaff').modal('show');
    $('.btn_GuardarStaff').addClass('d-none');
    $('.btn_ActualizarStaff').removeClass('d-none');

  } else {
    $('#ModalStaff').modal('hide');
    LimpiarModalStaff();
  }
}

/*======================== GENERICOS ==================*/
// Carga Imagen
var ValorImagen = 0;
function CargarImagen(id){
  ValorImagen = id;
  if(id== 1){
    $('.inputfileNoticias').click();
  }else if(id== 2){
    $('.inputfileProgramas').click();
  }else if(id== 3){
    $('.inputfilePlaylist').click();
  }else if(id== 4){
    $('.inputfileStaff').click();
  }
    
}

function readURL(input) {
    if (input.files && input.files[0]) { //Revisamos que el input tenga contenido
      var reader = new FileReader(); //Leemos el contenido
      
      reader.onload = function(e) { //Al cargar el contenido lo pasamos como atributo de la imagen de arriba
        if(ValorImagen == 1){
          $('#ImagenMuestraN').attr('src', e.target.result);
        }else if(ValorImagen == 2){
          $('#ImagenMuestraP').attr('src', e.target.result);
        }else if(ValorImagen == 3){
          $('#ImagenMuestraPLA').attr('src', e.target.result);
        }else if(ValorImagen == 4){
          $('#ImagenMuestraStaff').attr('src', e.target.result);
        }
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  if(ValorImagen == 1){
    $(".inputfileNoticias").change(function() { 
      readURL(this);
    });

  }else if(ValorImagen == 2){
    $(".inputfileProgramas").change(function() { 
      readURL(this);
    });
  }else if(ValorImagen == 3){
    $(".inputfilePlaylist").change(function() { 
      readURL(this);
    });
  }else if(ValorImagen == 4){
    $(".inputfileStaff").change(function() { 
      readURL(this);
    });
  }
 


  // Carga la libreria de tinyMCE
function cargarTiny(Id, tamaño) {
  tinymce.init({
      selector: Id,
      plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: '',
    toolbar: 'quickimage  media forecolor backcolor| bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | link ',
    toolbar_sticky: true, 
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    content_css: '//www.tiny.cloud/css/codepen.min.css',
    importcss_append: true,
    height: 400,
    height: 600,
    language: 'es',
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: 'sliding',
    contextmenu: "link image imagetools table",
  });


}



