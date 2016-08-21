<%@page contentType="text/html; UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="ko">
<head>
	<!-- build:css /static/aggregate/css/style.css -->
	<link rel="stylesheet" href="/static/bower_components/bootstrap/dist/css/bootstrap.css"/>
	<!-- endbuild -->
</head>
<body>
<div class="container">
	<h1>Hello! world.</h1>
</div>

<!-- build:js /static/aggregate/js/index.js -->
<script src="/static/bower_components/jquery/dist/jquery.js"></script>
<script src="/static/bower_components/bootstrap/dist/js/bootstrap.js"></script>
<!-- endbuild -->

<script src="/static/js/modules/calculator.js"></script>

<script type="text/javascript">
	var obj = new Calculator();
	console.log(obj.add(1, 2));
</script>

</body>
</html>
