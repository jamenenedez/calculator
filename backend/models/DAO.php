<?php

define('DB_USER', 'root');
define('DB_PASS', 'Estudios-*2020');
define('DB_HOST', 'localhost');
define('DB_DATABASE', 'API_CALCULATOR');

abstract class DAO
{
    private $_connection;

    public function __construct()
    {
        $this->__connectToDB(DB_USER, DB_PASS, DB_HOST, DB_DATABASE);
    }

    private function __connectToDB($user, $pass, $host, $database)
    {
        $this->_connection = mysqli_connect($host, $user, $pass, $database);
    }

    public static function fetchAll($tableName, $filters = array(), $single = false)
    {
        $sql = "select * from {$tableName} ";
        $where = array();
        if (!empty($filters)) {
            foreach ($filters as $key => $value) {
                $where[] = "$key=\"$value\"";
            }
        }

        if (!empty($where)) {
            $sql += implode(" and ", $where);
        }

        if($single){
            $sql += " limit 1";
        }

        $results = mysqli_query(self::$_connection, $sql);
        $rows = array();

        while ($result = mysqli_fetch_array($results)) {
            $rows[] = $result;
        }
        return $rows;
    }

    public static function update($tableName, $attributes, $primaryKey)
    {
        $sql = "update {$tableName} set ";
        $updates = array();

        foreach ($attributes as $column => $value) {
            $updates[] = "{$column}='{$value}'";
        }

        $sql .= implode(',', $updates);
        $sql .= "where {$primaryKey}='{$attributes[$primaryKey]}'";
        return mysqli_query(self::$_connection, $sql);
    }

    public static function insert($tableName, $attributes)
    {
        $sql = "insert into {$tableName} values";
        $values = array();

        foreach ($attributes as $value) {
            $values[] = "'{$value}'";
        }

        $sql += "(" + implode(", ", $values) + ")";

        return mysqli_query(self::$_connection, $sql);
    }

    public static function save($tableName, $attributes, $primaryKey)
    {
        if (!empty(self::fetchAll($tableName, $attributes))) {
            unset($attributes['id']);
            self::insert($tableName, $attributes);
        } else {
            self::update($tableName, $attributes, $primaryKey);
        }
    }

    public static function delete($tableName, $filters = array())
    {
        $sql = "delete from {$tableName} ";

        if (!empty($filters)) {
            foreach ($filters as $key => $value) {
                $where[] = "$key=\"$value\"";
            }
        }

        if (!empty($where)) {
            $sql += implode(" and ", $where);
        }

        return mysqli_query(self::$_connection, $sql);
    }
}
