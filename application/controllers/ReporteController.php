<?php

class ReporteController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $auth = Zend_Auth::getInstance();
        if (! $auth->hasIdentity()) {
            return $this->_redirect('/perfil/login');
        }
    }

    public function indexAction()
    {
        // action body
    }

    public function buscarAction()
    {
        // action body
        
        $auth = Zend_Auth::getInstance();        
        $this->view->name = $auth->getIdentity();
        
        $modelR = new Application_Model_DbTable_Reporte();
        $this->view->contenidoBusqueda = $modelR->obtenerDatos();
        
        $modelP = new Application_Model_DbTable_Perfil();
        $this->view->perfil = $modelP->obtenerDatos();
        
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
                $model->guardarDatos($form->getValues() );
                return $this->_redirect('/Reporte/Buscar');
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
        if (!$this->_hasParam('reporte_id')){
            return $this->_redirect('/reporte/buscar');
        }
        else{
            $model = new Application_Model_DbTable_Reporte();
            $reporte = $model->posicionarDatos($this->_getParam('reporte_id'));
        }
        
        $this->view->contenido = $reporte;
        
    }

    public function eliminarAction()
    {
        // action body
        if (!$this->_hasParam('reporte_id')){
            return $this->_redirect('/reporte/caca');
        }
        
        $model = new Application_Model_DbTable_Reporte();
        $id = $this->getRequest()->getPost('reporte_id');                
        $reporte = $model->posicionarDatos($id);
        
        if ($this->getRequest()->isPost()){
            $eliminar = $this->getRequest()->getPost('eliminar');
            if ($eliminar == 'Si'){
                $reporte->delete();
            }
            return $this->_redirect('/reporte/buscar');
        }
        
    }

}

