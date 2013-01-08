<?php

class Application_Model_DbTable_Tablas extends Zend_Db_Table_Abstract
{

    protected $_name = 'GRD_Tablas';
    protected $_primary = 'Tablas_id';
    protected $_adapter = 'db_mysql';
    
    public function obtenerTodoTablas(){
        return $this->fetchAll();
    }
    
    public function obtenerTabla($tabla_id){
        return $this->find($tabla_id)->current();
    }
    
    public function obtenerCampos($tabla_id){
        
    }
}

