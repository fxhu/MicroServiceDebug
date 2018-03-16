var app = app || {};
(function () {

    var appLocalizationSource = abp.localization.getSource('WeSafeWebApp');
    app.localize = function () {
        return appLocalizationSource.apply(this, arguments);
    };

    app.downloadTempFile = function (file) {
        location.href = abp.appPath + 'File/DownloadTempFile?fileType=' + file.fileType + '&fileToken=' + file.fileToken + '&fileName=' + file.fileName;
    };

    app.createDateRangePickerOptions = function () {
        var options = {
            locale: {
                format: 'L',
                applyLabel: app.localize('应用'),
                cancelLabel: app.localize('取消'),
                customRangeLabel: app.localize('自定义范围')
            },
            min: moment('2015-05-01'),
            minDate: moment('2015-05-01'),
            max: moment(),
            maxDate: moment(),
            ranges: {}
        };

        options.ranges[app.localize('今天')] = [moment().startOf('day'), moment().endOf('day')];
        options.ranges[app.localize('昨天')] = [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')];
        options.ranges[app.localize('最近7天')] = [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')];
        options.ranges[app.localize('最近30天')] = [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')];
        options.ranges[app.localize('这个月')] = [moment().startOf('month'), moment().endOf('month')];
        options.ranges[app.localize('上个月')] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];

        return options;
    };

    app.getUserProfilePicturePath = function (profilePictureId) {
        return profilePictureId ?
                            (abp.appPath + 'Profile/GetProfilePictureById?id=' + profilePictureId) :
                            (abp.appPath + 'assets/Common/Images/default-profile-picture.png');
    }

    app.getUserProfilePicturePath = function () {
        return abp.appPath + 'Profile/GetProfilePicture?v=' + new Date().valueOf();
    }

    app.getShownLinkedUserName = function (linkedUser) {
        if (!abp.multiTenancy.isEnabled) {
            return linkedUser.userName;
        } else {
            if (linkedUser.tenancyName) {
                return linkedUser.tenancyName + '\\' + linkedUser.username;
            } else {
                return '.\\' + linkedUser.username;
            }
        }
    }

    app.notification = app.notification || {};

    app.notification.getUiIconBySeverity = function (severity) {
        switch (severity) {
            case abp.notifications.severity.SUCCESS:
                return 'fa fa-check';
            case abp.notifications.severity.WARN:
                return 'fa fa-warning';
            case abp.notifications.severity.ERROR:
                return 'fa fa-bolt';
            case abp.notifications.severity.FATAL:
                return 'fa fa-bomb';
            case abp.notifications.severity.INFO:
            default:
                return 'fa fa-info';
        }
    };

    app.changeNotifyPosition = function(positionClass) {
        if (!toastr) {
            return;
        }

        toastr.clear();
        toastr.options.positionClass = positionClass;
    };

    app.waitUntilElementIsReady = function (selector, callback, checkPeriod) {
        if (!$) {
            return;
        }

        var elementCount = selector.split(',').length;

        if (!checkPeriod) {
            checkPeriod = 100;
        }

        var checkExist = setInterval(function () {
            if ($(selector).length >= elementCount) {
                clearInterval(checkExist);
                callback();
            }
        }, checkPeriod);
    };

    app.calculateTimeDifference = function (fromTime, toTime, period) {
        if (!moment) {
            return null;
        }

        var from = moment(fromTime);
        var to = moment(toTime);
        return to.diff(from, period);
    }

})();