<html>

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Binary Search Tree</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/animejs@3.1.0/lib/anime.min.js"
        integrity="sha256-98Q574VkbV+PkxXCKSgL6jVq9mrVbS7uCdA+vt0sLS8=" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="{{  asset('css/style.css')}}" />
    <script type="text/javascript" src="{{  asset('js/common.js')}}"></script>
    <script type="text/javascript" src="{{  asset('js/bst.js')}}"></script>
</head>

<body>
    <div class="container">
        <h1>Binary Search Tree</h1>
        <p>Range of key that can be added is 0 ~ 999 </p>
        <div class="message" style="height:20px;"></div>
        <div class="query-component">
            <div>
                <input type="hidden" id="nodes" value="{{ $nodes }}">
                <input class="node-key" type="text" placeholder="0 ~ 999" /><br>
                <label for="left">L</label>
                <input type="radio" id="left" name="direction" value="L">
                <label for="right">R</label>
                <input type="radio" id="right" name="direction" value="R">
                <button class="submit" type="button">Submit</button> ||
                <button class="find" type="button">Find</button>
                <button class="add" type="button">Add</button>
                <button class="remove" type="button">Delete</button>
            </div>
        </div>
        <div>
            <svg class="canvas">
                <g class="edges"></g>
                <g class="nodes"></g>
            </svg>
        </div>
    </div>
    <script>
        // Select the element with class 'message'
        const message = document.querySelector('.message');

        // Define a function to remove the contents of the element
        function removeMessageContents() {
            message.innerHTML = '';
        }

        // Call the function every 3 seconds using setInterval()
        setInterval(removeMessageContents, 10000);
    </script>
</body>

</html>