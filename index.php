<?php
if ( $_GET['pwa'] == 1) {
?>
<html>
  <head>
    <!-- manifest.jsonを呼び出しています -->
    <link rel="manifest" href="./manifest.json">
    <script>
      var superReload = function(){
        location.reload(true);
      } 
      setInterval(superReload, 10000);
      // service workerが有効なら、service-worker.js を登録します
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').then(function() {console.log('Service Worker 1 Registered')});
      }
    </script>
    <meta http-equiv="content-type" charset="utf-8">
    <title>indexページ</title>
  </head>
  <body>
    <!-- <h1>PWA切り替え用ページ（トップページ）です</h1>
    <a href="https://pwa0913.herokuapp.com/2020/">2020</a> -->
    <h1>PWAです</h1>
    <a href="https://pwa0913.herokuapp.com/app/test.html">キャッシュテスト</a>
  </body>
</html>
<?php
  } else {
?>
<html>
  <head>
    <!-- manifest.jsonを呼び出しています -->
    <link rel="manifest" href="./manifest.json">
    <script>
      // service workerが有効なら、service-worker.js を登録します
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').then(function() {console.log('Service Worker 1 Registered')});
      }
    </script>
    <meta http-equiv="content-type" charset="utf-8">
    <title>indexページ</title>
  </head>
  <body>
    <h1>PWA切り替え用ページ（トップページ）です</h1>
    <a href="https://pwa0913.herokuapp.com/2020/">2020</a>
  </body>
</html>
<?php
  }
?>