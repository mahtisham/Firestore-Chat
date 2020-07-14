<!DOCTYPE html>
<html>
<head>
	<title>Firestore chat</title>
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<meta content="utf-8" http-equiv="encoding">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div class="main-wrapper">
		<header class="header">
			<div class="logo">
				<a href="#">My Messenger</a>
			</div>
		</header>	
		<div class="flex-box">
			<div class="box-1">
				<div class="messenger">
					<div class="heading"><i class="fab fa-facebook-messenger"></i>&nbsp;<span>Messenger</span></div>
					<div class="firebase_users">
					
						<!-- Dynamic Users -->	
				   <!-- <div class="user">
							<div class="user-image"></div>
							<div class="user-details">
								<span><strong>Rizwan Khan</strong></span>
								<span>Last Login</span>
							</div>
						</div> -->
						<!-- Dynamic users End -->

					</div>	
				</div>
			</div>
			<div class="box-2">
				<div class="chat-container">
					<div class="heading"><i class="fas fa-user"></i>&nbsp;<span class="name"></span></div>
					<div class="messages">
						<div class="chats">
							<div class="message-container" id="message_container">
								<!-- <div class="message-block">
									<div class="user-icon"></div>
									<div class="message">Hi, Govardhan hhow are you..?</div>
								</div>
								<div class="message-block received-message" style="">
									<div class="user-icon"></div>
									<div class="message">Hi, Govardhan hhow are you..?</div>
								</div> -->
							</div>
						</div>
						<div class="write-message">
							<div id="selected_images" style="display: none;"></div>
							<div class="message-area">
								<textarea class="message-input" placeholder="Type a message"></textarea>
								<!-- <progress id="uploader" value="0" max="100">0%</progress> -->
								<label for="fileButton"><i class="fa fa-paperclip"  ></i></label>
								<input type="file" id="fileButton" multiple="multiple" value="upload" accept="image/x-png,image/gif,image/jpeg"  hidden/>
								<button id="msg-submit-btn"  class="send-sms-btn"><i class="fab fa-telegram-plane"></i>&nbsp;Send</button>
							</div>
						</div>
						
					</div>
					
				</div>
				<div></div>
			</div>
		</div>
	</div>

	<!-- The core Firebase JS SDK is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script>

	<!-- TODO: Add SDKs for Firebase products that you want to use
	     https://firebase.google.com/docs/web/setup#available-libraries -->
	<!-- <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-analytics.js"></script> -->
	<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-firestore.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-storage.js"></script>
	<script>
		// Your web app's Firebase configuration
		var firebaseConfig = {
			apiKey: "AIzaSyB-hYGBe_dkr1-TotGlAjrQ_j87N9ItxL0",
			authDomain: "chat-project-bd9ae.firebaseapp.com",
			databaseURL: "https://chat-project-bd9ae.firebaseio.com",
			projectId: "chat-project-bd9ae",
			storageBucket: "gs://chat-project-bd9ae.appspot.com",
			messagingSenderId: "297062118163",
			appId: "1:297062118163:web:15928c68ef1eb51c6620e6",
			measurementId: "G-CESPK42ZJ8"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		//firebase.analytics();
	</script>
	<script type="text/javascript" src="chat.js"></script>
</body>
</html>