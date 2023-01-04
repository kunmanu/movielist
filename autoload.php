<?php

spl_autoload_register(function ($class){
    $path = '../src/model/'.$class.'.php';
    require $path;
});
