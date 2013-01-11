<?php

class Application_Model_DbTable_Perfil extends Zend_Db_Table_Abstract
{

    protected $_name = 'GRD_PERFIL';
    protected $_primary = 'PERFIL_ID';
    protected $_adapter = 'db_mysql';
    
    public function obtenerTodosPerfiles()
    {
        return $this->fetchAll();
    }
    
    public function obtenerPerfilID($username)
    {
        $perfiles = $this->fetchAll();
        
        foreach ($perfiles as $perfil){
            if($perfil->PERFIL_NOMBRE == $username){
                return $perfil->PERFIL_ID;
                break;
            }
        }
    }

}