/*
* 设计器私有的配置说明 
* 一
* UE.templateDesignUrl  插件路径
* 
* 二
*UE.getEditor('myFormDesign',{
*          toolleipi:true,//是否显示，设计器的清单 tool
*/
UE.templateDesignUrl = '/ueditor/custom/VisualAreaIframe';

var templateDesign = {    
    init: function (editorObj) {
        this.editorObj = editorObj;
    },
    exec: function (method) {
        this.editorObj.execCommand(method);
    }
};

UE.plugins['visualareaiframe'] = function () {
    var me = this, thePlugins = 'visualareaiframe';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:'/ueditor/custom/VisualAreaIframe.html',
                name:thePlugins,
                editor:this,
                title: '区域地图',
                cssRules:"width:700px;height:580px;",
                buttons: [
                    {
                        className: 'edui-okbutton',
                        label: '确定',
                        onclick: function () {
                            dialog.close(true);
                        }
                    },
                    {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function () {
                            dialog.close(false);
                        }
                    }]
            });
            dialog.render();
            dialog.open();
        }
    };
};

UE.registerUI('btnvisualarea', function (editor, uiName) {    
    if(!this.options.toolleipi)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {               
                templateDesign.exec('visualareaiframe');
                //templateDesign.fnCheckForm('save');
            } catch (e) {
                alert('打开模板异常');
            }
            
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"插入可视化区域",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -339px -40px;',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});