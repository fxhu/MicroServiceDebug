(function () {
    var controllerId = 'app.views.districtchecked';
    angular.module('app').controller(controllerId, [
        '$scope', 'abp.services.app.safeAssess', '$timeout', function ($scope, safeAssessService, $timeout) {
            var vm = this;
            vm.myclass = 'hasPermission';


            vm.back = function () {
                $uibModalInstance.close();
            }
            vm.Id = Common.getQueryString("id");
            if (isNaN(parseInt(vm.Id))) return;

            vm.Items = [];
            var internval = 100;
            var progressObj = {};
            var checkIdx = 0;//当前进度条检查项索引编号   
            vm.timeout = null;
            vm.title = null;
            vm.IsRun = false;
            vm.Stop = function () {
                if (vm.timeout != null) {
                    $timeout.cancel(vm.timeout);
                }
            };

            vm.oProgress = null;

            vm.Run = function () {
                vm.IsRun = true;

                vm.oProgress.Reset();
                vm.oProgress.Start();
            };

            $scope.$on('$destroy', function () {
                vm.Stop();
            });
            $timeout(function () {
                safeAssessService.getAreaAssess(vm.Id).then(function (result) {
                    var item = result.data;
                    vm.title = "安全评分 > " + item.areaName;
                    var Items = [
                        {
                            "id": "1",
                            "title": "危险品",
                            "score": 100,
                            "rate": item.dangerousGoodsPer
                        },
                        {
                            "id": "2",
                            "title": "危险作业",
                            "score": 100,
                            "rate": item.dangerousOperationsPer
                        },
                        {
                            "id": "3",
                            "title": "培训次数",
                            "score": 100,
                            "rate": item.trainNumberPer
                        },
                        {
                            "id": "4",
                            "title": "考核成绩",
                            "score": 100,
                            "rate": item.checkResultPer
                        },
                        {
                            "id": "5",
                            "title": "资产状态",
                            "score": 100,
                            "rate": item.goodsStatusPer
                        },
                        {
                            "id": "6",
                            "title": "巡检任务",
                            "score": 100,
                            "rate": item.patrolTaskPer
                        }
                    ];

                    vm.Items = Items;
                    vm.item = item;

                    vm.oProgress = new ProgressItem(vm.item, safeAssessService);
                    vm.Run();
                });
            });

            var Checkitem = function () {
                var oCheck = new Object();
                oCheck.Init = function () {
                    var html = "";
                    $.each(vm.Items, function (idx, item) {
                        html += "<h4>" + item.title + ":&nbsp;&nbsp;<small id=\"status" + item.id + "\">正在就绪</small></h4>";
                    });
                    $("#checkList").html(html);
                };
                return oCheck;
            }

            var ProgressItem = function (areaItem, handle) {
                var oProgress = new Object();
                oProgress.areaItem = areaItem;
                var Items = vm.Items;
                oProgress.handle = handle;
                var totalCheckIdx = 0;//总进度索引
                var totalNum = 100 * Items.length;
                var color = Common.GetScoreColor(100);
                var radialObj = $('#prgTotal').radialIndicator({
                    barColor: color,
                    barWidth: 10,
                    radius: 60,
                    initValue: 100,
                    roundCorner: true,
                    percentage: false
                }).data('radialIndicator');
                oProgress.Start = function () {//开始检测  
                    $("#btnSysChecked").attr("disabled", "disabled");
                    $("#btnSysChecked").html("正在评估");
                    if (checkIdx == Items.length) {//评估完成                        
                        this.Finish();
                        return;
                    }
                    var item = Items[checkIdx];
                    var scoreNum = 100;
                    this.Create(item.id, item.title);
                    switch (checkIdx) {
                        case 3: {
                            this.GetAPIScore(Common.api.GetExamineSorce + "?id=" + vm.item.userId, function (scoreNum) {
                                oProgress.CheckStatus(item, scoreNum);
                            });
                        }; break;
                        default: {
                            this.GetScore(item, checkIdx, function (result) {
                                scoreNum = result.data.score;
                                oProgress.CheckStatus(item, scoreNum);
                            });
                        }; break;
                    }
                };
                //获取服务器得分
                oProgress.GetScore = function (item, checkIdx, callback) {
                    safeAssessService.reAssess({ id: item.id, whichItem: checkIdx, UserId: vm.item.userId, AreaId: vm.item.areaId, OrganizationUnitId: vm.item.organizationUnitId }).then(function (result) {
                        if (callback) {
                            callback(result);
                        }
                    });
                };
                //通过API获取得分
                oProgress.GetAPIScore = function (apiUrl, callback) {
                    try {
                        $.jsonp({
                            type: "get",
                            url: apiUrl,
                            dataType: "jsonp",
                            success: function (data) {
                                if (callback) {
                                    if (data == undefined || data.msg != "") {
                                        callback(100);
                                    }
                                    else {
                                        var score = parseInt(result.data[0].pse_score);
                                        callback(score);
                                    }
                                }
                            },
                            error: function (err) {
                                if (callback) {
                                    //当服务器得分异常时，设置临时数据
                                    callback(100);
                                }
                            },
                            complete: function () {

                            }
                        });
                    }
                    catch (e) {
                        if (callback) {
                            //当服务器得分异常时，设置临时数据
                            callback(100);
                        }
                    }
                };
                oProgress.CheckStatus = function (item, scoreNum) {
                    vm.Stop();//更新前停止上一次未完成的定时任务
                    $("#status" + item.id).html("正在评估...");

                    oProgress.SetTotalProgress(totalCheckIdx);
                    var rate = oProgress.GetScoreRate(scoreNum);
                    totalCheckIdx += rate;
                    vm.timeout = $timeout(function () {
                        if (item.score >= scoreNum) {
                            oProgress.SetItemStatus(item.id, item.score);
                            progressObj[item.id].animate(item.score);
                            oProgress.CheckStatus(item, scoreNum);
                            item.score--;
                        }
                        else {
                            item.score++;//当前监测项得分和实际得分一致时，得分多减了一次，需要加回来
                            checkIdx++;
                            oProgress.Start();
                        }
                    }, internval);
                };
                oProgress.GetScoreRate = function (scoreNum) {//获取进度条加分频率
                    if (scoreNum == 100) {
                        return 100;
                    }
                    else {
                        var rate = parseInt(100 / (100 - scoreNum));
                        return rate;
                    }
                };
                oProgress.Create = function (id, title) {
                    //创建检查标题
                    var html = "<h2>" + title + ":&nbsp;&nbsp;<small id=\"status" + id + "\">准备就绪</small></h2>";
                    $("#checkList").html(html);

                    //创建检测项计分图
                    var html = "<div class=\"col-md-3\"><div class=\"prg-cont rad-prg\" id=\"progress" + id + "\"></div>"
                        + "<p class=\"col-md-offset-1\">" + title + "</p></div>";
                    $("#ItemList").append(html);
                    var color = Common.GetScoreColor(100);
                    var obj = $("#progress" + id + "").radialIndicator({
                        barColor: color,
                        barWidth: 10,
                        initValue: 100,
                        roundCorner: true,
                        percentage: false
                    }).data('radialIndicator');
                    progressObj[id] = obj;
                };
                oProgress.SetItemStatus = function (id, score) {//设置评分状态                   
                    var color = Common.GetScoreColor(score);
                    progressObj[id].option('barColor', color);
                };
                oProgress.SetTotalProgress = function (idx) {
                    var value = parseInt(idx * 100 / totalNum);

                    $("#prog").css("width", value + "%").text(value + "%");//设置进度条

                    var total = 0;
                    $.each(Items, function (idx, item, that) {
                        total += item.score * item.rate;
                    });

                    var percent = parseInt(total);
                    var color = Common.GetScoreColor(percent);
                    radialObj.option('barColor', color);
                    radialObj.animate(percent);
                };
                oProgress.Reset = function () {
                    $("#ItemList").html("");
                    $("#checkList").html("");
                    checkIdx = 0;
                    totalCheckIdx = 0;
                    $("#prog").css("width", "0%").text("0%");
                    var color = Common.GetScoreColor(100);
                    radialObj.option('barColor', color);
                    radialObj.value(100);
                    $.each(Items, function (idx, item) {
                        item.score = 100;
                    });
                    $("#ResultScore").html("");
                    $("#progRow").show();
                };
                oProgress.Finish = function () {
                    $("#progRow").hide();
                    $("#status" + Items[checkIdx - 1].id).html("评估完成");
                    $("#btnSysChecked").removeAttr("disabled");
                    $("#btnSysChecked").html("重新评估");
                    var html = "<h2>评估完成&nbsp;&nbsp;</h2>";
                    $("#checkList").html(html);
                    var total = 0;
                    $.each(Items, function (idx, item, that) {
                        total += item.score * item.rate;
                    });
                    oProgress.SetStar(total);
                    oProgress.UpdateSafeAssess(total);
                    vm.IsRun = false;
                };
                oProgress.SetStar = function (score) {
                    var level = Common.GetScoreLevel(score);
                    var star = GetStarHtml(level);
                    $("#ResultScore").html(star);
                    function GetStarHtml(times) {
                        var star = "";
                        for (var i = 0; i < times; i++) {
                            star += "<i class=\"fa fa-star\"  style=\"color: rgba(1, 172, 252, 1)\"></i>";
                        }
                        return star;
                    }
                };
                oProgress.UpdateSafeAssess = function (total) {//提交得分
                    var assess = {};
                    assess['Id'] = this.areaItem.areaId;
                    assess['UnitID'] = this.areaItem.unitID;
                    assess['DangerousGoods'] = Items[0].score;
                    assess['DangerousOperations'] = Items[1].score;
                    assess['TrainNumber'] = Items[2].score;
                    assess['CheckResult'] = Items[3].score;
                    assess['GoodsStatus'] = Items[4].score;
                    assess['PatrolTask'] = Items[5].score;
                    this.handle.updateAreaAssess(assess).then(function () {

                    });
                };
                return oProgress;
            };
        }
    ]);

})();