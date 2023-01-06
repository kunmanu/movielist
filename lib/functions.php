<?php


function buildUrl(string $page, array $params = []): string
{
    return 'index.php?' . http_build_query(['page' => $page, ...$params]);
}



function dump($data)
{
    echo "<pre>";
    var_dump($data);
    echo "</pre>";
}
