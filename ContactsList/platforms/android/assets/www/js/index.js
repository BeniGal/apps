document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // find all contacts with 'Jacob' in any name field
    var options = new ContactFindOptions();
    options.filter = "Jacob";
    options.multiple = true; 
    var fields = ["displayName", "name", "phoneNumbers"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
  for(var i = 0; i < contacts.length; i++) {
    var html = '<div data-role="collapsible" data-inset="false">';

    html += '<h2>' + contacts[i].displayName + '</h2>';
    html += '<ul data-role="listview">'

    var contact = contacts[i];

    for(var j = 0; j < contact.phoneNumbers.length; j++) {
      html += '<li>' + contact.phoneNumbers[j].type + 
        ": " + contact.phoneNumbers[j].value + '</li>';
    }

    html += '</ul></div>';

    $('#contactsList').append(html);
  }

  $('[data-role=collapsible]').collapsible().trigger('create');
}

function onError(contactError) {
  alert('onError!');
}