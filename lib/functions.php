<?php


function buildUrl(string $page, array $params = []): string
{
    return 'index.php?' . http_build_query(['page' => $page, ...$params]);
}




