$( "#start" ).click(function(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        
        let url = "http://localhost:4000/positionhidden/"+ position.coords.latitude + "/" + position.coords.longitude;
        window.location.replace(url);
        url="";

      },(err)=>{
        console.log(err);
      });
  } else {
    console.log('you don\'t have geolocation');
  }
});


