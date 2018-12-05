import { Alert } from 'react-native';
const apiName = '[ Service ]';
const apiURL = 'http://192.168.0.2:3000/api';
//const apiURL = 'http://115.71.237.152:3000/api';

const Service = {
    user:{},
    project:{},
    projectAll:{},   
    tempTeam:{}, 
    team:[],
    updateTeam:{},    
    app:'',
    changeFunc:'',    
    current : 'loading',
    param :'',
    goto : (val)=>{  // 서비스에 갈곳 위치를 저장하고 해당 위치로 이동
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
        Service.goto('loading');
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
                console.log(json);
                Service.user = json.data;
                Alert.alert('로그인 성공','메인페이지로 이동합니다.');
                // Service.goto('main');
                return fetch(apiURL+'/project/viewAll',{
                    method:'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body:JSON.stringify({
                        uid:Service.user._id
                    })
                })
            }else{
                Alert.alert('로그인 실패',json.msg);
                Service.goto('login');
            }
            
        })
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json);
            if(json.result===1)console.log('메인정보 가져오기 성공');
            Service.projectAll = json.data;
            Service.goto('main');
        })
        .catch(err=>console.log(err));
    },
    join : (data)=>{
        Service.changeFunc('loading');
        console.log(apiName+'[ join ]');
        console.log('data => ',data);fetch(apiURL+'/user/join',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                id:data.id,
                pass:data.pw,
                name:data.name,
                stuNo:data.stuNo,
                email:data.email
            })
        })
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json);
            if(json.result===1){
                Alert.alert('가입 성공','로그인페이지로 이동합니다.');
                Service.goto('login');
            }else{
                Alert.alert('가입 실패',json.msg);
                Service.goto('join');
            }
        })
        .catch(err=>console.log(err));
    },
    viewUser:(id)=>{
        console.log(Service.user.id);
        let manager = Service.user.id?Service.user.id:'test';
        console.log(id);
        fetch(apiURL+'/user/view',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                manager:manager,
                id:id
            })            
        })
        .then((res)=>res.json())
        .then((json)=>{            
            if(json.result!==1){
                return Alert.alert('유저 확인 실패',json.msg); 
            }else{
                console.log(json.data);
                //let string = '이름 :'+String(json.data.name)+'  아이디 :'+String(json.data.id);
                Service.tempTeam = json.data;                
                Service.team.push(json.data);
                Service.updateTeam();                
            }
        })
        .catch(err=>console.log(err))
    },
    removeTeam:(userId)=>{
        let idx = 'none';
        for(let i=0; i<Service.team.length;i++){            
            if(u.id===userId){
                idx = i;
                break;
            }
        }
        Service.team.splice(idx,1);
        Service.updateTeam();
    }
}

export default Service;