<?php

class Application_Form_Contenido extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
        $auth = Zend_Auth::getInstance();
        $username = $auth->getIdentity();
        $modelPerfil= new Application_Model_DbTable_Perfil();
        $idUserActual = $modelPerfil->obtenerPerfilID($username);
        
        $this->setName('GRD_Reporte');
        
        $id_perfil = new Zend_Form_Element_Hidden('Perfil_id');
        $id_perfil->setValue($idUserActual);
        
        $nombre = new Zend_Form_Element_Text('Reporte_nombre');
        $nombre->setLabel('Nombre del Reporte')
                ->setRequired(true)
                ->addValidator('NotEmpty');
        
        $solicitante = new Zend_Form_Element_Text('Reporte_solicitante');
        $solicitante->setLabel('Nombre del Solicitante')
                ->setRequired(true)
                ->addValidator('NotEmpty');
                
        $enviar = new Zend_Form_Element_Submit('enviar');
        
        $this->addElements(array($id_perfil, $nombre, $solicitante, $enviar));

//        $this->addElement(                
//                'text', 'Reporte_nombre', array(
//                    'label' => 'Nombre del Reporte',
//                    'required' => (TRUE),                    
//                )               
//        );
//        
//        $this->addElement(
//                'text', 'Reporte_solicitante', array(
//                    'label' => 'Nombre del Solicitante',
//                    'required' => (TRUE),
//                )
//        );
//        
//        $this->addElement(
//                'hidden', 'Perfil_id', array(
//                    'value' => $this->id,
//                )
//        );
//        
//        $this->addElement(
//                'submit', 'Guardar', array()
//        );        
    }
}

