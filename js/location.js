function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,Errorreport);
    } 
else{ 
       var pinsec=$('#pincodesearch').html();    
       $('#weather').html(pinsec);
    }
}

function showPosition(position) {	
    var urldata='http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+ position.coords.longitude+'&appid=494212dd6d3c254cc530307ecedf81b4&units=metric';
getJSON(urldata);      
}

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
function locationerror(errormsg){
var pinsec=$('#pincodesearch').html();    
       $('#weather').html(errormsg).append(pinsec);
}
function getWeather(){
 var pincode=$('#pincode').val();
if(pincode!='')
{
var urldata='http://api.openweathermap.org/data/2.5/weather?zip='+pincode+'&appid=494212dd6d3c254cc530307ecedf81b4&units=metric';
getJSON(urldata); 
var weatherpos=$('#weather').position().top;
$('html,body').animate({scrollTop:weatherpos},800);     
}
}
function getJSON(urlval){
 $.ajax({
       url:urlval,
       type:'get',
       dataType:'json',
           success:function(data){
           $(data.main).each(function(index,value){
               $('#temperature').html(value.temp+'&deg; Celsius');
               $('#pressure').html(value.pressure+'&nbsp;hpa');
               $('#humidity').html(value.humidity+'&nbsp; %');
            
           });
               $(data.weather).each(function(index,value){
               $('#image').html('<img src="images/'+value.icon+'.png" class="img-responsive">');
                $('#wind').html(value.description)   
            
           });
                $(data.wind).each(function(index,value){
               $('#wind').html(value.speed+'&nbsp;m/s');    
            
           });
                $('#city').html(data.name);
               $(data.sys).each(function(index,value){
               $('#country').html('('+value.country+')');
            
           });
           }
       });
}