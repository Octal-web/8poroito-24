<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        @if (str_starts_with(Route::currentRouteName(), 'Manager'))
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        @else
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@100..700&display=swap" rel="stylesheet">
        @endif
        
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="{{ (str_starts_with(Route::currentRouteName(), 'Manager')) ? 'font-admin' : 'font-sans' }} text-black antialiased selection:text-white selection:bg-gray-700">
        @inertia
    </body>
</html>
