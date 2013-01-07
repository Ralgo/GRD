<?php

class Application_Model_DbTable_Reporte extends Zend_Db_Table_Abstract
{

    protected $_name = 'GRD_Reporte';
    protected $_primary='Reporte_id';
    protected $_adapter = 'db_mysql';
    
    public function obtenerTodosReportes()
    {
        return $this->fetchAll();
    }
    
    public function guardarReporte( $contenido ,   $reporte_id = NULL)
    {
        //Si $id no tiene datos, significa que estamos creando una nueva fila.
        if(is_null($reporte_id)){
            $reporte = $this->createRow();
            //$row->titulo = $bind['titulo'];
        }
        //Al contrario, si $id tiene datos, estamos actualizando una fila.
        else{
            $reporte = $this->obtenerReporte($reporte_id);
        }
        
        $reporte->setFromArray( $contenido );
        return $reporte->save();
    }
    
    public function obtenerReporte($reporte_id)
    {
        $reporte_id = (int) $reporte_id; //Casteo del tipo de datos, solo por seguridad.
        
        $reporte = $this->find($reporte_id)->current();
        
        return $reporte;
        
    }
    
    public function eliminarReporte($reporte_id){
                
        $this->delete('reporte_id ='. (int)$reporte_id);
        
    }

}