import { Alert } from 'react-native';
const apiName = '[ Service ]';
const apiURL = 'http://192.168.0.2:3000/api';
//const apiURL = 'http://localhost:3000/api';

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
        fetch(apiURL+'/user/login',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                id:id,
                pass:pw
            })
        })
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json);
            if(json.result===1){
                Alert.alert('로그인 성공','메인페이지로 이동합니다.');
            }else{
                Alert.alert('로그인 실패',json.msg);
                Service.goto('login');
            }
        })
        .catch(err=>console.log(err));
    },
    join : (data)=>{
        console.log(apiName+'[ join ]');
        console.log('data => ',data);
        return 1;
    }
}

export default Service;