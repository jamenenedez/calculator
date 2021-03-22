<?php

    require_once(__DIR__."/DAO");

    class User extends DAO {

        private $id;
        private $uuid;
        private $username;
        private $password;
        private $role;
        private $status;
        
        private $_tablename = 'User';
        private $_primaryKey = 'id';

        public function __construct($params){
            extract($params);
            $this->id = $id;
            $this->uuid = $uuid;
            $this->username = $username;
            $this->password = $password;
            $this->role = $role;
            $this->status = $status;
        }

        public function getID(){
            return $this->id;
        }

        public function getUUID(){
            return $this->uuid;
        }

        public function getUsername(){
            return $this->username;
        }

        public function getPassword(){
            return $this->password;
        }

        public function getRole(){
            return $this->role;
        }

        public function getStatus(){
            return $this->status;
        }

        public function setID($id){
            $this->id = $id;
        }

        public function setUUID($uuid){
            $this->uuid = $uuid;
        }

        public function setUsername($username){
            $this->username = $username;
        }

        public function setPassword($password){
            $this->password = $password;
        }

        public function setRole($role){
            $this->role = $role;
        }

        public function setStatus($status){
            $this->status = $status;
        }

        public static function getAll($filters = array()){
            return self::fetchAll(self::$_tablename, $filters);
        }

        public function geOne(){
            return $this->fetchAll($this->_tablename, array("uuid" => $this->uuid), true);
        }

        public function add(){
            return self::save($this->_tablename, get_object_vars($this), $this->_primaryKey);
        }

        public function remove(){
            return self::delete($this->_tablename, $this->_primaryKey);
        }
        
    }
