(function () {
    var controllerId = 'app.views.writetemplate';
    angular.module('app').filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]).controller(controllerId, [
        '$scope', '$timeout', 'abp.services.app.planTemplate', function ($scope, $timeout, planTemplateService) {
            var vm = this;
            vm.myclass = 'hasPermission';
            var treeObj = null;//预案模板tree对象
            vm.PlanName = Common.getQueryString("pid");
            vm.oldPlanName = Common.getQueryString("pid");
            vm.name = null;
            vm.Areas = null;
            vm.IsSaving = false;
            vm.click = function (index) {
                // $location.hash('div' + idx);
                // $anchorScroll();
                var scrollTopHeight = 0;
                $(".scorllercontent").each(function (idx, item) {
                    var height = $(item).height();
                    if (index == idx) {
                        return false;
                    }
                    else {
                        scrollTopHeight += height;
                    }
                });
                if (index != 0) {
                    scrollTopHeight -= 10;
                }
                $("#planScroller").animate({ scrollTop: scrollTopHeight }, 800);
                var scrollTop = $("#planScroller").next().offset().top;
                var pageContentHeight = $("#planScroller").height();
                var boxHeight = $("#planScroller").find(".pre-box").height();
                var height = (scrollTopHeight / boxHeight) * pageContentHeight;
                $("#planScroller").next().animate({ top: height }, 800);
            };

            vm.loadTree = function () {
                planTemplateService.getTemplateList(null).then(function (treedata) {
                    var d = [];
                    $.each(treedata.data, function (idx, item) {
                        var child = [];
                        $.each(item.children, function (childIdx, childItem) {
                            child.push(childItem.name);
                        });
                        d.push({
                            text: item.name,
                            icon: "fa fa-folder icon-state-warning icon-lg",
                            children: child
                        });
                    });
                    treeObj = $("#treelist").jstree(
                        {
                            plugins: ["wholerow", "checkbox", "types"],
                            core: {
                                themes: {
                                    responsive: !1
                                },
                                data: d
                            },
                            types: {
                                "default": {
                                    icon: "fa fa-file-word-o icon-lg"
                                }
                            }
                        });
                });
            };

            vm.back = function () {
                window.history.back();
            };

            //加载预案内容
            vm.LoadTemplate = function (planName) {
                planTemplateService.getTmplate(planName).then(function (result) {
                    vm.PlanName = result.data.planName;
                    vm.oldPlanName = result.data.planName;
                    $.each(result.data.tmp.contents, function (idx, item) {
                        var model = vm.SectionObj.CreateModel(item.secName, item.secContent, false);
                        vm.SectionObj.Models.push(model);
                    });
                });
            }            
           
            //导入模板
            vm.import = function () {
                var nodes = $("#treelist").jstree("get_checked");
                var input = [];
                $.each(nodes, function (idx, node) {
                    var nodeObj = $("#treelist").jstree('get_node', node);
                    if (nodeObj.parent == "#") {
                        input.push({ "ID": node, Text: nodeObj.text, Child: [] });
                    }
                    else {
                        var IsAdd = false;//判断当前结点是否已加入到父级结点对象，当只勾选子集对象，未勾选父级对象时出现
                        $.each(input, function (i, item) {
                            if (item.ID == nodeObj.parent) {
                                item.Child.push({ "ID": node, Text: nodeObj.text });
                                IsAdd = true;
                                return;
                            }
                        });
                        if (!IsAdd) {
                            var parent = $("#treelist").jstree('get_node', nodeObj.parent);
                            var obj = { "ID": parent.id, Text: parent.text, Child: [] };
                            obj.Child.push({ "ID:": node, Text: nodeObj.text, Child: null });
                            input.push(obj);
                        }
                    }
                });

                planTemplateService.getSections(input).then(function (result) {
                    $.each(result.data, function (idx, data) {
                        $.each(data.contents, function (idx, item) {
                            var model = vm.SectionObj.CreateModel(item.secName, item.secContent, false);
                            vm.SectionObj.Models.push(model);
                        });
                    });
                });
                $('#myModal').modal('hide');
            };

            vm.CreatePlan = function () {
                vm.oldPlanName = vm.PlanName;
                $('#myPlanTitle').modal('hide');
            }
            vm.IsShowTitleBtn = false;
            vm.ShowEditTitle = function () {
                vm.IsShowTitleBtn = true;
            };
            vm.HideEditTitle = function () {
                vm.IsShowTitleBtn = false;
            };
            vm.editTitle = function () {
                vm.PlanName = vm.oldPlanName;
                $('#myPlanTitle').modal({ backdrop: 'static' });
            }
            vm.showModal = function () {
                $('#myModal').modal({ backdrop: 'static' });
            }

            vm.addSection = function () {
                $("#secContent").show();
            }
            $("#secContent").hide();

            //保存预案
            vm.save = function () {
                var planName = vm.PlanName.replace(/(^\s*)|(\s*$)/g, ""); 
                if (planName == "") {
                    abp.notify.error("请输入预案模板名称");
                    return;
                }
                vm.IsSaving = true;
                var postdata = {
                    Name: planName,
                    OldName: Common.getQueryString("pid"),
                    Sections: []
                };
                $.each(vm.SectionObj.Models, function (idx, item) {
                    postdata.Sections.push({
                        SecName: item.SecName,
                        SecContent: item.SecContent
                    });
                });
                if (postdata.OldName != "") {
                    planTemplateService.save(postdata).then(function (result) {
                        if (result.data == "") {
                            abp.notify.info(app.localize('保存成功'));
                        }
                        else {
                            abp.notify.error("保存失败!" + result.data);
                        }
                        vm.IsSaving = false;
                    });
                }
                else {
                    planTemplateService.addTemplate(postdata).then(function (result) {                        
                        var planName = result.data;
                        if (planName == vm.PlanName) {                            
                            abp.notify.info(app.localize('保存成功'));
                        }
                        else {
                            abp.notify.error("保存失败!" + result.data);
                        }
                        vm.IsSaving = false;
                    });
                }
            }

            vm.ClickTools = function () {
                $("#tmp_navtool").toggleClass('nav-is-visible');
            };

            var ScorllerBtn = function () {
                var oScorllerBtn = new Object();
                var btnHeight = 40;//当前按钮的高度
                var scorllerTopHeight = 225;//按钮到顶部的固定高度       
                var btnLineheight = 3;//按钮之间的行高
                var sectionLineHeight = 30;//段落之间的行高
                //根据当前章节编号设置按钮样式
                oScorllerBtn.SetBtns = function () {
                    var thisNum = 0;//当前正在浏览的章节索引号
                    var IsCurrentNum = false;
                    $(".scorllercontent").each(function (idx, item) {
                        var currentTop = $(item).offset().top;
                        var btnItem = $("button.btnNum").eq(idx);
                        if ((scorllerTopHeight + idx * (btnHeight + btnLineheight)) >= currentTop) {
                            $(btnItem).css({
                                position: "fixed",
                                top: (scorllerTopHeight + idx * (btnHeight + btnLineheight)).toString() + "px"
                            });
                        }
                        else {
                            $(btnItem).css({
                                position: "absolute",
                                top: ""
                            });
                        }
                        //获取正在浏览的第一个章节编号
                        if (currentTop + $(item).height() - scorllerTopHeight - sectionLineHeight > 0 && !IsCurrentNum) {
                            thisNum = idx;
                            IsCurrentNum = true;
                        }
                    });

                    //设置按钮active状态
                    $("button.btnNum").each(function (idx, btnItem) {
                        if (idx < thisNum) {
                            $(btnItem).removeClass("activing");
                            $(btnItem).addClass("actived");
                        }
                        else {
                            $(btnItem).removeClass("actived");
                            $(btnItem).addClass("activing");
                        }
                    });
                };
                return oScorllerBtn;
            };

            vm.ShowEditBtn = function (key) {                
                var model = vm.SectionObj.Models[key];
                model.IsBtnShow = true;
            }

            vm.HideEditBtn = function (key) {
                var model = vm.SectionObj.Models[key];
                model.IsBtnShow = false;
            }

            var oScorller = new ScorllerBtn();
            angular.element('#planScroller').bind('scroll', function (event) {
                oScorller.SetBtns();
            });

            var SectionObj = function () {
                var oSec = new Object();
                oSec.Models = [];
                //添加章节(添加至整个预案的最后)
                oSec.Add = function () {
                    var model = this.CreateModel();
                    this.Models.push(model);
                    $timeout(function () {
                        var key = oSec.Models.length - 1;
                        oSec.CreateUeditor(key);
                        vm.click(key);
                    });
                };
                //上移，key：当前章节索引
                oSec.MoveUp = function (key) {
                    if (key == 0) return;
                    this.SwapItems(key, key - 1);
                    $timeout(function () {
                        vm.click(key - 1);
                    });                    
                };
                //下移，key：当前章节索引
                oSec.MoveDown = function (key) {
                    if (key + 1 == this.Models.length) return;
                    this.SwapItems(key, key + 1);
                    $timeout(function () {
                        vm.click(key + 1);
                    });  
                };
                //交换数组
                oSec.SwapItems = function (oldIndex, newIndex) {
                    this.Models[oldIndex] = this.Models.splice(newIndex, 1, this.Models[oldIndex])[0];
                };
                oSec.Edit = function (key) {
                    var model = this.Models[key];
                    model.IsEdit = true;
                    if (model.ue) {
                        model.ue.setShow();
                    }
                    else {
                        oSec.CreateUeditor(key);
                    }
                    model.ue.ready(function () {
                        model.ue.setContent(model.SecContent);
                    });
                };
                //保存当前章节
                oSec.Save = function (key) {
                    var model = this.Models[key];
                    model.ue.setHide();
                    model.IsEdit = false;
                    model.OldSecName = model.SecName;
                    var content = model.ue.getContent();
                    model.SecContent = content;
                    model.OldSecContent = content;                    
                    oSec.length++;
                };
                //取消编辑章节
                oSec.Cancel = function (key) {
                    var model = this.Models[key];
                    //未添加该章节时，从当前数组中移除
                    if (model.OldSecName == "") {
                        model.ue.destroy();
                        this.Models.splice(key, 1);
                    }
                    else {
                        model.IsEdit = false;
                        model.SecName = model.OldSecName;
                        model.SecContent = model.OldSecContent;
                        model.ue.setHide();
                    }
                };
                //删除章节
                oSec.Del = function (key) {
                    var model = this.Models[key];
                    abp.message.confirm(
                        '删除该章节后将无法恢复', //确认提示
                        '正在删除章节"' + model.SecName + '"，是否继续？',//确认提示（可选参数）
                        function (isConfirmed) {
                            if (isConfirmed) {
                                if (model.ue) {
                                    model.ue.destroy();
                                }                                
                                oSec.Models.splice(key, 1);
                                $scope.$apply();
                            }
                        }
                    );
                };
                //创建新的章节对象
                oSec.CreateModel = function (name, content, IsEdit) {
                    var model = {
                        IsBtnShow: false,
                        IsEdit: IsEdit == undefined ? true : IsEdit,
                        SecName: name == undefined ? "" : name,
                        OldSecName: name == undefined ? "" : name,
                        SecContent: content == undefined ? "" : content,
                        OldSecContent: content == undefined ? "" : content
                    };
                    return model;
                };
                //创建富文本编辑器
                oSec.CreateUeditor = function (key) {
                    var ue = UE.getEditor('editor' + key, {
                        toolleipi: true,//是否显示，设计器的 toolbars
                        textarea: 'design_content',
                        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                        toolbars: [[
                            'source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat', '|', 'forecolor', 'insertorderedlist', 'insertunorderedlist', '|', 'fontfamily', 'fontsize', '|', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'simpleupload', 'horizontal', 'spechars', 'visualareaiframe', '|', 'inserttable', 'deletetable', 'mergecells', 'splittocells']],
                        //focus时自动清空初始化时的内容
                        //autoClearinitialContent:true,
                        //关闭字数统计
                        wordCount: true,
                        //关闭elementPath
                        elementPathEnabled: false,
                        insertunorderedlist : { //自定的样式
                            'circle' : '',  // '○ 小圆圈'
                            'disc' : '',    // '● 小圆点'
                            'square' : ''   //'■ 小方块'
                        },
                        'insertorderedlist':{             
                             //系统自带
                             'decimal' : '' ,         //'1,2,3...'
                             'lower-alpha' : '' ,    // 'a,b,c...'
                             'lower-roman' : '' ,    //'i,ii,iii...'
                             'upper-alpha' : '' ,    //'A,B,C'
                             'upper-roman' : ''      //'I,II,III...'
                        },
                        enableAutoSave: false,//不启用自动保存
                        topOffset: 201,
                        initialFrameWidth: "100%",//设置编辑器默认宽度
                        autoHeightEnabled: true,//不允许自动增加高度
                        scaleEnabled: false,//是否允许拉长升高
                        enableContextMenu: false,//是否启用右键菜单
                        //默认的编辑区域高度
                        initialFrameHeight: 344
                        //更多其他参数，请参考ueditor.config.js中的配置项
                    });
                    ue.iframeData = vm.Areas;
                    templateDesign.init(ue);
                    this.Models[key].ue = ue;
                };
                return oSec;
            };
            $timeout(function () {
                vm.loadTree();
                vm.SectionObj = new SectionObj();
                //加载数据
                if (vm.PlanName != "") {
                    vm.LoadTemplate(vm.PlanName);
                }
                else {
                    vm.editTitle();
                }
            });
        }
    ]);
})();