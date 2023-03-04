$(document).ready(function () {
events();
    
login = (data) => {
    REST.post('/portal/login', data, (err, result) => {
        if(err){
            alert(err);
        }else{
            window.location.href = result.url
        }
    });
}

function events(){
    $("#frmLogin").submit(function (e) { 
        e.preventDefault();
        console.log("hello");
        var data = $("#frmLogin").serialize();
        login(data);
    });
}

});