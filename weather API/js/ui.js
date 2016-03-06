$(document).ready(function() {
    $('#pincodesearch').hide();
    $('#weather').hide();
    
    /*Revealing Pin code Seection*/
    
    $('#manual').click(function() {
        
        $('#pincodesearch').fadeIn(2000);
        var pincodesearchpos=$('#pincodesearch').position().top;
        $('html,body').animate({scrollTop:pincodesearchpos},800);      

    });
    
    /*Function call to block 1*/
    
    $('#automatic').click(function() {
        
        getLocation();
        $('#weather').fadeIn(1000);     
        var weatherpos=$('#weather').position().top;
        $('html,body').animate({scrollTop:weatherpos},800);    
    }); 
    
     /*Function call to block 5*/
    
    $('#search').click(function() {
    
        getWeather();
        $('#weather').fadeIn(1000);         
    });        
});