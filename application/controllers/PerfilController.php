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
                                ->setTableName('GRD_Perfil')
                                ->setIdentityColumn('Perfil_nombre')
                                ->setCredentialColumn('Perfil_password');
                        
                        $authAdapter
                                ->setIdentity($form->getValue('Perfil_nombre'))
                                ->setCredential(sha1($form->getValue('Perfil_password')));
                        
                        $auth = Zend_Auth::getInstance();
                        
                        $result = $auth->authenticate($authAdapter);
                        
                        if($result->isValid()){
                            return $this->_redirect('/reporte/buscar');
                            
                        }
                        else{
                            $form->Perfil_nombre->addErrorMessage('Datos Incorrectos');
                        }
                                
                    }
                }
                
                $this->view->form = $form;
    }

    public function logoutAction()
    {
        // action body
        Zend_Auth::getInstance()->clearIdentity();
        return $this->_redirect('/perfil/login');
    }


}