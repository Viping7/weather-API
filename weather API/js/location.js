/*Block 1 : Retreiving weather data through coordinates*/

function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,Errorreport);
    } 
else{ 
       locationerror("Some thing Went Wrong");   
    }
}

function showPosition(position) {
    
    var urldata='http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+ position.coords.longitude+'&appid=494212dd6d3c254cc530307ecedf81b4&units=metric';
    getJSON(urldata);      
}

/*Block 2 : Error Codes*/

function Errorreport(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            locationerror("Its ok if you dont want to share location");
            break;
        case error.POSITION_UNAVAILABLE:
            locationerror("OOps It looks like you are in secret location, we cant access it");
            break;
        case error.TIMEOUT:
             locationerror("Sorry request timed out");
            break;
        case error.UNKNOWN_ERROR:
            locationerror("OOps Something went wrong");
            break;
    }
}

/*Block 3 : If Errror occurs pin code section reveals*/

function locationerror(errormsg) {

    $('#pincodesearch').fadeIn().prepend(errormsg);
    var pincodesearchpos=$('#pincodesearch').position().top;
    $('html,body').animate({scrollTop:pincodesearchpos},800); 
}

/*Block 4 : Retreiving weather data through postal code*/

function getWeather() {

    var pincode=$('#pincode').val();
    if(pincode!='')
    {
        var urldata='http://api.openweathermap.org/data/2.5/weather?zip='+pincode+'&appid=494212dd6d3c254cc530307ecedf81b4&units=metric';
        getJSON(urldata); 
        var weatherpos=$('#weather').position().top;
        $('html,body').animate({scrollTop:weatherpos},800);     
    }
}

/*Block 5 : Retreiving data from API*/

function getJSON(urlval) {
 
    $.ajax({
       url:urlval,
       type:'get',
       dataType:'json',
           success:function(data){
           $(data.main).each(function(index,value) {
               
               $('#temperature').html(value.temp+'&deg; Celsius');
               $('#pressure').html(value.pressure+'&nbsp;hpa');
               $('#humidity').html(value.humidity+'&nbsp; %');
            
           });
               
               $(data.weather).each(function(index,value) {
               $('#image').html('<img src="images/'+value.icon+'.png" class="img-responsive">');
                $('#desc').html(value.description)   
            
           });
                $(data.wind).each(function(index,value) {
                    
               $('#wind').html(value.speed+'&nbsp;m/s');    
            
           });
                
               $(data.sys).each(function(index,value){
               $('#country').html('('+value.country+')');
                var sunrise=dateConverter(value.sunrise*1000);    
               $('#sunrise').html(sunrise);
                 var sunset=dateConverter(value.sunset*1000);  
               $('#sunset').html(sunset);   
            
           });
                
               $('#city').html(data.name);
           }
       });
}

/* Date format changer */

function dateConverter(retreivedDate) {
    
    var time = new Date(retreivedDate);    
    var hour = time.getHours();    
    var minute= time.getMinutes();
    if(minute<10)
    minute='0'+minute;
    return hour+':'+minute;    
    
}