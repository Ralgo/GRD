<?php

class Application_Model_DbTable_GrdReporte extends Zend_Db_Table_Abstract
{

    protected $_name = 'GRD_REPORTE';
    protected $_primary = 'ID_TABLES1';
    
    protected $_adapter = 'db_oracle';    
    
    public function init()
    {
        $this->_db  =  Zend_Registry::get('db_oracle');
    }


    public function obtenerDatos()
    {
        return $this->fetchAll();
    }


}