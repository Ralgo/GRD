<?php

class Application_Model_DbTable_Tablas extends Zend_Db_Table_Abstract
{

    protected $_name = 'GRD_TABLAS';
    protected $_primary = 'TABLAS_ID';
    protected $_adapter = 'db_mysql';
    
    public function obtenerTodoTablas(){
        return $this->fetchAll();
    }
    
    public function obtenerTabla($tabla_id){
        return $this->find($tabla_id)->current();
    }
    
    public function obtenerNombrePorId($tabla_id){
        $nombre = $this->find($tabla_id)->current();
        
        return $nombre->TABLAS_NOMBRE;
    }
    
}

