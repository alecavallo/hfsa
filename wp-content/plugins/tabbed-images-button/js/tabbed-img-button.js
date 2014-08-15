(function() {
    tinymce.PluginManager.add('tabbed_img_btn', function( editor, url ) {
        editor.addButton( 'tabbed_img_btn', {
            title: 'Agregar link de imagen',
            icon: 'icon dashicons-screenoptions',
            onclick: function() {
                editor.windowManager.open( {
                    title: 'Ingrese los datos para generar el boton',
                    body: [{
                        type: 'textbox',
                        name: 'link',
                        label: 'URL Link'
                    },
                    {
                        type: 'textbox',
                        name: 'img',
                        id: 'img',
                        label: 'URL Imágen'
                    },
                    {
                        type: 'button',
                        text: 'Seleccionar',
                        id: 'img_btn',
                        size: 'small'
                    },
                    {
                        type: 'textbox',
                        name: 'txt',
                        label: 'Texto'
                    }],
                    onsubmit: function( e ) {
                        editor.insertContent('[tabbed_img_links href="'+e.data.link+'" img="'+e.data.img+'" text="'+e.data.txt+'"]');
                    }
                });
                
                jQuery('div#img_btn button').click(function(){
                    wp.media.editor.send.attachment = function(props, attachment){
                    jQuery('input#img').val(attachment.url);
                }

                wp.media.editor.open(this);

                return false;
                });
            }
        });
    });
})();