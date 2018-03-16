(function () {
	var appmodule = angular.module('app');
	appmodule.controller('app.views.hiddenTrouble.addHiddenTrouble', [
		'$scope', '$timeout', 'abp.services.app.troubles',
		function ($scope, $timeout, troublesService) {
			var vm = this;
			vm.myclass = 'hasPermission';
			vm.risk = null;
			var riskid = null; // getURLParam('Id');
			var riskStatus = null; // getURLParam('RiskStatus');
			var item = riskid == null ? "add" : {
				Id: riskid,
				HiddenTroubleStatus: parseInt(riskStatus)
			};
			var backpage = ''; // getURLParam('backpage');
			var pageindex = ''; //getURLParam('pageindex');
			var type = ''; // getURLParam('type');
			function getURLParam(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;

			}

			vm.islook = item != "add";
			var addid = null;
			var current = (new Date()).getTime();
			var fivedaylater = current + 5 * 24 * 3600 * 1000;
			vm.risk = {
				HiddenTroubleType: 0,
				RectifyTroubleType: 1,
				HiddenTroubleFindTime: (new Date()).Format("yyyy-MM-dd"),
				RectifyEndTime: (new Date(fivedaylater)).Format("yyyy-MM-dd")
			};
			vm.troubleType = [{
				id: 0,
				type: "一般隐患"
			}, {
				id: 1,
				type: "重大隐患"
			}];
			vm.rectifyType = [{
				id: 0,
				type: "立即整改"
			}, {
				id: 1,
				type: "限期整改"
			}, {
				id: 2,
				type: "停工整改"
			}];

			troublesService.getAllUses({
				Id: 0
			}).then(function (result) {
				vm.users = result.data.items;
			});
			troublesService.getAllKeyAreas().then(function (result) {
				vm.areas = result.data.items;
			});
			vm.risk.ReportUserId = abp.session.userId;
			vm.areaChanged = function () {
				if (vm.risk.AreaID == null) return;
				var selectuserid = null,
					selectedArea = null;
				for (var i = 0; i < vm.areas.length; i++) {
					if (vm.areas[i].id == vm.risk.AreaID) {
						selectuserid = vm.areas[i].userId;
						selectedArea = vm.areas[i];
					}
				}
				for (var i = 0; i < vm.users.length; i++) {
					if (vm.users[i].id == selectuserid) {
						vm.risk.ChargeUserName = vm.users[i].userName;
						return;
					}
				}
				//				if(vm.risk.AreaID) {
				//					abp.message.error("此区域尚没有负责人，请在职责指派内指定了责任人后，再进行上报！");
				//				}
				vm.risk.ChargeUserName = "";
				vm.risk.AreaID = null;
				FindUserNotNull(selectedArea);
				if (vm.risk.AreaID == null) {
					abp.message.error("此区域及上级区域尚没有负责人，请在职责指派内指定了负责人后，再进行上报！");
				} else {
					abp.message.warn("此区域尚没有负责人已为您选择了上级区域，请在职责指派内指定负责人！");
					if (autocontent != "") {
						var index = vm.risk.HiddenTroubleContent.indexOf(autocontent, 0);
						if (index == 0) {
							vm.risk.HiddenTroubleContent = vm.risk.HiddenTroubleContent.substring(autocontent.length);
						}
					}
					autocontent = selectedArea.areaName + ":";
					vm.risk.HiddenTroubleContent = autocontent + (vm.risk.HiddenTroubleContent == null ? "" : vm.risk.HiddenTroubleContent);
				}
			}

			function FindUserNotNull(area) {
				if (area == null) return;
				if (area.parentId != null) {
					$.each(vm.areas, function () {
						if (this.id == area.parentId && this.userId != 0) {
							vm.risk.AreaID = this.id;
							vm.areaChanged();
						} else if (this.id == area.parentId && this.userId == 0) {
							FindUserNotNull(this);
						}
					});
				}
			}
			vm.save = function () {
				if (vm.risk.HiddenTroubleFindTime==null) {
					abp.message.error("请完善隐患信息!");
					return;
				}
				if (vm.risk.RectifyEndTime==null) {
					abp.message.error("请完善隐患信息!");
					return;
				}
				if (vm.risk.HiddenTroubleFindTime > vm.risk.RectifyEndTime) {
					return;
				}
				if (vm.risk.AreaID == null || vm.risk.HiddenTroubleContent == null ||
					$.trim(vm.risk.HiddenTroubleContent) == '') {
					abp.message.error("请完善隐患信息!");
					return;
				}
				var claim = vm.risk.RectifyClaim;
				if (vm.risk.RectifyClaim == null) claim = '';
				var files = $('#txt_file')[0].files;
				var myform = new FormData();

				var trouble = {
					HiddenTroubleType: vm.risk.HiddenTroubleType,
					HiddenTroubleContent: vm.risk.HiddenTroubleContent,
					HiddenTroubleFindTime: new Date(vm.risk.HiddenTroubleFindTime),
					RectifyEndTime: new Date(vm.risk.RectifyEndTime),
					RectifyClaim: claim,
					AreaID: vm.risk.AreaID,
					ReportUserId: vm.risk.ReportUserId,
					RectifyTroubleType: vm.risk.RectifyTroubleType,
					ComeFrom: 0
				};
				if (files.length == 0) {
					trouble["filePaths"] = [];
					troublesService.addHiddenTrouble(trouble).then(function (result) {
						abp.notify.info(app.localize('保存成功'));
						window.location.href = "/default.html#!/HiddenDangerList";
					});
				} else {
					var dealcount=0;
					for (var i = 0; i < files.length; i++) {
						//myform.append('file' + i, files[i]);					
						Common.dealImage(files[i], {},files[i].name, function (data,name) {
							if(name==''){
								myform.append('file' + i, data);
							}else{
								myform.append('file' + i, data, name);
							}	
							dealcount++;
							if (dealcount == files.length) {
								$.ajax({
									type: "post",
									url: abp.appPath + "File/UploadRiskFile",
									beforeSend: function (request) {
										request.setRequestHeader("Authorization", tokens);
									},
									data: myform,
									contentType: false,
									processData: false,
									success: function (data) {
										trouble["FilePaths"] = data.filepaths;
										troublesService.addHiddenTrouble(trouble).then(function (result) {
											abp.notify.info(app.localize('保存成功'));
											window.location.href = "/default.html#!/HiddenDangerList";
										});

									},
									error: function (err) {
										abp.message.error("保存失败!");
									},
									complete: function () {

									}
								});
							}
						});
					}
				}

			};			
			vm.zgvisible = 0;
			vm.fcvisible = 0;
			vm.sbfjs = [];
			vm.zgfjs = [];
			vm.fcfjs = [];
			if (vm.islook) {
				switch (item.HiddenTroubleStatus) {
					case 0: //已闭环
						vm.zgvisible = 1;
						vm.fcvisible = 1;
						GetFiles(2);
						break;
					case 1: //待整改
						GetFiles(0);
						break;
					case 2: //未提交
						GetFiles(2);
						break;
					case 3: //待复查
						vm.zgvisible = 1;
						GetFiles(1);
						break;
					case 4: //复查未通过
						vm.zgvisible = 1;
						vm.fcvisible = 1;
						GetFiles(2);
						break;
					case 5: //已撤销
						vm.zgvisible = 1;
						GetFiles(2);
						break;
					case 6: //已逾期
						GetFiles(0);
						break;
				}
				troublesService.getOneTrouble({
					Id: item.Id
				}).then(function (result) {
					var data = result.data;
					vm.risk = {
						HiddenTroubleType: data.hiddenTroubleType,
						HiddenTroubleContent: data.hiddenTroubleContent,
						HiddenTroubleFindTime: new Date(data.hiddenTroubleFindTime),
						RectifyEndTime: new Date(data.rectifyEndTime), //new Date((new Date(data.rectifyEndTime)).getTime() - 24 * 3600 * 1000),
						RectifyClaim: data.rectifyClaim,
						AreaID: parseInt(data.areaID),
						ReportUserId: data.reportUserId,
						ChargeUserName: data.chargeUserName,
						RectifyTroubleType: data.rectifyTroubleType,
						RectifyUserId: data.rectifyUserId,
						RectifyContent: data.rectifyContent,
						RectifyTime: new Date(data.rectifyTime),
						ReviewTime: new Date(data.reviewTime),
						ReviewUserId: data.reviewUserId,
						ReviewContent: data.reviewContent
					};
					$('#dt_end').attr('min', vm.risk.HiddenTroubleFindTime.Format("yyyy-MM-dd"));
				});
			} else {
				$timeout(function () {
					InitDatePicker();
				});
			}
			vm.rectifyChange = function () {
				if (vm.risk.RectifyTroubleType == 1) {
					$("#recendtime")[0].style.display = "inherit";
				} else {
					$("#recendtime")[0].style.display = "none";
				}
			}

			function InitDatePicker() {
				var addoneday = (new Date()).Format("yyyy-MM-dd");
				$('.mydate').datepicker({
					autoclose: true,
					format: "yyyy-mm-dd",
					language: "zh-CN"
				});
				$('#dt_start').datepicker('setEndDate', addoneday);
				$('#dt_end').datepicker('setStartDate', vm.risk.HiddenTroubleFindTime);
				$('#dt_start').datepicker('update', vm.risk.HiddenTroubleFindTime);
				$('#dt_end').datepicker('update', vm.risk.RectifyEndTime);
			}
			//////--------------------------------------///////           
			function GetFiles(type) {
				$.ajax({
					type: "get",
					url: abp.appPath + "HiddenTrouble/GetAllFiles/?tbid=" + item.Id + "&type=" + type,
					beforeSend: function (request) {
						request.setRequestHeader("Authorization", tokens);
					},
					success: function (data) {
						switch (type) {
							case 0:
								vm.sbfjs = data.files[0];
								break;
							case 1:
								vm.sbfjs = data.files[0];
								vm.zgfjs = data.files[1];
								break;
							case 2:
								vm.sbfjs = data.files[0];
								vm.zgfjs = data.files[1];
								vm.fcfjs = data.files[2];
								break;
						}
					},
					error: function (err) { }
				});
			}
			vm.down = function (url) {
				//window.open(url);

				$.post("File/DownLoadFile", {
					FileName: url
				}, function (result) {

				});
			}
			/////---------------------------------------///////
			vm.cancel = function () {
				if (backpage != null)
					window.location.href = "/default.html#!/" + backpage + "?pageindex=" + pageindex + "&type=" + type;
			};
		}

	]);
})();

//appmodule.directive('ngcLayDate', function ($timeout) {
//    return {
//        require: '?ngModel',
//        restrict: 'A',
//        scope: {
//            ngModel: '=',
//            maxDate: '@',
//            minDate: '@'
//        },
//        link: function (scope, element, attr, ngModel) {
//            var _date = null, _config = {};
//            // 渲染模板完成后执行
//            $timeout(function () {
//                // 初始化参数 
//                _config = {
//                    elem: '#' + attr.id,
//                    format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
//                    max: attr.hasOwnProperty('maxDate') ? attr.maxDate : '',
//                    min: attr.hasOwnProperty('minDate') ? attr.minDate : '',
//                    choose: function (data) {
//                        scope.$apply(setViewValue);

//                    },
//                    clear: function () {
//                        ngModel.$setViewValue(null);
//                    }
//                };
//                // 初始化
//                _date = laydate(_config);

//                // 监听日期最大值
//                if (attr.hasOwnProperty('maxDate')) {
//                    attr.$observe('maxDate', function (val) {
//                        _config.max = val;
//                    })
//                }
//                // 监听日期最小值
//                if (attr.hasOwnProperty('minDate')) {
//                    attr.$observe('minDate', function (val) {
//                        _config.min = val;
//                    })
//                }

//                // 模型值同步到视图上
//                ngModel.$render = function () {
//                    element.val(ngModel.$viewValue || '');
//                };

//                // 监听元素上的事件
//                element.on('blur keyup change', function () {
//                    scope.$apply(setViewValue);
//                });

//                setViewValue();

//                // 更新模型上的视图值
//                function setViewValue() {
//                    var val = element.val();
//                    ngModel.$setViewValue(val);
//                }
//            }, 0);
//        }
//    };
//});