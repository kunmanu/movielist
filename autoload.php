<?php

spl_autoload_register(function ($class){
    $path = '../src/model/'.$class.'.php';
    require $path;
});


function dump($data)
{
    echo "<pre>";
    var_dump($data);
    echo "</pre>";
}