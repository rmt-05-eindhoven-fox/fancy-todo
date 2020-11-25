function activateTodo(){
  var obj = '#col-done,#col-new,#col-inprogress',
      timer;

  $(obj + ', .cards').sortable({
    connectWith: '.draggable,.cards',
    placeholder: 'highlight',
    opacity: 0.5,
    revert: true,
    start(event,ui){
      $(obj).sortable('refresh');
    },
    over(event,ui){
      $(this).parent().find('.cards').addClass('columnHover');
    },
    out(event,ui){
      $(this).parent().find('.cards').removeClass('columnHover');
    },
    receive(event, ui) {
      console.log($(this).parent().find('.todo-id').data("todo"));
      console.log($(this).parent().find('.status-id').data("id"));
      updateTodoStatus($(this).parent().find('.todo-id').data("todo"),$(this).parent().find('.status-id').data("id"))
    }

  }).disableSelection();

}
