/*start :: global variable*/
var listUID,
    cardUID,
    inputUID;

var list_collection = [];
/*end :: global variable*/

function List() {};

function Card() {};

/*START :: LIST CREATION*/
List.prototype.create = function () {
        var list_container = document.getElementById('list-wrapper');
        var list = document.createElement('div');
        listUID = Date.now();
        list.id = listUID;
        list.className = 'my-list';
        var list_button = document.createElement("button");
        var list_button_text = document.createTextNode("Add Card");
        list_button.appendChild(list_button_text);
        list_button.className = "u-card-button";
        list_button.setAttribute("onclick", "new_card.create.call(this, this)");
        list.setAttribute("ondrop", "drop(event)");
        list.setAttribute("ondragover", "allowDrop(event)");
        list.appendChild(list_button);
        list_container.appendChild(list);
        var list_details = {
            list_id: listUID,
            list_name: 'list-' + Math.random().toString(36).substring(7),
            list_created_at: new Date(listUID),
            card_details: []
        }
        list_collection.push(list_details);
        console.log(list_collection);
    }
    /*END :: LIST CREATION*/

/*START :: CARD CREATION*/
Card.prototype.create = function (sender) {
        listUID = sender.parentNode.id;
        var card_container = document.getElementById(listUID);
        var card = document.createElement('div');
        var card_delete_button = document.createElement("button");
        var card_delete_button_text = document.createTextNode('X');
        card_delete_button.setAttribute("onclick", "new_card.delete.call(this, this)");
        cardUID = Date.now();
        card.id = cardUID;
        card.setAttribute("draggable", "true");
        card.setAttribute("ondragstart", "drag(event)");
        card_delete_button.className = "u-delete-button";
        card_delete_button.appendChild(card_delete_button_text);
        card.className = "my-card";
        card.appendChild(card_delete_button);

        var card_input = document.createElement("input");
        card_input.type = "text";
        card_input.className = "u-card-input";

        var card_save_button = document.createElement('button');
        var card_save_button_text = document.createTextNode('save');
        card_save_button.className = "u-save-button";
        card_save_button.appendChild(card_save_button_text);
        card.appendChild(card_save_button);

        card_save_button.setAttribute("onclick", "new_card.save.call(this, this)");
        inputUID = cardUID + 1;
        card_input.id = inputUID;
        card.appendChild(card_input);

        document.getElementById(listUID).appendChild(card);
        document.getElementById(inputUID).focus();
        var card_details = {
            card_id: cardUID,
            parent_id: listUID,
            card_name: 'card-' + Math.random().toString(36).substring(7),
            card_created_at: new Date(cardUID)
        }
        for (var i = 0; i < list_collection.length; i++) {
            if (card_details.parent_id == list_collection[i].list_id) {
                list_collection[i].card_details.push(card_details);
            }
        }
    }
    /*END :: CARD CREATION*/

/*START :: CARD DELETION*/
Card.prototype.delete = function (sender, extra_parameter) {
        var card_to_be_deleted = sender.parentNode;
        var card_id = card_to_be_deleted.getAttribute('id');
        var element = document.getElementById(card_id);

        var card_parent_list = sender.parentNode.parentNode;
        var list_id = card_parent_list.getAttribute('id');

        element.outerHTML = "";
        delete element;
        for (var i = 0; i < list_collection.length; i++) {
            if (list_collection[i].card_details.length > 0) {
                var card_colctn = list_collection[i].card_details;
                for (var j = 0; j < card_colctn.length; j++) {
                    if (card_colctn[i].card_id == card_id) {
                        card_colctn.splice(i, 1);
                    }
                }
            }
        }
        console.log(list_collection);
    }
    /*END :: CARD DELETION*/

/*START :: CARD SAVE*/
Card.prototype.save = function (sender, extra_parameter) {
        inputUID = sender.nextSibling.id;
        cardUID = sender.parentNode.id;
        var para = document.createElement("p");
        para.className = "card-content";
        var input_content = document.getElementById(inputUID).value;
        var pText = document.createTextNode(document.getElementById(inputUID).value);
        if (input_content != undefined && input_content != null && input_content != "") {
            para.appendChild(pText);
            var c = document.getElementById(cardUID);
            c.appendChild(para);
            document.getElementById(inputUID).style.display = "none";
        }
    }
    /*END :: CARD SAVE*/

/*START :: DRAG & DROP*/
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(ev)
}
/*END :: DRAG & DROP*/

var new_list = new List();
var new_card = new Card();
