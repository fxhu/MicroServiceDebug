var CurrentPage = function () {
    var handleToken = function () {
        $.ajax({
            url: authorityHost + "api/TokenAuth/TokenAuthVerification",
            type: "post",
            // dataType: "json",
            success: function (res) {
                if (true) {
                    console.log(res);
                    var state = res.result.state;
                    console.log(state);

                    if (state == 200) {
                        setTimeout(function () {
                            window.location.href = "/default.html";
                        }, 0);
                    } else {
                        //token失效
                        handleLogin();
                    }

                } else { //响应不成功
                    handleLogin();
                }


            }

        })
    };

    var handleLogin = function () {

        var $loginForm = $('.login-form');

        $loginForm.validate({
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            }
        });

        $loginForm.find('input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.login-form').valid()) {
                    $('.login-form').submit();
                }
                return false;
            }
        });

        $loginForm.submit(function (e) {
            e.preventDefault();

            if (!$('.login-form').valid()) {
                return;
            }

            abp.ui.setBusy(
                null,
                abp.ajax({
                    contentType: app.consts.contentTypes.formUrlencoded,
                    url: $loginForm.attr('action'),
                    data: $loginForm.serialize()
                })
            );
        });

        $('a.social-login-icon').click(function () {
            var $a = $(this);
            var $form = $a.closest('form');
            $form.find('input[name=provider]').val($a.attr('data-provider'));
            $form.submit();
        });

        $loginForm.find('input[name=returnUrlHash]').val(location.hash);

        $('input[type=text]').first().focus();
    };

    return {
        init: function () {
            if (tokens == null || abp.session.userId == undefined) {
                handleLogin();
            } else {
                handleToken();
            }
        }
    };

}();