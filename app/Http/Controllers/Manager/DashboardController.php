<?php

namespace App\Http\Controllers\Manager;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Carbon\Carbon;

use Spatie\Analytics\Period;
use Analytics;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return Inertia::render('Manager/Dashboard/index');
    }

    public function obterData(Request $request)
    {
        $startDate = $request->start_date ? Carbon::parse($request->start_date) : Carbon::now()->subDays(30);
        $endDate = $request->end_date ? Carbon::parse($request->end_date) : Carbon::now();

        $analyticsData['age'] = Analytics::fetchVisitorsByAge(Period::create($startDate, $endDate));
        $analyticsData['cities'] = Analytics::fetchTopCitiesWithUsers(Period::create($startDate, $endDate));
        $analyticsData['gender'] = Analytics::fetchAccessByGender(Period::create($startDate, $endDate));

        return $analyticsData;
    }
}