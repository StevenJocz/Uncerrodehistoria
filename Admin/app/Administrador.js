// ================= Genericos ============== =====


function CantidadNoticias(){
    var Numero = 1;
    $.post('./app/Noticias.php', {Numero}, function(response){
        let json = $.parseJSON(response);
        $.each(json, function (key, value) {
          $('.NumeroNoticias').text(value.Numero);
        });
       
      });
}


function CantidadPlaylist(){
    var Numero = 1;
    $.post('./app/Playlist.php', {Numero}, function(response){
        let json = $.parseJSON(response);
        $.each(json, function (key, value) {
          $('.NumeroPlaylist').text(value.Numero);
        });
       
      });
}

function CantidadFotos(){
    var Numero = 1;
    $.post('./app/Generico.php', {Numero}, function(response){
        $('.NumeroFotos').text(response);
      });
}

if (document.addEventListener){
    CantidadPlaylist();
    CantidadNoticias();
    CantidadFotos();
}

// =================== NOTICIAS ================

// Limpiar Modal
function LimpiarModalNoticias(){
    $('.TextTitulo').val('');
    $('.ddlCategoria').val('0');    
    $('.TextFecha').val('');
    var IdAutor = 0;
    $('.inputfileNoticias').val('');
    var tinymce_editor_id = 'ContenidoNoticias';
    tinymce.get(tinymce_editor_id).setContent('');
    $('#ImagenMuestraN').attr('src', 'https://www.quicideportes.com/assets/images/custom/no-image.png');
}


// Lista las Noticias
var tablaNoticias = $('#tablaNoticias').DataTable();
function Listar_Noticia(){
    
    cargarTiny('#ContenidoNoticias', 700);
    var Listar = 'Listar';
    $.ajax({
        type: "POST",
        url: 'app/Noticias.php',
        data: {Listar: Listar},
        success: function (data) {
            var Filas;
            let json = $.parseJSON(data);
            $.each(json, function (key, value) {
                Filas += '<tr class="text-center" >' +
                '<td class="td hide">' + value.IdNoticia + '</td>' +
                    '<td class="td">' + value.Titulo + '</td>' +
                    '<td class="td">' + value.Fecha + '</td>' +
                    '<td class="td">' + value.NombreCategoria + '</td>'+
                    '<td class="td">' + value.Nombre + '</td>'+
                    '<td class="td"><button  type="button" class="btn btn-info fa fa-pencil m-2" onclick="EditarNoticia(' + value.IdNoticia + ')" toggle="tooltip" title="Editar"><button type="button" class="btn btn-warning fa fa-trash EliminarNoticia" onclick="EliminarNoticia(' + value.IdNoticia + ');" toggle="tooltip" title="Eliminar"></td>'+
                    '</tr>';
            });
            tablaNoticias.clear();
            tablaNoticias.destroy();
            $('#tablaNoticias tbody').empty();
            $('#tablaNoticias tbody').append(Filas);
            $(document).ready(function () {
                if (!$.fn.dataTable.isDataTable('#tablaNoticias')) {
                    $('#tablaNoticias').data('cargado', true);
                    tablaNoticias = $('#tablaNoticias').DataTable({
                        orderCellsTop: true,
                        fixedHeader: true,
                        bFilter: true,
                        paging: true,
                        order: [[0, 'desc']],
                        language: {
                            "searchPlaceholder": "Buscar...",
                            "search": "Buscar:",
                            "decimal": "",
                            "emptyTable": "No hay información",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                            "infoEmpty": "Mostrando 0 a 0 de 0 registros",
                            "infoFiltered": "(Filtrado desde _MAX_ registros totales)",
                            "infoPostFix": "",
                            "thousands": ",",
                            "lengthMenu": "Mostrar _MENU_ registros",
                            "loadingRecords": "Cargando...",
                            "processing": "Procesando...",
                            "paginate": {
                                "first": "Primero",
                                "last": "Último",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                        }
                    });
                }
            });
        }
    });
}

// Guardar Noticias
function GuardarNoticias(accion){
    $(".spinnerBackdrop").fadeIn();
    $('#MensajeDeEspera').html('Por favor espere...');
    var Titulo = $('.TextTitulo').val();
    var url = $('.TextTitulo').val();
    var IdCategoria = parseInt($('.ddlCategoria').val());    
    var Fecha = $('.TextFecha').val();
    var IdAutor = 1;
    var Imagen = $('.inputfileNoticias').val();
    var Contenido = $('#tinymce[data-id="ContenidoNoticias"]', $('#ContenidoNoticias_ifr').contents()).html();
    var Content =  tinyMCE.get("ContenidoNoticias").getContent();

    var d = BaseArchivo.split("base64,");
    var MimeType = d[0].replace("data:", "").replace(";", "");

    if(accion == 1){
        if (Imagen == ""){
            MostrarMensajeGenerico("¡Debes seleccionar una imagen para la portada de la noticia!", "", "warning");
            $(".spinnerBackdrop").fadeOut();
        }
    }
    
    if(Titulo == ""){
        MostrarMensajeGenerico("¡Debe Ingresar un título!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
        
    }else if (IdCategoria == 0){
        MostrarMensajeGenerico("¡Debes seleccionar una categoría!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    
    }else if (Content == ""){
        MostrarMensajeGenerico("¡Debes agregar contenido a la noticia!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    
    }else{

        if (Fecha == ""){
            let date = new Date();
            Fecha =  String( date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' +  date.getDate()).padStart(2, '0');
           
        }

        var Objecto = {};
        var Mensaje = "";
        if(accion== 1){
            Mensaje = "Guardo";
             Objecto = {
                Valor: "Crear",
                Titulo: Titulo,
                url: url.replace(/\s+/g,'-'),
                IdCategoria: IdCategoria,      
                Fecha: Fecha,
                IdAutor: IdAutor,
                Imagen: Imagen.split('\\').pop(),
                Contenido: Contenido,
                Base64: d[1],
                MimeType: MimeType
            };
        }else{
            Mensaje = "Actualizar";
            var id = $('.inputIdNoticia').val();
            Objecto = {
                Valor: id,
                Titulo: Titulo,
                url: url.replace(/\s+/g,'-'),
                IdCategoria: IdCategoria,      
                Fecha: Fecha,
                IdAutor: IdAutor,
                Imagen: Imagen.split('\\').pop(),
                Contenido: Contenido,
                Base64: d[1],
                MimeType: MimeType
            };
        }
        
        
       $.post('app/Noticias.php', Objecto, function(response){

            if(response== "Ok"){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sé '+ Mensaje +' correctamente',
                    showConfirmButton: false,
                    timer: 2000
                })

                Listar_Noticia();

            }else if(response== "No"){
                Swal.fire(
                    'Error',
                    'Por favor intentalo mas tarde',
                    'warning'
                )
            }
        })
        LimpiarModalNoticias();
        ModalNoticia(2);
       $(".spinnerBackdrop").fadeOut();
    }
}

// Eliminar Noticia
function EliminarNoticia(id){
    Swal.fire({
        title: '¿Está seguro de eliminar esta publicación?',
        html: "Tenga en cuenta que esta acción no tendrá reverso",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0b5ed7',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value == true) {
            $.post('app/Noticias.php', {id}, function(response){
                Listar_Noticia();
            });
        }
    });
}

// Editar Noticia
function EditarNoticia(Editar){
    $.post('app/Noticias.php', {Editar}, function(response){
        var valor =  $.parseJSON(response);
        $('.TextTitulo').val(valor.Titulo);
        $('.ddlCategoria').val(valor.IdCategoria);    
        $('.TextFecha').val(valor.Fecha);
        $('#ImagenMuestraN').attr('src', './Imagenes/ImagenesNoticias/'+valor.Imagen);
        $('.inputIdNoticia').val(valor.IdNoticia);
        tinymce.get('ContenidoNoticias').setContent(valor.Contenido);
        ModalNoticia(3);
    });
}


// =================== PROGRAMAS ================

// Limpiar Modal
function LimpiarModalPrograma(){
    $('.TextNombrePrograma').val('');
    $('.ddlDia').val(0);
    $('.TextHoraInicial').val('');    
    $('.TextHoraFinal').val('');
    $('.inputfileProgramas').val('');
    $('#ImagenMuestraN').attr('src', 'https://www.quicideportes.com/assets/images/custom/no-image.png');
}

// Lista lo programa
var tablaPrograma = $('#tablaPrograma').DataTable();
function Listar_Programa(){
    var Listar = 'Listar';
    $.ajax({
        type: "POST",
        url: 'app/Programas.php',
        data: {Listar: Listar},
        success: function (data) {
            var Filas;
            let json = $.parseJSON(data);
            $.each(json, function (key, value) {
                Filas += '<tr class="text-center" >' +
                '<td class="td hide">' + value.IdPrograma + '</td>' +
                    '<td class="td">' + value.NombrePrograma + '</td>' +
                    '<td class="td">' + value.NombreDia + '</td>' +
                    '<td class="td">De ' + value.HoraInicio + ' a ' + value.HoraFinal + ' </td>'+
                    '<td class="td"><button  type="button" class="btn btn-info fa fa-pencil m-2" onclick="EditarPrograma(' + value.IdPrograma + ')" toggle="tooltip" title="Editar"><button type="button" class="btn btn-warning fa fa-trash EliminarNoticia" onclick="EliminarPrograma(' + value.IdPrograma + ');" toggle="tooltip" title="Eliminar"></td>'+
                    '</tr>';
            });
            tablaPrograma.clear();
            tablaPrograma.destroy();
            $('#tablaPrograma tbody').empty();
            $('#tablaPrograma tbody').append(Filas);
            $(document).ready(function () {
                if (!$.fn.dataTable.isDataTable('#tablaPrograma')) {
                    $('#tablaPrograma').data('cargado', true);
                    tablaPrograma = $('#tablaPrograma').DataTable({
                        orderCellsTop: true,
                        fixedHeader: true,
                        bFilter: true,
                        paging: true,
                        order: [[0, 'desc']],
                        language: {
                            "searchPlaceholder": "Buscar...",
                            "search": "Buscar:",
                            "decimal": "",
                            "emptyTable": "No hay información",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                            "infoEmpty": "Mostrando 0 a 0 de 0 registros",
                            "infoFiltered": "(Filtrado desde _MAX_ registros totales)",
                            "infoPostFix": "",
                            "thousands": ",",
                            "lengthMenu": "Mostrar _MENU_ registros",
                            "loadingRecords": "Cargando...",
                            "processing": "Procesando...",
                            "paginate": {
                                "first": "Primero",
                                "last": "Último",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                        }
                    });
                }
            });
        }
    });
}

// Guarda Noticias
function GuardarPrograma(accion){
    $(".spinnerBackdrop").fadeIn();
    $('#MensajeDeEspera').html('Por favor espere...');
    var NombrePrograma = $('.TextNombrePrograma').val();
    var Dia = $('.ddlDia').val();
    var HoraInicio =$('.TextHoraInicial').val();    
    var HoraFinal = $('.TextHoraFinal').val();
    var ImagenPrograma = $('.inputfileProgramas').val();

    
    var d = BaseArchivo.split("base64,");
    var MimeType = d[0].replace("data:", "").replace(";", "");

    if(accion == 1){
        if (ImagenPrograma == ""){
            MostrarMensajeGenerico("¡Debes seleccionar una imagen del programa!", "", "warning");
            $(".spinnerBackdrop").fadeOut();
        }
    }
    
    if(NombrePrograma == ""){
        MostrarMensajeGenerico("¡Debe Ingresar el nombre del programa!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
        
    }else if (Dia == 0){
        MostrarMensajeGenerico("¡Debes seleccionar el día en que se presenta el programa!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    
    }else if (HoraInicio == ""){
        MostrarMensajeGenerico("¡Debes agregar la hora inicial en que se presenta el programa!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    
    }else if (HoraFinal == ""){
        MostrarMensajeGenerico("¡Debes agregar la hora final que termina el programa!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    
    }else{

        var Objecto = {};
        var Mensaje = "";
        if(accion== 1){
            Mensaje = "Agregado";
             Objecto = {
                Valor: "Crear",
                NombrePrograma: NombrePrograma,
                Dia: Dia,
                HoraInicio: HoraInicio,      
                HoraFinal: HoraFinal,
                ImagenPrograma: ImagenPrograma.split('\\').pop(),
                Base64: d[1],
                MimeType: MimeType
            };
        }else{
            Mensaje = "Actualizar";
            var id =  $('.inputIdPrograma').val();
            Objecto = {
                Valor: id,
                NombrePrograma: NombrePrograma,
                Dia: Dia,
                HoraInicio: HoraInicio,      
                HoraFinal: HoraFinal,
                ImagenPrograma: ImagenPrograma.split('\\').pop(),
                Base64: d[1],
                MimeType: MimeType
            };
        }
        
        
       $.post('app/Programas.php', Objecto, function(response){

            if(response== "Ok"){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sé '+ Mensaje +' correctamente',
                    showConfirmButton: false,
                    timer: 2000
                })

                

            }else if(response== "No"){
                Swal.fire(
                    'Error',
                    'Por favor intentalo mas tarde',
                    'warning'
                )
            }
        })
        ModalProgramas(2);
        Listar_Programa();
       $(".spinnerBackdrop").fadeOut();
    }
}


// Eliminar Programa
function EliminarPrograma(id){
    Swal.fire({
        title: '¿Está seguro de eliminar este Programa?',
        html: "Tenga en cuenta que esta acción no tendrá reverso",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0b5ed7',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value == true) {
            $.post('app/Programas.php', {id}, function(response){
                Listar_Programa();
            });
        }
    });
}


// Editar Programa
function EditarPrograma(Editar){
    $.post('app/Programas.php', {Editar}, function(response){
        var valor = JSON.parse(response);
        $('.TextNombrePrograma').val(valor.NombrePrograma);
        $('.ddlDia').val(valor.Dia);
        $('.TextHoraInicial').val(valor.HoraInicio);    
        $('.TextHoraFinal').val(valor.HoraFinal);
        $('#ImagenMuestraP').attr('src', './Imagenes/ImagenesProgramas/'+valor.ImagenPrograma);
        $('.inputIdPrograma').val(valor.IdPrograma);
        ModalProgramas(3);
    });
}


// =================== PLAYLIST ================

// Limpiar Playlist
function LimpiarModalPlaylist(){
    $('.TextNombrePlaylist').val('');
    $('.TextEnlacePlaylist').val('');
    $('#ImagenMuestraPLA').attr('src', 'https://www.quicideportes.com/assets/images/custom/no-image.png');
    $('.inputIdPlaylist').val('');
}

// Lista  Playlist
var tablaPlaylist = $('#tablaPlaylist').DataTable();
function Listar_Playlist(){
    var Listar = 'Listar';
    $.ajax({
        type: "POST",
        url: 'app/Playlist.php',
        data: {Listar: Listar},
        success: function (data) {
            var Filas;
            let json = $.parseJSON(data);
            $.each(json, function (key, value) {
                Filas += '<tr class="text-center" >' +
                '<td class="td hide">' + value.IdPlaylist + '</td>' +
                '<td class="td">' + value.Nombre + '</td>' +
                    '<td class="td"><a href="' + value.Enlace + '" class="text-success fs-4" target="_blank"><i class="fa-brands fa-spotify"></i></a></td>' +
                    '<td class="td">' + value.Fecha + '</td>' +
                    '<td class="td">' + value.Activo + ' </td>'+
                    '<td class="td"><button  type="button" class="btn btn-info fa fa-pencil m-2" onclick="EditarPlaylist(' + value.IdPlaylist + ')" toggle="tooltip" title="Editar"><button type="button" class="btn btn-warning fa fa-trash EliminarNoticia" onclick="EliminarPlaylist(' + value.IdPlaylist + ');" toggle="tooltip" title="Eliminar"></td>'+
                    '</tr>';
            });
            tablaPlaylist.clear();
            tablaPlaylist.destroy();
            $('#tablaPlaylist tbody').empty();
            $('#tablaPlaylist tbody').append(Filas);
            $(document).ready(function () {
                if (!$.fn.dataTable.isDataTable('#tablaPlaylist')) {
                    $('#tablaPlaylist').data('cargado', true);
                    tablaPlaylist = $('#tablaPlaylist').DataTable({
                        orderCellsTop: true,
                        fixedHeader: true,
                        bFilter: true,
                        paging: true,
                        order: [[0, 'desc']],
                        language: {
                            "searchPlaceholder": "Buscar...",
                            "search": "Buscar:",
                            "decimal": "",
                            "emptyTable": "No hay información",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                            "infoEmpty": "Mostrando 0 a 0 de 0 registros",
                            "infoFiltered": "(Filtrado desde _MAX_ registros totales)",
                            "infoPostFix": "",
                            "thousands": ",",
                            "lengthMenu": "Mostrar _MENU_ registros",
                            "loadingRecords": "Cargando...",
                            "processing": "Procesando...",
                            "paginate": {
                                "first": "Primero",
                                "last": "Último",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                        }
                    });
                }
            });
        }
    });
}

// Guarda Playlist
function GuardarPlaylist(accion){
    $(".spinnerBackdrop").fadeIn();
    $('#MensajeDeEspera').html('Por favor espere...');
    var Nombre = $('.TextNombrePlaylist').val();
    var Enlace = $('.TextEnlacePlaylist').val();
    let date = new Date();
    var Fecha = String(date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' +  date.getDate()).padStart(2, '0');    
    var Activo = 1;
    var Imagen = $('.inputfilePlaylist').val();

    
    var d = BaseArchivo.split("base64,");
    var MimeType = d[0].replace("data:", "").replace(";", "");

    if(accion == 1){
        if (Imagen == ""){
            MostrarMensajeGenerico("¡Debes seleccionar una imagen!", "", "warning");
            $(".spinnerBackdrop").fadeOut();
        }
    }
    
    if(Nombre == ""){
        MostrarMensajeGenerico("¡Debe Ingresar el nombre de la playlist!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
        
    }else if (Enlace == ""){
        MostrarMensajeGenerico("¡Debe agregar un enlace de la playlist!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    
    }else{

        var Objecto = {};
        var Mensaje = "";
        if(accion== 1){
            Mensaje = "Agregado";
             Objecto = {
                Valor: "Crear",
                Nombre: Nombre,
                Enlace: Enlace,
                Fecha: Fecha,      
                Activo: Activo,
                Imagen: Imagen.split('\\').pop(),
                Base64: d[1],
                MimeType: MimeType
            };
        }else{
            Mensaje = "Actualizar";
            var id =  $('.inputIdPlaylist').val();
            Objecto = {
                Valor: id,
                Nombre: Nombre,
                Enlace: Enlace,
                Fecha: Fecha,      
                Activo: Activo,
                Imagen: Imagen.split('\\').pop(),
                Base64: d[1],
                MimeType: MimeType
            };
        }
        
        
       $.post('app/Playlist.php', Objecto, function(response){

            if(response== "Ok"){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sé '+ Mensaje +' correctamente',
                    showConfirmButton: false,
                    timer: 2000
                })

               

            }else if(response== "No"){
                Swal.fire(
                    'Error',
                    'Por favor intentalo mas tarde',
                    'warning'
                )
            }
        })
        ModalPlaylist(2);
        Listar_Playlist();
       $(".spinnerBackdrop").fadeOut();
    }
    Listar_Playlist();
}


// Eliminar Playlist
function EliminarPlaylist(id){
    Swal.fire({
        title: '¿Está seguro de eliminar este Programa?',
        html: "Tenga en cuenta que esta acción no tendrá reverso",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0b5ed7',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value == true) {
            $.post('app/Playlist.php', {id}, function(response){
                Listar_Playlist();
            });
        }
    });
}


// Editar Playlist
function EditarPlaylist(Editar){
    $.post('app/Playlist.php', {Editar}, function(response){
        var valor = JSON.parse(response);
        $('.TextNombrePlaylist').val(valor.Nombre);
        $('.TextEnlacePlaylist').val(valor.Enlace);
        $('#ImagenMuestraPLA').attr('src', './Imagenes/ImagenesPlaylist/'+valor.Imagen);
        $('.inputIdPlaylist').val(valor.IdPlaylist);
        ModalPlaylist(3);
    });
}

// =================== USUARIOS ================

// Limpiar modal Staff
function LimpiarModalStaff(){
    $('.TextNombreStaff').val('');
    $('.ddlCargoStaff').val(0);
    $('.TextClaveCargo').val('');
    $('.inputfilePlaylist').val('');
    $('#ImagenMuestraStaff').attr('src', 'https://empodero.s3.us-east-2.amazonaws.com/users/default.jpg');
    
}

// Lista  Staff
var tablaStaff = $('#tablaStaff').DataTable();
function Listar_Staff(){
    var Listar = 'Listar';
    $.ajax({
        type: "POST",
        url: 'app/Usuarios.php',
        data: {Listar: Listar},
        success: function (data) {
            var Filas;
            console.log(data);
            let json = $.parseJSON(data);
            $.each(json, function (key, value) {
                Filas += '<tr class="text-center" >' +
                    '<td class="td hide">' + value.IdUsuario + '</td>' +
                    '<td class="td"><img class="ImagentablaStaff" src="./Imagenes/ImagenesUsuarios/'+ value.Foto +'" /></td>' +
                    '<td class="td">' + value.Nombre + '</td>' +
                    '<td class="td">' + value.IdCargo + '</td>' +
                    '<td class="td"><button  type="button" class="btn btn-info fa fa-pencil m-2" onclick="EditarStaff(' + value.IdUsuario + ')" toggle="tooltip" title="Editar"><button type="button" class="btn btn-warning fa fa-trash EliminarNoticia" onclick="EliminarStaff(' + value.IdUsuario + ');" toggle="tooltip" title="Eliminar"></td>' +
                    '</tr>';
            });

            
            tablaStaff.clear();
            tablaStaff.destroy();
            $('#tablaStaff tbody').empty();
            $('#tablaStaff tbody').append(Filas);
            $(document).ready(function () {
                if (!$.fn.dataTable.isDataTable('#tablaStaff')) {
                    $('#tablaStaff').data('cargado', true);
                    tablaStaff = $('#tablaStaff').DataTable({
                        orderCellsTop: true,
                        fixedHeader: true,
                        bFilter: true,
                        paging: true,
                        order: [[0, 'desc']],
                        language: {
                            "searchPlaceholder": "Buscar...",
                            "search": "Buscar:",
                            "decimal": "",
                            "emptyTable": "No hay información",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                            "infoEmpty": "Mostrando 0 a 0 de 0 registros",
                            "infoFiltered": "(Filtrado desde _MAX_ registros totales)",
                            "infoPostFix": "",
                            "thousands": ",",
                            "lengthMenu": "Mostrar _MENU_ registros",
                            "loadingRecords": "Cargando...",
                            "processing": "Procesando...",
                            "paginate": {
                                "first": "Primero",
                                "last": "Último",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                        }
                    });
                }
            });
        }
    });
}

// Guarda Staff
function GuardarStaff(accion){
    $(".spinnerBackdrop").fadeIn();
    $('#MensajeDeEspera').html('Por favor espere...');
    var Nombre = $('.TextNombreStaff').val();
    var IdCargo = $('.ddlCargoStaff').val();
    var Clave = $('.TextClaveCargo').val();
    var Foto = $('.inputfileStaff').val();
    var d = BaseArchivo.split("base64,");
    var MimeType = d[0].replace("data:", "").replace(";", "");

    if(accion == 1){
        if (Foto == ""){
            MostrarMensajeGenerico("¡Debes seleccionar una imagen!", "", "warning");
            $(".spinnerBackdrop").fadeOut();
        }
    }
    
    if(Nombre == ""){
        MostrarMensajeGenerico("¡Debe Ingresar el nombre!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
        
    }else if (Clave == ""){
        MostrarMensajeGenerico("¡Debe agregar una contraseña!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    
    }else if (IdCargo == 0){
        MostrarMensajeGenerico("¡Debes seleccionar un cargo!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    
    }else{

        var Objecto = {};
        var Mensaje = "";
        if(accion== 1){
            Mensaje = "Agregado";
             Objecto = {
                Valor: "Crear",
                Nombre: Nombre,
                IdCargo: IdCargo,
                Clave: Clave,  
                Foto: Foto.split('\\').pop(),
                Base64: d[1],
                MimeType: MimeType
            };
        }else{
            Mensaje = "Actualizar";
            var id =  $('.inputIdPlaylist').val();
            Objecto = {
                Valor: id,
                Nombre: Nombre,
                IdCargo: IdCargo,
                Clave: Clave,  
                Foto: Foto.split('\\').pop(),
                Base64: d[1],
                MimeType: MimeType
            };
        }
        
        
       $.post('app/Usuarios.php', Objecto, function(response){

            if(response== "Ok"){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sé '+ Mensaje +' correctamente',
                    showConfirmButton: false,
                    timer: 2000
                })

               

            }else if(response== "No"){
                Swal.fire(
                    'Error',
                    'Por favor intentalo mas tarde',
                    'warning'
                )
            }
        })
        ModalStaff(2);
        Listar_Staff();
       $(".spinnerBackdrop").fadeOut();
    }
}


// Eliminar Playlist
function EliminarStaff(id){
    Swal.fire({
        title: '¿Está seguro de eliminar este Programa?',
        html: "Tenga en cuenta que esta acción no tendrá reverso",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0b5ed7',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value == true) {
            $.post('app/Usuarios.php', {id}, function(response){
                Listar_Staff();
            });
        }
    });
}


// Editar Playlist
function EditarStaff(Editar){
    $.post('app/Usuarios.php', { Editar }, function (response) {
        var valor = JSON.parse(response);
        $('.TextNombreStaff').val(valor.Nombre);
        $('.ddlCargoStaff').val(valor.IdCargo);
        $('.TextClaveCargo').val(valor.Clave);
        $('#ImagenMuestraStaff').attr('src', './Imagenes/ImagenesUsuarios/'+valor.Foto);
        ModalStaff(3);
    });
}



// ============== GENERICO ==============
// Alertas
function MostrarMensajeGenerico(Titulo, Mensaje, Tipo) {
    swal.fire({ title: Titulo, html: Mensaje, type: Tipo, showCloseButton: true, focusConfirm: true, confirmButtonText: '¡Entendido!',icon: 'warning', confirmButtonColor: '#0b5ed7', position: 'center'  });
}


// Tomar imagen
var BaseArchivo = "";
function getBase64(Valor) {
    var Id = Valor;
    var byteArch = document.getElementById(Id);
    var file = byteArch.files[0];

    var reader = new FileReader();
    var R = "";
    reader.readAsDataURL(file);
    reader.onload = function () {
        BaseArchivo = reader.result;
       
    };
    reader.onerror = function (error) {
        BaseArchivo = 'Error: ' + error;
    };
}


// ========= INICIAR SESION ===========]
function InicioSesion(){
    var Correo = utf8_to_b64($('.TextCorreo').val());
    var Clave = utf8_to_b64($('.TextClave').val());

    if(Correo == ""){
        MostrarMensajeGenerico("¡Debe Ingresar el correo!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
        
    }else if (Clave == ""){
        MostrarMensajeGenerico("¡Debe agregar una contraseña!", "", "warning");
        $(".spinnerBackdrop").fadeOut();
    }else{
        Objecto = {
            Login: "Login",
            Correo: Correo,
            Clave: Clave 
           
        };

        $.post('./app/Generico.php', Objecto, function(response){
            console.log(response);
            if(response == "Si"){
                $(location).attr('href','./Admin.html');
            }else{
                MostrarMensajeGenerico("¡El correo electrónico no esta vinculado a 4toRadio!", "", "warning");
            }
        })
    }
}



function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

