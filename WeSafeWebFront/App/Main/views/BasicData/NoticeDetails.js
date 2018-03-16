(function () {
	var appmodule = angular.module('app');
	appmodule.controller('app.views.BasicData.NoticeDetails', [
		'$scope', '$timeout', 'abp.services.app.notice',
		function ($scope, $timeout, noticeService) {

			var vm = this;
			vm.myclass = 'hasPermission';
			var view = abp.auth.hasPermission('WeSafe.Pages.Notice');
			if (!view) {
				vm.myclass = 'nothasPermission';
			}
			vm.permissions = {
				Notice: abp.auth.hasPermission('WeSafe.Pages.Notice')
			};
			vm.noticeDetails = null;
			var noticeid = getURLParam('Id');
			var noticeedit = null;
			var item = noticeid == null ? "add" : {
				Id: noticeid
			};
			function getURLParam(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.href) || [, ""])[1].replace('/\+/g', '%20')) || null;
			}
			vm.islook = item != "add";
			var addid = null;
			vm.noticeDetails = {
				PageContent: "",
				Content: "",
				Url: ""
			};
			if (vm.islook) {
				noticeedit = getURLParam('edit');
				if (noticeedit) {
					vm.islook = false;
				};
				noticeService.getNoticeById({
					Id: item.Id
				}).then(function (result) {
				
					var data = result.data;
					vm.noticeDetails = {
						PageContent: data.pageContent,
						Content: data.content,
						Url: data.url
					};
					ue.setContent(data.pageContent);
				});
			}
			vm.save = function () {
		
				var content = ue.getContent();
				//ue.setContent(content);
				if (vm.noticeDetails.PageContent == '') {
					return;
				}
				if (vm.noticeDetails.PageContent == null || vm.noticeDetails.Content == null || vm.noticeDetails.Url == null ||
					$.trim(vm.noticeDetails.PageContent) == '' || $.trim(vm.noticeDetails.Content) == '') {
					abp.message.error("请完善公告信息!");
					return;
				}
				if (!vm.islook) {
					var notice = {
						PageContent: vm.noticeDetails.PageContent,
						Content: vm.noticeDetails.Content,
						Url: vm.noticeDetails.Url,
						Id: noticeid
					};
					noticeService.createNotice(notice).then(function (result) {
						abp.notify.info(app.localize('保存成功'));
						window.location.href = "/default.html#!/NoticeListPro";
					});
				}
			};


			vm.cancel = function () {
				if (backpage != null)
					window.location.href = "/default.html#!/Notice";
			};

			var ue = UE.getEditor('editor', {
				toolleipi: true,//是否显示，设计器的 toolbars
				textarea: 'design_content',
				//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
				toolbars: [[
					'source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat', '|', 'forecolor', 'insertorderedlist', 'insertunorderedlist', '|', 'fontfamily', 'fontsize', '|', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'simpleupload', 'horizontal', 'spechars', 'wordimage', 'visualareaiframe', '|', 'inserttable', 'deletetable', 'mergecells', 'splittocells']],
				//focus时自动清空初始化时的内容
				//autoClearinitialContent:true,
				//关闭字数统计
				wordCount: true,
				//关闭elementPath
				elementPathEnabled: false,
				enableAutoSave: false,//不启用自动保存
				topOffset: 201,
				autoHeightEnabled: false,//不允许自动增加高度
				scaleEnabled: true,//是否允许拉长升高
				enableContextMenu: false,//是否启用右键菜单
				//默认的编辑区域高度
				initialFrameHeight: 344
				//更多其他参数，请参考ueditor.config.js中的配置项
			});
		}
	]);
})();