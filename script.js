$(function () {

    $(document).on('click', '.show-folder .responseText a', function (e) {
        e.preventDefault();
        var thisElement = $(this);
        $.ajax({
            url: thisElement.parents('form').attr('action'),
            method: 'POST',
            data: {
                getContent: $(this).attr('href')
            },
            success: function (data) {
                var result = JSON.parse(data);
                var newElement = "";
                if (result.folder) {
                    obj = result;
                    $('.show-folder #showFile').removeClass('d-none').modal('show');
                    $('.show-folder .modal-title').html();

                    var result = Object.keys(obj).map(function (key) {
                        return [Number(key), obj[key]];
                    });
                    result.pop();
                    result.shift();
                    result.shift();
                    if (result.length != 0) {
                        result.forEach(element => {
                                var isFile = element[1].substr(element[1].lastIndexOf('.') + 1);
                                console.log(isFile);
                                if (isFile == 'png') {
                                    var imgsrc = element[1].replace(' ', '%20');
                                    newElement += ' <div class="col-sm-3"><a href="' + thisElement.attr('href') + '/' + element[1] + '"><img src=' + thisElement.attr('href') + '/' + imgsrc + ' > </a> </div>';
                                } else if (isFile == 'jpg' ){
                                    var imgsrc = element[1].replace(' ', '%20');
                                    newElement += ' <div class="col-sm-3"><a href="' + thisElement.attr('href') + '/' + element[1] + '"><img src=' + thisElement.attr('href') + '/' + imgsrc + ' > </a> </div>';
                                } else if(isFile == element[1]){
                                    // console.log('folder '+ element[1]);
                                    newElement += ' <div class="col-sm-3"><a href="' + thisElement.attr('href') + '/' + element[1] + '"> <i class="fas fa-folder text-primary display-4"></i><p> ' + element[1] + ' </p> </a> </div>';
                                } else {
                                    // console.log('file '+ element[1]);
                                    newElement += ' <div class="col-sm-3"> <a href="' + thisElement.attr('href') + '/' + element[1] + '"> <i class="fas fa-file text-primary display-4"></i><p>' + element[1] + '</p> </a> </div>';
                                }
                            });
                            $('.show-folder .modal-body').html('<div class="row p-4">' + newElement + '</div>');
                    } else {
                        $('.show-folder .modal-body').text('Empty Folder');
                    }

                    // $('.show-folder .modal-body').html('<div class="row p-4">' + newElement+ '</div>');
                } else {
                    $('.show-folder #showFile').removeClass('d-none').modal('show');
                    $('.show-folder .modal-title').text(thisElement.text());
                    $('.show-folder .modal-body').text(result);
                }

            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    $('#showFiles').on('click', function (e) {
        var thisElement = $(this);
        $.ajax({
            url: thisElement.parents('form').attr('action'),
            method: 'POST',
            data: {
                show_files: true
            },
            success: function (data) {
                var result = JSON.parse(data);
                var newElement = "";
                result.shift();
                result.shift();
                result.forEach(element => {
                    var isFile = element.substr(element.lastIndexOf('.') + 1);
                    if (isFile == element) {
                        console.log('folder ' + element);
                        newElement += ' <div class="col-sm-3"><a href="/' + element + '"> <i class="fas fa-folder text-primary display-4"></i><p> ' + element + ' </p> </a> </div>';
                    } else {
                        console.log('file ' + element);
                        newElement += ' <div class="col-sm-3"> <a href="/' + element + '"> <i class="fas fa-file text-primary display-4"></i><p>' + element + '</p> </a> </div>';
                    }
                });
                thisElement.parents('form').find('.responseText').removeClass('d-none');
                thisElement.parents('form').find('.responseText').html('<div class="row p-4">' + newElement + '</div>');
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    $('#createNewFolder').on('click', function (e) {
        e.preventDefault();
        var thisElement = $(this);
        var value = $('#newFolder').val();
        if (!value) {
            alert('enter Correct value');
            return 0;
        }
        $.ajax({
            url: thisElement.parents('form').attr('action'),
            method: 'POST',
            data: {
                createNewFolder: value
            },
            success: function (data) {
                var response = JSON.parse(data);
                var addclass;
                if (response.success) {
                    addclass = 'success';
                } else {
                    addclass = 'danger'
                }
                thisElement.parents('form').find('.alert').addClass('alert-' + addclass).removeClass('d-none').find('strong').html(response.msg);
                // console.log(thisElement.);
            },
            error: function (err) {
                console.log(err);
            }
        });

    });

    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');
    $('.progress').hide();
    $('#fileUpload').on('click', function (e) {
        $('.progress').show();
        $('form').ajaxForm({
            beforeSend: function () {
                status.empty();
                var percentVal = '0%';
                bar.width(percentVal);
                percent.html(percentVal);
                bar.text(percentVal);
            },
            uploadProgress: function (event, position, total, percentComplete) {
                var percentVal = percentComplete + '%';
                bar.width(percentVal);
                percent.html(percentVal);
                bar.text(percentVal);
            },
            complete: function (data) {
                bar.text('Upload completed');
                console.log(data.responseText);
                status.html(data.responseText);
            }
        });

    })

    $('#gitStaus').on('click', function(e){
        e.preventDefault();
        var thisElement = $(this);
        $.ajax({
            url: thisElement.parents('form').attr('action'),
            method: 'POST',
            data: {
                gitStatus: true
            },
            success: function (data) {
                var result = JSON.parse(data);
                thisElement.parents('.git-status').find('.alert').removeClass('d-none');
                thisElement.parents('.git-status').find('.responseText').html(result);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    $('#gitadd').on('click', function(e){
        e.preventDefault();
        var thisElement = $(this);
        var file = $('#gitaddinput').val();
        $.ajax({
            url: thisElement.parents('form').attr('action'),
            method: 'POST',
            data: {
                gitadd: file
            },
            success: function (data) {
                // var result = JSON.parse(data);
                // thisElement.parents('.git-status').find('.alert').removeClass('d-none');
                // thisElement.parents('.git-status').find('.responseText').html(result);
                console.log(data);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    $('#navId a').on('click', function(e){
        e.preventDefault();
        $(this).tab('show');
    });
}); 