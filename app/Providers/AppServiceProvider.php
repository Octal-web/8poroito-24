<?php

namespace App\Providers;

use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\AnalyticsClient;
use Spatie\Analytics\OrderBy;
use Spatie\Analytics\Period;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // MySQL 5.6 (produção) limita índices a 767 bytes; com utf8mb4, varchar(255) estoura.
        Schema::defaultStringLength(191);

        // Força transporte REST: com a extensão grpc instalada (produção), o protobuf em PHP puro
        // falha ao decodificar a resposta ("Error occurred during parsing: Fail to push limit").
        $this->app->bind(AnalyticsClient::class, function () {
            $config = config('analytics');

            $googleClient = new BetaAnalyticsDataClient([
                'credentials' => $config['service_account_credentials_json'],
                'transport' => 'rest',
            ]);

            $client = new AnalyticsClient($googleClient, app(Repository::class));
            $client->setCacheLifeTimeInMinutes($config['cache_lifetime_in_minutes']);

            return $client;
        });

        Analytics::macro('fetchVisitorsByAge', function (Period $period, int $maxResults = 10, int $offset = 0): Collection {
            return $this->get(
                period: $period,
                metrics: ['screenPageViews', 'activeUsers'],
                dimensions: ['userAgeBracket'],
                maxResults: $maxResults,
                orderBy: [OrderBy::metric('screenPageViews', true)],
                offset: $offset,
            );
        });

        Analytics::macro('fetchAccessByGender', function (Period $period, int $maxResults = 20, int $offset = 0): Collection {
            return $this->get(
                period: $period,
                metrics: ['screenPageViews'],
                dimensions: ['userGender'],
                maxResults: $maxResults,
                orderBy: [OrderBy::metric('screenPageViews', true)],
                offset: $offset,
            );
        });

        // Versão com activeUsers (a original do pacote retorna só screenPageViews)
        Analytics::macro('fetchTopCitiesWithUsers', function (Period $period, int $maxResults = 20, int $offset = 0): Collection {
            return $this->get(
                period: $period,
                metrics: ['screenPageViews', 'activeUsers'],
                dimensions: ['city'],
                maxResults: $maxResults,
                orderBy: [OrderBy::metric('screenPageViews', true)],
                offset: $offset,
            );
        });
    }
}
