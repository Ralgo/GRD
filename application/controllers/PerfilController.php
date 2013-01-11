<?php

class PerfilController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

    public function loginAction()
    {
        // action body
                $form = new Application_Form_Login();
                
                if ($this->getRequest()->isPost() ){
                    if ($form->isValid($this->_getAllParams())){
                        $authAdapter = new Zend_Auth_Adapter_DbTable();
                        $authAdapter
                                ->setTableName('GRD_USUARIO')
                                ->setIdentityColumn('USUARIO_RUT')
                                ->setCredentialColumn('USUARIO_SESSION');
                        
                        $authAdapter
                                ->setIdentity($form->getValue('USUARIO_RUT'))
                                ->setCredential($form->getValue('USUARIO_SESSION'));
                        
                        $auth = Zend_Auth::getInstance();
                        
                        $result = $auth->authenticate($authAdapter);
                        
                        if($result->isValid()){
                            return $this->_helper->redirector->gotoSimple('buscar','reporte');
                            
                        }
                        else{
                            $form->USUARIO_SESSION->addErrorMessage('Datos Incorrectos');
                        }                                
                    }
                }
                
                $this->view->form = $form;
    }

    public function logoutAction()
    {
        // action body
        Zend_Auth::getInstance()->clearIdentity();
        return $this->_helper->redirector->gotoSimple('login','perfil');
    }
}