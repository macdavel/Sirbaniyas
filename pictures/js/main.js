$(document).ready(function(){


 $( "#the_menu" ).hide();


var flkty = new Flickity('.gallery',{
	imagesLoaded: true,
	setGallerySize: false,
	percentPosition: true,
	contain: true
});


site_clicked = false;
about_clicked = false;
team_clicked = false;
contact_clicked = false;
check_vol_activated = false;


$("p").hide();
$("#the_team").hide();


$("#the_site").click(function(){
  if(site_clicked == false){
    $("#instructions").show('blind',1000);
    site_clicked = true;
  }

  else if(site_clicked == true){
    $("#instructions").hide('blind');
    site_clicked = false;
  }
})



$("#about_butt").click(function(){
  if(about_clicked == false){
    $("#about").show('blind',1000);
    about_clicked = true;
  }

  else if(about_clicked == true){
    $("#about").hide('blind');
    about_clicked = false;
  }
})


$("#team_butt").click(function(){
  if(team_clicked == false){
    $("#the_team").show('blind',1000);
    team_clicked = true;
  }

  else if(team_clicked == true){
    $("#the_team").hide('blind');
    team_clicked = false;
  }
})

$("#contact_butt").click(function(){
  if(contact_clicked == false){
    $("#contacts").show('blind',1000);
    contact_clicked = true;
  }

  else if(contact_clicked == true){
    $("#contacts").hide('blind');
    contact_clicked = false;
  }
})



















});
