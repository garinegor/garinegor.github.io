//список возможных действий
Sortable.create(blocks, {
    group: {
        name:"kit",
        pull: "clone",
        put: false},
    handle: '.list-group-item',
    animation: 150,
    sort: false
});

// рабочая плоскость
var action_list = Sortable.create(field, {
    group: {
        name:"kit",
        pull: false,
        put: true},
    handle: '.list-group-item',
    animation: 200,
    filter: '.js-remove',

    // что делаем при нажатии крестика
    onFilter: function (evt) {
        evt.item.parentNode.removeChild(evt.item);
        },

    // что делаем при добавлении нового блока
    onAdd: function (evt) {
        var blockContent = evt.item.textContent;
        // что делать, если вынесли смещение
        if (blockContent == "Смещение"){
            Ply.dialog("prompt", {
                title: "Смещение",
                form: { x: "X", y:"Y", z:"Z" }
            })
                .done(function (ui) {
                    //    тут добавление координат в блок
                    var coordinates = ui.data;
                    console.log(coordinates);
                    evt.item.innerHTML += '<div class="additional_information">x: ' + coordinates.x + 'м y: ' + coordinates.y + 'м z: ' + coordinates.z + 'м' + '</div><i class=\"js-remove\">✖</i>';
                })
                .fail(function (ui) {
                    console.log("fail");
                    evt.item.parentNode.removeChild(evt.item);
                });
        }
        //что делать, если вынесли перемещение
        else if (blockContent == "Перемещение"){
            Ply.dialog("prompt", {
                title: "Перемещение",
                form: { x: "X", y:"Y", z:"Z" }
            })
                .done(function (ui) {
                    var coordinates = ui.data;
                    console.log(coordinates);
                    evt.item.innerHTML += '<div class="additional_information">x: ' + coordinates.x + 'м y: ' + coordinates.y + 'м z: ' + coordinates.z + 'м' + '</div><i class=\"js-remove\">✖</i>';
                })
                .fail(function (ui) {
                    console.log("fail");
                    evt.item.parentNode.removeChild(evt.item);
                });
            //    тут добавление координат в блок
        }
        // что делать, если вынесли задержку
        else if (blockContent == "Задержка") {
            Ply.dialog("prompt", {
            title: "Задержка",
            form: { delay:"Задержка в миллисекундах" }
            })
                .done(function (ui) {
                    var delay = ui.data.delay;
                    evt.item.innerHTML += '<div class="additional_information">на ' + delay + ' мс</div><i class=\"js-remove\">✖</i>';
                })
                .fail(function (ui) {
                    console.log("fail");
                    evt.item.parentNode.removeChild(evt.item);
                    });

        }
        else if (blockContent == "Посадка") {
            // добавляем крестик
            evt.item.innerHTML += '<i class=\"js-remove\">✖</i>';
        }
    },

});

$(document).ready(function () {
            $('#buildButton').on('click', function () {
                let blocks={};
                Array.from(document.getElementById("field").getElementsByClassName("list-group-item")).forEach(function (value, index, array) {
                    let info = value.getElementsByClassName("additional_information");
                    if (info.length !== 0){
                        info = info[0].innerText;
                        let command = value.childNodes[0].nodeValue;
                        blocks[command] = info;
                    }
                    else {
                        let command = value.textContent.replace('✖', '');
                        blocks[command] = "";
                    }
                });
                let json = JSON.stringify(blocks);
                console.log(json);
            });
        });