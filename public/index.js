$('#exampleModal').on('show.bs.modal', function (event) {
    var row = $(event.relatedTarget) // Button that triggered the modal
    var recipient = row.data('empid') // Extract info from data-* attributes
    var name = row.data('name');
    var categoryid = row.data('categoryid');
    var category = row.data('category');
    var address = row.data('address');
    var description = row.data('description');
    var contact = row.data('contact');
    var empcode = row.data('empcode');
    var editbutton = row.data('editbutton');
    var deletebutton = row.data('deletebutton');
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text(' Employee ID ' + recipient)
    modal.find('#empname').text(name)
    modal.find('#empcategoryid').text(categoryid)
    modal.find('#empcategory').text(category)
    modal.find('#empaddress').text(address)
    modal.find('#empdescription').text(description)
    modal.find('#empcontact').text(contact)
    modal.find('#empcode').text(empcode)
    modal.find('#editbutton').attr("href",`/home/${editbutton}/edit`)
    modal.find('#deletebutton').attr("action",`/home/${deletebutton}?_method=DELETE`)
    // modal.find('.modal-body input').val(recipient)
  })

  $("#warning").click(function(){ alert("I added this button to clear out the database if the database get clustered with redundant data on each server restart")});