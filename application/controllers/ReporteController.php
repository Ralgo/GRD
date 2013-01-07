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
        //$this->_helper->layout->disableLayout();
        //Obteniendo los datos de la sesión actual
        //Asumo que debe haber una mejor manera de obtener el ID
        //pero por ahora solo utilizo el username (Identidad) de Zend_Auth.
        $auth = Zend_Auth::getInstance();
        $username = $auth->getIdentity();
        //Obteniendo la lista de perfiles completa y procedemos a obtener
        //el ID del user actual.
        $perfiles= new Application_Model_DbTable_Perfil();
        $this->view->idUserActual = $perfiles->obtenerPerfilID($username);
        
        //Obteniendo la lista de reportes completa.
        $reportes = new Application_Model_DbTable_Reporte();
        $this->view->reportes = $reportes->obtenerTodosReportes();
        
    }

    public function crearAction()
    {
        // action body        
        $form = new Application_Form_Contenido();
        if ($this->getRequest()->isPost() ){
            //echo "vienen datos";
            if ( $form->isValid($this->_getAllParams() ) )
            {
                $reportes = new Application_Model_DbTable_Reporte();
                $reportes->guardarReporte($form->getValues() );
                return $this->_helper->redirector->gotoSimple('buscar','reporte');
            }
        }
        $this->view->form = $form;
     }
                
    public function searchAction()
    {
        // action body
        $reportes = new Application_Model_DbTable_GrdReporte();
        $this->view->reporte = $reportes->obtenerDatos();
    }

    public function gestionarAction()
    {
        // action body        
        $reportes = new Application_Model_DbTable_Reporte();
        $this->view->reportes = $reportes->obtenerReporte($this->_getParam('reporte_id'));
    }

    public function usarAction()
    {
        // action body
        $reportes = new Application_Model_DbTable_Reporte();
        $reporte = $reportes->obtenerReporte($this->_getParam('reporte_id'));
        $this->view->reporte = $reporte;
        
        if($this->getRequest()->isPost()){
            $valor = $this->getRequest()->getPost('editar');
            if($valor != 'Editar'){
                $this->_helper->redirector->gotoSimple('usar','reporte');
            }
        }
    }

    public function eliminarAction()
    {
        // action body        
        if($this->getRequest()->isPost()){
            $valor = $this->getRequest()->getPost('borrar');
            if($valor == 'Si'){    
                $reporte_id = $this->_getParam('reporte_id');
                $reportes = new Application_Model_DbTable_Reporte();
                $reportes->eliminarReporte($reporte_id);
            }
            $this->_helper->redirector->gotoSimple('buscar','reporte');
        }
        else{
            $reporte_id = $this->_getParam('reporte_id', 0);
            $reportes = new Application_Model_DbTable_Reporte();
            $this->view->reporte = $reportes->obtenerReporte($reporte_id);
        }
     }            
}