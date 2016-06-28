var map;
$('.hidden-text').hide();
$('#instructions').show();

$(document).ready(function(){

// google.maps.event.addDomListener(window, 'load', initialize);


});



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

  load_sounds();
}




















//##################
//################## MENU JavaScript
//##################
//##################

//Hiding text in the Menu
// $("p").hide();
// $("#the_tea").hide();




//Creating Buttons and Adding Click Event Listeners

var JQueryButtonList= [["#the_site","#instructions"], ["#about_butt","#about"], ["#team_butt","#the_team"],["#key_butt","#key-div"]]
var buttonClickState = {};



function generateButtonHandler(buttonVars){
  //solves JQuery Scoping issue when using for loops to create buttons
  /* 
    Function: Generate Button Handler

    Returns a function that generates JQuery event listeners for menu buttons

    Parameters:
      buttonVar[0]- The ID of the Button
      buttonVar[1]- The ID of the Section to be revealed on button click
    
    Returns:
      generateButton Function

  */
  return function(e){
    generateButton(buttonVars);
  }
}


function generateButton(buttonVars){
  /*
    Function: GenerateButton

    Attaches Jquery Event listeners to buttons

    Parameters:
      buttonVar[0]- The ID of the Button
      buttonVar[1]- The ID of the Section to be revealed on button click
  */


  buttonName = buttonVars[0];
  infoDiv = buttonVars[1];  //div with information

  if(buttonClickState[buttonName] == false){

    $(infoDiv).show('blind',1000);
    buttonClickState[buttonName] = true;

  }

  else if(buttonClickState[buttonName] == true){
    $(infoDiv).hide('blind');
    buttonClickState[buttonName] = false;
  }
}

//for loop that creates the buttons

for (var i = 0; i < JQueryButtonList.length; i++) {

  buttonName = JQueryButtonList[i][0];
  buttonClickState[buttonName] = false; 

  $(buttonName).click(generateButtonHandler(JQueryButtonList[i]))

};



//##################
//################## Map JavaScript
//##################
//##################









//Styling for the clustered dots on the map

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


//Marker clusterer options

var mcOptions = {
    gridSize: 30,
    styles: clusterStyles,
    maxZoom: 15
};




//Dictionary keeping all sound objects returned from soundcloud API
the_songs = {};






marker_objects = [
/*
    List: Marker_objects

    List of lists containing information about individual dots on the map.

    Properties: 
      index 0 and 1 are gps coordinates
      index 2 is the soundcloud track ID
      Index 3 is the year the sound was collected
      index 4 is the image URL
*/
[24.28954, 52.58479,"211531864",2015,"http://visitabudhabi.ae/DataFolder/Images/Thumbnails/900x600//sir-bani-yas-00026-vad-2015.jpg"],    //t59
[24.28978,52.58479,"211531862",2015,"http://visitabudhabi.ae/DataFolder/Images/Thumbnails/900x600//sir-bani-yas-00026-vad-2015.jpg"],     //T64
[24.304283,52.57853,"211533433",2015,"http://www.uaebirding.com/forum/attachment.php?attachmentid=7953&d=1294730025"],     //t65&t68
[24.29264,52.60099,"211531858",2015,"http://www.uaebirding.com/forum/attachment.php?attachmentid=7952&d=1294730025"],      //t72
[24.29317,52.60766,"211531857",2015,"http://www.sirbaniyasisland.com/Admin/Content/SIR-BANI-YAS-ISLAND-WINS-WORLDS-LEADING-SUSTAINABLE-TOURISM-DESTINATION-AT-2014-WORLD-TRAVEL-AWARDS-Big1712201412242.jpg"],      //t86
[24.33098,52.64927,"211531855",2015,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xfp1/v/t1.0-9/10616136_10152834132662674_8593342411763777634_n.jpg?oh=4e55c53cfb3b2de436a29b63ee847470&oe=55F93E4F"],      //t92
[24.31771,52.62506,"211531853",2015,"http://cdn.timesofisrael.com/uploads/2015/02/000_REF31081-635x338.jpg"],      //t94-99
[24.32747,52.63596,"211531851",2015,"http://www.uaebirding.com/forum/attachment.php?attachmentid=8580&d=1299563903"],      //t106-109
[24.29747,52.58990,"211531849",2015,"http://www.uaebirding.com/forum/attachment.php?attachmentid=8581&d=1299564123"],      //T113
[24.28922,52.58548,"266935919",2015,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xfp1/v/t1.0-9/14392_10152833240452674_8381721219240658483_n.jpg?oh=71d325442c1b524c969df1791624c75f&oe=55F3CA68"],      //t116&127  and t123
[24.29418,52.58562,"271194770",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],      //t123
[24.31437,52.57271,"266935915",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],
[24.32780,52.55490,"266935912",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],
[24.32780,52.63549,"266935910",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],
[24.29756,52.58975,"266935901",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],
[24.29110,52.58354,"266935899",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],
[24.31595,52.56976,"266935896",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],
[24.32395,52.61715,"266935894",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],
[24.27880,52.62516,"266935893",2016,"https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"]
// [24.29418,52.58562,"266935917","209403831","https://scontent.fash1-1.fna.fbcdn.net/hphotos-xap1/v/t1.0-9/10701939_10152833240117674_5903542997097304451_n.jpg?oh=2564c99ee1c49f42cdf2058b848d916a&oe=55E66869"],

]





//Initialising Soundcloud API
SC.initialize({
    client_id: 'a93bdb6a3ee57264e5ce88a2edc34f27'
    });




//Tracks Total Count keeps 

tracksTotalCount = marker_objects.length;
tracksLoadedCount= 0;



//Helper function, called when all tracks have been loaded



// onTrackLoaded = function(i, track_id) 

var results = [];

function load_sounds(){

  for (mark = 0; mark< marker_objects.length; mark++) {

    var SC_track_number = marker_objects[mark][2];
    var track_id = "/tracks/"+ SC_track_number;

    results.push(SC.stream(track_id, {
      autoLoad: true,
      onstop: function(){
        console.log("Stopped the song");
        // SC.streamStopAll();
      },
      onplay : function(){
        console.log("Played the song");
      }
    }, onTrackLoaded(track_id)));
  }

}

function onTrackLoaded(track_id){
  /*
  Function: On Track Loaded

  Checks whether all soundcloud songs have been loaded and are ready to play.
  Appends soundcloud track objects to the_songs - A dictionary with track_id as key
  and SC object as value.

  parameters:
      track_id
  Returns:
      OnTracksReady Function

  */

  //
  return function(sound) {
    the_songs[track_id] = sound;
    // console.log(the_songs);
    tracksLoadedCount += 1;

    if (tracksLoadedCount === tracksTotalCount) {
      return onTracksReady();
    }
  }
}



function onTracksReady(){
  /*
  Function: OnTracksReady
  
  For 








  */

  for (mark = 0 ; mark<marker_objects.length ; mark++){

    // console.log("Creating markers");
    var SC_track_number = "/tracks/"+marker_objects[mark][2];

    var my_marker_pos = new google.maps.LatLng(marker_objects[mark][0], marker_objects[mark][1]);
    marker = create_markers(my_marker_pos,mark);
    add_listeners(marker,SC_track_number);

  }

  //activating the clustering API
  markerClusterer = new MarkerClusterer(map, markers_list,mcOptions);

}














//Set time out functions

var interval_running = false;

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




var fading_out = false;
var check_vol_activated = false;


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



var index=0;
var markers_list = [];

//begin actaully creating the map

function create_markers(marker_pos, mark){
  var year = marker_objects[mark][3]

  if (year == 2015) {
    var marker = new google.maps.Marker({
      position: marker_pos,
      map:map,
      img: '<img class="port_img" src='+marker_objects[mark][4]+'>',
      optimized:false,
      color:"blue",
      // title: "Sound",
      icon: {
        url:'http://ikidsawards.kidscreen.com/Content/images/dotCircle.png?i='+(index++),
        scaledSize: new google.maps.Size(50, 50)
      }
    });
    markers_list.push(marker);
    return marker;
  } 
  else{
      var marker = new google.maps.Marker({
        position: marker_pos,
        map:map,
        img: '<img class="port_img" src='+marker_objects[mark][4]+'>',
        optimized:false,
        color:"blue",
        // title: "Sound",
        icon: {
          url:'http://ikidsawards.kidscreen.com/Content/images/dotCircle.png?j='+(index++),
          scaledSize: new google.maps.Size(50, 50)
        }
      });
      markers_list.push(marker);
      return marker;
    };

  
}

function add_listeners(marker, track_id){


  // google.maps.event.addListener(marker, 'mouseover', function() {

  //   console.log(fading_out);
  //   if(check_vol_activated){
  //     clearInterval(check_vol);
  //   }
    

  //   if( fading_out == false ){
  //       SC.streamStopAll();
  //       if(interval_running){
  //         clearInterval(mysound);
  //       };
      
  //     the_songs[track_id].setVolume(100);
  //     console.log("The song volume: "+the_songs[track_id].volume);
  //     the_songs[track_id].play({loops: 10});
  //   }

  //   else if(fading_out){
  //     console.log('setting fadeout set interval')
  //     check_vol = setInterval(wait_for_fade_out,5,the_songs[track_id]);
  //   }


  // });

  // google.maps.event.addListener(marker, 'mouseout', function() {
  //   if(check_vol_activated){
  //     clearInterval(check_vol);
  //   }
    
  //   sound_obj = the_songs[track_id];
  //   check_play_state(marker, sound_obj);

  // });


  google.maps.event.addListener(map, 'tilesloaded', function() {

    // SC.streamStopAll();
    // console.log("ZOOM changed, Stopping sounds");

  });



  google.maps.event.addListener(marker, 'click', function() {

    //Colot is legacy code from when the collor used to change
    if(this.color == "blue"){

      handlePlayClick(marker, track_id);
      this.color = "green";

      // $(".port_img").replaceWith(this.img); //This is the div where the image is shown
      // $( "#imgInfo" ).show( "slide", {direction:"down"},1000 ); //uncomment to show pictures
      // $('img[src="'+this.icon.url+'"]').css('-webkit-filter','hue-rotate(270deg)');
    }
    else if(this.color == "green"){
      handleStopClick(marker, track_id);
      this.color = 'blue';
      // $( "#imgInfo" ).hide( "slide", {direction:"down"},1000 );
      // $('img[src="'+this.icon.url+'"]').css('-webkit-filter','hue-rotate(360deg)');
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



function handlePlayClick(marker,track_id){
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

}



function handleStopClick(marker, track_id){
  if(check_vol_activated){
    clearInterval(check_vol);
  }
  
  sound_obj = the_songs[track_id];
  check_play_state(marker, sound_obj);

}