<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
public function _initDbRegistry()
    {
        $this->bootstrap('multidb');
        $multidb = $this->getPluginResource('multidb');
        Zend_Registry::set('db_oracle', $multidb->getDb('oracle'));
	Zend_Registry::set('db_mysql', $multidb->getDb('mysql'));       	
    }

}

