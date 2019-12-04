<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="shortcut icon" href="assets/images/logo.png" type="image/png">

  <title>IT INVENTORY</title>

  <link href="assets/css/style.default.css" rel="stylesheet">
  <link href="assets/sweetalert/sweetalert.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
  <script src="js/html5shiv.js"></script>
  <script src="js/respond.min.js"></script>
  <![endif]-->
</head>

<body class="signin">

<!-- Preloader -->
<div id="preloader">
    <div id="status"><i class="fa fa-spinner fa-spin"></i></div>
</div>

<section>
  
    <div class="signinpanel">
        
        <div class="row">
            
            <div class="col-md-7">
                
                <div class="signin-info">
                    <div class="logopanel">
                        <img src="<?php echo base_url('assets/images/logo.png'); ?>" style="width: 250px; height: 100px;">
                    </div><!-- logopanel -->
                
                    <div class="mb10"></div>
                
                    <h5><strong>Welcome to IT Inventory PT. Essar Indonesia</strong></h5>
                    <ul>
                        <li><i class="fa fa-map-marker mr5"></i> Jl. Pulau Buton KIM II</li>
                        <li><i class="fa fa-arrow-circle-o-right mr5"></i> Medan</li>
                        <li><i class="fa fa-arrow-circle-o-right mr5"></i> Sumatera Utara</li>
                        <li><i class="fa fa-phone mr5"></i> Tel. (+62 61) 6871 530</li>
                        <li><i class="fa fa-phone mr5"></i> Fax. (+62 61) 6871 529</li>
                    </ul>
                </div><!-- signin0-info -->
            
            </div><!-- col-sm-7 -->
            
            <div class="col-md-5">
                <form method="post" id="form-login" name="form-login" autocomplete="off" onSubmit="signin('form-login'); return false;" action="<?php echo site_url('home/signin/ajax'); ?>">
                    <h4 class="nomargin">Sign In</h4>
                    <p class="mt5 mb20">Login to access your account.</p>
                
                    <input type="text" class="form-control uname" name="email" placeholder="Email" mandatory="yes" id="email" />
                    <input type="password" class="form-control pword" name="password" placeholder="Password" mandatory="yes" id="password" />
                    <!-- <a href="#"><small>Forgot Your Password?</small></a> -->
                    <button type="submit" class="btn btn-warning btn-block">Sign In</button>
                </form>
            </div><!-- col-sm-5 -->
            
        </div><!-- row -->
        
        <div class="signup-footer">
            <div class="pull-left">
                &copy; 2019. All Rights Reserved.
            </div>
            <div class="pull-right">
                Created By: <a href="http://www.essar.co.id/" target="_blank">PT. Essar Indonesia</a>
            </div>
        </div>
        
    </div><!-- signin -->
  
</section>
<script src="assets/js/jquery-1.10.2.min.js"></script>
<script src="assets/js/jquery-migrate-1.2.1.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/modernizr.min.js"></script>
<script src="assets/js/retina.min.js"></script>
<script src="assets/sweetalert/sweetalert.min.js"></script>
<script src="assets/js/custom.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>