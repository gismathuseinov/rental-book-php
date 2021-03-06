<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS only -->
    <link rel="stylesheet" href="{{asset('css/bootstrap.css')}}">
    <link rel="stylesheet" href="{{asset('css/sidebar.css')}}">
    <link rel="stylesheet" href="{{asset('css/multi-select.css')}}">
    <link rel="stylesheet" href="{{asset('css/animate.min.css')}}">
    <script src="{{asset('js/jquery.js')}}"></script>
    <script src="{{asset('js/sidebar.js')}}"></script>
    <script src="{{asset('js/btsrap.js')}}"></script>
    <script src="{{asset('js/axios.js')}}"></script>
    <script src="{{asset('js/boxicon.js')}}"></script>
    <script src="{{asset('js/bootstrap-notify.js')}}"></script>
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>

    {{--    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>--}}
    {{--    <script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js"></script>--}}
    <title>Laravel</title>
</head>
<body>
<div class="container-fluid" style="width: 85%">
    <div class="l-navbar" id="nav-bar" style="width: 11%">
        <nav class="nav">
            <div class="nav_list">
                <a href="{{route('site.index')}}" class="nav_link"> <i class='bx bx-layer nav_logo-icon'></i><span
                        class="nav_name">Go to Main page</span>
                </a>
                <a href="{{route('dashboard.borrows')}}" class="nav_link"> <i class='bx bx-cube-alt'></i> <span
                        class="nav_name">Borrow Requests</span>
                </a>
                <a href="{{route('dashboard.genres')}}" class="nav_link"> <i class='bx bxs-file-plus'></i>
                    <span
                        class="nav_name">Genres</span>
                </a>
                <a href="{{route('dashboard.books')}}" class="nav_link"> <i class='bx bxs-book-add'></i>
                    <span class="nav_name">Books</span>
                </a>
            </div>
            <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span>
            </a>
        </nav>
    </div>
    <!--Container Main start-->
    <div class="container-fluid pb-5 m-lg-2">
        @yield('content')
    </div>
</div>
</body>
</html>


