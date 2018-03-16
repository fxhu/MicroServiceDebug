define(['./scene',"exports"], function (scene1,exports) {
    var scene = scene1;
    var images;
    var view;
    var KineticMap = {};
    var divId;

    var iw;
    var ih;

    function init(_divId,_images,_floor) {
        divId=_divId;
        var layer0Width=$("#"+_divId).width(); //设置当前iframe所占宽高比
        var layer0Heigth=$("#"+_divId).height();
        iw=$("#"+divId).width()/1920;
        ih=$("#"+divId).height()/1080;
        images=_images;
        _floor=_floor?_floor:1;
        //加载资产模板文件
        var CachedTemplate = null;
        if (CachedTemplate == null) {
            $.ajax({
                type: "get",
                url: "VisualTemplate.json",
                async: false,
                success: function (data) {
                    CachedTemplate = data;
                }
            });
        }
        //从资产模板文件中解析src，common.js-497line
        for (var i in CachedTemplate) {
            images.push({id: CachedTemplate[i].name + "_icon", src: CachedTemplate[i].icon});
            images.push({id: CachedTemplate[i].name + "_icon_warn", src: CachedTemplate[i].icon_warn});
            images.push({id: CachedTemplate[i].name + "_icon_broken", src: CachedTemplate[i].icon_broken});
        }
        //图形交互层（容器），用于存放各种图形gragh
        var layerGraph = {
            layerProp: {
                id: "layerGragh",
                name: "layer",
                x: 0, //x和y是相对于div的左上角的坐标
                y: 0,
                width: layer0Width,
                height: layer0Width,
                visible: true,
                clearBeforeDraw: true
            }
        };
        //底图图层定义，类似于地图的底图
        var layerLast = {
            layerProp: {
                id: "layerBottom",
                name: "layer",
                x: 0,
                y: 0,
                width: layer0Width,
                height: layer0Width,
                visible: true,
                clearBeforeDraw: true
            },
            graphModels: [
                {
                    typeName: "image",
                    shapeProp: {
                        id: "bottomImage",
                        name: "",
                        x: 0,
                        y: 0,
                        // width: $("#"+_divId).width(),
                        // height: $("#"+_divId).height(),
                        width: layer0Width,
                        height: layer0Heigth,
                        srcId: _floor//底图图片id
                    }
                }]
        }
        //div的id
        //divId = "container";//实际项目中必须传入
        var stageModel = {
            stageProp: {
                container: divId, //<div>的id
                width: layer0Width,
                height: layer0Heigth
            },
            layerModels: [
                layerLast,//底图层
                layerGraph//图元交互层
            ]
        };

        dataTable = [{id: 'aa', value: 1}]; //绑定的数据，每次从这里取值展示，根据项目实际情况修改
        try {
            view = new scene.View(stageModel, dataTable, images);
        }catch(e){
            alert("请先设置层号");
        }
        $(window).resize(function(e){
            fillDivToWindow(divId);
        })
        view.draggable(true);
        view.draw();
        return view;
    }

    //根据id查找对应的image
    function getImageJsonById(id) {
        for (var i in images) {
            if (images[i].id == id) {
                return images[i];
            }
        }
        console.log("查无此image")
    }

    //切换楼层,会清除底层所有的覆盖物
    function changeFloorByFloorNum(floorNum) {
        view.children[0].destroyChildren();
        var imageObj = getImageJsonById(floorNum).image;
        var graph = view.children[0].getGraphbyId("buttomImage");
        if (graph == null) {
            var prop = {
                typeName: "image",
                shapeProp: {
                    id: "bottomImage",
                    name: "",
                    x: 0,
                    y: 0,
                    width: $("#"+divId).width(),// width和height需要根据底图大小进行修改,并考虑容器div大小
                    height: $("#"+divId).height(),
                    srcId: floorNum//底图图片路径id
                }
            }
            graph = scene.GraphFactory.create(prop, view, view.children[0]);
            view.children[0].addGraph(graph);
            view.draw();
        }else {
            graph.setAttr("image", imageObj);
            graph.setAttr("height", imageObj.height);
            graph.setAttr("width", imageObj.width);
            view.draw();
        }
    }
    function getPopWindow(t){
        if (t.assetTemplate.popWindow.showType=="map") {
            var pop = t.assetTemplate.popWindow;
            t.on("click", function (evt) {
                evt.cancelBubble = true;
                this.rootView.popWnd = createPopWindow(t);
                this.rootView.popWnd.style.width = pop.width + "px";
                this.rootView.popWnd.style.height = pop.height + "px";
                var p=scene.Util.calPopWndPos(t,this.rootView.popWnd);
                this.rootView.popWnd.style.left = p.x;
                this.rootView.popWnd.style.top = p.y;
                // this.rootView.popWnd.style.left = this.getAbsolutePosition().x - pop.width / 2 + this.getWidth() / 2 + "px";
                // this.rootView.popWnd.style.top = this.getAbsolutePosition().y - pop.height - 50 + "px";

                var container = this.rootView.getAttr("container");
                var parent = container.parentElement;
                parent.insertBefore(this.rootView.popWnd, container);

                //关联当前图元
                this.rootView.popWnd.ghObj = evt.target;
            });
        }
    }
    function createPopWindow(t) {
        var popwindow=document.getElementById("popWind");
        if(popwindow){
            popwindow.innerHTML = '<input id="closebutton" type="button" value="✖" class="close-button"><span class="popmarker-bot" ></span><span class="popmarker-top" > </span>' +
                '<div id = "popWind-content" class="auto-refresh" ref-content="'+t.assetTemplate.popWindow.content+'" ' +
                ' ref-assestid="'+t.attrs.id+'" ></div>';
            var closebt = popwindow.firstChild;
            $(closebt).on("click", function () {
                var popwindow=document.getElementById("popWind");
                $(popwindow).hide();
            });
            $(popwindow).show();
        }else{
            var popWnd = document.createElement("div");
            popWnd.id = "popWind";
            popWnd.className = "popmarker";
            popWnd.style.display = "block";
            popWnd.style.position="absolute";
            popWnd.innerHTML = '<input id="closebutton" type="button" value="✖" class="close-button"><span class="popmarker-bot" ></span><span class="popmarker-top" > </span>' +
                '<div id = "popWind-content" class="auto-refresh" ref-content="'+t.assetTemplate.popWindow.content+'" ' +
                ' ref-assestid="'+t.attrs.id+'" ></div>';
            var closebt = popWnd.firstChild;
            $(closebt).on("click", function () {
                var popwindow=document.getElementById("popWind");
                $(popwindow).hide();
            });
            popwindow=popWnd;
        }
        return popwindow;
    }

    $(window).resize(function(e){
        iw=$("#"+divId).width()/1920;
        ih=$("#"+divId).height()/1080;
    })
    function simpleTransformCoor(x,y){
        return {x:iw*parseFloat(x),y:ih*parseFloat(y)};
    }
    function simpleReTransformCoor(x,y){
        return {x:x/iw,y:y/ih};
    }
    //输出的自定义函数
    KineticMap.init = init;
    KineticMap.getImageJsonById = getImageJsonById;
    KineticMap.changeFloorByFloorNum = changeFloorByFloorNum;
    KineticMap.getPopWindow = getPopWindow;
    KineticMap.simpleTransformCoor=simpleTransformCoor;
    KineticMap.simpleReTransformCoor=simpleReTransformCoor;

    exports.KineticMap=KineticMap;
    exports.scene=scene;
})