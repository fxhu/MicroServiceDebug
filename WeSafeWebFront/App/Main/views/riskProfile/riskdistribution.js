(function () {
    var controllerId = 'app.views.riskdistribution';
    angular.module('app').controller(controllerId, [
        '$scope', '$uibModal', 'abp.services.app.safeAssess', '$timeout', function ($scope, $uibModal, safeAssessService, $timeout) {
            var vm = this;
            vm.IsRun = false;
            vm.myclass = 'hasPermission';


            var Items = [
                {
                    "id": "1",
                    "title": "危险品",
                    "score": 100,
                    "api": safeAssessService.getDangerousGoodsScore
                },
                {
                    "id": "2",
                    "title": "危险作业",
                    "score": 100,
                    "api": safeAssessService.getDangerousOperationsScore
                },
                {
                    "id": "3",
                    "title": "培训次数",
                    "score": 100,
                    "api": safeAssessService.getTrainNumberScore
                },
                {
                    "id": "4",
                    "title": "考核成绩",
                    "score": 100,
                    "api": safeAssessService.getCheckResultScore
                },
                {
                    "id": "5",
                    "title": "资产状态",
                    "score": 100,
                    "api": safeAssessService.getGoodsStatusScore
                },
                {
                    "id": "6",
                    "title": "巡检任务",
                    "score": 100,
                    "api": safeAssessService.getPatrolTaskScore
                }
            ];
            var internval = 100;
            var progressObj = {};
            var checkIdx = 0;//当前进度条检查项索引编号

            var ProgressItem = function (areaItem, handle) {
                var oProgress = new Object();
                oProgress.areaItem = areaItem;
                oProgress.handle = handle;
                oProgress.timeout;
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
                oProgress.Init = function (data) {
                    $.each(Items, function (idx, checkItem) {
                        oProgress.Create(checkItem.id, checkItem.title);
                        switch (checkItem.id) {
                            case "1":
                                {
                                    var color = Common.GetScoreColor(oProgress.areaItem.dangerousGoods);
                                    progressObj[checkItem.id].option('barColor', color);
                                    progressObj[checkItem.id].value(oProgress.areaItem.dangerousGoods);
                                    //  checkItem.rate = oProgress.areaItem.dangerousGoodsPer;
                                }; break;
                            case "2":
                                {
                                    var color = Common.GetScoreColor(oProgress.areaItem.dangerousOperations);
                                    progressObj[checkItem.id].option('barColor', color);
                                    progressObj[checkItem.id].value(oProgress.areaItem.dangerousOperations);
                                    //  checkItem.rate = oProgress.areaItem.dangerousOperationsPer;
                                }; break;
                            case "3":
                                {

                                    var color = Common.GetScoreColor(oProgress.areaItem.trainNumber);
                                    progressObj[checkItem.id].option('barColor', color);
                                    progressObj[checkItem.id].value(oProgress.areaItem.trainNumber);
                                    //  checkItem.rate = oProgress.areaItem.trainNumberPer;
                                }; break;
                            case "4":
                                {
                                    var color = Common.GetScoreColor(oProgress.areaItem.checkResult);
                                    progressObj[checkItem.id].option('barColor', color);
                                    progressObj[checkItem.id].value(oProgress.areaItem.checkResult);
                                    //  checkItem.rate = oProgress.areaItem.checkResultPer;
                                }; break;
                            case "5":
                                {
                                    var color = Common.GetScoreColor(oProgress.areaItem.goodsStatus);
                                    progressObj[checkItem.id].option('barColor', color);
                                    progressObj[checkItem.id].value(oProgress.areaItem.goodsStatus);
                                    //  checkItem.rate = oProgress.areaItem.goodsStatusPer;
                                }; break;
                            case "6":
                                {
                                    var color = Common.GetScoreColor(oProgress.areaItem.patrolTask);
                                    progressObj[checkItem.id].option('barColor', color);
                                    progressObj[checkItem.id].value(oProgress.areaItem.patrolTask);
                                    // checkItem.rate = oProgress.areaItem.patrolTaskPer;
                                }; break;
                        }
                    });
                    var html = "<h2>准备就绪&nbsp;&nbsp;</h2>";
                    $("#checkList").html(html);
                    this.SetStar(this.areaItem.assessScore);
                    var color = Common.GetScoreColor(this.areaItem.assessScore);
                    radialObj.option('barColor', color);
                    radialObj.value(this.areaItem.assessScore);
                };
                oProgress.Start = function () {//开始检测
                    $("#progRow").show();
                    $("#btnSysChecked").attr("disabled", "disabled");
                    $("#btnSysChecked").html("正在评估");
                    if (checkIdx == Items.length) {//评估完成                        
                        this.Finish();
                        $scope.$apply();
                        return;
                    }
                    var item = Items[checkIdx];
                    var scoreNum = 100;
                    this.Create(item.id, item.title);
                    if (this.areaItem.areaId > 0)
                    {
                        this.GetAreaScore(item, checkIdx, function (result) {
                            scoreNum = parseInt(result.data.score);
                            oProgress.CheckStatus(item, scoreNum);
                        });
                    }
                    else {
                        this.GetScore(item, function (result) {
                            scoreNum = parseInt(result.data);
                            oProgress.CheckStatus(item, scoreNum);
                        });
                    }
                    
                };
                //获取服务器得分
                oProgress.GetScore = function (item, callback) {
                    item.api().then(function (result) {
                        if (callback) {
                            callback(result);
                        }
                    });
                };
                //获取单个区域的服务器得分
                oProgress.GetAreaScore = function (item, checkIdx, callback) {
                    safeAssessService.reAssess({ id: item.id, whichItem: checkIdx, UserId: this.areaItem.userId, AreaId: this.areaItem.areaId, OrganizationUnitId: this.areaItem.unitID }).then(function (result) {
                        if (callback) {
                            callback(result);
                        }
                    });
                };
                oProgress.CheckStatus = function (item, scoreNum) {
                    $("#status" + item.id).html("正在评估...");

                    oProgress.SetTotalProgress(totalCheckIdx);
                    var rate = oProgress.GetScoreRate(scoreNum);
                    totalCheckIdx += rate;
                    oProgress.timeout = setTimeout(function () {
                        if ($("#ItemList").length == 0) {
                            return;
                        }

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
                    var html = "<div class=\"col-md-2\"><div class=\"prg-cont rad-prg text-center\" id=\"progress" + id + "\"></div>"
                        + "<p class=\"text-center\">" + title + "</p></div>";
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
                    if (progressObj[id]) {
                        var color = Common.GetScoreColor(score);
                        progressObj[id].option('barColor', color);
                    }
                };
                oProgress.SetTotalProgress = function (idx) {
                    var value = parseInt(idx * 100 / totalNum);

                    $("#prog").css("width", value + "%").text(value + "%");//设置进度条

                    var total = 0;
                    var percent;
                    if (this.areaItem.areaId > 0) {
                        total = parseInt(Items[0].score * this.areaItem.dangerousGoodsPer) + parseInt(Items[1].score * this.areaItem.dangerousOperationsPer) + parseInt(Items[2].score * this.areaItem.trainNumberPer) + parseInt(Items[3].score * this.areaItem.checkResultPer) + parseInt(Items[4].score * this.areaItem.goodsStatusPer) + parseInt(Items[5].score * this.areaItem.patrolTaskPer);
                        percent = total;
                    }
                    else {
                        $.each(Items, function (idx, item, that) {
                            total += item.score;
                        });
                        percent = parseInt(total / Items.length);
                    }
                    var color = Common.GetScoreColor(percent);
                    radialObj.option('barColor', color);
                    radialObj.animate(percent);
                };
                oProgress.Reset = function (assessScore) {
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
                    $("#progRow").hide();
                };
                oProgress.Finish = function () {
                    $("#progRow").hide();
                    $("#status" + Items[checkIdx - 1].id).html("评估完成");
                    $("#btnSysChecked").removeAttr("disabled");
                    $("#btnSysChecked").html("重新评估");
                    var html = "<h2>评估完成&nbsp;&nbsp;</h2>";
                    $("#checkList").html(html);
                    var total = 0;                    
                    if (this.areaItem.areaId > 0) {
                        total = parseInt(Items[0].score * this.areaItem.dangerousGoodsPer) + parseInt(Items[1].score * this.areaItem.dangerousOperationsPer) + parseInt(Items[2].score * this.areaItem.trainNumberPer) + parseInt(Items[3].score * this.areaItem.checkResultPer) + parseInt(Items[4].score * this.areaItem.goodsStatusPer) + parseInt(Items[5].score * this.areaItem.patrolTaskPer);
                    }
                    else {
                        $.each(Items, function (idx, item, that) {
                            total += item.score;
                        });
                        total = total / Items.length;
                    }                    
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
                    if (this.areaItem.areaId > 0) {
                        this.handle.updateAreaAssess(assess).then(function () {

                        });
                    }                    
                };
                return oProgress;
            };

            $timeout(function () {
                safeAssessService.getCheckItem().then(function (result) {
                    var oProgress = new ProgressItem(result.data, safeAssessService);
                    var rootData = result.data;
                    vm.areasObj = new LocalAreaDropDown("riskDis_", function () {
                        var areaId = vm.areasObj.selectAreaId;
                        if (areaId > 0) {
                            safeAssessService.getAreaAssess(areaId).then(function (result) {
                                oProgress.areaItem = result.data;
                                oProgress.Reset();
                                oProgress.Init();
                            });
                        }
                        else {
                            oProgress.areaItem = rootData;
                            oProgress.Reset();
                            oProgress.Init();
                        }
                        $scope.$apply();
                    });                    
                
                    vm.areasObj.init();

                    $("#btnRiskSysChecked").click(function () {
                        vm.IsRun = true;
                        oProgress.Reset();
                        oProgress.Start();
                    });
                });
            });
        }
    ]);
})();