//创建标记
var signSize=undefined;
function createSpriteText(x, y, z,fileText,options) {
	//options={imgSrc,signSize,draggable,afterClickFun}
    signSize=options&&options.signSize?options.signSize:2;
    //先用画布将文字画出
	var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var img = new Image();
    img.onload = function() {
        /**
		 * context.drawImage(img,x,y,width,height);
		 * img  所要绘制的图像元素
		 * x    该元素绘制的起点x坐标 （即img左上角x坐标）
		 * y    该元素绘制的起点y坐标 （即img左上角y坐标）
		 * width  所要绘制该元素的最长宽度（即画布上允许图像出现的最长宽度）根据比例缩放
		 * height 所要绘制该元素的最大高度（即画布上允许图像出现的最大高度）根据比例缩放
		 */
		canvas.width=img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        context.fillStyle = "#000000";
        context.font = img.width/4 + "px Arial";
        context.lineWidth = 3;
        context.textAlign = "center";
        //context.textAlign = "start";
        //(string,x,y,限制长度);
        context.fillText(fileText, img.width/2, 7*img.height/12, 300);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
		//使用Sprite显示文字
		var material = new THREE.SpriteMaterial({
			map: texture,
			transparent: true
		});

        var textObj = new THREE.Sprite(material);
        textObj.position.set(x, y, z);
        textObj.draggable=options&&options.draggable;
        textObj.afterClickFun=options&&options.afterClickFun?options.afterClickFun:null;
        textObj.scale.set(signSize, signSize, signSize);

        scene.add(textObj);
        objects.push(textObj);
    }
    img.src = options&&options.imgSrc?options.imgSrc:"/datavisual/images/bim-images/xia.png";
}

//标签上方显示详细信息

var details=[];
var detailsSize=6;
//文字起始位置
var spx = 20;
var spy = 40;
var spxstep = 200;
var spystep = 55;

var dpx = spx + spxstep;
var dpy = spy;
var dpxstep = 300;
var dpystep = 55;
function setModelDetails(x,y,z,d,jsonString,permanent){
	//文字起始位置
	spx = 20;
	spy = 40;
	spxstep = 200;
	spystep = 55;
	
	dpx = spx + spxstep;
	dpy = spy;
	dpxstep = 300;
	dpystep = 55;

	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	var img = new Image();
	img.onload = function() {
		/**  
		 * context.drawImage(img,x,y,width,height);
		 * img  所要绘制的图像元素  
		 * x    该元素绘制的起点x坐标 （即img左上角x坐标）  
		 * y    该元素绘制的起点y坐标 （即img左上角y坐标）  
		 * width  所要绘制该元素的最长宽度（即画布上允许图像出现的最长宽度）根据比例缩放  
		 * height 所要绘制该元素的最大高度（即画布上允许图像出现的最大高度）根据比例缩放  
		 */
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0, img.width, img.height);
		ceshi(canvas,jsonString);
		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;

		//使用Sprite显示文字
		var material = new THREE.SpriteMaterial({
			map: texture,
			transparent: true
		});
		var textObj = new THREE.Sprite(material);
		textObj.name=jsonString.name+"details";
		textObj.scale.set(detailsSize, detailsSize, detailsSize);
		textObj.position.set(x,y,z);
		textObj.permanent=permanent;
		scene.add(textObj);
		details.push(textObj);
	}
	if(d=="down"){
        img.src = "/datavisual/images/bim-images/tanchukuangxia.png";
	}
}


var properties = ["名称", "创建时间"]; //对应的name，related,updateTime
function ceshi(bcanvas,jsonString) {

	//scene bgc #12293B
	var canvas = bcanvas;
	var context = canvas.getContext("2d");
	//	context.fillRect(4,80,180,30);
	//清除一块矩形区域context.clearRect(x,y,width,heigh);
	//context.clearRect(4, 4, canvas.width - 8, canvas.height - 8);

	context.fillStyle = "#000000";
	context.font = 70 + "px Arial";
	context.fillText(jsonString.name, spx + 5, spy + 35);
	makeDatagrid();
    context.fillStyle = "#000000";
    context.font = 45 + "px Arial";
    for(var i in jsonString){
        context.fillText( i+ ':    ' + jsonString[i], spx + 5, spy + 35);
        makeDatagrid();
	}

	function makeDatagrid() {
		spx += spxstep;
		spy += spystep;
		spx -= spxstep;

		dpx += dpxstep;
		dpy += dpystep;
		dpx -= dpxstep;
	};
}