<?php

class Application_Form_Contenido extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $auth = Zend_Auth::getInstance();
        $username = $auth->getIdentity();
        
        $dbUsuarios = new Application_Model_DbTable_Usuarios();
        $usuario = $dbUsuarios->obtenerUsuario($username);
        
        $idUserActual = $usuario->PERFIL_ID;
        
        $this->setName('GRD_REPORTES');
        
        $id_perfil = new Zend_Form_Element_Hidden('PERFIL_ID');
        $id_perfil->setValue($idUserActual);
        
        $nombre = new Zend_Form_Element_Text('REPORTES_NOMBRE');
        $nombre->setLabel('Nombre del Reporte')
                ->setRequired(true)
                ->addValidator('NotEmpty');
        
        $solicitante = new Zend_Form_Element_Text('REPORTES_SOLICITANTE');
        $solicitante->setLabel('Nombre del Solicitante')
                ->setRequired(true)
                ->addValidator('NotEmpty');
                
        $enviar = new Zend_Form_Element_Submit('Enviar');
        
        $this->addElements(array($id_perfil, $nombre, $solicitante, $enviar));

    }
}

