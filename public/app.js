// Messages section
$(document).ready(function(){
    $('.modal-message, #send-message').modal(); 

    $('#nav-m-open').on('click', function() {
        if($('.nav-list').hasClass('opened')) {
            $('.nav-list').removeClass('opened');
        } else {
            $('.nav-list').addClass('opened');
        }
    });
});

function deleteMessage(id) {
    $.ajax({
        url: 'messages/delete',
        type: 'POST',
        data: {'id': id}
    }).done(function(result) {
        location.reload()
    })
}

function editMessage(id) {
    $.ajax({
        url: 'messages/getmessage',
        type: 'POST',
        data: {'id': id}
    }).done(function(message) {
        document.getElementById(`textarea_edit`).value = message.message
        document.getElementById(`message_edit_id`).value = message.id
        document.getElementById(`message_type_edit`).value = message.message_type
    });
}

function saveEditedMessage(id) {
    $.ajax({
        url: 'messages/edit',
        type: 'POST',
        data: {'id': document.getElementById(`message_edit_id`).value, 'message': document.getElementById(`textarea_edit`).value}
    }).done(function(message) {
        
    });
}

function newMessage() {
    
}

// Dashboard section
$(document).ready(function () {
    $('#currency2').change(function() {
        let cur1 = $('#currency1').val();
        let cur2 = $('#currency2').val();
        
        $.ajax({
            url: '/getCurrencyPrice',
            type: 'POST',
            data: {'pair': cur1 + cur2}
        }).done(function(result) {
            let div = document.getElementById("currentPriceDiv");
            div.innerHTML = result.price;
            document.getElementById('currentPrice').value = result.price;
            let tar1 = document.getElementById('target1');
            tar1.required = true;
            let sl = document.getElementById('stop_lose');
            sl.required = true;
            let ent = document.getElementById('entry1');
            ent.required = true;
        });
    });
});

function closeSignal(id) {
    $.ajax({
        url: '/closeSignal',
        type: 'POST',
        data: {'id': id}
     }).done(function(result) {
        let button = document.getElementById(`close-button-${result.id}`);
        button.disabled = true;
    });
}
