<?php

class Application_Model_DbTable_Perfil extends Zend_Db_Table_Abstract
{

    protected $_name = 'GRD_Perfil';
    protected $_primary = 'Perfil_id';
    protected $_adapter = 'db_mysql';
    
    public function obtenerDatos()
    {
        return $this->fetchAll();
    }

}