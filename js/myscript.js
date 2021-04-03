$(function () {
    var username = $("input[name=user]");
    var password = $("input[name=password]");
    $('button[type="submit"]').click(function (e) {
        e.preventDefault();
        //little validation just to check username
        if (username.val() != "" && password.val() != "") {
            $("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back " + "<span style='text-transform:uppercase'>" + textfield.val() + "</span>");
            $("#output").removeClass(' alert-danger');
            $("input").css({
                "height": "0",
                "padding": "0",
                "margin": "0",
                "opacity": "0"
            });
            //change button text 
            $('button[type="submit"]').html("continue")
                .removeClass("btn-info")
                .addClass("btn-default").click(function () {
                    $("input").css({
                        "height": "auto",
                        "padding": "10px",
                        "opacity": "1"
                    }).val("");
                });

            //show avatar
            $(".avatar").css({
                "background-image": "url('https://randomuser.me/api/portraits/men/19.jpg')"
            });
        } else {
            //remove success mesage replaced with error message
            $("#output").removeClass(' alert alert-success');
            var credentials = [];
            if(!username.val()){ 
                credentials.push('username');    
            }
            if(!password.val()){
                credentials.push('password');
            }
            $("#output").addClass("alert alert-danger animated fadeInUp").html("sorry enter a "+credentials.join(" and "));
        }
    });
});
