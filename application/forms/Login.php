<?php

class Application_Form_Login extends Zend_Form
{

    public function init()
    {        
        /* Form Elements & Other Definitions Here ... */
        $this->addElement(
                'text','USUARIO_RUT', array(
                    'label'=>'Rut de Usuario',
                    'required'=>true
                )
        );
        
        $this->addElement(
                'password', 'USUARIO_SESSION', array(
                    'label'=>'Sesión',
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