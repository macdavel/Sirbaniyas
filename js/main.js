var map;

var fading_out = false;

site_clicked = false;
about_clicked = false;
team_clicked = false;
contact_clicked = false;
check_vol_activated = false;


$("p").hide();
$("#the_team").hide();

// $("#instructions").hide();
// $("#contacts").hide();
//Put a menu button

//instructions on how to use the site

//implement a fade in function



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












var index=0;
markers_list = [];
sounds_list = ['197590989'];

var interval_running = false;

var clusterStyles = [
  {
    textColor: 'white',
    url:"img/circle-xxl2.png",
    size: "100%",
    height: 40,
    width: 40,
  },
 {
    textColor: 'white',
    url: "img/circle-xxl2.png",
    height: 40,
    width: 40
  },
 {
    textColor: 'white',
    url: "img/circle-xxl2.png",
    height: 40,
    width: 40
  }
];

var mcOptions = {
    gridSize: 30,
    styles: clusterStyles,
    maxZoom: 15
};


//Soundcloud Magic



the_songs = {};




marker_objects = [
// [24.3133, 52.6000,],
[24.28954, 52.58479,"211531864","209403852","http://visitabudhabi.ae/DataFolder/Images/Thumbnails/900x600//sir-bani-yas-00026-vad-2015.jpg"],    //t59
[24.28978,52.58479,"211531862",'209403849',"http://visitabudhabi.ae/DataFolder/Images/Thumbnails/900x600//sir-bani-yas-00026-vad-2015.jpg"],     //T64
[24.304283,52.57853,"211533433","209403847","http://www.uaebirding.com/forum/attachment.php?attachmentid=7953&d=1294730025"],     //t65&t68
[24.29264,52.60099,"211531858","209403846","http://www.uaebirding.com/forum/attachment.php?attachmentid=7952&d=1294730025"],      //t72
[24.29317,52.60766,"211531857","209403845","http://www.sirbaniyasisland.com/Admin/Content/SIR-BANI-YAS-ISLAND-WINS-WORLDS-LEADING-SUSTAINABLE-TOURISM-DESTINATION-AT-2014-WORLD-TRAVEL-AWARDS-Big1712201412242.jpg"],      //t86
[24.33098,52.64927,"211531855","209403842","https://scontent.fash1-1.fna.fbcdn.net/hphotos-xfp1/v/t1.0-9/10616136_10152834132662674_8593342411763777634_n.jpg?oh=4e55c53cfb3b2de436a29b63ee847470&oe=55F93E4F"],      //t92
[24.31771,52.62506,"211531853","209403840","http://cdn.timesofisrael.com/uploads/2015/02/000_REF31081-635x338.jpg"],      //t94-99
[24.32747,52.63596,"211531851","209403837","http://www.uaebirding.com/forum/attachment.php?attachmentid=8580&d=1299563903"],      //t106-109
[24.29747,52.58990,"211531849","209403836","http://www.uaebirding.com/forum/attachment.php?attachmentid=8581&d=1299564123"],      //T113
[24.31200,52.56993,"211531848","209403832","https://scontent.fash1-1.fna.fbcdn.net/hphotos-xfp1/v/t1.0-9/14392_10152833240452674_8381721219240658483_n.jpg?oh=71d325442c1b524c969df1791624c75f&oe=55F3CA68"],      //t116&127  and t123
[24.31200,52.56995,"211531845","209403831","https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],      //t123
// [24.32830,52.60320,"208994821"],
// [24.33098,52.64927,"208994821"],
// [24.31200,52.56993,"208994821"],
// [24.33642,52.60153,"208994821"]
]



SC.initialize({
    client_id: 'a93bdb6a3ee57264e5ce88a2edc34f27'
    });

tracksTotalCount = marker_objects.length;
tracksLoadedCount= 0;

function onTracksReady(){
  console.log("Tracks are ready for playing");
  for (mark = 0 ; mark<marker_objects.length ; mark++){

    console.log("Creating markers");

    var my_marker_pos = new google.maps.LatLng(marker_objects[mark][0], marker_objects[mark][1]);
    marker = create_markers(my_marker_pos,mark);
    add_listeners(marker,"/tracks/"+marker_objects[mark][2]);

  }

  //activating the clustering API
  markerClusterer = new MarkerClusterer(map, markers_list,mcOptions);

}

onTrackLoaded = function(i, track_id) {
  return function(sound) {
    the_songs[track_id] = sound;
    console.log(the_songs);
    tracksLoadedCount += 1;
    if (tracksLoadedCount === tracksTotalCount) {
      return onTracksReady();
    }
  }
}

var results = [];

function load_sounds(){
  for (mark = 0; mark< marker_objects.length; mark++) {
    var track_id = "/tracks/"+marker_objects[mark][2];
    results.push(SC.stream(track_id, {
      autoLoad: true,
      onstop: function(){
        console.log("Stopped the song");
        // SC.streamStopAll();
      },
      onplay : function(){
        console.log("Played the song");
      }
    }, onTrackLoaded(mark,track_id)));
  }

}


function initialize() {

  //create map

	var myLatlng = new google.maps.LatLng(24.3133, 52.6000);
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(24.3133, 52.6000),
    mapTypeId: google.maps.MapTypeId.HYBRID,
    disableDefaultUI: true,
    tilt:90,
    class: 'my_map',
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);


  google.maps.event.addListenerOnce(map,'idle',function(){
  	console.log("About to execute");
  });


  //loading sounds and using sounds to create markers
  load_sounds();
}







$(document).ready(function(){

google.maps.event.addDomListener(window, 'load', initialize);


});





//Set time out functions

function fadeout(sound_obj){
  interval_running= true;
  if(sound_obj.volume <= 0){
      sound_obj.stop();
      SC.streamStopAll();
      clearInterval(mysound);
      clearInterval(mysound);
      fading_out = false;
      console.log("changed fadeout");
      return;
  }
  sound_obj.setVolume(sound_obj.volume-1);
  console.log(sound_obj.volume);
}





function wait_for_fade_out(sound_obj){
  check_vol_activated = true;
  if( fading_out == false ){
    clearInterval(check_vol);
    SC.streamStopAll();
    if(interval_running){
      clearInterval(mysound);
      clearInterval(mysound);
    };
      
    sound_obj.setVolume(100);
    console.log("The song volume: "+sound_obj.volume);
    sound_obj.play({loops: 10});
  }


}





//begin actaully creating the map

function create_markers(marker_pos, mark){

  var marker = new google.maps.Marker({
  position: marker_pos,
  map:map,
  img: '<img class="port_img" src='+marker_objects[mark][4]+'>',
  optimized:false,
  color:"black",
  // title: "Sound",
  icon: {
    url:'http://ikidsawards.kidscreen.com/Content/images/dotCircle.png?i='+(index++),
    scaledSize: new google.maps.Size(50, 50)
  }


});
  markers_list.push(marker);
  return marker;
}

function add_listeners(marker, track_id){


  google.maps.event.addListener(marker, 'mouseover', function() {

    console.log(fading_out);
    if(check_vol_activated){
      clearInterval(check_vol);
    }
    

    if( fading_out == false ){
        SC.streamStopAll();
        if(interval_running){
          clearInterval(mysound);
        };
      
      the_songs[track_id].setVolume(100);
      console.log("The song volume: "+the_songs[track_id].volume);
      the_songs[track_id].play({loops: 10});
    }

    else if(fading_out){
      console.log('setting fadeout set interval')
      check_vol = setInterval(wait_for_fade_out,5,the_songs[track_id]);
    }


  });

  google.maps.event.addListener(marker, 'mouseout', function() {
    if(check_vol_activated){
      clearInterval(check_vol);
    }
    
    sound_obj = the_songs[track_id];
    check_play_state(marker, sound_obj);

  });


  google.maps.event.addListener(map, 'tilesloaded', function() {

    SC.streamStopAll();

    console.log("ZOOM changed, Stopping sounds");

  });

  google.maps.event.addListener(marker, 'click', function() {
    if(this.color == "black"){
      this.color = "red";
      $(".port_img").replaceWith(this.img);
      $( "#the_menu" ).show( "slide", {direction:"down"},1000 );
      $('img[src="'+this.icon.url+'"]').css('-webkit-filter','hue-rotate(270deg)');
    }
    else if(this.color === "red"){
      this.color = 'black';
      $( "#the_menu" ).hide( "slide", {direction:"down"},1000 );
      $('img[src="'+this.icon.url+'"]').css('-webkit-filter','hue-rotate(360deg)');
    }
    
  });

}


function check_play_state(marker, thesound){
  console.log(thesound.playState);
  console.log("Firing check fade out")
  if (thesound.playState === 1){
    console.log("In the fade out function ");
    fading_out = true;
    console.log(thesound.volume);
    mysound = setInterval(fadeout,5,thesound);

  }
  else if(thesound.playState === 0){
    thesound.setVolume(100);
    console.log("Not in the fade out function");
    console.log(thesound.volume);
    // SC.streamStopAll();
  }

}
