<?php

class Application_Model_DbTable_Reporte extends Zend_Db_Table_Abstract
{

    protected $_name = 'GRD_Reporte';
    protected $_primary='Reporte_id';
    protected $_adapter = 'db_mysql';
    
    public function obtenerDatos()
    {
        return $this->fetchAll();
    }
    
    public function guardarDatos( $bind ,   $id = NULL)
    {
        //Si $id no tiene datos, significa que estamos creando una nueva fila.
        if(is_null($id)){
            $row = $this->createRow();
            //$row->titulo = $bind['titulo'];
        }
        //Al contrario, si $id tiene datos, estamos actualizando una fila.
        else{
            $row = $this->posicionarDatos($id);
        }
        
        $row->setFromArray( $bind );
        return $row->save();
    }
    
    public function posicionarDatos($id)
    {
        $id = (int) $id; //Casteo del tipo de datos, solo por seguridad.
        
        $row = $this->find($id)->current();
        
        return $row;
        
    }

}