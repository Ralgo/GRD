<?php

class Application_Form_Login extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $this->addElement(
                'text','Perfil_nombre', array(
                    'label'=>'Usuario',
                    'required'=>true
                )
        );
        
        $this->addElement(
                'password', 'Perfil_password', array(
                    'label'=>'Contraseña',
                    'required'=>true
                )
        );
        
        $this->addElement(
                'submit', 'Ingresar', array(
                    'id'=>'send',
                )
        );        
    }

}