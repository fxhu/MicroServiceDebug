var container;
var camera, controls, scene, renderer , dragControls;
var cameraPosition0={x:55,y:55,z:-55};
var objects = []; //可供交互的模型
var mapTypeObj=null;
var areaDetail=null;
var bimDetails=null;
var clock = new THREE.Clock();
function initBim(divId,callback) {
    //查看模式下样式调整
    if(GetUrlParam("use")=="view"){
        //隐藏绑定按钮
        $("#btn4").css("display","none");
        //展示下拉框
        var areaDropDown=new AreaDropDown(".topleft");
        areaDropDown.init(function(areaId){
        window.location.href= getAreaViewUrl(areaId);
        },GetUrlParam("id"))
        //展示汇总信息
        new AreaStatMNG().init(GetUrlParam("id"));
        //展示地图切换按钮
        new MapTypeSwitch(".topleft3").init("3D");
    }
    //获取模型信息
    var areaId=GetUrlParam("id");
    var bimModelId=null;
    $.ajax({
        type: "get",
        url: authorityHost+"visualarea/getareainfo?id="+areaId,
        async:false,
        success: function (data)
        {
            areaDetail=data;
            if(areaDetail.areaType==3){
                //若本身是building级别，则模型Id需要取父区域的
                var parentAreaInfo=getParentAreaInfoByChildId(areaId);
                bimModelId=parentAreaInfo.mapID;
			}else if(areaDetail.areaType==4){
            	//本身就是area级别
                bimModelId=data.mapID;
			}else{
                $("#tips").html("当前地图级别无bim模型");
                return;
            }
            initScene(divId);
            addBaseModel(bimModelId);
            //初始化业务数据
            mapTypeObj=new MapDefine();
            bimDetails=mapTypeObj.getObjFromParentById(mapTypeObj.getMapTypeObjById("3D").maps,bimModelId).models;
            //1、加载图标
            for(var i in bimDetails){
                var v=bimDetails[i];
                createSpriteText(v.markerCoor.x,v.markerCoor.y,v.markerCoor.z,v.name,{draggable:false});
            }
            //2、加载左侧按钮
            if(areaDetail.areaType==4){//area级别
            }else if(areaDetail.areaType==3){//building级别
                addBuildingBtnsAndBuildingDropDown();
            }
            if(callback&&typeof callback =="function"){
                callback();
            }
        }
    });
}
function initScene(divId){
    container = document.getElementById(divId);
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xbdbdbd);
    scene.background = new THREE.Color(0xdadce2);
    //scene.background =new THREE.TextureLoader().load( "image/scene_back.jpg" );
    //加载相机
    camera = new THREE.PerspectiveCamera(45, container.clientWidth/ container.clientHeight, 1, 10000);
    camera.position.y = cameraPosition0.y;
    camera.position.x = cameraPosition0.x;
    camera.position.z = cameraPosition0.z;
    camera.lookAt(0,0,0);

    //加载光
    scene.add(new THREE.AmbientLight(0xffffff,1.4));
    // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3);
    // directionalLight.castShadow=false;
    // scene.add( directionalLight );
    /*var pointLight=new THREE.PointLight(0xffffff,0.2);
    pointLight.castShadow=false;
    scene.add( pointLight );*/

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth,container.clientHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera,container);
    controls.rotateSpeed = 0.25;
    controls.zoomSpeed = 0.6;
    controls.panSpeed = 0.1;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    //添加控制：模型抓取拖动。ps：修改了源码，只能选取，不能拖动
    dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function(event) {
        controls.enabled = false;
    });
    dragControls.addEventListener('dragend', function(event) {
        controls.enabled = true;
    });
    window.addEventListener('resize', onWindowResize, false);
    animate();
}
function animate() {
	requestAnimationFrame(animate);
    TWEEN.update();
	render();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(container.clientWidth,container.clientHeight);
}

function render() {
	controls.update();
	renderer.render(scene, camera);
}
function addBuildingBtnsAndBuildingDropDown(){
	var data=bimDetails;
    var btnHtml="";
    var buildingDropDownHtml='';
    btnHtml+='<button class="btn btn-primary btn-md" >楼栋</button>';
    var use=GetUrlParam("use");
    //区域编辑（绑定）模式
    if(use=="areaedit"){
		for(var i in data){
			if(areaDetail.modelId!=null&&areaDetail.modelId==data[i].id){
				var s='<button class="btn btn-success btn-md" id="'+data[i].id+'" onclick="clickBuilding('+data[i].markerCoor.x+','+data[i].markerCoor.y+','+data[i].markerCoor.z+',\''+data[i].id+'\')" >'+data[i].name+'</button>';
				btnHtml+=s;
			}else{
				var s='<button class="btn btn-default btn-md" id="'+data[i].id+'" onclick="clickBuilding('+data[i].markerCoor.x+','+data[i].markerCoor.y+','+data[i].markerCoor.z+',\''+data[i].id+'\')" >'+data[i].name+'</button>';
				btnHtml+=s;
			}
            buildingDropDownHtml+="<option value='"+data[i].id+"'>"+data[i].name+"</option>";
		}
		btnHtml+='<button class="btn btn-primary btn-md" onclick="resetAll()">视角<br>重置</button>';
    }
    //bim展示模式
    if(use=="show"){
        for(var i in data){
			var s='<button class="btn btn-default btn-md" id="'+data[i].id+'" onclick="clickBuilding('+data[i].markerCoor.x+','+data[i].markerCoor.y+','+data[i].markerCoor.z+',\''+data[i].id+'\')" >'+data[i].name+'</button>';
			btnHtml+=s;
        }
        btnHtml+='<button class="btn btn-primary btn-md" onclick="resetAll()">视角<br>重置</button>';
	}
    $("#buildingBtns").html(btnHtml);
    if(buildingDropDownHtml!=''){
        $("#bimChildBuilding").show();
        $("#bimChildBuilding").html(buildingDropDownHtml);
    }
}
var currentClickBuildingId=null;
function clickBuilding(x,y,z,bimBuildingId){
    moveToPosition(x,y,z);
}
function bindBimBuildingToBuilding(){
	if(currentClickBuildingId){
        var r=SaveModelId(GetUrlParam("id"),currentClickBuildingId);
        if(r=="OK"){
            $("#saveResult").html("绑定成功");
            setTimeout('$("#saveResult").html("")', 2000);
            $("#buildingBtns").find(".btn-success").removeClass("btn-success").addClass("btn-default");
            $("#"+currentClickBuildingId).removeClass("btn-default").addClass("btn-success");
        }else{
            $("#errorResult").html("绑定失败");
            setTimeout('$("#errorResult").html("")', 2000);
		}
        currentClickBuildingId=null;
    }else{
        $("#errorResult").html("请先选择楼栋，再执行绑定操作");
        setTimeout('$("#errorResult").html("")', 2000);
	}
}
function signClickBimBuilding(){
    $("#bimChildBuilding").val();
    currentClickBuildingId=$("#bimChildBuilding").val();
}
function buildingAfterClick(buildingId){
    console.log("触发了楼栋点击方法，楼栋id为："+buildingId);

    var childAreas=[];
    $.ajax({
        type: "get",
        url: authorityHost+"VisualArea/AreaTree?id="+GetUrlParam("id"),
        async:false,
        success: function (data)
        {
            childAreas=data;
        }
    });
    var areaId="";
    for(var i=0;i<childAreas.length;i++){
        if(childAreas[i].modelId==buildingId){
            areaId=childAreas[i].id;
            break;
        }
    }
    if(areaId==""){
        return;
    }
    //打开查看详情面板
    new AreaStatMNG().init(areaId);
}
function MapDefine(){
	var mapDefineObj=null;
    $.ajax({
        type: "get",
        url: "/DataVisual/MapDefine.json",
        async:false,
        success: function (data)
        {
            mapDefineObj=data;
        }
    });
    function getObjFromParentById(parent,id){
        for(var i in parent){
            if(parent[i].id==id){
                return parent[i];
            }
        }
        return null;
	}
	this.getMapTypeObjById=function(id){
		return getObjFromParentById(mapDefineObj,id);
	}
	this.getObjFromParentById=getObjFromParentById;
    this.mapDefineObj=mapDefineObj;
    return this;
}
