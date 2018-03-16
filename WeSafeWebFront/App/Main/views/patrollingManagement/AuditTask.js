(function () {
    var controllerId = 'app.views.AuditTask';
    angular.module('app').controller(controllerId, [
        '$scope', '$timeout', 'abp.services.app.troubles', 'abp.services.app.patrol', function ($scope, $timeout, troublesService, patrolService) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var backpage = getURLParam('backpage');
            var pageindex = getURLParam('pageindex');
            var id = parseInt(getURLParam('id'));
            var type = getURLParam('type');
            function getURLParam(name) {
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

            }
            vm.audit = {};
            vm.selectpoints = [];
            vm.details = [];
            var current = (new Date("2012-01-01")).getTime();
            var staticdate = (new Date("2012-01-01")).getTime();
            var onemonth = 1 * 24 * 3600 * 1000;
            vm.Periods = vm.PatrolType = [{ id: 0, type: '每天' }, { id: 1, type: '三天' }, { id: 2, type: '五天' }, { id: 3, type: '每周' }, { id: 4, type: '每月' }, { id: 5, type: '自定义' }];

            troublesService.getAllUses().then(function (result) {
                vm.users = result.data.items;
            });
            patrolService.getTaskById({ Id: id }).then(function (result) {
                var data = result.data;
                vm.task = { startTime: data.startTime, endTime: data.endTime };
                vm.plan = data.plan;
                vm.path = data.path;
                vm.cusers = data.areaUsers;
                vm.audit.IsActive = 0;
                vm.audit.ExecuteUserId = abp.session.userId;
                $.each(vm.path.points, function () {
                    vm.addPoint(this);
                });
            });

            vm.addPoint = function (point) {
                point.select = 0;
                var a = vm.selectpoints;
                var b = vm.details;
                var c = a.length == 0 ? 'selected' : ' ';
                a.push({ id: point.id, time: '', class: c, name: point.name });
                b.push({ id: point.id, time: '', class: c, areaName: point.areaName, assestName: point.assestName, name: point.name, typeName: point.typeName });
                RefreshTime(a);
                RefreshTime(b);
                vm.selectpoints = a;
                vm.details = b;
                setTimeout(function () {
                    HorizontalTimeline.Init();
                }, 100);
            }

            function RefreshTime(arr) {
                current = staticdate;
                $.each(arr, function () {
                    var time = (new Date(current)).Format("dd/MM/yyyy");
                    current = current + onemonth;
                    this.time = time;
                });
            }
            vm.save = function () {
                if (vm.audit.ExecuteUserId == null) {
                    abp.message.error("请选择巡检人！");
                    return;
                }
                if (vm.audit.Remark == null || vm.audit.Remark.trim() == '') {
                    abp.message.error("请输入备注！");
                    return;
                }
                var p = { Id: id, IsActive: vm.audit.IsActive == 0 ? 1 : 0, ExecuteUserId: vm.audit.ExecuteUserId, Remark: vm.audit.Remark };
                patrolService.auditTask(p).then(function () {
                    abp.notify.info(app.localize('保存成功'));
                    window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + vm.status;
                });
            }
            vm.cancel = function () {
                window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + vm.status;
            }
            ///-------------------------------------------------------------///
            var HorizontalTimeline = {


                Init: function () {
                    var timelines = $('.cd-horizontal-timeline');

                    if (timelines.length > 0) { initTimeline(timelines) }
                }
            }
            var eventsMinDistance = {};
            var isClick = false;
            var timelineComponents = {};
            function initTimeline(timelines) {
                timelines.each(function () {
                    eventsMinDistance = $(this).data('spacing');
                    var timeline = $(this);

                    //cache timeline components 
                    timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
                    timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
                    timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
                    timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
                    timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
                    timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
                    timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
                    timelineComponents['eventsContent'] = timeline.children('.events-content');

                    //assign a left postion to the single events along the timeline
                    setDatePosition(timelineComponents, eventsMinDistance);
                    //assign a width to the timeline
                    var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
                    //the timeline has been initialize - show it
                    timeline.addClass('loaded');

                    //detect click on the next arrow
                    timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
                        event.preventDefault();
                        updateSlide(timelineComponents, timelineTotWidth, 'next');
                    });
                    //detect click on the prev arrow
                    timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
                        event.preventDefault();
                        updateSlide(timelineComponents, timelineTotWidth, 'prev');
                    });
                    //detect click on the a single event - show new event content
                    if (!isClick) {
                        timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
                            event.preventDefault();
                            timelineComponents['timelineEvents'].removeClass('selected');
                            $(this).addClass('selected');
                            updateOlderEvents($(this));
                            updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                            updateVisibleContent($(this), timelineComponents['eventsContent']);
                        });
                        //on swipe, show next/prev event content
                        timelineComponents['eventsContent'].on('swipeleft', function () {
                            var mq = checkMQ();
                            (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
                        });
                        timelineComponents['eventsContent'].on('swiperight', function () {
                            var mq = checkMQ();
                            (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
                        });

                        //keyboard navigation
                        $(document).keyup(function (event) {
                            if (event.which == '37' && elementInViewport(timeline.get(0))) {
                                showNewContent(timelineComponents, timelineTotWidth, 'prev');
                            } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
                                showNewContent(timelineComponents, timelineTotWidth, 'next');
                            }
                        });
                        isClick = true;
                    }
                });
            }

            function updateSlide(timelineComponents, timelineTotWidth, string) {
                //retrieve translateX value of timelineComponents['eventsWrapper']
                var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
                    wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
                //translate the timeline to the left('next')/right('prev') 
                (string == 'next')
                    ? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
                    : translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
            }

            function showNewContent(timelineComponents, timelineTotWidth, string) {
                //go from one event to the next/previous one
                var visibleContent = timelineComponents['eventsContent'].find('.selected'),
                    newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

                if (newContent.length > 0) { //if there's a next/prev event - show it
                    var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
                        newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

                    updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
                    updateVisibleContent(newEvent, timelineComponents['eventsContent']);
                    newEvent.addClass('selected');
                    selectedDate.removeClass('selected');
                    updateOlderEvents(newEvent);
                    updateTimelinePosition(string, newEvent, timelineComponents);
                }
            }

            function updateTimelinePosition(string, event, timelineComponents) {
                //translate timeline to the left/right according to the position of the selected event
                var eventStyle = window.getComputedStyle(event.get(0), null),
                    eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
                    timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
                    timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
                var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

                if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate)) {
                    translateTimeline(timelineComponents, - eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
                }
            }

            function translateTimeline(timelineComponents, value, totWidth) {
                var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
                value = (value > 0) ? 0 : value; //only negative translate value
                value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
                setTransformValue(eventsWrapper, 'translateX', value + 'px');
                //update navigation arrows visibility
                (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
                (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
            }

            function updateFilling(selectedEvent, filling, totWidth) {
                //change .filling-line length according to the selected event
                var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
                    eventLeft = eventStyle.getPropertyValue("left"),
                    eventWidth = eventStyle.getPropertyValue("width");
                eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
                var scaleValue = eventLeft / totWidth;
                setTransformValue(filling.get(0), 'scaleX', scaleValue);
            }

            function setDatePosition(timelineComponents, min) {
                for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
                    var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
                        distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
                    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
                }
            }

            function setTimelineWidth(timelineComponents, width) {
                var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
                    timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
                    timeSpanNorm = Math.round(timeSpanNorm) + 4,
                    totalWidth = timeSpanNorm * width;
                timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
                updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
                updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

                return totalWidth;
            }

            function updateVisibleContent(event, eventsContent) {
                var eventDate = event.data('date'),
                    visibleContent = eventsContent.find('.selected'),
                    selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
                    selectedContentHeight = selectedContent.height();

                if (selectedContent.index() > visibleContent.index()) {
                    var classEnetering = 'selected enter-right',
                        classLeaving = 'leave-left';
                } else {
                    var classEnetering = 'selected enter-left',
                        classLeaving = 'leave-right';
                }

                selectedContent.attr('class', classEnetering);
                visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                    visibleContent.removeClass('leave-right leave-left');
                    selectedContent.removeClass('enter-left enter-right');
                });
                eventsContent.css('height', selectedContentHeight + 'px');
            }

            function updateOlderEvents(event) {
                event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
            }

            function getTranslateValue(timeline) {
                var timelineStyle = window.getComputedStyle(timeline.get(0), null),
                    timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
                        timelineStyle.getPropertyValue("-moz-transform") ||
                        timelineStyle.getPropertyValue("-ms-transform") ||
                        timelineStyle.getPropertyValue("-o-transform") ||
                        timelineStyle.getPropertyValue("transform");

                if (timelineTranslate.indexOf('(') >= 0) {
                    var timelineTranslate = timelineTranslate.split('(')[1];
                    timelineTranslate = timelineTranslate.split(')')[0];
                    timelineTranslate = timelineTranslate.split(',');
                    var translateValue = timelineTranslate[4];
                } else {
                    var translateValue = 0;
                }

                return Number(translateValue);
            }

            function setTransformValue(element, property, value) {
                element.style["-webkit-transform"] = property + "(" + value + ")";
                element.style["-moz-transform"] = property + "(" + value + ")";
                element.style["-ms-transform"] = property + "(" + value + ")";
                element.style["-o-transform"] = property + "(" + value + ")";
                element.style["transform"] = property + "(" + value + ")";
            }

            //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
            function parseDate(events) {
                var dateArrays = [];
                events.each(function () {
                    var singleDate = $(this),
                        dateComp = singleDate.data('date').split('T');
                    if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
                        var dayComp = dateComp[0].split('/'),
                            timeComp = dateComp[1].split(':');
                    } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
                        var dayComp = ["2000", "0", "0"],
                            timeComp = dateComp[0].split(':');
                    } else { //only DD/MM/YEAR
                        var dayComp = dateComp[0].split('/'),
                            timeComp = ["0", "0"];
                    }
                    var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
                    dateArrays.push(newDate);
                });
                return dateArrays;
            }

            function daydiff(first, second) {
                return Math.round((second - first));
            }

            function minLapse(dates) {
                //determine the minimum distance among events
                var dateDistances = [];
                for (i = 1; i < dates.length; i++) {
                    var distance = daydiff(dates[i - 1], dates[i]);
                    dateDistances.push(distance);
                }
                return Math.min.apply(null, dateDistances);
            }

            /*
                How to tell if a DOM element is visible in the current viewport?
                http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
            */
            function elementInViewport(el) {
                var top = el.offsetTop;
                var left = el.offsetLeft;
                var width = el.offsetWidth;
                var height = el.offsetHeight;

                while (el.offsetParent) {
                    el = el.offsetParent;
                    top += el.offsetTop;
                    left += el.offsetLeft;
                }

                return (
                    top < (window.pageYOffset + window.innerHeight) &&
                    left < (window.pageXOffset + window.innerWidth) &&
                    (top + height) > window.pageYOffset &&
                    (left + width) > window.pageXOffset
                );
            }

            function checkMQ() {
                //check if mobile or desktop device
                return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
            }

            ///------------------------------------------------------------///
        }
    ]);
})();