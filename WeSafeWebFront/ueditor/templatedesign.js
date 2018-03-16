/*
* 设计器私有的配置说明 
* 一
* UE.templateDesignUrl  插件路径
* 
* 二
*UE.getEditor('myFormDesign',{
*          toolleipi:true,//是否显示，设计器的清单 tool
*/
UE.templateDesignUrl = '/Plan/Template';

var templateDesign = {    
    init: function (editorObj, saveCallBack) {
        this.editorObj = editorObj;
        this.saveCallBack = saveCallBack;
    },
    exec: function (method) {
        this.editorObj.execCommand(method);
    },

    fnCheckForm: function (type) {
        if (this.editorObj.queryCommandState('source'))
            this.editorObj.execCommand('source');//切换到编辑模式才提交，否则有bug


        if (this.editorObj.hasContents()) {
            this.editorObj.sync();       //同步内容

            var type_value, formid, formeditor;
            if (typeof type !== 'undefined') {
                type_value = type;
            }
            this.saveCallBack();
        } else {
            alert('表单内容不能为空！')
            $('#submitbtn').button('reset');
            return false;
        }
    },

    fnReview: function () {
        if (this.editorObj.queryCommandState('source'))
            this.editorObj.execCommand('source');//切换到编辑模式才提交，否则有bug

        if (this.editorObj.hasContents()) {
            this.editorObj.sync();       //同步内容

            document.planDesign.target = "mywin";
            window.open('', 'mywin', "menubar=0,toolbar=0,status=0,resizable=1,left=0,top=0,scrollbars=1,width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight - 50) + "\"");
            document.planDesign.action = "/ueditor/temp_preview.html";
            document.planDesign.submit(); //提交表单
        } else {
            alert('表单内容不能为空！');
            return false;
        }
    }
};

UE.plugins['plan_template'] = function () {
    var me = this,thePlugins = 'plan_template';
    me.commands[thePlugins] = {
        execCommand:function () {
            var dialog = new UE.ui.Dialog({
                iframeUrl:'/Plan/template.html',
                name:thePlugins,
                editor:this,
                title: '预案模板',
                cssRules:"width:640px;height:380px;",
                buttons:[
                {
                    className:'edui-okbutton',
                    label:'确定',
                    onclick:function () {
                        dialog.close(true);
                    }
                }]
            });
            dialog.render();
            dialog.open();
        }
    };
};

UE.registerUI('btnplan_template',function(editor,uiName){
    if(!this.options.toolleipi)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                templateDesign.exec('plan_template');
                //templateDesign.fnCheckForm('save');
            } catch ( e ) {
                alert('打开模板异常');
            }
            
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"预案模板",
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
UE.registerUI('button_preview',function(editor,uiName){
    if(!this.options.toolleipi)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
            
                templateDesign.fnReview();
            } catch ( e ) {
                alert('templateDesign.fnReview 预览异常');
            }
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"预览",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -420px -19px;',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});

UE.registerUI('button_save',function(editor,uiName){
    if(!this.options.toolleipi)
    {
        return false;
    }
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName,{
        execCommand:function(){
            try {
                templateDesign.fnCheckForm('save');
            } catch ( e ) {
                alert('templateDesign.fnCheckForm("save") 保存异常');
            }
            
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name:uiName,
        //提示
        title:"保存预案",
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -481px -20px;',
        //点击时执行的命令
        onclick:function () {
            //这里可以不用执行命令,做你自己的操作也可
           editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
});
