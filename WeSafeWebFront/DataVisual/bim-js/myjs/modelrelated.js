function addBaseModel(modelname) {
    createModelobj(modelname);
}
var basicStart=/^basic.*$/
function addMesh(object) {
	if(object.type == "Mesh") {
		if(basicStart.test(object.name)){
			//对名字为basic的物体，更换材质
			var m=new THREE.MeshBasicMaterial();
			m.map=object.material.map;
            m.size=THREE.DoubleSide;
            object.material=m;
		}
		objects.push(object);
	} else {
		for(var i = 0; i < object.children.length; i++) {
			addMesh(object.children[i]);
		}
	}
}
var onProgress = function(xhr) {
	if(xhr.lengthComputable) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log(Math.round(percentComplete, 2) + '% downloaded');
	}
};
var onError = function(xhr) {};
var objSize=1.3;
function createModelobj(modelName) {
	//dae加载器
    var loader = new THREE.ColladaLoader();
    loader.load( '/DataVisual/bimmodel/'+modelName+'/'+modelName+'.dae', function ( collada ) {
        var avatar = collada.scene;
        scene.add( avatar );
        avatar.scale.set(objSize, objSize, objSize);
        avatar.updateMatrix();
        kinematics = collada.kinematics;
        addMesh(avatar);
    } );
}