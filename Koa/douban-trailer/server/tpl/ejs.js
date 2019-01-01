module.exports = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
  <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>
</head>

<body>
  <div class="contaier">
    <div class="row">
      <div class="col-md-8">
        <h1>Hi <%= you %></h1>
        <p>this is <%= me %></p>
      </div>
      <div class="col-md-4">
        <p>静态页面 HTML 页面</p>
      </div>
    </div>
  </div>
</body>

</html>
`