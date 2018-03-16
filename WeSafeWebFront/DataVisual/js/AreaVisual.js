var _data=[];
var vueobj=null;
var curAreaObj=null;
var vueModel={
    displayName:"",
    canEditMap:false,
    extAttrs:[]
};
$(function () {
    $(window).resize(function(){setHeight();})
    setHeight();
    //加载区域列表
    loadAreas();
    //初始化属性绑定对象
    vueobj=new Vue({
        el: '#extraPanel',
        data: vueModel
    });
})
//加载扩展属性
function loadExtraPanel(data){
    curAreaObj=data;
    $("#curAreaLabel").html(data.fullName);
    
    //地图设置禁用
    if(curAreaObj.areaType<3){
        mapsetEnable(false);
        var obj=getBuildingAreaObj();
        //设置地图类型和地图Id
        setMapType(obj.mapType);
        setMapID(obj.mapID);
    }
    else{
        mapsetEnable(true);
        //设置地图类型和地图Id
        setMapType(data.mapType);
        setMapID(data.mapID);
    }
    vueModel.displayName=curAreaObj.displayName;
    vueModel.extAttrs.splice(0,vueModel.extAttrs.length);
    for(var i=0;i<curAreaObj.extAttrs.length;i++){
        vueModel.extAttrs.push(curAreaObj.extAttrs[i]);
    }
    //与默认扩展属性合并
    collapseExtra();
    //加载地图
    loadMap(true);
    //事件绑定
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        showAreaDropdown();
        if(e.target.innerHTML=="标记资产" && $('#ifm_pointedit').attr('src'))
        {
            $('#ifm_pointedit').attr('src', $('#ifm_pointedit').attr('src'));
        }
        else if(e.target.innerHTML=="标记区域" && $('#ifm_areaedit').attr('src'))
        {
            $('#ifm_areaedit').attr('src', $('#ifm_areaedit').attr('src'));
        }
    })
}
function mapsetEnable(enable){
    if(enable){
        $("#ctlMapType").removeAttr("disabled").removeClass("gray");
        $("#ctlMapID").removeAttr("disabled").removeClass("gray");
        $("#btnSetMap").removeAttr("disabled");
    }
    else{
        $("#ctlMapType").attr("disabled","disabled").addClass("gray");
        $("#ctlMapID").attr("disabled","disabled").addClass("gray");
        $("#btnSetMap").attr("disabled","disabled");
    }
}
//扩展属性合并
var extraDefineModel=null;
function collapseExtra()
{
    if(extraDefineModel==null)
    {
        $.ajax({
            type: "get",
            url: "/DataVisual/DefaultExtAttr.json",
            async:false,
            success: function (data) 
            {
                extraDefineModel=data;
            }
        });
    }
    var attrs=[];
    if(curAreaObj!=null){
        if(curAreaObj.areaType==4){
            attrs=extraDefineModel["park"];
        }
        else if(curAreaObj.areaType==3){
            attrs=extraDefineModel["building"];
        }
        else if(curAreaObj.areaType==2){
            attrs=extraDefineModel["floor"];
        }
        else if(curAreaObj.areaType==1){
            attrs=extraDefineModel["area"];
        }
    }
    //与目标属性合并
    for(var i=0;i<attrs.length;i++){
        var find=false;
        for(var j=0;j<vueModel.extAttrs.length;j++)
        {
            if(vueModel.extAttrs[j].name==attrs[i].name){
                find=true;
                break;
            }
        }
        if(!find)
        {
            vueModel.extAttrs.push({
                name:attrs[i].name,
                value:attrs[i].value
            });
        }
    }
}
//地图类型切换
function onMapTypeChange(){
    //重新加载
    setMapID($("#ctlMapType").val());
    
}
//地图Id切换
function onMapIDChange(){

    
}
function getBuildingAreaObj(code){
    if(code==null){
        code=curAreaObj.code;
    }
    for(var i=0;i<_data.length;i++){
        if(_data[i].areaType=="3" && code.indexOf(_data[i].code)==0){
            return _data[i];
            break;
        }
    }
    return curAreaObj;
}
function getParentAreaObj(obj)
{
    if(obj==null){
        obj=curAreaObj;
    }
    for(var i=0;i<_data.length;i++){
        if(obj.parentId==_data[i].id){
            return _data[i];
        }
    }
    return obj;
}
function showAreaDropdown(){
    $("#selChildArea").css("display","none");
    $("#myTab li").each(function(){
        if($(this).hasClass("active") && $(this).text()=="标记区域" && !$(this).is(":hidden"))
        {
            var html=[];
            var childAreas=getChildAreas();
            for(var i=0;i<childAreas.length;i++){
                html.push("<option value='"+childAreas[i].id+"'>"+childAreas[i].displayName+"</option>");
            }
            $("#selChildArea").empty().append(html.join("")).css("display","");
            
            return false;
        }
    })
}
function jumptoAreaEdit(val){
    if(val==null){
        val=$("#selChildArea").val();
    }
    if(curAreaEditUrl!=""){
        $("#ifm_areaedit").attr("src",curAreaEditUrl.replace("{id}",val));
    }
}
//地图切换
var curAreaEditUrl="";
function loadMap(refresh)
{
    $('#myTab a[href="#pointedit"]').css("display","none");
    $('#myTab a[href="#areaedit"]').css("display","none");
    $("#selChildArea").css("display","none");
    var obj=getMapDefineObj();
    if(obj==null)
    {
        return;
    }
    showAreaDropdown();
    //找到对应的url
    var pointEditUrl=getEditUrlByMapType(obj,"pointediturl");
    var areaEditUrl=getEditUrlByMapType(obj,"areaediturl");
     //计算出默认定位的页签
    var locateTable="";
    curAreaEditUrl="";
    if(pointEditUrl!="")
    {
        locateTable="pointedit";
        $('#myTab a[href="#pointedit"]').css("display","");
        $("#ifm_pointedit").attr("src",pointEditUrl.replace("{id}",curAreaObj.id));
    }
    if(areaEditUrl!="")
    {
        var childAreas=getChildAreas();
        if(childAreas.length>0)
        {
            locateTable="areaedit";
            $('#myTab a[href="#areaedit"]').css("display","");
            curAreaEditUrl=areaEditUrl;
            jumptoAreaEdit(childAreas[0].id);
        }
        
    }
    //定位
    if(locateTable==""){
        locateTable="mapset";
    }

    if(refresh){
        $('#myTab a[href="#'+locateTable+'"]').tab('show') 
    }
}
function getChildAreas(id)
{
    if(id==null){
        id=curAreaObj.id;
    }
    var result=[];
    for(var i=0;i<_data.length;i++){
        if(_data[i].parentId==id){
            result.push(_data[i]);
        }
    }
    return result;
}
function maxWindow()
{
    $btn=$("#btnMaxWindow");
    if($btn.text()=="最大化")
    {
        $("#mdLeft").addClass("hide");
        $("#mapIframe").removeClass("col-md-10").addClass("col-md-12");
        $btn.html("恢复");
    }
    else
    {
        $("#mdLeft").removeClass("hide");
        $("#mapIframe").removeClass("col-md-12").addClass("col-md-10");
        $btn.html("最大化");
    }
}
function getEditUrlByMapType(mapDefineObj,editType){
    var url= mapDefineObj[editType+"_"+curAreaObj.areaType];
    if(url){
        return url;
    }
    else{
        url= mapDefineObj[editType];
        if(url){
            return url;
        }else{
            return "";
        }
    }
}
function getMapDefineObj(curobj){
    if(curobj==null){
        curobj=curAreaObj;
    }
    //找到当前区域对应的地图类型
    var mapType="";
    if(curobj.areaType>2){
        mapType=curobj.mapType;
        if(mapType=="" || mapType==null)
        {
            showMsg("请设置"+curobj.fullName+"的地图类型！");
            return null;
        }
    }
    else{
        for(var i=0;i<_data.length;i++){
            if(_data[i].areaType=="3" && curobj.code.indexOf(_data[i].code)==0){
                mapType=_data[i].mapType;
                if(mapType=="" || mapType==null)
                {
                    showMsg("请设置"+_data[i].fullName+"的地图类型！");
                    return null;
                }
                break;
            }
        }
    }
    //找到对应的地图定义
    return $(getMapDefine()).map(function(){
        if(this.id==mapType){return this;}
    }).get()[0];
}
function showMsg(txt)
{
    var txt="<h3>"+txt+"</h3>";
    $("#ifm_areaedit")[0].contentWindow.document.write(txt);
    $("#ifm_areaedit")[0].contentWindow.document.close();
    $("#ifm_pointedit")[0].contentWindow.document.write(txt);
    $("#ifm_pointedit")[0].contentWindow.document.close();
}
//设置地图类型
function setMapType(val){
    var html=$(getMapDefine()).map(function(){
        return "<option value='"+this.id+"' "+ (val==this.id?"selected":"") +" >"+this.name+"</option>"
    }).get();
    $("#ctlMapType").empty().append("<option></option>").append(html.join(""));
}
function setMapID(val)
{
    var selectedMapType=$("#ctlMapType").val();
    var mapDefine=getMapDefine();
    //找到当前类型下定义的地图id
    var maps=[];
    for(var i=0;i<mapDefine.length;i++){
        if(mapDefine[i].id==selectedMapType)
        {
            maps=mapDefine[i].maps;
        }
    }
    var html=$(maps).map(function(){
        return "<option value='"+this.id+"' "+ (val==this.id?"selected":"") +" >"+this.name+"</option>"
    }).get();
    $("#ctlMapID").empty().append("<option></option>").append(html.join(""));
}
var mapDefineObj=null;
function getMapDefine()
{
    if(mapDefineObj==null)
    {
        $.ajax({
            type: "get",
            url: "/DataVisual/MapDefine.json",
            async:false,
            success: function (data) 
            {
                mapDefineObj=data;
            }
        });
    }
    return mapDefineObj;
}
function loadAreas(){
    $.ajax({
        type: "get",
        url: authorityHost+"VisualArea/AreaTree",
        success: function (treeData) 
        {
            _data=treeData;
            var t= $(treeData).map(function(){
                var level=(this.code.length-this.code.replace(/\./g,"").length);
                var icon="";
                return {
                    id: this.id,
                    parent: this.parentId ? this.parentId : '#',
                    text: this.name,
                    state: {"opened" :level<1},
                    type:"icon"+level
                };
               
            }).get();
            $('#container').jstree({
                'core': {
                    data: t,
                    multiple: false
                },
                types: 
                {
                    "icon0": {
                        "icon": "glyphicon glyphicon-home yellow"
                    },
                    "icon1": {
                        "icon": "glyphicon glyphicon-tree-deciduous yellow"
                    },
                    "icon2": {
                        "icon": "glyphicon glyphicon-list-alt yellow"
                    },
                    "icon3":{
                        "icon": "glyphicon glyphicon-tag yellow"
                    }
                },
                plugins: ["wholerow","search", "types"]
            }).on('changed.jstree', function (e, data) {
                //已选Id
                var selectedId=data.selected[0];
                for(var i=0;i<_data.length;i++){
                    if(_data[i].id==selectedId)
                    {
                        //加载扩展属性panel
                        $("#myTab").css("display","");
                        loadExtraPanel(_data[i]);
                        return;
                    }
                }
            });
            showMsg("请选择一个区域！")
        }
    });
}
function setHeight(){
    $("#mapIframe").css("height", $(window).height()-5);
    $("#leftPanel").css("height", $(window).height());
    $(".ifmContent").css("height",$(window).height()-43)
}
function closeSelf(){
    $(".rightbottom").addClass("hide");
}
function dataRefresh()
{
    //重新刷新数据
    $.ajax({
        type: "get",
        url: authorityHost+"VisualArea/AreaTree",
        success: function (treeData) 
        {
            _data=treeData;
            //重新加载对应的地图
            for(var i=0;i<_data.length;i++){
                if(curAreaObj.id==_data[i].id){
                    curAreaObj=_data[i];
                }
            }
            loadMap(false);
        }
    });
}
function saveMapInfo()
{
    $.ajax({
        type: "post",
        url: authorityHost+"VisualArea/SaveAreaMapInfo",
        data:{
            Id:curAreaObj.id,
            MapType:$("#ctlMapType").val(),
            MapID:$("#ctlMapID").val()
        },
        success: function (info) {
            if(info=="OK"){
                $("#resultLabel1").html("保存成功").show().fadeOut('slow');
                dataRefresh();
            }
            else
            {
                $("#resultLabel1").html(info);
            }
        },
        error: function (err) {
            $("#resultLabel1").html(err.statusText);
        }
    });
}
//保存
function saveExtAttrInfo(){
    $.ajax({
        type: "post",
        url: authorityHost+"VisualArea/SaveAreaExtAttr",
        data:{
            Id:curAreaObj.id,
            ExtAttrStr:$.toJSON(vueModel.extAttrs)
        },
        success: function (info) {
            if(info.result){
                $("#resultLabel2").html("保存成功").show().fadeOut('slow');
                dataRefresh();
            }
            else
            {
                $("#resultLabel2").html(info);
            }
        },
        error: function (err) {
            $("#resultLabel2").html(err.statusText);
        }
    });
}