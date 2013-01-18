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
        //EDIT: Lo que puse arriba no corre!
        $auth = Zend_Auth::getInstance();
        $username = $auth->getIdentity();
        //Obteniendo la lista de perfiles completa y procedemos a obtener
        //el ID del user actual.
        $dbUsuarios = new Application_Model_DbTable_Usuarios();
        $usuario = $dbUsuarios->obtenerUsuario($username);
        $this->view->idUserActual = $usuario->PERFIL_ID;
        //Obteniendo la lista de reportes completa.
        $dbReportes = new Application_Model_DbTable_Reporte();
        $this->view->reportes = $dbReportes->obtenerTodosReportes();
    }

    public function crearAction()
    {
        // action body        
        $form = new Application_Form_Contenido();
        if ($this->getRequest()->isPost() ){
            if ( $form->isValid($this->_getAllParams() ) )
            {
                $dbReportes = new Application_Model_DbTable_Reporte();
                $dbReportes->guardarReporte($form->getValues() );
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
        $auth = Zend_Auth::getInstance();
        $username = $auth->getIdentity();        
        $dbUsuarios = new Application_Model_DbTable_Usuarios();
        $usuario = $dbUsuarios->obtenerUsuario($username);
        $idUserActual = $usuario->PERFIL_ID;
        
        if($this->getRequest()->isPost()){
            $value = $this->_getRequest()->getPost('submitButton');
            if($value == 'Grabar'){
                //Do something bitch!
            }
            else if($value == 'Cancelar') {
                $this->_helper->redirector->gotoSimple('buscar','reporte');                
            }
        }
        $reporte_id = $this->_getParam('reporte_id', 0);

        $dbReportes = new Application_Model_DbTable_Reporte();
        $this->view->reporte = $dbReportes->obtenerReporte($reporte_id);

        $dbTablas = new Application_Model_DbTable_Tablas();
        $this->view->tablas = $dbTablas->obtenerTodoTablas();

        $dbRelacion = new Application_Model_DbTable_RelacionPT();
        $this->view->relacion = $dbRelacion->obtenerTablasPorPerfilId($idUserActual);
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
            $dbReportes = new Application_Model_DbTable_Reporte();
            $this->view->reporte = $dbReportes->obtenerReporte($reporte_id);
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

    public function selectMultipleAjaxAction()
    {
        // action body
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();

        $tablas_id = $this->getRequest()->getPost('id');

        $dbCampos = new Application_Model_DbTable_Campo();
        $campos = $dbCampos->obtenerCamposPorIdTablas($tablas_id);

        echo "<br/><select multiple id=\"selectCampos\" size=\"10\" >";

        foreach ($campos as $campo){
            echo "<option value=\"$campo->CAMPOS_ID\">$campo->CAMPOS_NOMBRE</option>";
        }

        echo "</select>";
    }

    public function grabarReporteAjaxAction()
    {
        // action body
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();

        //Este es un arreglo si es que se seleccionan más opciones en el multioption box.
        
        $campos_id = $this->getRequest()->getPost('idcampo');
        
        $reporte_id = $this->getRequest()->getPost('idreporte');
        
        $tablas_id = $this->getRequest()->getPost('idtabla');
        
        $dbTablas = new Application_Model_DbTable_Tablas();
        $nombreTabla = $dbTablas->obtenerNombrePorId($tablas_id);
        
        $arrayTabla = array(
            'TABLAS_REPORTES_NOMBRE'=>$nombreTabla,
            'REPORTES_ID'=>$reporte_id
                );
        
        $dbTablasReportes = new Application_Model_DbTable_TablasReportes();
        $dbTablasReportes->grabarTabla($arrayTabla);
        
        $idTablasReportes = $dbTablasReportes->ultimaInsercion();
        
        
        $dbCamposReportes = new Application_Model_DbTable_CamposReportes();
        $dbCampos = new Application_Model_DbTable_Campo();
        
        foreach ($campos_id as $value) {
            $nombreCampo = $dbCampos->obtenerNombrePorId($value);
            
            $array = array(
                'CAMPOS_REPORTES_NOMBRE'=>$nombreCampo,
                'TABLAS_REPORTES_ID'=>$idTablasReportes
            );
            
            $dbCamposReportes->grabarCampo($array);
        }        
     }

    public function tablaReporteAction()
    {
        // action body
        $dbReportes = new Application_Model_DbTable_Reporte();
        $dbTablasReportes = new Application_Model_DbTable_TablasReportes();
        $dbCamposReportes = new Application_Model_DbTable_CamposReportes();
        
        //Falta!!!, toy con sueño
        
        
    }
}
