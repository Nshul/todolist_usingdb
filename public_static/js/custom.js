/**
 * Created by anshu on 6/26/2017.
 */
console.log("custom.js started");

// let toDoList=[];
let displayedList;
$(function () {
    let inputtext=$('#input-todo');
    let addbutton=$('#add-todo');
    let trashbutton=$('#remove-all-todo');
    let updatepos = $('#update-position');
    displayedList=$('#todoList');
    refreshtodoslist();
    updatepos.click(function () {
        console.log("update pressed");
       $.get('/getpositions');
    });
    addbutton.click(function () {
        if(inputtext.val() !== ""){
            $.post('/todos', {
                task: inputtext.val()
            }, (data) => {
                if (data.success) {
                    refreshtodoslist();
                }
            })
        }
    inputtext.value = "";
    });
    trashbutton.click(removealldone);
});

function removealldone(){
    $.get('/removealldone',function (data) {
        if(data.success){
            refreshtodoslist();
        }
    })
}

function refreshtodoslist() {
    displayedList.empty();
    $.get('/todos',function(data){
        // console.log("In custom.js:");
        // console.log(data);
        for(todo in data){
            displayedList.append(addItemToList(data[todo],todo));
        }
    })
}

function setdone(event) {
    let target=parseInt(event.target.parentNode.getAttribute('data-id'));
    console.log("Target of Done:"+target);
    $.post('/setdonetodo', {
        dataid: target
    }, (data) => {
        if (data.success) {
            refreshtodoslist();
        }
    })
}

function moveitemup(event) {
    let target=parseInt(event.target.parentNode.getAttribute('data-id'));
    console.log("Target of Move Up:"+target);
    $.post('/moveuptodo', {
        dataid: target
    }, (data) => {
        if (data.success) {
            refreshtodoslist();
        }
    })
}

function moveitemdown(event){
    let target=parseInt(event.target.parentNode.getAttribute('data-id'));
    console.log("Target of Move Down:"+target);
    $.post('/movedowntodo', {
        dataid: target
    }, (data) => {
        if (data.success) {
            refreshtodoslist();
        }
    })
}

function delthisitem(event){
    let target=parseInt(event.target.parentNode.getAttribute('data-id'));
    console.log("Target of delete:"+target);
    $.post('/deletetodo', {
        dataid: target
    }, (data) => {
        if (data.success) {
            refreshtodoslist();
        }
    })
}


function addItemToList( item , ite ){
    let t=$(`<li class="list-group-item" data-id="${Number(ite)+1}">`);
    let checkbox=$(`<input type="checkbox" class="col-1">`).click(setdone);
    t.append(checkbox);
    let span=$(`<span class="col-8 lead">${item.task}</span>`);
    t.append(span);
    let i1=$(`<i class="fa fa-2x fa-chevron-up btn-up"></i>`).click(moveitemup);
    t.append(i1);
    let i2=$(`<i class="fa fa-2x fa-chevron-down btn-down"></i>`).click(moveitemdown);
    t.append(i2);
    let delitem=$(`<i class="fa fa-2x fa-times btn-del"></i>`).click(delthisitem);
    t.append(delitem);
    if(item.done){
        span.css('text-decoration','line-through');
        checkbox.attr('checked',!checkbox.attr('checked'));
        t.css('background-color','#ffa491');
    }
    return t;
}

