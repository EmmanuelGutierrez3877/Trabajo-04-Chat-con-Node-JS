var socket = io.connect('http://localhost:8080',{'forceNew':true});

socket.on('messages',function(data){
    console.log(data);
    render(data);
});

function render (data){
    var html = data.map(function(elem,index){
        return(`<div>
                    <strong>${elem.author}</strong>:${elem.text}
                </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
    user = document.getElementById('username');
    text = document.getElementById('texto');

    if(user.value != "" && text.value != ""){
        var payload={
            author: user.value,
            text: text.value
        };
        user.disabled = true;
        text.value = "";
    
        socket.emit('new-message',payload);
    }
    else{
        alert("usuario o mensaje vacio");
    }

    


    return false;
}