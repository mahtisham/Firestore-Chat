var db          = firebase.firestore();
var storage     = firebase.storage();

//var storageRef  = storage.ref();
//var imagesRef   = storageRef.child('images');
var user_1;
var user_2;
var message;
var final_selected_images = [];
var lastMessageTime = '';

$( document ).ready(function($) {
    var usersHTML = '';
    db.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
                
            usersHTML += '<div class="user" uuid="'+doc.data().uuid+'">'+
                        '<div class="user-image"></div>'+
                        '<div class="user-details">'+
                            '<span><strong>'+ doc.data().name+'<span class="count"></span></strong></span>'+
                        '</div>'+
                    '</div>';
        });
        $(".firebase_users").html(usersHTML);
    });
    $( "#fileButton" ).change(function() {
        
        var input = document.getElementById("fileButton");
        var files_allowed = 5;
        var file_count = input.files.length ;
        uploadOk=true;
        if(file_count > files_allowed)
        {
            uploadOk=false;
        }
        if( ( final_selected_images.length + file_count) > files_allowed )
        {
            uploadOk=false;
        }
        if(uploadOk){
            for (var i = 0; i <= file_count-1; i++) {
                if($.inArray(input.files[i], final_selected_images) !== -1){
                    //console.log("File already exists in array")
                }else{
                    //console.log('file not found in array')
                    final_selected_images.push(input.files[i]);
                }
            }
        }
        
        if( final_selected_images.length  > files_allowed )
        {
            uploadOk = false;
        }
        if(!uploadOk){
            alert("You can only select "+files_allowed+" images");
            return false;
        }
        $("#selected_images").html("");
        for (var i = 0; i <= final_selected_images.length-1; i++) {
            setupReader(final_selected_images[i] , i);
        }
    });
    $(".send-sms-btn").on('click', function(){

        message = $(".message-input").val();
        var chatHTML;
        if(message != ""){
            chatHTML = '<div class="message-block send-message">'+
                            '<div class="user-icon"></div>'+
                            '<div class="message">'+ message +'</div>'+
                        '</div>';
            //$(".message-container").append(chatHTML); 
            scrollToBottom() ;     
        }
        if(final_selected_images.length > 0 ){
            image_upload();
        }else if(message != ""){
            send_message();
        }
    });
}); //end documnet ready
$(document.body).on('click', '.user', function(){
    /*
    user_1 = sender
    user_2 = receiver
    */
    lastMessageTime = '';
    var user_uuid = $(this).attr('uuid');
    var name = $(this).find("strong").text();
    user_2 = user_uuid;
    if('7PawcekRfqXuaUNNhzNLmxIMc7t1' == user_2)
    {
        user_1 = 'e0ifEageDdRcnXw9dihco1p8g592';
    }else{
        user_1 = '7PawcekRfqXuaUNNhzNLmxIMc7t1';
    }
    
    $('.message-container').html('<strong>Connecting....</strong>');

    $(".name").text(name);


    db.collection("chats")
    .onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    }, function(doc) {
        get_messages()
    });
})// end on click .user
function send_message(img_url){
    var chat_id_1 = user_1 + user_2;
    var chat_id_2 = user_2 + user_1;
    var c_time    = new Date();

    if(img_url)
    {
        db.collection("chats").add({
            message : message,
            sender_uuid : user_1,
            receiver_uuid : user_2,
            chat_id: [chat_id_1,chat_id_2],
            image_url:img_url,
            time : c_time,
        })
        .then(function(docRef) {
            $(".message-input").val("");
            unselect_images();
            lastMessageTime = c_time;
        })
        .catch(function(error) {
            var errorHTML =    '<div class="message-block send-message" >'+
                                '<p style="color:red;">Unable to send message</p>'+
                            '</div>';
            $(".message-container").append(errorHTML); 
            
        });
    }else{
        if(message != ""){
            db.collection("chats").add({
                message : message,
                sender_uuid : user_1,
                receiver_uuid : user_2,
                chat_id: [chat_id_1,chat_id_2],
                image_url:'',
                time : new Date(),
            })
            .then(function(docRef) {
                $(".message-input").val("");
                unselect_images();
                lastMessageTime = c_time;
            })
            .catch(function(error) {
                var errorHTML =    '<div class="message-block send-message" >'+
                                    '<p style="color:red;">Unable to send message</p>'+
                                '</div>';
                $(".message-container").append(errorHTML); 
                
            });
        }
    }

    
}
function get_messages(){
    console.log('get_messages')
    if(user_1 && user_2)
    {
        var chat_id_1 = user_1 + user_2;
        var chat_id_2 = user_2 + user_1;
        var getOptions = {
            source: 'cache'
        };
        var query = db.collection('chats')
        query = query.where("chat_id", "array-contains-any", [chat_id_1,chat_id_2]);
        if(lastMessageTime != '')
        {
            console.log('time query executed')
            query = query.where('time','>',lastMessageTime);
        }
        query = query.orderBy("time");
        query.get(getOptions).then(function(querySnapshot){
            chatHTML = '';
            querySnapshot.forEach(function(doc){
                console.log(doc.id)
                console.log(doc.data().time)
                var newTime = new Date();
                console.log(newTime )
                
                lastMessageTime = doc.data().time;
                if (doc.data().receiver_uuid == user_1) {
                    if(doc.data().image_url!=''){
                        chatHTML += '<div class="message-block">'+
                            '<img src="'+doc.data().image_url+'" style="width:200px;height:200px">'+
                        '</div>';
                        if(doc.data().message!=''){
                            chatHTML += '<div class="message-block">'+
                                    '<div class="user-icon"></div>'+
                                    '<div class="message">'+ doc.data().message +'</div>'+
                                '</div>';
                        }
                    }else{
                        chatHTML += '<div class="message-block">'+
                                    '<div class="user-icon"></div>'+
                                    '<div class="message">'+ doc.data().message +'</div>'+
                                '</div>';
                        
                    }
                    $(".message-container").append(chatHTML);

                }else{
                    if(doc.data().image_url!=''){
                        chatHTML += '<div class="message-block send-message">'+
                            '<img src="'+doc.data().image_url+'" style="width:200px;height:200px">'+
                        '</div>';
                        if(doc.data().message!=''){
                            chatHTML += '<div class="message-block send-message">'+
                                    '<div class="user-icon"></div>'+
                                    '<div class="message">'+ doc.data().message +'</div>'+
                                '</div>';
                        }
                    }else{
                        chatHTML += '<div class="message-block send-message">'+
                                    '<div class="user-icon"></div>'+
                                    '<div class="message">'+ doc.data().message +'</div>'+
                                '</div>';
                    }
                    $(".message-container").append(chatHTML);
                }

            });//end forEach

            //$(".message-container").html(chatHTML);
            scrollToBottom()
        });
    }
    

}
function scrollToBottom() {
    $(".message-container").animate({ scrollTop: $('.message-container').prop("scrollHeight")}, 1000);
    /*var objDiv = document.getElementById("message_container");
    objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;*/
}
function unselect_images(){
    document.getElementById("fileButton").value = "";
    document.getElementById("selected_images").style.display = "none";
    final_selected_images = [];

}
$(document.body).on('click', '.user', function(){
    /*
    user_1 = sender
    user_2 = receiver
    */
    lastMessageTime = '';
    var user_uuid = $(this).attr('uuid');
    var name = $(this).find("strong").text();
    user_2 = user_uuid;
    if('7PawcekRfqXuaUNNhzNLmxIMc7t1' == user_2)
    {
        user_1 = 'e0ifEageDdRcnXw9dihco1p8g592';
    }else{
        user_1 = '7PawcekRfqXuaUNNhzNLmxIMc7t1';
    }
    
    $('.message-container').html('Connecting....');

    $(".name").text(name);


    db.collection("chats")
    .onSnapshot({
        // Listen for document metadata changes
        //includeMetadataChanges: true
    }, function(doc) {
        get_messages()
    });
})// end on click .user
function cancel_an_image(index)
{
    document.getElementById("uploadPreview-"+index).style.display = "none";
    document.getElementById("close_img-"+index).style.display = "none";
    final_selected_images.splice(index,1);
}//end cancel_an_image

function setupReader(file, index) {
    var name = file.name;
    var reader = new FileReader();  
    reader.onload = function(e) {
        var html = '<img id="uploadPreview-'+index+'" style="width: 50px;height: 50px;" src="'+e.target.result+'"  />'+
        '<label for="close" id="close_img-'+index+'" onclick="cancel_an_image('+index+')" >'+
            '<i class="fa fa-window-close" aria-hidden="true"></i>'+
        '</label>';
        $("#selected_images").append(html); 
    }
    reader.readAsDataURL(file, "UTF-8");
    document.getElementById("selected_images").style.display = "flex";
}// end setupReader


//code for file upload
function image_upload (){
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      alert('The File APIs are not fully supported in this browser.');
      return;
    }   
    if (final_selected_images.length <= 0) {

    }
    else {
        for (var i = 0 ; i <= final_selected_images.length - 1 ; i++) {
            if(final_selected_images[i])
            {
              var file = final_selected_images[i];
              var storageRef = storage.ref('img/'+file.name);
              var task = storageRef.put(file)
              task.then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    send_message(url);
                    message = "";
                })
                .catch((error) => {
                    console.log(error)
                 });

            }else{
              //unable to select file
              return 'utsf';
            }
        }
      
    }
    
}// end image_upload