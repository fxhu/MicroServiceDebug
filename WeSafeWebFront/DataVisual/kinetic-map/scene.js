var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./kinetic-map/kinetic.js"], function (require, exports) {
    exports.__esModule = true;
    //import "./jquery-1.10.2.js"
    var autoid = 1;
    var images;
    var dataTable;
    exports.Util = {
        // 根据node计算其弹出框的位置
        calPopWndPos: function (node, popWind) {
            var m = node.getAbsoluteTransform(top).getMatrix();
            var x = m[4] - Number(popWind.style.width.replace(/px/, "")) / 2 + node.getWidth() / 2 + "px";
            var y = m[5] - Number(popWind.style.height.replace(/px/, "")) - 50 + "px";
            return { x: x, y: y };
        }
    };
    function cloneObject(obj) {
        if (obj == null) {
            return null;
        }
        var o = obj.constructor === Array ? [] : {};
        for (var i in obj) {
            if (i === "image") {
                continue;
            }
            if (obj.hasOwnProperty(i)) {
                o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
            }
        }
        return o;
    }
    function findIndex(id, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return i;
            }
        }
        return -1;
    }
    function isExistLayer(id, layers) {
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].getId() === id) {
                return true;
            }
        }
        return false;
    }
    function calStartEndPoint(point1, point2, width) {
        var startPoint = { x: 0, y: 0 };
        var endPoint = { x: 0, y: 0 };
        var midX = (point1.x + point2.x) / 2; //中点X
        var midY = (point1.y + point2.y) / 2; //中点Y
        var dis = width / 2; //到中点距离
        //PointF startPoint = new PointF(0, 0);
        //PointF endPoint = new PointF(0, 0);
        //斜率k
        var k = (point2.x - point1.x) / (point1.y - point2.y);
        if (k < 100 && k > -100) {
            //线段垂直平分线 y = kx + bb;
            var bb = midY - k * midX;
            //到中点距离为dis的点的X值的方程 ax^2 + bx + c = 0
            var a = 1 + k * k;
            var b = -2 * midX + 2 * k * (bb - midY);
            var c = midX * midX + (bb - midY) * (bb - midY) - dis * dis;
            if (k > 0) {
                startPoint.x = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
                endPoint.x = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
            }
            else {
                startPoint.x = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
                endPoint.x = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
            }
            if (Math.abs(startPoint.x - endPoint.x) > 0.001) {
                startPoint.y = k * startPoint.x + bb;
                endPoint.y = k * endPoint.x + bb;
            }
            else {
                startPoint.x = midX + dis;
                endPoint.x = midX - dis;
                startPoint.y = midY;
                endPoint.y = midY;
            }
        }
        else {
            startPoint.x = midX;
            endPoint.x = midX;
            startPoint.y = midY + dis;
            endPoint.y = midY - dis;
        }
        return [startPoint, endPoint];
    }
    function findImg(images, srcId) {
        //var img = null;
        for (var i = 0; i < images.length; i++) {
            if (images[i].id === srcId) {
                var img = images[i];
                return img;
            }
        }
        return null;
    }
    function preLoad(imgsrcs) {
        for (var i = 0; i < imgsrcs.length; i++) {
            var img = new Image();
            img.src = imgsrcs[i].src;
            imgsrcs[i].image = img;
        }
    }
    var SceneModel = (function () {
        function SceneModel() {
        }
        return SceneModel;
    }());
    var ImageSrc = (function () {
        function ImageSrc() {
        }
        return ImageSrc;
    }());
    var DataPoint = (function () {
        function DataPoint() {
        }
        return DataPoint;
    }());
    var GraphEvent = (function () {
        function GraphEvent() {
        }
        return GraphEvent;
    }());
    var TweenModel = (function () {
        function TweenModel() {
        }
        return TweenModel;
    }());
    var AnimationModel = (function () {
        //todo: 待定
        function AnimationModel(config) {
            this.type = config.type;
            this.id = config.id;
            this.param = config.param;
        }
        //constructor(type, param) {
        //    this.type = type;
        //    this.id = "animModel-" + autoid++;
        //    this.param = param;
        //}
        AnimationModel.prototype.getId = function () {
            return this.id;
        };
        return AnimationModel;
    }());
    exports.AnimationModel = AnimationModel;
    var AbstractAnimParam = (function () {
        function AbstractAnimParam() {
        }
        return AbstractAnimParam;
    }());
    var BlinkParam = (function (_super) {
        __extends(BlinkParam, _super);
        function BlinkParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BlinkParam;
    }(AbstractAnimParam));
    var ConditionVisibleParam = (function (_super) {
        __extends(ConditionVisibleParam, _super);
        function ConditionVisibleParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ConditionVisibleParam;
    }(AbstractAnimParam));
    var TextLinkExpressParam = (function (_super) {
        __extends(TextLinkExpressParam, _super);
        function TextLinkExpressParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TextLinkExpressParam;
    }(AbstractAnimParam));
    var PropertyBindParam = (function (_super) {
        __extends(PropertyBindParam, _super);
        function PropertyBindParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PropertyBindParam;
    }(AbstractAnimParam));
    var TweenParam = (function (_super) {
        __extends(TweenParam, _super);
        function TweenParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TweenParam;
    }(AbstractAnimParam));
    var ShapeProp = (function () {
        function ShapeProp() {
        }
        return ShapeProp;
    }());
    var RectProp = (function (_super) {
        __extends(RectProp, _super);
        function RectProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RectProp;
    }(ShapeProp));
    var CircleProp = (function (_super) {
        __extends(CircleProp, _super);
        function CircleProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CircleProp;
    }(ShapeProp));
    var TextProp = (function (_super) {
        __extends(TextProp, _super);
        function TextProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TextProp;
    }(ShapeProp));
    var ImageProp = (function (_super) {
        __extends(ImageProp, _super);
        function ImageProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ImageProp;
    }(ShapeProp));
    var GifProp = (function (_super) {
        __extends(GifProp, _super);
        function GifProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GifProp;
    }(ShapeProp));
    var SvgProp = (function (_super) {
        __extends(SvgProp, _super);
        function SvgProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SvgProp;
    }(ShapeProp));
    var LineProp = (function (_super) {
        __extends(LineProp, _super);
        function LineProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LineProp;
    }(ShapeProp));
    var PipeProp = (function (_super) {
        __extends(PipeProp, _super);
        function PipeProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PipeProp;
    }(ShapeProp));
    var EllipseProp = (function (_super) {
        __extends(EllipseProp, _super);
        function EllipseProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EllipseProp;
    }(ShapeProp));
    var PieProp = (function (_super) {
        __extends(PieProp, _super);
        function PieProp() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.antiClockWise = false; //顺时针
            return _this;
        }
        return PieProp;
    }(ShapeProp));
    var GraphModel = (function () {
        function GraphModel() {
            this.animModels = [];
            //parent?: LayerModel;
            //getId() { return this.shapeProp.id; }
        }
        return GraphModel;
    }());
    var LayerProp = (function () {
        function LayerProp() {
            this.id = "layid-" + autoid++;
            this.name = "layName-" + autoid++;
            this.width = 100;
            this.height = 100;
            this.visible = true;
            this.clearBeforeDraw = true;
        }
        return LayerProp;
    }());
    var LayerModel = (function () {
        //parent?: ViewModel;
        function LayerModel() {
            this.layerProp = new LayerProp();
            this.graphModels = [];
        }
        return LayerModel;
    }());
    exports.LayerModel = LayerModel;
    var ViewModel = (function () {
        //parent?: string = "view";
        function ViewModel(prop) {
            this.stageProp = prop;
            this.layerModels = [];
        }
        return ViewModel;
    }());
    var StageViewModel = (function (_super) {
        __extends(StageViewModel, _super);
        function StageViewModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StageViewModel;
    }(ViewModel));
    //tween 动画实例
    var GraphTween /* extends Kinetic.Tween*/ = (function () {
        function GraphTween(graphobj) {
            var config = new Object();
            var tweenModel = graphobj.viewModel.tweenConfig;
            for (var prop in tweenModel.attrProp) {
                if (!tweenModel.attrProp.hasOwnProperty(prop))
                    continue;
                config[prop] = tweenModel.attrProp[prop];
            }
            config.duration = tweenModel.duration;
            config.node = graphobj.shape;
            this.tween = new Kinetic.Tween(config);
            this.graphObject = graphobj;
        }
        return GraphTween;
    }());
    //class GraphAnimation extends Kinetic.Animation {
    //    graphObject: GraphObject;
    //    constructor(func:(frame)=>any, layer:any) {
    //        super(func, layer);
    //    }
    //}
    //动画实例
    var AbsGraphAnimation = (function () {
        function AbsGraphAnimation(/*graph: GraphObject,*/ model, rootView) {
            //this.graphObject = graph;
            this.model = model;
            this.rootView = rootView;
            this.id = model.id;
            //this.relativeLayer = graph.shape.getLayer();
        }
        AbsGraphAnimation.prototype.exportModel = function () {
        };
        AbsGraphAnimation.prototype.play = function () {
        };
        AbsGraphAnimation.prototype.stop = function () {
        };
        AbsGraphAnimation.prototype.getId = function () {
            return this.id;
        };
        AbsGraphAnimation.prototype.setAttr = function (attr, val) {
            if (this.hasOwnProperty(attr))
                this[attr] = val;
        };
        AbsGraphAnimation.prototype.getAttr = function (attr) {
            if (this.hasOwnProperty(attr))
                return this[attr];
            return null;
        };
        return AbsGraphAnimation;
    }());
    var AnimtiaonFactroy = (function () {
        function AnimtiaonFactroy() {
        }
        AnimtiaonFactroy.create = function (model, rootView /*, graph?: GraphObject, */) {
            var type = model.type;
            switch (type) {
                case "闪烁":
                    return new BlinkAnimation(/*graph,*/ model, rootView);
                case "显示隐藏":
                    return new ConditionVisible(/*graph, */ model, rootView);
                case "文本表达式":
                    return new TextLinkExpress(/*graph,*/ model, rootView);
                case "属性绑定":
                    return new PropertyBind(model, rootView);
                case "Tween":
                    return new TweenPerform(model, rootView);
                default:
                    return null;
            }
        };
        return AnimtiaonFactroy;
    }());
    exports.AnimtiaonFactroy = AnimtiaonFactroy;
    var TweenPerform = (function (_super) {
        __extends(TweenPerform, _super);
        function TweenPerform(/*graphobj: GraphObject, */ model, rootView) {
            var _this = _super.call(this, /*graphobj, */ model, rootView) || this;
            var parms = model.param;
            _this.condition = parms.condition;
            _this.config = parms;
            return _this;
        }
        TweenPerform.prototype.play = function () {
            if (this.graphObject == null) {
                return;
            }
            this.config.node = this.graphObject;
            var relativeLayer = this.graphObject.getLayer();
            if (eval(this.condition)) {
                if (this.tween == null) {
                    this.tween = new Kinetic.Tween(this.config);
                    this.tween.originalAttr = cloneObject(this.graphObject.getAttrs()); // 存储图元原始状态
                    this.tween.onFinish = this.recovery;
                    this.tween.tpf = this;
                    //console.log("start" + test++);             
                    this.tween.play();
                }
            }
            else {
                this.stop();
            }
        };
        TweenPerform.prototype.recovery = function () {
            // 恢复图元
            //console.log("finish" + test++);
            var gh = this.node;
            gh.setAttrs(this.originalAttr);
            var relativeLayer = gh.getLayer();
            relativeLayer.draw();
            // 销毁成员tween
            this.tpf.tween = null;
            this.destroy();
        };
        TweenPerform.prototype.stop = function () {
            if (this.tween) {
                //todo: 恢复原始状态
                this.tween.finish();
                //this.tween.destroy();
            }
        };
        return TweenPerform;
    }(AbsGraphAnimation));
    exports.TweenPerform = TweenPerform;
    //属性绑定动画
    var PropertyBind = (function (_super) {
        __extends(PropertyBind, _super);
        function PropertyBind(/*graphobj: GraphObject, */ model, rootView) {
            var _this = _super.call(this, /*graphobj, */ model, rootView) || this;
            var parms = model.param;
            _this.condition = parms.condition;
            _this.propConfig = parms.propConfig;
            return _this;
        }
        PropertyBind.prototype.play = function () {
            //todo:克隆图元属性，保存原始状态，供stop恢复使用
            if (this.graphObject == null) {
                return;
            }
            //if (!this.graphObject.attrs.hasOwnProperty(this.propName)) // 不包含该属性
            //    return;
            var relativeLayer = this.graphObject.getLayer();
            if (eval(this.condition)) {
                for (var prop in this.propConfig) {
                    if (!this.graphObject.attrs.hasOwnProperty(prop))
                        continue;
                    switch (prop) {
                        case "srcId":
                            var gh = this.graphObject;
                            if (gh) {
                                var value = this.propConfig["srcId"];
                                if (gh.getAttr("srcId") !== value) {
                                    var item = findImg(images, value);
                                    if (item) {
                                        gh.setAttr("srcId", value);
                                        gh.setAttr("image", item.image);
                                        if (!isExistLayer(relativeLayer.getId(), this.rootView.layerHash)) {
                                            this.rootView.layerHash.push(relativeLayer);
                                        }
                                    }
                                }
                            }
                            break;
                        case "width":
                            gh = this.graphObject;
                            if (gh) {
                                var value = this.propConfig["width"];
                                if (gh.getAttr("width") !== value) {
                                    gh.setAttr("width", value);
                                    if (!isExistLayer(relativeLayer.getId(), this.rootView.layerHash)) {
                                        this.rootView.layerHash.push(relativeLayer);
                                    }
                                }
                            }
                            break;
                        case "height":
                            gh = this.graphObject;
                            if (gh) {
                                var value = this.propConfig["height"];
                                if (gh.getAttr("height") !== value) {
                                    gh.setAttr("height", value);
                                    if (!isExistLayer(relativeLayer.getId(), this.rootView.layerHash)) {
                                        this.rootView.layerHash.push(relativeLayer);
                                    }
                                }
                            }
                            break;
                        default:
                    }
                }
            }
            else {
            }
        };
        PropertyBind.prototype.exportModel = function () {
            this.model.id = this.id;
            this.model.type = "属性绑定";
            var param = new PropertyBindParam();
            param.condition = this.condition;
            param.propConfig = this.propConfig;
            this.model.param = param;
            return this.model;
        };
        return PropertyBind;
    }(AbsGraphAnimation));
    exports.PropertyBind = PropertyBind;
    //文本表达式
    var TextLinkExpress = (function (_super) {
        __extends(TextLinkExpress, _super);
        function TextLinkExpress(/*graphobj: GraphObject, */ model, rootView) {
            var _this = _super.call(this, /*graphobj, */ model, rootView) || this;
            var parms = model.param;
            _this.expression = parms.expression;
            return _this;
        }
        TextLinkExpress.prototype.play = function () {
            if (this.graphObject == null) {
                return;
            }
            var textNode = this.graphObject;
            if (textNode != null) {
                var ret = eval(this.expression);
                textNode.text(ret);
                var relativeLayer = this.graphObject.getLayer();
                if (!isExistLayer(relativeLayer.getId(), this.rootView.layerHash)) {
                    this.rootView.layerHash.push(relativeLayer);
                }
            }
        };
        TextLinkExpress.prototype.exportModel = function () {
            this.model.id = this.id;
            this.model.type = "文本表达式";
            var param = new TextLinkExpressParam();
            param.expression = this.expression;
            this.model.param = param;
            return this.model;
        };
        return TextLinkExpress;
    }(AbsGraphAnimation));
    exports.TextLinkExpress = TextLinkExpress;
    //显示隐藏
    var ConditionVisible = (function (_super) {
        __extends(ConditionVisible, _super);
        //private aa = 1;
        function ConditionVisible(/*graphobj: GraphObject,*/ model, rootView) {
            var _this = _super.call(this, /*graphobj,*/ model, rootView) || this;
            var params = model.param;
            _this.condition = params.condition;
            return _this;
        }
        ConditionVisible.prototype.play = function () {
            if (this.graphObject == null) {
                return;
            }
            //if (this.aa===1) {
            //    this.graphObject.shape.visible(true);
            //    this.aa = 0;
            //} else {
            //    this.graphObject.shape.visible(false);
            //    this.aa = 1;
            //}
            var relativeLayer = this.graphObject.getLayer();
            if (eval(this.condition)) {
                if (!this.graphObject.getAttr("visible")) {
                    this.graphObject.visible(true);
                    if (!isExistLayer(relativeLayer.getId(), this.rootView.layerHash)) {
                        this.rootView.layerHash.push(relativeLayer);
                    }
                }
            }
            else {
                if (this.graphObject.getAttr("visible")) {
                    this.graphObject.visible(false);
                    if (!isExistLayer(relativeLayer.getId(), this.rootView.layerHash)) {
                        this.rootView.layerHash.push(relativeLayer);
                    }
                }
            }
        };
        ConditionVisible.prototype.exportModel = function () {
            this.model.id = this.id;
            this.model.type = "显示隐藏";
            var param = new ConditionVisibleParam();
            param.condition = this.condition;
            this.model.param = param;
            return this.model;
        };
        return ConditionVisible;
    }(AbsGraphAnimation));
    exports.ConditionVisible = ConditionVisible;
    //闪烁
    var BlinkAnimation = (function (_super) {
        __extends(BlinkAnimation, _super);
        function BlinkAnimation(/*graphobj: GraphObject,*/ model, rootView) {
            var _this = _super.call(this, /*graphobj,*/ model, rootView) || this;
            var params = model.param;
            _this.condition = params.condition;
            if (params.elapse == undefined) {
                _this.elapse = 500;
            }
            else {
                _this.elapse = params.elapse;
            }
            return _this;
        }
        BlinkAnimation.prototype.play = function () {
            if (this.graphObject == null) {
                return;
            }
            var relativeLayer = this.graphObject.getLayer();
            if (eval(this.condition)) {
                if (!this.isStart) {
                    this.isStart = true;
                    this.lastblinkTime = new Date().getTime();
                    this.orgVisible = this.graphObject.isVisible();
                }
            }
            else {
                if (this.isStart)
                    this.stop();
            }
            if (this.isStart) {
                //var elapse = (<BlinkParam>(this.model.param)).elapse;
                var now = new Date().getTime();
                //console.log("-----1----  " + (this.test++) + "   now: " + now + "   last: " + this.lastblinkTime + "    diff: " + (now - this.lastblinkTime) );
                if (now - this.lastblinkTime > this.elapse) {
                    var visible = this.graphObject.isVisible();
                    this.graphObject.visible(!visible);
                    if (!isExistLayer(relativeLayer.getId(), this.rootView.layerHash)) {
                        this.rootView.layerHash.push(relativeLayer);
                    }
                    //console.log("-------2------" + (this.test1++));
                    this.lastblinkTime = new Date().getTime();
                }
            }
        };
        BlinkAnimation.prototype.stop = function () {
            var relativeLayer = this.graphObject.getLayer();
            this.isStart = false;
            this.graphObject.visible(this.orgVisible);
            if (!isExistLayer(relativeLayer.getId(), this.rootView.layerHash)) {
                this.rootView.layerHash.push(relativeLayer);
            }
        };
        BlinkAnimation.prototype.exportModel = function () {
            this.model.id = this.id;
            this.model.type = "闪烁";
            var param = new BlinkParam();
            param.condition = this.condition;
            param.elapse = this.elapse;
            this.model.param = param;
            return this.model;
        };
        return BlinkAnimation;
    }(AbsGraphAnimation));
    exports.BlinkAnimation = BlinkAnimation;
    var GraphRect = (function (_super) {
        __extends(GraphRect, _super);
        function GraphRect(model, rootView) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "rect";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            return _this;
        }
        GraphRect.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphRect.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphRect.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphRect.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphRect;
    }(Kinetic.Rect));
    var GraphCircle = (function (_super) {
        __extends(GraphCircle, _super);
        function GraphCircle(model, rootView) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "circle";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            return _this;
        }
        GraphCircle.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphCircle.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphCircle.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphCircle.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphCircle;
    }(Kinetic.Circle));
    var GraphText = (function (_super) {
        __extends(GraphText, _super);
        function GraphText(model, rootView) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "text";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            return _this;
        }
        GraphText.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphText.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphText.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphText.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphText;
    }(Kinetic.Text));
    var GraphImage = (function (_super) {
        __extends(GraphImage, _super);
        function GraphImage(model, rootView) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "image";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            return _this;
        }
        GraphImage.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphImage.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphImage.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphImage.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphImage;
    }(Kinetic.Image));
    var GraphGif = (function (_super) {
        __extends(GraphGif, _super);
        function GraphGif(model, rootView, relative) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "gif";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            _this.node = relative;
            return _this;
        }
        GraphGif.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphGif.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphGif.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphGif.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphGif;
    }(Kinetic.Shape));
    var GraphSVG = (function (_super) {
        __extends(GraphSVG, _super);
        function GraphSVG(model, rootView, relative) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "svg";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            _this.node = relative;
            return _this;
        }
        GraphSVG.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphSVG.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphSVG.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphSVG.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphSVG;
    }(Kinetic.Shape));
    var GraphLine = (function (_super) {
        __extends(GraphLine, _super);
        function GraphLine(model, rootView) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "line";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            return _this;
        }
        GraphLine.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphLine.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphLine.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphLine.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphLine;
    }(Kinetic.Line));
    var GraphEllipse = (function (_super) {
        __extends(GraphEllipse, _super);
        function GraphEllipse(model, rootView) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "ellipse";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            return _this;
        }
        GraphEllipse.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphEllipse.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphEllipse.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphEllipse.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphEllipse;
    }(Kinetic.Ellipse));
    var GraphPie = (function (_super) {
        __extends(GraphPie, _super);
        function GraphPie(model, rootView) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "pie";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            return _this;
        }
        GraphPie.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphPie.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphPie.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphPie.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphPie;
    }(Kinetic.Shape));
    var GraphPipe = (function (_super) {
        __extends(GraphPipe, _super);
        function GraphPipe(model, rootView) {
            var _this = _super.call(this, model.shapeProp) || this;
            _this.typeName = "pipe";
            _this.animations = [];
            _this.model = model;
            _this.rootView = rootView;
            return _this;
        }
        GraphPipe.prototype.exportModel = function () {
            //shapeProp
            this.model.shapeProp = new ShapeProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.model.shapeProp[i] = this.attrs[i];
                }
            }
            //animations
            this.model.animModels = [];
            for (var j = 0; j < this.animations.length; j++) {
                var animModel = this.animations[j].exportModel();
                this.model.animModels.push(animModel);
            }
            //todo:event
            return this.model;
        };
        GraphPipe.prototype.addAnimation = function (anim) {
            if (this.model.animModels == undefined)
                this.model.animModels = [];
            this.model.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphPipe.prototype.removeAllAnimations = function () {
            this.model.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphPipe.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.model.animModels);
            if (k !== -1)
                this.model.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphPipe;
    }(Kinetic.Shape));
    var GraphFactory = (function () {
        function GraphFactory() {
        }
        GraphFactory.create = function (model, rootView, layer) {
            var o;
            var config;
            switch (model.typeName) {
                case "rect":
                    o = new GraphRect(model, rootView);
                    break;
                case "circle":
                    o = new GraphCircle(model, rootView);
                    //if (layer) {
                    //    layer.add(o);
                    //}
                    break;
                case "text":
                    o = new GraphText(model, rootView);
                    //if (layer) {
                    //    layer.add(o);
                    //}
                    break;
                case "image":
                    config = model.shapeProp;
                    if (config != null) {
                        var imgSrc = findImg(images, config.srcId);
                        if (imgSrc != null) {
                            config.image = imgSrc.image;
                            if (!config.hasOwnProperty("width")) {
                                config.width = imgSrc.image.width;
                            }
                            if (!config.hasOwnProperty("height")) {
                                config.height = imgSrc.image.height;
                            }
                            o = new GraphImage(model, rootView);
                            if (layer) {
                                layer.add(o);
                            }
                        }
                        else {
                            //未进行预加载的图片必须传入layer参数
                            var imgObj = new Image();
                            imgObj.onload = function () {
                                config.image = imgObj;
                                if (!config.hasOwnProperty("width")) {
                                    config.width = imgObj.width;
                                }
                                if (!config.hasOwnProperty("height")) {
                                    config.height = imgObj.height;
                                }
                                o = new GraphImage(model, rootView);
                                layer.add(o);
                                layer.draw();
                            };
                            imgObj.src = config.src;
                        }
                    }
                    break;
                case "line":
                    o = new GraphLine(model, rootView);
                    //if (layer) {
                    //    layer.add(o);
                    //}
                    break;
                case "ellipse":
                    o = new GraphEllipse(model, rootView);
                    //if (layer) {
                    //    layer.add(o);
                    //}
                    break;
                case "pie":
                    config = model.shapeProp;
                    if (config != null) {
                        config.drawFunc = function (context) {
                            var ctx = context;
                            var r = 50;
                            ctx.beginPath();
                            ctx.translate(config.x, config.y);
                            ctx.scale(config.radius.x / r, config.radius.y / r);
                            ctx.moveTo(0, 0);
                            ctx.arc(0, 0, r, config.startAngle, config.endAngel, false);
                            ctx.closePath();
                            ctx.fillStrokeShape(this);
                        };
                        o = new GraphPie(model, rootView);
                        //if (layer) {
                        //    layer.add(o);
                        //}
                    }
                    //console.log(config.strokeWidth);
                    break;
                case "gif":
                    config = model.shapeProp;
                    if (config != null) {
                        //var div = rootView.getAttr("container");
                        //var myImage = new Image(config.width, config.height);
                        var div = document.getElementsByClassName("kineticjs-content")[0];
                        var myImage = document.createElement("img");
                        myImage.id = config.id;
                        myImage.src = config.src;
                        myImage.style.position = "absolute";
                        myImage.style.left = config.x;
                        myImage.style.top = config.y;
                        myImage.style.clip = "rect(" +
                            div.style.left +
                            "px," +
                            div.style.top +
                            "px," +
                            div.style.width +
                            "px," +
                            div.style.height +
                            "px)";
                        rootView.getAttr("container").appendChild(myImage);
                        config.imageElement = myImage;
                        config.drawFunc = function (context) {
                            var transform = this.getAbsoluteTransform(top).getMatrix();
                            //var pos = this.getAbsolutePosition();                        
                            //config.imageElement.style.left = pos.x + "px";
                            //config.imageElement.style.top = pos.y + "px";
                            //config.imageElement.style.width = transform[0] * config.width + "px";
                            //config.imageElement.style.height = transform[3] * config.height + "px";
                            //var imageLeft = pos.x;
                            //var imageTop = pos.y;
                            //var imageRight = transform[0] * config.width + pos.x;
                            //var imageBottom = transform[3] * config.height + pos.y;
                            var x = transform[4];
                            var y = transform[5];
                            config.imageElement.style.left = x + "px";
                            config.imageElement.style.top = y + "px";
                            config.imageElement.style.width = transform[0] * config.width + "px";
                            config.imageElement.style.height = transform[3] * config.height + "px";
                            var imageLeft = x;
                            var imageTop = y;
                            var imageRight = transform[0] * config.width + x;
                            var imageBottom = transform[3] * config.height + y;
                            var divLeft = 0;
                            var divTop = 0;
                            var divRight = divLeft + Number(div.style.width.substr(0, div.style.width.length - 2));
                            var divBottom = divTop + Number(div.style.height.substr(0, div.style.height.length - 2));
                            if (Math.max(imageLeft, divLeft) <= Math.min(imageRight, divRight)
                                && Math.max(imageTop, divTop) <= Math.min(imageBottom, divBottom)) {
                                //相交矩形坐标
                                var clipLeft = Math.max(imageLeft, divLeft);
                                var clipTop = Math.max(imageTop, divTop);
                                var clipRight = Math.min(imageRight, divRight);
                                var clipBottom = Math.min(imageBottom, divBottom);
                                //转换坐标系
                                clipLeft = clipLeft - (imageLeft - divLeft);
                                clipTop = clipTop - (imageTop - divTop);
                                clipRight = clipRight - (imageLeft - divLeft);
                                clipBottom = clipBottom - (imageTop - divTop);
                                config.imageElement.style.clip = "rect(" +
                                    clipTop +
                                    "px," +
                                    clipRight +
                                    "px," +
                                    clipBottom +
                                    "px," +
                                    clipLeft +
                                    "px)";
                                config.imageElement.style.visibility = "visible";
                            }
                            else {
                                config.imageElement.style.visibility = "hidden";
                            }
                        };
                        o = new GraphGif(model, rootView, o);
                    }
                    break;
                case "svg":
                    config = model.shapeProp;
                    if (config != null) {
                        //var div = rootView.getAttr("container");
                        var div = document.getElementsByClassName("kineticjs-content")[0];
                        var svg = document.createElement("embed");
                        svg.id = config.id;
                        svg.src = config.src;
                        svg.style.position = "absolute";
                        svg.style.left = config.x;
                        svg.style.top = config.y;
                        svg.style.clip = "rect(" +
                            div.style.left +
                            "px," +
                            div.style.top +
                            "px," +
                            div.style.width +
                            "px," +
                            div.style.height +
                            "px)";
                        var container = rootView.getAttr("container");
                        container.insertBefore(svg, container.firstChild);
                        config.svgElement = svg;
                        config.drawFunc = function (context) {
                            var transform = this.getAbsoluteTransform(top).getMatrix();
                            var x = transform[4];
                            var y = transform[5];
                            config.svgElement.style.left = x + "px";
                            config.svgElement.style.top = y + "px";
                            config.svgElement.style.width = transform[0] * config.width + "px";
                            config.svgElement.style.height = transform[3] * config.height + "px";
                            var imageLeft = x;
                            var imageTop = y;
                            var imageRight = transform[0] * config.width + x;
                            var imageBottom = transform[3] * config.height + y;
                            var divLeft = 0;
                            var divTop = 0;
                            var divRight = divLeft + Number(div.style.width.substr(0, div.style.width.length - 2));
                            var divBottom = divTop + Number(div.style.height.substr(0, div.style.height.length - 2));
                            if (Math.max(imageLeft, divLeft) <= Math.min(imageRight, divRight)
                                && Math.max(imageTop, divTop) <= Math.min(imageBottom, divBottom)) {
                                //相交矩形坐标
                                var clipLeft = Math.max(imageLeft, divLeft);
                                var clipTop = Math.max(imageTop, divTop);
                                var clipRight = Math.min(imageRight, divRight);
                                var clipBottom = Math.min(imageBottom, divBottom);
                                //转换坐标系
                                clipLeft = clipLeft - (imageLeft - divLeft);
                                clipTop = clipTop - (imageTop - divTop);
                                clipRight = clipRight - (imageLeft - divLeft);
                                clipBottom = clipBottom - (imageTop - divTop);
                                config.svgElement.style.clip = "rect(" +
                                    clipTop +
                                    "px," +
                                    clipRight +
                                    "px," +
                                    clipBottom +
                                    "px," +
                                    clipLeft +
                                    "px)";
                                config.svgElement.style.visibility = "visible";
                            }
                            else {
                                config.svgElement.style.visibility = "hidden";
                            }
                        };
                        o = new GraphSVG(model, rootView, o);
                    }
                    break;
                case "pipe":
                    config = model.shapeProp;
                    var that = this;
                    //console.log(config.strokeWidth);
                    if (config != null) {
                        config.drawFunc = function (context) {
                            var ctx = context._context;
                            //ctx.save();
                            var points = new Array();
                            for (var j = 0; j < config.points.length - 1; j = j + 2) {
                                var p1 = { x: config.points[j], y: config.points[j + 1] };
                                points.push(p1);
                            }
                            for (var i = 0; i < points.length - 1; i++) {
                                ctx.beginPath();
                                ctx.moveTo(points[i].x, points[i].y);
                                ctx.lineTo(points[i + 1].x, points[i + 1].y);
                                ctx.closePath();
                                var startEnd = calStartEndPoint(points[i], points[i + 1], config.strokeWidth);
                                var gnt = ctx.createLinearGradient(startEnd[0].x, startEnd[0].y, startEnd[1].x, startEnd[1].y);
                                if (config.colorStops) {
                                    // build color stops
                                    gnt.addColorStop(0, config.colorStops[0]);
                                    gnt.addColorStop(1, config.colorStops[1]);
                                }
                                //ctx.fillStyle = this.attrs["fill"];
                                ctx.strokeStyle = gnt;
                                ctx.lineWidth = this.attrs["strokeWidth"];
                                ctx.stroke();
                                //ctx.restore();
                            }
                        };
                        o = new GraphPipe(model, rootView);
                        //if (layer) {
                        //    layer.add(o);
                        //}
                        break;
                    }
                default:
                    o = null;
            }
            if (layer && model.typeName !== "image") {
                layer.add(o);
            }
            return o;
        };
        return GraphFactory;
    }());
    exports.GraphFactory = GraphFactory;
    //图形实例
    var GraphObject = (function () {
        function GraphObject(model, rootView) {
            this.animations = [];
            this.viewModel = model;
            this.typeName = model.typeName;
            this.rootView = rootView;
            this.initShape(model);
            this.bindEvent(model);
        }
        GraphObject.prototype.initShape = function (model) {
            var config;
            switch (model.typeName) {
                case "rect":
                    config = model.shapeProp;
                    if (config != null) {
                        this.shape = new Kinetic.Rect(config);
                        //this.shape.setAttr("draggable",true);
                    }
                    break;
                case "circle":
                    config = model.shapeProp;
                    if (config != null) {
                        this.shape = new Kinetic.Circle(config);
                    }
                    break;
                case "text":
                    config = model.shapeProp;
                    if (config != null) {
                        this.shape = new Kinetic.Text(config);
                        //config.drawFunc = function(context) {
                        //    var ctx = context._context;
                        //    ctx.fillStyle = config.backColor;
                        //    ctx.strokeStyle = config.borderLineColor;
                        //    ctx.lineWidth = config.borderLineWidth;
                        //    ctx.rect(config.x, config.y, config.width, config.height);
                        //    ctx.fill();
                        //    ctx.stroke();
                        //    //文本
                        //    ctx.font = config.fontSize + " " + config.fontFamily;
                        //    ctx.textBaseline = "top";
                        //    ctx.fillStyle = config.fill;
                        //    ctx.fillText(config.content, config.x, config.y);
                        //    //ctx.restore();
                        //}
                        //this.shape = new Kinetic.Shape(config);
                    }
                    break;
                case "image":
                    config = model.shapeProp;
                    if (config != null) {
                        //var imageObj = new Image();
                        var imgObj = findImg(images, config.srcId);
                        if (imgObj != null) {
                            config.image = imgObj.image;
                            this.shape = new Kinetic.Image(config);
                        }
                        else {
                            console.log(config.srcId + "未找到");
                        }
                    }
                    else {
                        this.shape = null;
                    }
                    break;
                case "line":
                    config = model.shapeProp;
                    //console.log(config.strokeWidth);
                    if (config != null) {
                        this.shape = new Kinetic.Line(config);
                        this.corners = [];
                    }
                    break;
                case "ellipse":
                    config = model.shapeProp;
                    //console.log(config.strokeWidth);
                    if (config != null) {
                        this.shape = new Kinetic.Ellipse(config);
                    }
                    break;
                case "pie":
                    config = model.shapeProp;
                    if (config != null) {
                        config.drawFunc = function (context) {
                            var ctx = context;
                            var r = 50;
                            //ctx.save();
                            //ctx.fillStyle = this.attrs["fill"];
                            //ctx.strokeStyle = this.attrs["stroke"];
                            //ctx.lineWidth = this.attrs["strokeWidth"];
                            ctx.beginPath();
                            ctx.translate(config.x, config.y);
                            ctx.scale(config.radius.x / r, config.radius.y / r);
                            ctx.moveTo(0, 0);
                            ctx.arc(0, 0, r, config.startAngle, config.endAngel, false);
                            ctx.closePath();
                            ctx.fillStrokeShape(this);
                            //ctx.fill();
                            //ctx.stroke();
                            //ctx.restore();
                        };
                        this.shape = new Kinetic.Shape(config);
                    }
                    //console.log(config.strokeWidth);
                    break;
                case "pipe":
                    config = model.shapeProp;
                    // var that = this;
                    //console.log(config.strokeWidth);
                    if (config != null) {
                        config.drawFunc = function (context) {
                            var ctx = context._context;
                            //ctx.save();
                            var points = new Array();
                            for (var j = 0; j < config.points.length - 1; j = j + 2) {
                                var p1 = { x: config.points[j], y: config.points[j + 1] };
                                points.push(p1);
                            }
                            for (var i = 0; i < points.length - 1; i++) {
                                ctx.beginPath();
                                ctx.moveTo(points[i].x, points[i].y);
                                ctx.lineTo(points[i + 1].x, points[i + 1].y);
                                ctx.closePath();
                                var startEnd = calStartEndPoint(points[i], points[i + 1], config.strokeWidth);
                                var gnt = ctx.createLinearGradient(startEnd[0].x, startEnd[0].y, startEnd[1].x, startEnd[1].y);
                                if (config.colorStops) {
                                    // build color stops
                                    gnt.addColorStop(0, config.colorStops[0]);
                                    gnt.addColorStop(1, config.colorStops[1]);
                                }
                                //ctx.fillStyle = this.attrs["fill"];
                                ctx.strokeStyle = gnt;
                                ctx.lineWidth = this.attrs["strokeWidth"];
                                ctx.stroke();
                                //ctx.restore();
                            }
                        };
                        this.shape = new Kinetic.Shape(config);
                        break;
                    }
                default:
                    this.shape = new Kinetic.Shape(model.shapeProp);
            }
            if (this.shape != null) {
                this.shape.graphObj = this;
            }
        };
        GraphObject.prototype.bindEvent = function (model) {
            if (!model.hasOwnProperty("graphEvents"))
                return;
            var events = model.graphEvents;
            if (events == null || events.length === 0) {
                return;
            }
            for (var i = 0; i < events.length; i++) {
                //var evt = events[i];
                this.shape.on(events[i].eventName, function (evt) {
                    var code = null;
                    for (var i = 0; i < events.length; i++) {
                        if (events[i].eventName === evt.type) {
                            code = events[i].eventFunCode;
                            break;
                        }
                    }
                    if (code != null) {
                        eval(code);
                    }
                });
            }
        };
        GraphObject.prototype.destroy = function () {
            this.removeAllAnimations();
            delete this.animations;
            this.shape.graphObj = null;
        };
        // api
        GraphObject.prototype.getAttr = function (attr) {
            this.shape.getAttr(attr);
        };
        GraphObject.prototype.setAttr = function (attr, val) {
            if (this.viewModel.shapeProp.hasOwnProperty(attr)) {
                this.viewModel.shapeProp[attr] = val;
            }
            this.shape.setAttr(attr, val);
            //this.getParent().draw();
        };
        GraphObject.prototype.setAttrs = function (config) {
            for (var prop in config) {
                if (!this.viewModel.shapeProp.hasOwnProperty(prop)) {
                    continue;
                }
                this.viewModel.shapeProp[prop] = config[prop];
            }
            this.shape.setAttrs(config);
            //this.getParent().draw();
        };
        GraphObject.prototype.draw = function () {
            this.shape.draw();
        };
        GraphObject.prototype.getParent = function () {
            return this.shape.getParent();
        };
        //visible(visible) {
        //    this.shape.visible(visible);
        //    //todo: 仅刷新一次 不加入layerhash
        //    //if (!isExistLayer(this.shape.getLayer().getId(), this.stage.layerHash)) {
        //    //    this.stage.layerHash.push(this.shape.getLayer());
        //    //}
        //    this.shape.getLayer().draw();
        //}
        GraphObject.prototype.on = function (eventName, handle) {
            if (this.shape !== null) {
                this.shape.on(eventName, handle);
            }
            //todo: 修改model中的events
        };
        GraphObject.prototype.off = function (eventName) {
            if (this.shape !== null) {
                this.shape.off(eventName);
            }
            //todo: 修改model中的events
        };
        GraphObject.prototype.addAnimation = function (anim) {
            if (this.viewModel.animModels == undefined)
                this.viewModel.animModels = [];
            this.viewModel.animModels.push(anim.model);
            anim.graphObject = this;
            this.animations.push(anim);
            this.rootView.registerAnimation(anim);
        };
        GraphObject.prototype.removeAllAnimations = function () {
            this.viewModel.animModels = [];
            if (this.animations.length > 0) {
                for (var i = 0; i < this.animations.length; i++) {
                    //this.animations[i].stop();
                    this.animations[i].graphObject = null;
                    this.rootView.unRegisterAnimation(this.animations[i].id);
                }
                this.animations = [];
                this.getParent().draw();
            }
        };
        GraphObject.prototype.removeAnimation = function (animId) {
            var k = findIndex(animId, this.viewModel.animModels);
            if (k !== -1)
                this.viewModel.animModels.splice(k, 1);
            if (this.animations.length > 0) {
                //var index = -1;
                //for (var i = 0; i < this.animations.length; i++) {
                //    if (this.animations[i].id === animId) {
                //        index = i;
                //        break;
                //    }
                //}
                var index = findIndex(animId, this.animations);
                if (index !== -1) {
                    //this.animations[index].stop(); // 停止动画 还原图形状态 
                    this.animations[index].graphObject = null;
                    this.animations.splice(index, 1);
                    this.rootView.unRegisterAnimation(animId);
                    this.getParent().draw();
                }
            }
        };
        return GraphObject;
    }());
    exports.GraphObject = GraphObject;
    var GraphLayer = (function (_super) {
        __extends(GraphLayer, _super);
        //graphs: GraphObject[];
        function GraphLayer(model, rootView) {
            var _this = _super.call(this, model.layerProp) || this;
            _this.viewModel = model;
            _this.rootView = rootView;
            _this.initFromModel();
            return _this;
        }
        GraphLayer.prototype.initFromModel = function () {
            //if (this.graphs != undefined && this.graphs.length > 0) {
            //    for (var k = 0; k < this.graphs.length; k++) {
            //        this.graphs[k].destroy();
            //    }
            //}
            //delete this.graphs;
            //this.graphs = [];
            for (var k = 0; k < this.children.length; k++) {
                this.children[k].removeAllAnimations();
            }
            //if (this.animations != undefined && this.animations.length > 0) {
            //    for (var k = 0; k < this.animations.length; k++) {
            //        this.rootView.removeAnimationbyId(this.animations[k].model.id);
            //    }
            //}
            //this.animations = [];
            if (this.tweens != undefined && this.tweens.length > 0) {
                for (var m = 0; m < this.tweens.length; m++) {
                    this.rootView.removeGraphTween(this.tweens[m]);
                }
            }
            this.tweens = [];
            this.destroyChildren();
            if (this.viewModel.graphModels == undefined) {
                this.viewModel.graphModels = [];
            }
            for (var i = 0; i < this.viewModel.graphModels.length; i++) {
                //var graph = new GraphObject(this.viewModel.graphModels[i], this.rootView);
                //if (graph.shape) {
                //    this.add(graph.shape);
                //    this.graphs.push(graph);
                //}
                var graph = GraphFactory.create(this.viewModel.graphModels[i], this.rootView);
                if (graph != null) {
                    //if (graph.constructor===Array) {
                    //    for (var i in graph) {
                    //        this.add(graph[i]);
                    //    }
                    //    graph = graph[1];
                    //} else {
                    //    this.add(graph);
                    //}
                    this.add(graph);
                }
                if (this.viewModel.graphModels[i].tweenConfig != null) {
                    var graphTween = new GraphTween(graph);
                    this.tweens.push(graphTween);
                    this.rootView.addGraphTween(graphTween);
                }
                if (this.viewModel.graphModels[i].animModels != null && this.viewModel.graphModels[i].animModels.length > 0) {
                    for (var j = 0; j < this.viewModel.graphModels[i].animModels.length; j++) {
                        var graphAnim = AnimtiaonFactroy.create(/*graph, */ this.viewModel.graphModels[i].animModels[j], this.rootView);
                        if (graphAnim != null) {
                            //graph.addAnimation(graphAnim);
                            graphAnim.graphObject = graph;
                            graph.animations.push(graphAnim);
                            this.rootView.registerAnimation(graphAnim);
                        }
                    }
                }
            }
            //this.draw();
            //var t = setTimeout(this.draw(), 1000);
            //clearTimeout(t);
            ////启动动画
            //for (var j = 0; j < this.tweens.length; j++) {
            //    this.tweens[j].tween.play();
            //}
        };
        GraphLayer.prototype.exportModel = function () {
            this.viewModel.layerProp = new LayerProp();
            for (var i in this.attrs) {
                if (this.attrs.hasOwnProperty(i)) {
                    this.viewModel.layerProp[i] = this.attrs[i];
                }
            }
            this.viewModel.graphModels = [];
            for (var j = 0; j < this.children.length; j++) {
                var graphModel = this.children[j].exportModel();
                this.viewModel.graphModels.push(graphModel);
            }
            return this.viewModel;
        };
        // api
        GraphLayer.prototype.addGraph = function (graph) {
            //if (this.viewModel.graphModels === null) {
            //    this.viewModel.graphModels = [];
            //}
            //var model = graph.viewModel;
            ////model.layerId = this.getAttr("id");
            ////model.parent = this.viewModel;
            //this.viewModel.graphModels.push(model);
            //this.initFromModel();
            //this.draw();
            if (graph != null) {
                this.add(graph);
                this.draw();
            }
        };
        GraphLayer.prototype.removeGraph = function (graphId) {
            //if (this.viewModel.graphModels == undefined || this.viewModel.graphModels.length === 0)
            //    return;
            //var index = -1;
            //for (var i = 0; i < this.viewModel.graphModels.length; i++) {
            //    if (this.viewModel.graphModels[i].shapeProp.id === graphId) {
            //        index = i;
            //        break;
            //    }
            //}
            //if (index !== -1) {
            //    this.viewModel.graphModels.splice(index, 1);
            //}
            //this.initFromModel();
            //this.draw();
            var obj = this.find("#" + graphId);
            if (obj != null && obj.length > 0) {
                if (obj[0].animations.length > 0) {
                    this.rootView.unRegisterAnimationsbyGraphId(graphId);
                }
                obj[0].destroy();
            }
            this.draw();
        };
        GraphLayer.prototype.getGraphbyId = function (graphId) {
            var shapes = this.find("#" + graphId);
            if (shapes.length > 0) {
                return shapes[0] /*.graphObj*/;
            }
            return null;
        };
        GraphLayer.prototype.getGraphsbyName = function (name) {
            return this.find("." + name);
        };
        return GraphLayer;
    }(Kinetic.Layer));
    exports.GraphLayer = GraphLayer;
    //var aa = 1;
    var that;
    var View = (function (_super) {
        __extends(View, _super);
        function View(model, dataTable, imgSrc) {
            var _this = _super.call(this, model.stageProp) || this;
            _this.canWheel = true;
            _this.model = model;
            try {
                _this.viewModel = cloneObject(model);
            }
            catch (err) {
                console.log("------error-------" + err);
            }
            //this.dataTable = dataTable;
            //this.imageSrc = imgSrc;
            //this.draggable(true);
            _this.loadGlobalImageSrc(imgSrc);
            _this.loadDataPointTable(dataTable);
            _this.initFromModel();
            _this.addMouseWheelEventToDiv(true);
            _this.on("click", function (evt) {
                // 弹出框跟随
                var popWind = document.getElementById("popWind");
                if (popWind) {
                    popWind.parentNode.removeChild(popWind);
                }
            });
            _this.on("dragmove", _this.reDrawPopWnd);
            Kinetic.dragDistance = 3;
            _this.preDivSize = { x: _this.width(), y: _this.height() };
            _this.preWndSize = { x: $(window).width(), y: $(window).height() };
            _this.resize_test();
            return _this;
        }
        View.prototype.bindEventToDiv = function () {
            this.addMouseWheelEventToDiv(true);
        };
        View.prototype.addMouseWheelEventToDiv = function (on) {
            var div = this.getAttr("container");
            if (on) {
                $(div).on("mousewheel", this.doMouseWheel);
            }
            else {
                $(div).off("mousewheel");
            }
        };
        View.prototype.resize_test = function () {
            $(window).resize(function () {
                // 图层当前缩放系数 相对初始状态而言
                var currentScale;
                //窗口缩放系数 相对前次而言
                var scaleX = $(window).width() / that.preWndSize.x;
                var scaleY = $(window).height() / that.preWndSize.y;
                that.preWndSize = { x: $(window).width(), y: $(window).height() };
                //重设div大小 使其与窗口等比例缩放
                that.setAttrs({ width: that.preDivSize.x * scaleX, height: that.preDivSize.y * scaleY });
                that.preDivSize = { x: that.preDivSize.x * scaleX, y: that.preDivSize.y * scaleY };
                //按比例缩放图层 重置显示
                for (var i = 0; i < that.children.length; i++) {
                    var lay = that.children[i];
                    currentScale = { x: scaleX * lay.scale().x, y: scaleY * lay.scale().y };
                    lay.setAttrs({ scaleX: currentScale.x, scaleY: currentScale.y });
                }
                // 还原除底层外的其他图层内图元的大小
                for (var j = 1; j < that.children.length; j++) {
                    var lay = that.children[j];
                    for (var i = 0; i < lay.children.length; i++) {
                        var g = lay.children[i];
                        g.setAttrs({ scaleX: 1 / currentScale.x, scaleY: 1 / currentScale.y });
                    }
                }
                that.draw();
                that.reDrawPopWnd();
            });
        };
        //鼠标滚动事件
        View.prototype.doMouseWheel = function (evt) {
            var ev = evt.originalEvent;
            ev.preventDefault();
            var delta = ev.detail ? ev.detail > 0 : ev.wheelDelta < 0;
            //var ratioL = (ev.clientX - that.getX()) / that.getWidth() * that.scaleX();
            //var ratioT = (ev.clientY - that.getY()) / that.getHeight() * that.scaleY();
            var ratioDelta = !delta ? 1 + 0.05 : 1 - 0.05;
            that.resizeAsGis(ratioDelta, ratioDelta, ev.clientX, ev.clientY);
        };
        //缩放视图  除底层缩放 其他层图元均只改变坐标 不改变大小
        //scaleX,scaleY是针对当前尺寸而言的比例系数
        //cx,cy为缩放中心点坐标位置 窗口绝对坐标
        View.prototype.resizeAsGis = function (scaleX, scaleY, cx, cy) {
            // 对每一层进行缩放
            var l, t, currentScale;
            for (var i = 0; i < that.children.length; i++) {
                var lay = that.children[i];
                currentScale = { x: scaleX * lay.scale().x, y: scaleY * lay.scale().y };
                lay.setAttrs({ scaleX: currentScale.x, scaleY: currentScale.y });
                l = Math.round(cx - (cx - lay.getX()) * scaleX);
                t = Math.round(cy - (cy - lay.getY()) * scaleY);
                lay.setAttrs({ x: l, y: t });
            }
            // view
            //var currentScale = { x: ratioDelta * that.scale().x, y: ratioDelta * that.scale().y };
            //that.setAttrs({ scaleX: that.currentScale, scaleY: that.currentScale });
            //var l = Math.round(ev.clientX - (ev.clientX - that.getX()) * ratioDelta);
            //var t = Math.round(ev.clientY - (ev.clientY - that.getY()) * ratioDelta);
            //that.setAttrs({ x: l, y: t });
            // 还原除底层外的其他图层内图元的大小
            for (var j = 1; j < that.children.length; j++) {
                var lay = that.children[j];
                for (var i = 0; i < lay.children.length; i++) {
                    var g = lay.children[i];
                    g.setAttrs({ scaleX: 1 / currentScale.x, scaleY: 1 / currentScale.y });
                }
            }
            that.draw();
            that.reDrawPopWnd();
        };
        View.prototype.reDrawPopWnd = function () {
            // 弹出框跟随
            var popWind = document.getElementById("popWind");
            if (popWind) {
                var node = popWind.ghObj;
                //popWind.style.left = node.getAbsolutePosition().x - Number(popWind.style.width.replace(/px/, "")) / 2 + node.getWidth() / 2 + "px";
                //popWind.style.top = node.getAbsolutePosition().y - Number(popWind.style.height.replace(/px/, "")) - 60 + "px";
                var pos = exports.Util.calPopWndPos(node, popWind);
                popWind.style.left = pos.x;
                popWind.style.top = pos.y;
            }
        };
        View.prototype.exportModel = function () {
            //停止动画 还原状态
            for (var i = 0; i < this.graphAnimations.length; i++) {
                this.graphAnimations[i].stop();
            }
            this.viewModel.stageProp = new Object();
            this.viewModel.stageProp["container"] = this.attrs["container"].id;
            this.viewModel.stageProp["height"] = this.attrs["height"];
            this.viewModel.stageProp["width"] = this.attrs["width"];
            this.viewModel.layerModels = [];
            for (var j = 0; j < this.children.length; j++) {
                var layModel = this.children[j].exportModel();
                this.viewModel.layerModels.push(layModel);
            }
            return this.viewModel;
        };
        View.prototype.loadGlobalImageSrc = function (imgSrc) {
            if (imgSrc != null) {
                images = imgSrc;
                preLoad(images);
            }
        };
        View.prototype.loadDataPointTable = function (datas) {
            if (datas != null) {
                createGlobalDataPoint(datas);
            }
        };
        View.prototype.initFromModel = function () {
            //this.viewModel = null;
            this.graphTweens = [];
            this.graphAnimations = [];
            this.layerHash = [];
            if (this.timer != null) {
                window.clearInterval(this.timer);
                this.timer = null;
            }
            this.destroyChildren();
            if (this.viewModel.layerModels == undefined) {
                this.viewModel.layerModels = [];
            }
            //初始化图形
            for (var i = 0; i < this.viewModel.layerModels.length; i++) {
                var layerModel = this.viewModel.layerModels[i];
                var layer = new GraphLayer(layerModel, this);
                this.add(layer);
            }
            ////启动动画
            //for (var j = 0; j < this.graphTweens.length; j++) {
            //    this.graphTweens[j].tween.play();
            //}
            timer_out = setTimeout(this.RedrawView, 800);
            //this.draw();
            that = this;
            this.timer = setInterval(this.palyAnimation, 50);
            //this.setScale({ x: this.viewModel.xscale, y: this.viewModel.yscale });
            ////this.draw();
        };
        View.prototype.updateLayerHash = function (layer) {
            if (!isExistLayer(layer.getId(), this.layerHash)) {
                this.layerHash.push(layer);
            }
        };
        View.prototype.RedrawView = function () {
            that.draw();
            clearTimeout(timer_out);
        };
        View.prototype.palyAnimation = function () {
            that.layerHash = [];
            for (var k = 0; k < that.graphAnimations.length; k++) {
                that.graphAnimations[k].play();
            }
            for (var i = 0; i < that.layerHash.length; i++) {
                that.layerHash[i].draw();
            }
        };
        View.prototype.addGraphTween = function (graphTween) {
            this.graphTweens.push(graphTween);
        };
        View.prototype.registerAnimation = function (anim) {
            this.graphAnimations.push(anim);
        };
        View.prototype.unRegisterAnimation = function (animaId) {
            if (this.graphAnimations == undefined || this.graphAnimations.length === 0)
                return;
            //var index = -1;
            //for (var i = 0; i < this.graphAnimations.length; i++) {
            //    if (this.graphAnimations[i].id === animaId) {
            //        index = i;
            //        break;
            //    }
            //}
            var index = findIndex(animaId, this.graphAnimations);
            if (index !== -1) {
                this.graphAnimations[index].stop();
                this.graphAnimations.splice(index, 1);
            }
        };
        View.prototype.unRegisterAnimationsbyGraphId = function (objId) {
            if (this.graphAnimations == undefined || this.graphAnimations.length === 0)
                return;
            var start = -1;
            var len = 0;
            for (var i = 0; i < this.graphAnimations.length; i++) {
                if (this.graphAnimations[i].graphObject.model.shapeProp.id === objId) {
                    if (len === 0) {
                        start = i;
                    }
                    this.graphAnimations[i].stop();
                    len++;
                }
            }
            if (start !== -1) {
                this.graphAnimations.splice(start, len);
            }
        };
        View.prototype.removeGraphTween = function (tween) {
        };
        // api 操作viewModel
        View.prototype.addLayer = function (layer) {
            //if (this.viewModel.layerModels === null) {
            //    this.viewModel.layerModels = [];
            //}
            //this.viewModel.layerModels.push(layer.viewModel);
            //this.initFromModel();
            this.add(layer);
        };
        View.prototype.removeLayer = function (layerId) {
            //if (this.viewModel.layerModels === null) {
            //    this.viewModel.layerModels = [];
            //}
            //var index = -1;
            //if (this.viewModel.layerModels != null) {
            //    for (var i = 0; i < this.viewModel.layerModels.length; i++) {
            //        if (this.viewModel.layerModels[i].layerProp.id === layerId) {
            //            index = i;
            //            break;
            //        }
            //    }
            //}
            //if (index !== -1) {
            //    this.viewModel.layerModels.splice(index, 1);
            //}
            //this.initFromModel();
            var obj = this.find("#" + layerId);
            if (obj != null) {
                obj[0].destroy();
            }
        };
        View.prototype.getLayerbyId = function (layerId) {
            var shapes = this.find("#" + layerId);
            if (shapes.length > 0) {
                return shapes[0];
            }
            return null;
        };
        View.prototype.getGraphbyId = function (graphId) {
            var shapes = this.find("#" + graphId);
            if (shapes.length > 0) {
                return shapes[0];
            }
            return null;
        };
        View.prototype.getGraphsbyName = function (name) {
            return this.find("." + name);
        };
        View.prototype.getLayersbyName = function (name) {
            return this.find("." + name);
        };
        View.prototype.setWheel = function (wheel) {
            if (wheel && !this.canWheel) {
                this.addMouseWheelEventToDiv(true);
            }
            if (!wheel && this.canWheel) {
                this.addMouseWheelEventToDiv(false);
            }
            this.canWheel = wheel;
        };
        return View;
    }(Kinetic.Stage));
    exports.View = View;
    function createGlobalDataPoint(datas) {
        for (var i = 0; i < datas.length; i++) {
            eval(datas[i].id + "=" + datas[i].value);
        }
        //for (var i in data) {
        //    eval(i + "=" + data[i]);
        //}
    }
});
