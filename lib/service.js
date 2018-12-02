const apiName = '[ Service ]';

const Service = {
    app:'',
    changeFunc:'',
    current : 'loading',
    param :'',
    goto : (val)=>{
        Service.current = val;
        console.log(val);
        Service.changeFunc(val);
    },
    setParam :(param)=>{
        Service.param = param;
    },
    getLocation : ()=>{
        return Service.current;
    },
    getParam : ()=>{
        return Service.param;
    },
    login : (id,pw)=>{
        console.log(apiName+'[ login ]','\nid : ',id,'\npw : ',pw);
        Service.changeFunc('loading');
        setTimeout(()=>{
            // 여기서 ID 와 PW를 체크 
            Service.changeFunc('main');
        },2000);        
    },
    join : (data)=>{
        console.log(apiName+'[ join ]');
        console.log('data => ',data);
        return 1;
    }
}

export default Service;