<?php


include_once "database.php";

abstract class AbstractModel {

    protected Database $db;

    public function __construct()
    {
        $this->db = new Database();
    }
}