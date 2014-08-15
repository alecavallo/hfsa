(function() {
    tinymce.PluginManager.add('rotating_img_btn', function( editor, url ) {
        editor.addButton( 'rotating_img_btn', {
            title: 'Agregar link de imagen',
            icon: 'icon dashicons-format-gallery',
            onclick: function() {
                editor.windowManager.open( {
                    title: 'Ingrese los datos para generar el boton',
                    body: [{
                        type: 'textbox',
                        name: 'front_img',
                        id: 'front_img',
                        label: 'URL Imágen Frontal'
                    },
                    {
                        type: 'button',
                        text: 'Seleccionar',
                        id: 'front_img_btn',
                        size: 'small'
                    },
                    {
                        type: 'textbox',
                        name: 'back_img',
                        id: 'back_img',
                        label: 'URL Imágen Reverso'
                    },
                    {
                        type: 'button',
                        text: 'Seleccionar',
                        name: 'back_img_btn',
                        id: 'back_img_btn',
                        size: 'small'
                    }],
                    onsubmit: function( e ) {
                        editor.insertContent('[rotate_image front_img="'+e.data.front_img+'" back_img="'+e.data.back_img+'"]');
                    }
                });
                
                jQuery('div#front_img_btn button').click(function(){
                    wp.media.editor.send.attachment = function(props, attachment){
                    jQuery('input#front_img').val(attachment.url);
                }

                wp.media.editor.open(this);

                return false;
                });
                
                jQuery('div#back_img_btn button').click(function(){
                    wp.media.editor.send.attachment = function(props, attachment){
                    jQuery('input#back_img').val(attachment.url);
                }

                wp.media.editor.open(this);

                return false;
                });
            }
        });
    });
})();