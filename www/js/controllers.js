var app = angular.module('starter.controllers', ['firebase'])

app.controller('LoginCtrl', function ($scope, $state) {
    console.log("LoginCtrl");
  })

  .controller('DashCtrl', function ($scope, Chats) {
    console.log("DashCtrl");
    $scope.items = Chats.all();
  })

  .controller('TodoCtrl', function ($scope, $http, Todos, $ionicLoading, $ionicPopup, $ionicModal) {
    console.log("TodoCtrl");
    $ionicLoading.show();

    function Todo(data){
      this._id = data._id;
      this.title = data.title;
      this.end = data.end;
      this.createDate = data.createDate;
      this.updateDate = data.updateDate;
      //$$hashKey: "object:57"
      //_id: {$oid: "57655ef1c2ef161e70adae0e"}
      //createDate: "2016-06-18T16:12:12.695Z"
      //end: false
      //title: "1234"
      //updateDate: "2016-06-18T16:12:46.620Z"
      //Object 견본
    }
    function readTodo(){
      var data = Todos.all($http);
      console.log(data);
      data.error(function (data, status, header, config) {
        $ionicLoading.hide();
        alert("error : " + status + " /" + data);
      });
      data.success(function (data, status, header, config) {
        $ionicLoading.hide();
        console.log("success : " + status + " /" + data);
        $scope.todos = data;
      });
    }

    readTodo();

    $scope.updateTodo = function (todo) {
      console.log(todo);
      todo.updateDate = new Date();
      //todo.id = todo._id.$oid;
      var setTodo = new Todo(todo);

      $ionicLoading.show();
      var updated = Todos.update($http, setTodo);
      updated.error(function (data, status, header, config) {
        $ionicLoading.hide();
        console.log("error : " + status + " /" + data);
      });
      updated.success(function (data, status, header, config) {
        $ionicLoading.hide();
        //alert("updated");
        //console.log("updated!");
        readTodo();
      });
    }

    $scope.deleteTodo = function (todo) {
      $ionicPopup.confirm({
        title: "Delete",
        template: "really delete???"
      }).then(function (result) {
        if (result) {
          $ionicLoading.show();
          var done = Todos.remove($http, todo);
          done.error(function (data, status, header, config) {
            $ionicLoading.hide();
            console.log("error : " + status + " /" + data);
          });
          done.success(function (data, status, header, config) {
            $ionicLoading.hide();
            readTodo();
          });
        }
        else {
          alert(result);
        }
      });
    }

    $scope.writeTodo = function($event, todo){
      $event.preventDefault();

      console.log("$scope.title : " + $scope.title);
      console.log("writeTodo1 : " + todo);
      //todo = new Todos(todo);

      todo.createDate = new Date();
      todo.updateDate = new Date();
      todo.end = false;
      var setTodo = new Todo(todo);

      var title = setTodo.title;
      //console.log("writeTodo : " + title);
      if(title == undefined){
        alert("please input todo");
        $scope.title = "";
      }else{
        //var todo = {"title":title, "end":false};
        var writeDone = Todos.write($http, setTodo);
        writeDone.error(function (data, status, header, config) {
          $ionicLoading.hide();
          alert("error : " + status + " /" + data);
        });
        writeDone.success(function (data, status, header, config) {
          $ionicLoading.hide();
          $scope.closeModal();
          console.log("success : " + status + " /" + data);
          readTodo();
          $scope.title = "";
        });
      }
    }

    var baseUrl = "views/todoWrite.html";
    $ionicModal.fromTemplateUrl(baseUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function(){
      $scope.modal.show();
      //setTimeout(function(){
      //$scope.modal.show();
      //},100);
    }
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
  })

  .controller('ChatsCtrl', function ($scope, Chats, $firebaseArray) {
    $scope.items = Chats.all();
    $scope.remove = function (video) {
      Chats.remove(video);
    };

    var messagesRef = new Firebase("https://aloha-651ec.firebaseio.com/aloha");
    // download the data from a Firebase reference into a (pseudo read-only) array
    // all server changes are applied in realtime
    $scope.messages = $firebaseArray(messagesRef);
    // create a query for the most recent 25 messages on the server
    var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    // the $firebaseArray service properly handles database queries as well
    $scope.filteredMessages = $firebaseArray(query);


    var airportsRef = new Firebase("https://publicdata-airports.firebaseio.com/");
    airportsRef.child("SFO").on("value", delayInfo);
    function delayInfo(snapshot) {
      var airport = snapshot.val();
      console.log("Delay: " + airport.delay + " reason: " + airport.status.reason);
    }

  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats, $ionicScrollDelegate) {
    $scope.item = Chats.get($stateParams.itemId);
    //
    //function($scope, $ionicHistory, $firebaseArray, $cordovaCamera, $firebase, $ionicScrollDelegate) {
    //
    //  $ionicHistory.clearHistory();
    //

    var message = $scope.myMessage;
    console.log(message);

    function Talk(message) {
      this.message = message;
      this.date = new Date();
    }
    $scope.Lists = [];

    $scope.sendMessage = function(msg){
      //console.log("$scope.msg : " + msg.my); SD
      var newMessage = msg.my;
      if(newMessage == undefined){
        alert("please input message");
        $scope.msg.my = "";
      }else{
        //var date = new Date();
        $scope.messageClass = "msg my";
        //class="msg my"
        //var getDate = $filter('date')(new Date(), 'MMM d, y h:mm a');
        //var html = "<p>" + newMessage + "</p>";
        //html += "<p class='right date'>"+ getDate +"</p>";
        //console.log(html);
        var setNewTalk = new Talk(newMessage);
        $scope.Lists.push(setNewTalk);
        console.log(setNewTalk);
      }
      $scope.msg.my = "";
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom();
    }
  })

  .controller('VideoCtrl', function ($scope, Videos) {

    $scope.videos = Videos.all();
    $scope.remove = function (video) {
      Videos.remove(video);
    };
  })

  .controller('VideoDetailCtrl', function ($scope, $stateParams, Videos,$ionicLoading,$location) {
    $scope.video = Videos.get($stateParams.videoId);

    $ionicLoading.show();

    realTimeCommunication($location);
    //realTime2();
    $ionicLoading.hide();
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });

//
//$(window).resize(function(){
//  resizeWindow(this);
//});



function realTimeCommunication($location){
  'use strict';

  $(document).ready(function() {

    $('#callTime').hide();
   // $('#calleeImg').show();
    $('#calleeName').show();
    $('#remoteVideo').show();
    //margin-left: 70%;
    //화상 카메라 start
    start();

    $('button').click(function(){
      var getId = $(this).attr('id');

      switch (getId){
        case 'callButton':
          console.log(getId);
          call();
          $('#'+getId).hide();
          $('#calleeName').hide();
          $('#callTime').show();
          //   $("#header").addClass('call-accept');
          $('#localVideo').addClass('acceptCall');
          break;
        case 'hangupButton':
          console.log(getId);
          $('#callTime').hide();
          $('#callButton').show();
          $('#calleeName').show();
          $('#remoteVideo').hide();
          $('#localVideo').removeClass('acceptCall');
          hangup();
          $location.path("/videos");
          break;
      }
    });
  });

  var startButton = document.getElementById('startButton');
  var callButton = document.getElementById('callButton');
  var hangupButton = document.getElementById('hangupButton');

  //callButton.disabled = true;
  //hangupButton.disabled = true;
  //startButton.onclick = start;
  //callButton.onclick = call;
  //hangupButton.onclick = hangup;

  var startTime;
  var localVideo = document.getElementById('localVideo');
  var remoteVideo = document.getElementById('remoteVideo');

  localVideo.addEventListener('loadedmetadata', function() {
    trace('Local video videoWidth: ' + this.videoWidth +
      'px,  videoHeight: ' + this.videoHeight + 'px');
  });

  remoteVideo.addEventListener('loadedmetadata', function() {
    trace('Remote video videoWidth: ' + this.videoWidth +
      'px,  videoHeight: ' + this.videoHeight + 'px');
  });

  remoteVideo.onresize = function() {
    trace('Remote video size changed to ' +
      remoteVideo.videoWidth + 'x' + remoteVideo.videoHeight);
    // We'll use the first onresize callback as an indication that video has started
    // playing out.
    if (startTime) {
      var elapsedTime = window.performance.now() - startTime;
      trace('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
      startTime = null;
    }
  };

  var localStream;
  var pc1;
  var pc2;
  var offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };

  function getName(pc) {
    return (pc === pc1) ? 'pc1' : 'pc2';
  }

  function getOtherPc(pc) {
    return (pc === pc1) ? pc2 : pc1;
  }

  function gotStream(stream) {
    trace('Received local stream');
    localVideo.srcObject = stream;
    // Add localStream to global scope so it's accessible from the browser console
    window.localStream = localStream = stream;
   // callButton.disabled = false;
  }

  function start() {
    trace('Requesting local stream');
    //startButton.disabled = true;
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      })
      .then(gotStream)
      .catch(function(e) {
        alert('getUserMedia() error: ' + e.name);
      });
  }

  function call() {
    //callButton.disabled = true;
    //hangupButton.disabled = false;
    trace('Starting call');
    startTime = window.performance.now();
    var videoTracks = localStream.getVideoTracks();
    var audioTracks = localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      trace('Using video device: ' + videoTracks[0].label);
    }
    if (audioTracks.length > 0) {
      trace('Using audio device: ' + audioTracks[0].label);
    }
    var servers = null;
    // Add pc1 to global scope so it's accessible from the browser console
    window.pc1 = pc1 = new RTCPeerConnection(servers);
    trace('Created local peer connection object pc1');
    pc1.onicecandidate = function(e) {
      onIceCandidate(pc1, e);
    };
    // Add pc2 to global scope so it's accessible from the browser console
    window.pc2 = pc2 = new RTCPeerConnection(servers);
    trace('Created remote peer connection object pc2');
    pc2.onicecandidate = function(e) {
      onIceCandidate(pc2, e);
    };
    pc1.oniceconnectionstatechange = function(e) {
      onIceStateChange(pc1, e);
    };
    pc2.oniceconnectionstatechange = function(e) {
      onIceStateChange(pc2, e);
    };
    pc2.onaddstream = gotRemoteStream;

    pc1.addStream(localStream);
    trace('Added local stream to pc1');

    trace('pc1 createOffer start');
    pc1.createOffer(
      offerOptions
    ).then(
      onCreateOfferSuccess,
      onCreateSessionDescriptionError
    );
  }

  function onCreateSessionDescriptionError(error) {
    trace('Failed to create session description: ' + error.toString());
  }

  function onCreateOfferSuccess(desc) {
    trace('Offer from pc1\n' + desc.sdp);
    trace('pc1 setLocalDescription start');
    pc1.setLocalDescription(desc).then(
      function() {
        onSetLocalSuccess(pc1);
      },
      onSetSessionDescriptionError
    );
    trace('pc2 setRemoteDescription start');
    pc2.setRemoteDescription(desc).then(
      function() {
        onSetRemoteSuccess(pc2);
      },
      onSetSessionDescriptionError
    );
    trace('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    pc2.createAnswer().then(
      onCreateAnswerSuccess,
      onCreateSessionDescriptionError
    );
  }

  function onSetLocalSuccess(pc) {
    trace(getName(pc) + ' setLocalDescription complete');
  }

  function onSetRemoteSuccess(pc) {
    trace(getName(pc) + ' setRemoteDescription complete');
  }

  function onSetSessionDescriptionError(error) {
    trace('Failed to set session description: ' + error.toString());
  }

  function gotRemoteStream(e) {
    // Add remoteStream to global scope so it's accessible from the browser console
    window.remoteStream = remoteVideo.srcObject = e.stream;
    trace('pc2 received remote stream');
  }

  function onCreateAnswerSuccess(desc) {
    trace('Answer from pc2:\n' + desc.sdp);
    trace('pc2 setLocalDescription start');
    pc2.setLocalDescription(desc).then(
      function() {
        onSetLocalSuccess(pc2);
      },
      onSetSessionDescriptionError
    );
    trace('pc1 setRemoteDescription start');
    pc1.setRemoteDescription(desc).then(
      function() {
        onSetRemoteSuccess(pc1);
      },
      onSetSessionDescriptionError
    );
  }

  function onIceCandidate(pc, event) {
    if (event.candidate) {
      getOtherPc(pc).addIceCandidate(
        new RTCIceCandidate(event.candidate)
      ).then(
        function() {
          onAddIceCandidateSuccess(pc);
        },
        function(err) {
          onAddIceCandidateError(pc, err);
        }
      );
      trace(getName(pc) + ' ICE candidate: \n' + event.candidate.candidate);
    }
  }

  function onAddIceCandidateSuccess(pc) {
    trace(getName(pc) + ' addIceCandidate success');
  }

  function onAddIceCandidateError(pc, error) {
    trace(getName(pc) + ' failed to add ICE Candidate: ' + error.toString());
  }

  function onIceStateChange(pc, event) {
    if (pc) {
      trace(getName(pc) + ' ICE state: ' + pc.iceConnectionState);
      console.log('ICE state change event: ', event);
    }
  }

  function hangup() {
    trace('Ending call');
    pc1.close();
    pc2.close();
    pc1 = null;
    pc2 = null;
    //hangupButton.disabled = true;
    //callButton.disabled = false;
  }


  function trace(text) {
    if (text[text.length - 1] === '\n') {
      text = text.substring(0, text.length - 1);
    }
    if (window.performance) {
      var now = (window.performance.now() / 1000).toFixed(3);
      console.log(now + ': ' + text);
    } else {
      console.log(text);
    }
  }

}

//function realTime2(){
//  'use strict';
//
//  var isChannelReady = false;
//  var isInitiator = false;
//  var isStarted = false;
//  var localStream;
//  var pc;
//  var remoteStream;
//  var turnReady;
//
//  var pcConfig = {
//    'iceServers': [{
//      'url': 'stun:stun.l.google.com:19302'
//    }]
//  };
//
//// Set up audio and video regardless of what devices are present.
//  var sdpConstraints = {
//    'mandatory': {
//      'OfferToReceiveAudio': true,
//      'OfferToReceiveVideo': true
//    }
//  };
//
///////////////////////////////////////////////
//
//  var room = 'foo';
//// Could prompt for room name:
//// room = prompt('Enter room name:');
//
//  var socket = io.connect();
//
//  if (room !== '') {
//    socket.emit('create or join', room);
//    console.log('Attempted to create or  join room', room);
//  }
//
//  socket.on('created', function(room) {
//    console.log('Created room ' + room);
//    isInitiator = true;
//  });
//
//  socket.on('full', function(room) {
//    console.log('Room ' + room + ' is full');
//  });
//
//  socket.on('join', function (room){
//    console.log('Another peer made a request to join room ' + room);
//    console.log('This peer is the initiator of room ' + room + '!');
//    isChannelReady = true;
//  });
//
//  socket.on('joined', function(room) {
//    console.log('joined: ' + room);
//    isChannelReady = true;
//  });
//
//  socket.on('log', function(array) {
//    console.log.apply(console, array);
//  });
//
//////////////////////////////////////////////////
//
//  function sendMessage(message) {
//    console.log('Client sending message: ', message);
//    socket.emit('message', message);
//  }
//
//// This client receives a message
//  socket.on('message', function(message) {
//    console.log('Client received message:', message);
//    if (message === 'got user media') {
//      maybeStart();
//    } else if (message.type === 'offer') {
//      if (!isInitiator && !isStarted) {
//        maybeStart();
//      }
//      pc.setRemoteDescription(new RTCSessionDescription(message));
//      doAnswer();
//    } else if (message.type === 'answer' && isStarted) {
//      pc.setRemoteDescription(new RTCSessionDescription(message));
//    } else if (message.type === 'candidate' && isStarted) {
//      var candidate = new RTCIceCandidate({
//        sdpMLineIndex: message.label,
//        candidate: message.candidate
//      });
//      pc.addIceCandidate(candidate);
//    } else if (message === 'bye' && isStarted) {
//      handleRemoteHangup();
//    }
//  });
//
//////////////////////////////////////////////////////
//
//  var localVideo = document.querySelector('#localVideo');
//  var remoteVideo = document.querySelector('#remoteVideo');
//
//  navigator.mediaDevices.getUserMedia({
//      audio: false,
//      video: true
//    })
//    .then(gotStream)
//    .catch(function(e) {
//      alert('getUserMedia() error: ' + e.name);
//    });
//
//  function gotStream(stream) {
//    console.log('Adding local stream.');
//    localVideo.src = window.URL.createObjectURL(stream);
//    localStream = stream;
//    sendMessage('got user media');
//    if (isInitiator) {
//      maybeStart();
//    }
//  }
//
//  var constraints = {
//    video: true
//  };
//
//  console.log('Getting user media with constraints', constraints);
//
//  if (location.hostname !== 'localhost') {
//    requestTurn(
//      'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
//    );
//  }
//
//  function maybeStart() {
//    console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
//    if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
//      console.log('>>>>>> creating peer connection');
//      createPeerConnection();
//      pc.addStream(localStream);
//      isStarted = true;
//      console.log('isInitiator', isInitiator);
//      if (isInitiator) {
//        doCall();
//      }
//    }
//  }
//
//  window.onbeforeunload = function() {
//    sendMessage('bye');
//  };
//
///////////////////////////////////////////////////////////
//
//  function createPeerConnection() {
//    try {
//      pc = new RTCPeerConnection(null);
//      pc.onicecandidate = handleIceCandidate;
//      pc.onaddstream = handleRemoteStreamAdded;
//      pc.onremovestream = handleRemoteStreamRemoved;
//      console.log('Created RTCPeerConnnection');
//    } catch (e) {
//      console.log('Failed to create PeerConnection, exception: ' + e.message);
//      alert('Cannot create RTCPeerConnection object.');
//      return;
//    }
//  }
//
//  function handleIceCandidate(event) {
//    console.log('icecandidate event: ', event);
//    if (event.candidate) {
//      sendMessage({
//        type: 'candidate',
//        label: event.candidate.sdpMLineIndex,
//        id: event.candidate.sdpMid,
//        candidate: event.candidate.candidate
//      });
//    } else {
//      console.log('End of candidates.');
//    }
//  }
//
//  function handleRemoteStreamAdded(event) {
//    console.log('Remote stream added.');
//    remoteVideo.src = window.URL.createObjectURL(event.stream);
//    remoteStream = event.stream;
//  }
//
//  function handleCreateOfferError(event) {
//    console.log('createOffer() error: ', event);
//  }
//
//  function doCall() {
//    console.log('Sending offer to peer');
//    pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
//  }
//
//  function doAnswer() {
//    console.log('Sending answer to peer.');
//    pc.createAnswer().then(
//      setLocalAndSendMessage,
//      onCreateSessionDescriptionError
//    );
//  }
//
//  function setLocalAndSendMessage(sessionDescription) {
//    // Set Opus as the preferred codec in SDP if Opus is present.
//    //  sessionDescription.sdp = preferOpus(sessionDescription.sdp);
//    pc.setLocalDescription(sessionDescription);
//    console.log('setLocalAndSendMessage sending message', sessionDescription);
//    sendMessage(sessionDescription);
//  }
//
//  function onCreateSessionDescriptionError(error) {
//    trace('Failed to create session description: ' + error.toString());
//  }
//
//  function requestTurn(turnURL) {
//    var turnExists = false;
//    for (var i in pcConfig.iceServers) {
//      if (pcConfig.iceServers[i].url.substr(0, 5) === 'turn:') {
//        turnExists = true;
//        turnReady = true;
//        break;
//      }
//    }
//    if (!turnExists) {
//      console.log('Getting TURN server from ', turnURL);
//      // No TURN server. Get one from computeengineondemand.appspot.com:
//      var xhr = new XMLHttpRequest();
//      xhr.onreadystatechange = function() {
//        if (xhr.readyState === 4 && xhr.status === 200) {
//          var turnServer = JSON.parse(xhr.responseText);
//          console.log('Got TURN server: ', turnServer);
//          pcConfig.iceServers.push({
//            'url': 'turn:' + turnServer.username + '@' + turnServer.turn,
//            'credential': turnServer.password
//          });
//          turnReady = true;
//        }
//      };
//      xhr.open('GET', turnURL, true);
//      xhr.send();
//    }
//  }
//
//  function handleRemoteStreamAdded(event) {
//    console.log('Remote stream added.');
//    remoteVideo.src = window.URL.createObjectURL(event.stream);
//    remoteStream = event.stream;
//  }
//
//  function handleRemoteStreamRemoved(event) {
//    console.log('Remote stream removed. Event: ', event);
//  }
//
//  function hangup() {
//    console.log('Hanging up.');
//    stop();
//    sendMessage('bye');
//  }
//
//  function handleRemoteHangup() {
//    console.log('Session terminated.');
//    stop();
//    isInitiator = false;
//  }
//
//  function stop() {
//    isStarted = false;
//    // isAudioMuted = false;
//    // isVideoMuted = false;
//    pc.close();
//    pc = null;
//  }
//
/////////////////////////////////////////////
//
//// Set Opus as the default audio codec if it's present.
//  function preferOpus(sdp) {
//    var sdpLines = sdp.split('\r\n');
//    var mLineIndex;
//    // Search for m line.
//    for (var i = 0; i < sdpLines.length; i++) {
//      if (sdpLines[i].search('m=audio') !== -1) {
//        mLineIndex = i;
//        break;
//      }
//    }
//    if (mLineIndex === null) {
//      return sdp;
//    }
//
//    // If Opus is available, set it as the default in m line.
//    for (i = 0; i < sdpLines.length; i++) {
//      if (sdpLines[i].search('opus/48000') !== -1) {
//        var opusPayload = extractSdp(sdpLines[i], /:(\d+) opus\/48000/i);
//        if (opusPayload) {
//          sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex],
//            opusPayload);
//        }
//        break;
//      }
//    }
//
//    // Remove CN in m line and sdp.
//    sdpLines = removeCN(sdpLines, mLineIndex);
//
//    sdp = sdpLines.join('\r\n');
//    return sdp;
//  }
//
//  function extractSdp(sdpLine, pattern) {
//    var result = sdpLine.match(pattern);
//    return result && result.length === 2 ? result[1] : null;
//  }
//
//// Set the selected codec to the first in m line.
//  function setDefaultCodec(mLine, payload) {
//    var elements = mLine.split(' ');
//    var newLine = [];
//    var index = 0;
//    for (var i = 0; i < elements.length; i++) {
//      if (index === 3) { // Format of media starts from the fourth.
//        newLine[index++] = payload; // Put target payload to the first.
//      }
//      if (elements[i] !== payload) {
//        newLine[index++] = elements[i];
//      }
//    }
//    return newLine.join(' ');
//  }
//
//// Strip CN from sdp before CN constraints is ready.
//  function removeCN(sdpLines, mLineIndex) {
//    var mLineElements = sdpLines[mLineIndex].split(' ');
//    // Scan from end for the convenience of removing an item.
//    for (var i = sdpLines.length - 1; i >= 0; i--) {
//      var payload = extractSdp(sdpLines[i], /a=rtpmap:(\d+) CN\/\d+/i);
//      if (payload) {
//        var cnPos = mLineElements.indexOf(payload);
//        if (cnPos !== -1) {
//          // Remove CN payload from m line.
//          mLineElements.splice(cnPos, 1);
//        }
//        // Remove CN line in sdp
//        sdpLines.splice(i, 1);
//      }
//    }
//
//    sdpLines[mLineIndex] = mLineElements.join(' ');
//    return sdpLines;
//  }
//
//}
//function basicWebRtc(){
//
//  'use strict';
//
//  navigator.getUserMedia = navigator.getUserMedia ||
//    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//
//  var constraints = {
//    audio: false,
//    video: true
//  };
//
//  var video = document.querySelector('video');
//
//  function successCallback(stream) {
//    console.log('successCallback stream: ' + stream);
//    window.stream = stream; // stream available to console
//    if (window.URL) {
//      video.src = window.URL.createObjectURL(stream);
//    } else {
//      video.src = stream;
//    }
//  }
//
//  function errorCallback(error) {
//    console.log('navigator.getUserMedia error: ', error);
//  }
//
//  navigator.getUserMedia(constraints, successCallback, errorCallback);
//
//}
