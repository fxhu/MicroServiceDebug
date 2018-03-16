(function () {
    appModule.controller('app.views.BasicData.creatOrEditDistrictModal', [
        '$scope', '$uibModalInstance', 'abp.services.app.officeAreaCharge', 'abp.services.app.organizationUnit', 'area',
        function ($scope, $uibModalInstance, officeAreaChargeService, organizationUnitService, area) {
            var vm = this;
            vm.myclass = 'hasPermission';

            var uid = area.organizationUnitId;
            vm.areainfo = area;
            vm.areainfo.level = 0;
            vm.saving = false;
            vm.isCanEditAreaType = true;
            vm.units = null;
            vm.allAreaType = [{ id: 1, type: '科室' }, { id: 2, type: '楼层' }, { id: 3, type: '建筑' }, { id: 4, type: '园区' }];
            vm.areaLevel=[{id:0,type:'一般场所'},{id:5,type:'重点场所'}];
            vm.areaTypes = vm.allAreaType;
            vm.unit = null;
            vm.allounit = [];
            var a = "add";
            if (area.id) a = "edit";
            organizationUnitService.getOrganizationUnitsById({ Id: vm.areainfo.organizationUnitId, Action: a }).then(function (result) {
                vm.units = result.data.items;
                if (vm.areainfo.organizationUnitId == null) {
                    vm.allounit = vm.units;
                }
            });
            vm.codechanged = function () {
                if (vm.areainfo.showCode.indexOf("-") > -1 || vm.areainfo.showCode.indexOf(".") > -1) {
                    vm.areainfo.showCode = vm.areainfo.showCode.replace(/\-/g, "").replace(/\./g, "");
                }
            }
            function GetAreaById() {
                if (vm.areainfo.parentId != null || vm.areainfo.id != null) {
                    var getid = vm.areainfo.parentId != null ? vm.areainfo.parentId : vm.areainfo.id;
                    officeAreaChargeService.getOfficeAreaById({ Id: getid }).then(function (result) {
                        if (vm.areainfo.parentId != null) {
                            vm.areaTypes = [];
                            for (var i = 0; i < result.data.areaType - 1; i++) {
                                vm.areaTypes.push(vm.allAreaType[i]);
                            }
                            var len = vm.areaTypes.length;
                            if (len == 0) vm.areaTypes.push(vm.allAreaType[0]);
                            vm.areainfo.areaType = vm.areaTypes[len - 1].id;
                            vm.hasChild = false;
                        }
                        else {
                            vm.areainfo = result.data;
                            //document.getElementById("areatype")[vm.areainfo.areaType - 1].selected = true;
                            vm.unit = result.data.organizationUnitId;
                            vm.hasChild = result.data.hasChild;
                        }
                    });
                }
            }
            vm.save = function () {
                //var type = document.getElementById("areatype");
                //vm.areainfo.areaType = parseInt(type[type.selectedIndex].value);
                var area_info = vm.areainfo;
                if (area_info.organizationUnitId) area_info.organizationUnitId = vm.unit;
                else area_info['organizationUnitId'] = vm.unit;
                if (vm.areainfo.id) {
                    if (vm.unit != uid) {
                        abp.message.confirm("更改组织机构后，该区域的负责人会发生变动，若确认更改，请至职责指派页面更改责任人，是否确定更改？", function (isconfirm) {
                            if (!isconfirm) {
                                return;
                            }
                            else {
                                officeAreaChargeService
                                    .updateOfficeArea(area_info)
                                    .then(function (result) {
                                        if (result.data.code == 'ishavethisparkname') {
                                            abp.message.error("该园区名称已存在，请重新输入！");
                                            return;
                                        }
                                        else if (result.data.code == "codeexists") {
                                            abp.message.error("该编码已存在，请重新输入！");
                                            return;
                                        }
                                        else {
                                            abp.notify.info(app.localize('保存成功'));
                                            $uibModalInstance.close(result.data);
                                        }
                                    });
                            }
                        });
                    }
                    else {
                        officeAreaChargeService
                            .updateOfficeArea(area_info)
                            .then(function (result) {
                                if (result.data.code == 'ishavethisparkname') {
                                    abp.message.error("该园区名称已存在，请重新输入！");
                                    return;
                                }
                                else if (result.data.code == "codeexists") {
                                    abp.message.error("该编码已存在，请重新输入！");
                                    return;
                                }
                                else {
                                    abp.notify.info(app.localize('保存成功'));
                                    $uibModalInstance.close(result.data);
                                }
                            });
                    }

                } else {
                    officeAreaChargeService
                        .createOfficeArea(area_info)
                        .then(function (result) {
                            if (result.data.code == 'ishavethisparkname') {
                                abp.message.error("该园区名称已存在，请重新输入！");
                                return;
                            }
                            else if (result.data.code == "codeexists") {
                                abp.message.error("该编码已存在，请重新输入！");
                                return;
                            }
                            else {
                                abp.notify.info(app.localize('保存成功'));
                                $uibModalInstance.close(result.data);
                            }
                        });
                }
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
            GetAreaById();
            vm.areainfo.areaType = vm.areaTypes[0].id;
            if (vm.areainfo.parentId == null && vm.areainfo.organizationUnitId == null) vm.areainfo.areaType = 4;
        }
    ]);
    appModule.directive('ngcSelectSearch', function ($animate, $compile, $parse) {

        function parseOptions(optionsExp, element, scope) {
            // ngOptions里的正则
            var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;

            var match = optionsExp.match(NG_OPTIONS_REGEXP);
            if (!(match)) {
                console.log('ng-options 表达式有误')
            }
            var valueName = match[5] || match[7];
            var keyName = match[6];
            var displayFn = $parse(match[2]);
            var keyFn = $parse(match[1]);
            var valuesFn = $parse(match[8]);

            var labelArray = [],
                idArray = [],
                optionValues = [];
            scope.$watch(match[8], function (newValue, oldValue) {
                if (newValue && newValue.length > 0) {
                    optionValues = valuesFn(scope) || [];
                    labelArray = [];
                    idArray = []
                    for (var index = 0, l = optionValues.length; index < l; index++) {
                        var it = optionValues[index];
                        if (match[2] && match[1]) {
                            var localIt = {};
                            localIt[valueName] = it;
                            var label = displayFn(scope, localIt);
                            var dataId = keyFn(scope, localIt);
                            labelArray.push(label);
                            idArray.push(dataId);
                        }
                    }

                    scope.options = {
                        'optionValues': optionValues,
                        'labelArray': labelArray,
                        'idArray': idArray
                    }
                }
            });
        }
        return {
            restrict: 'A',
            require: ['ngModel'],
            priority: 100,
            replace: false,
            scope: true,
            template: '<div class="chose-container">' +
            '<div class="chose-single"><span class="j-view"></span><i class="glyphicon glyphicon-remove"></i></div>' +
            '<div class="chose-drop chose-hide j-drop">' +
            '<div class="chose-search">' +
            '<input class="j-key" type="text" autocomplete="off">' +
            '</div>' +
            '<ul class="chose-result">' +
            // '<li ng-repeat="'+repeatTempl+'" data-id="'+keyTempl+'" >{{'+ valueTempl+'}}</li>'+
            '</ul>' +
            '</div>' +
            '</div>',
            link: {
                pre: function selectSearchPreLink(scope, element, attr, ctrls) {

                    var tmplNode = $(this.template).first();

                    var modelName = attr.ngModel,
                        name = attr.name ? attr.name : ('def' + Date.now());
                    tmplNode.attr('id', name + '_chosecontianer');

                    $animate.enter(tmplNode, element.parent(), element);
                },
                post: function selectSearchPostLink(scope, element, attr, ctrls) {
                    var choseNode = element.next(); //$('#'+attr.name +'_chosecontianer');
                    choseNode.addClass(attr.class);
                    element.addClass('chose-hide');
                    // 当前选中项
                    var ngModelCtrl = ctrls[0];
                    if (!ngModelCtrl || !attr.name) return;

                    parseOptions(attr.ngOptions, element, scope);
                    var rs = {};

                    function setView() {
                        var currentKey = ngModelCtrl.$modelValue;
                        if (isNaN(currentKey) || !currentKey) {
                            currentKey = '';
                            choseNode.find('.j-view:first').text('请选择');
                            choseNode.find('i').addClass('chose-hide');
                        }
                        if ((currentKey + '').length > 0) {
                            for (var i = 0, l = rs.idArray.length; i < l; i++) {
                                if (rs.idArray[i] == currentKey) {
                                    choseNode.find('.j-view:first').text(rs.labelArray[i]);
                                    choseNode.find('i').removeClass('chose-hide');
                                    break;
                                }
                            }
                        }
                    }

                    function setViewAndData() {
                        if (!scope.options) {
                            return;
                        }
                        rs = scope.options;
                        setView();
                    }
                    scope.$watchCollection('options', setViewAndData);
                    scope.$watch(attr.ngModel, setView);


                    function getListNodes(value) {
                        var nodes = [];
                        value = $.trim(value);
                        for (var i = 0, l = rs.labelArray.length; i < l; i++) {
                            if (rs.labelArray[i].indexOf(value) > -1) {
                                nodes.push($('<li>').data('id', rs.idArray[i]).text(rs.labelArray[i]))
                            }
                        }
                        return nodes;

                    }
                    choseNode.on('keyup', '.j-key', function () {
                        // 搜索输入框keyup，重新筛选列表
                        var value = $(this).val();
                        choseNode.find('ul:first').empty().append(getListNodes(value));
                        return false;
                    }).on('click', function () {
                        choseNode.find('.j-drop').removeClass('chose-hide');
                        if (choseNode.find('.j-view:first').text() != '请选择') {
                            choseNode.find('i').removeClass('chose-hide');
                        }
                        choseNode.find('ul:first').empty().append(getListNodes(choseNode.find('.j-key').val()));
                        return false;
                    }).on('click', 'ul>li', function () {
                        var _this = $(this);
                        ngModelCtrl.$setViewValue(_this.data('id'));
                        ngModelCtrl.$render();
                        choseNode.find('.j-drop').addClass('chose-hide');
                        return false;

                    }).on('click', 'i', function () {
                        ngModelCtrl.$setViewValue('');
                        ngModelCtrl.$render();
                        choseNode.find('.j-view:first').text('请选择');
                        return false;

                    });
                    $(document).on("click", function () {
                        $('.j-drop').addClass('chose-hide');
                        choseNode.find('i').addClass('chose-hide');
                        return false;
                    });

                }
            }
        };
    });
})();