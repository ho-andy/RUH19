$(function() {
    if(window.location.hash.substring(1)=="failed"){
        Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Username already taken.',
          })
    }
});
