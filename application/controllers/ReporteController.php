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
                $this->view->reportes = $reportes->obtenerDatos();
    }

    public function gestionarAction()
    {
        // action body
        if($this->getRequest()->isPost()){
            $value = $this->_getParam('submitButton');
            if($value == 'Grabar'){
                //Do something bitch!
            }
            else if($value == 'Cancelar') {
                $this->_helper->redirector->gotoSimple('buscar','reporte');                
            }
        }
        $reporte_id = $this->_getParam('reporte_id', 0);
        $reportes = new Application_Model_DbTable_Reporte();
        $this->view->reporte = $reportes->obtenerReporte($reporte_id);
        $tablas = new Application_Model_DbTable_Tablas();
        $this->view->tablas = $tablas->obtenerTodoTablas();
        
        $db = Zend_Db::factory('PDO_MYSQL',
                array(
                    'adapterNamespace' => Zend_Db_Adapter,
                    'dbname' => 'GRD',
                    'host' => 'localhost',
                    'username' => 'cberoiza',
                    'password' => '12345'
                    )
        );
    }

    public function usarAction()
    {
        // action body
        if($this->getRequest()->isPost()){
            $valor = $this->getRequest()->getPost('submitButton');
            if($valor == 'Editar'){
                $url = array('controller'=>'reporte','action'=>'gestionar','reporte_id'=>$this->_getParam('reporte_id'));
                $this->_helper->redirector->gotoRoute($url);
            }
            else if($valor == 'Volver'){
                $this->_helper->redirector->gotoSimple('buscar','reporte');
            }
            else if($valor == 'Descargar'){
                
            }
        }
        else{
            $reporte_id = $this->_getParam('reporte_id', 0);
            $reportes = new Application_Model_DbTable_Reporte();
            $this->view->reporte = $reportes->obtenerReporte($reporte_id);
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

    public function descargaAction()
    {
        // action body
    }
}

