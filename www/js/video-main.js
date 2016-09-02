var app = angular.module('starter.video-main', [])


'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

var video = document.querySelector('video');

function successCallback(stream) {
  console.log('successCallback stream: ' + stream);
  window.stream = stream; // stream available to console

  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);


//custom
function resizeWindow(target){
  var deviceHeight = $(window).height();
  console.log("deviceHeight : " + deviceHeight);
  // alert("video height : " + $('#video').height());
  $('body').height(deviceHeight);
  console.log("bodyHeight : " + $('body').height());

  var bodyHeight = $('body').height();
  var videoHeight = bodyHeight * 0.7;;
  $('#video').height(videoHeight);
  console.log('videoHeight : ' + $('#video').height());

  var deviceWidth = $(window).width();

  if(deviceWidth>560){
    $('.videoScreen').addClass('video');
    $('#callTime').addClass('white');
    $('#video').removeClass('video');

  }
  else{
    $('.videoScreen').removeClass('video');
    $('#callTime').removeClass('white');
    $('#video').addClass('video');
  }
}

function init(){
  $('#callTime').hide();
  $('#calleeImg').hide();
  $('#calleeName').show();
}
//
//$(window).resize(function(){
//  resizeWindow(this);
//});

$(document).ready(function() {
  //resizeWindow(this);

  init();

  $('button').click(function(){
    var getId = $(this).attr('id');

    switch (getId){
      case 'startButton':
        console.log(getId);
        $('#'+getId).hide();
        $('#calleeName').hide();
        $('#callTime').show();
        $('#calleeImg').show();
        //   $("#header").addClass('call-accept');
        break;
      case 'endButton':
        console.log(getId);
        $('#callTime').hide();
        $('#calleeImg').hide();
        $('#startButton').show();
        $('#calleeName').show();
        break;
    }
  });

});
