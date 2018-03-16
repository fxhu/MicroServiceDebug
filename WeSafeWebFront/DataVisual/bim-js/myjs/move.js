function resetAll(){
    var t1=controlsTargetMove({x:0,y:0,z:0});
    var t2=new TWEEN.Tween(camera.position);
    t2.to(cameraPosition0, 1000).delay(100);
    if(t1!=null){
        t1.start();
        t2.start();
    }else{
        t2.start();
    }
}
function moveToPosition(x,y,z){
    var aa=cameraGetClose({x:x,y:y,z:z});
    var t1=null;
    var r=controlsTargetMove({x:0,y:0,z:0});
    if(isDiagonal(camera.position,{x:x,z:z})){
        t1=controlsTargetMove(newTargetPosition(camera.position,{x:x,z:z}));
        if(r){
            t1.chain(aa).chain(r).start();
        }else{
            t1.chain(aa).start();
        }
    }else{
        if(r){
            aa.chain(r).start();
        }else{
            aa.start();
        }
    }
}

function controlsTargetMove(p){
    if(controls.target.x==p.x&&controls.target.y==p.y&&controls.target.z==p.z){
        return null;
    }
    var t1=new TWEEN.Tween(controls.target);
    t1.to(p,500).delay(100);
    return t1;
}
function cameraGetClose(targetPosition){
    var tween = new TWEEN.Tween(camera.position);
    tween.to(addAbsoluteCoor(targetPosition), 1000);
    return tween;
}
function addAbsoluteCoor(position){
    var a=2.5;
    return {
        x:a*(position.x),
        y:a*(position.y),
        z:a*(position.z)
    }
}

function isDiagonal(p1,p2){
    if(p1.x*p2.x<0&&p1.z*p2.z<0){
        return true;
    }return false;
}
function newTargetPosition(p1,p2){
    var a=(p1.x*p2.z+p1.z*p2.x)/(p1.z+p2.z);
    if(a>=0){
        return {x:p2.x,z:0,y:0};
    }else{
        return {x:0,z:p2.z,y:0};
    }
}
