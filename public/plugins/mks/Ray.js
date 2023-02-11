function Ray(){}
function REST(){}

Ray.initDataTable = (tableName, search, columns, columnsDef) => {
    $(tableName).DataTable({
        "responsive": true,
        "lengthChange": true,
        "autoWidth": false,
        "searching": search,
        "columns": columns,
        "columnDefs": columnsDef
    }).buttons().container().appendTo(tableName + ' .col-md-6:eq(0)');
}

Ray.renderData = (tableName, data) => {
    $(tableName).DataTable().clear().draw();
    $(tableName).DataTable().rows.add(data).draw();
}

REST.get = (url, callback) => {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            callback(null, data);
        },
        error: function(request, msg, error) {
            callback(error, null);
        }
    });
}

REST.post = (url, data, callback) => {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function(data) {
            callback(null, data);
        },
        error: function(request, msg, error) {
            callback(error, null);
        }
    });
}

REST.put = (url, data, callback) => {
    $.ajax({
        url: url,
        type: 'PUT',
        data: data,
        success: function(data) {
            callback(null, data);
        },
        error: function(request, msg, error) {
            callback(error, null);
        }
    });
}

REST.delete = (url, id, callback) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'ID ' + id + ' will delete!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + id,
                type: method,
                success: function(data) {
                    if (data.code == 200) {
                        Swal.fire(
                            'Deleted!',
                            data.message,
                            'success'
                        ).then(function() {
                            cb(null, 1);
                        });
                    } else if (data.code == 404) {
                        Swal.fire(
                            'Sorry!',
                            data.message,
                            'error'
                        ).then(function() {
                            cb(0, null);
                        });
                    }
                }
            });
        }
    });
}