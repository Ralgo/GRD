<?php

class Application_Form_Contenido extends Zend_Form
{

    public function init()
    {
        /* Form Elements & Other Definitions Here ... */
//        $this->setName('reporte');
//        
//        $nombre = new Zend_Form_Element_Text('reporte_nom');
//        $nombre->setLabel('Nombre del Reporte')
//                ->setRequired(true);
//                //->addValidator('NotEmpty');
//        
//        $solicitante = new Zend_Form_Element_Text('reporte_solicitante');
//        $solicitante->setLabel('Nombre de Solicitante')
//                    ->setRequired(true);
//                    //->addValidator('NotEmpty');
//        
//        $enviar = new Zend_Form_Element_Submit('Guardar');
//        
//        $this->addElement(array($nombre,$solicitante,$enviar));
        
        $modelPerfil = new Application_Model_DbTable_Perfil();
        $perfil = $modelPerfil->obtenerDatos();
        
        $auth = Zend_Auth::getInstance();        
        $name = $auth->getIdentity();
        
        foreach ($perfil as $p)
        {
            if($p->Perfil_nombre == $name)
            {
                $id = $p->Perfil_id;
            }
        }
         
        $this->addElement(                
                'text', 'Reporte_nombre', array(
                    'label' => 'Nombre del Reporte',
                    'required' => (TRUE),                    
                )               
        );
        
        $this->addElement(
                'text', 'Reporte_solicitante', array(
                    'label' => 'Nombre del Solicitante',
                    'required' => (TRUE),
                )
        );
        
        $this->addElement(
                'hidden', 'Perfil_id', array(
                    'value' => $id,
                )
        );
        
        $this->addElement(
                'submit', 'Guardar', array()
        );        
    }
}

