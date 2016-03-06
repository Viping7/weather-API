
$(document).ready(function() {
    $('#pincodesearch').hide();
    $('#weatherreport').hide();
    $('#manual').click(function(){
    $('#pincodesearch').fadeIn(2000);
   
var pincodesearchpos=$('#pincodesearch').position().top;
$('html,body').animate({scrollTop:pincodesearchpos},800);      
});    
$('#automatic').click(function(){
getLocation();
$('#weatherreport').fadeIn(1000);     
var weatherpos=$('#weather').position().top;
$('html,body').animate({scrollTop:weatherpos},800);    
});    
$('#search').click(function(){
getWeather();
$('#weatherreport').fadeIn(1000);         
});        
});