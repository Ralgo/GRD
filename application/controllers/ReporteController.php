<?php

class ReporteController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $auth = Zend_Auth::getInstance();
        if (!$auth->hasIdentity()) {
            return $this->_helper->redirector->gotoSimple('login','perfil');
        }
    }

    public function indexAction()
    {
        // action body
    }

    public function buscarAction()
    {
        // action body
        //Obteniendo los datos de la sesión actual
        //Asumo que debe haber una mejor manera de obtener el ID
        //pero por ahora solo utilizo el username (Identidad) de Zend_Auth.
        $auth = Zend_Auth::getInstance();
        $username = $auth->getIdentity();
        //Obteniendo la lista de perfiles completa y procedemos a obtener
        //el ID del user actual.
        $modelPerfil= new Application_Model_DbTable_Perfil();
        $this->view->idUserActual = $modelPerfil->obtenerPerfilID($username);
        
        //Obteniendo la lista de reportes completa.
        $modelReporte = new Application_Model_DbTable_Reporte();
        $this->view->reportes = $modelReporte->obtenerTodosReportes();
        
    }

    public function crearAction()
    {
        // action body        
        $form = new Application_Form_Contenido();
        if ($this->getRequest()->isPost() ){
            //echo "vienen datos";
            if ( $form->isValid($this->_getAllParams() ) )
            {
                $model = new Application_Model_DbTable_Reporte();
                $model->guardarReporte($form->getValues() );
                return $this->_helper->redirector->gotoSimple('buscar','reporte');
            }
        }
        $this->view->form = $form;
     }
                
    public function searchAction()
    {
        // action body
        $reporte = new Application_Model_DbTable_GrdReporte();
        $this->view->reporte = $reporte->obtenerDatos();
    }

    public function gestionarAction()
    {
        // action body
    }

    public function usarAction()
    {
        // action body
//        if (!$this->_hasParam('reporte_id')){
//            return $this->_redirect($this->url(array('controller'=>'reporte','action'=>'buscar')));
//        }
//        else{
            $model = new Application_Model_DbTable_Reporte();
            $reporte = $model->obtenerReporte($this->_getParam('reporte_id'));
//        }
        
        $this->view->reporte = $reporte;
        
    }

    public function eliminarAction()
    {
        // action body
        
    }
}

