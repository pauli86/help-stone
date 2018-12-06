import { Alert } from 'react-native';
const apiName = '[ Service ]';
//const apiURL = 'http://192.168.0.2:3000/api';
const apiURL = 'http://115.71.237.152:3000/api';

const Service = {
    user:{},
    project:{},
    projectAll:{},   
    tempTeam:{}, 
    team:[],
    updateTeam:{},    
    app:'',
    changeFunc:'',    
    changeFuncPTab:'',
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
        if(id===Service.user.id){
            return Alert.alert(' 아이디 : '+id,'매니저의 아이디는 추가할 수 없습니다.');
        }
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
                Alert.alert('유저 확인 실패',json.msg?json.msg:'다시 시도해주세요'); 
            }else{
                console.log(json.data);
                let string = '이름 :'+String(json.data.name)+'  아이디 :'+String(json.data.id);
                Alert.alert('팀원을 추가하시겠습니까?',string?string:'승인을 누르시면 팀원으로 추가됩니다',[
                   
                    {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: '승인', onPress: () => {
                        console.log('OK Pressed');          
                        Service.team.push(json.data);
                        Service.updateTeam();                
                    }},
                ]);
            }
            return;
        })
        .catch(err=>console.log(err))
    },
    removeTeam:(userId)=>{        
        let idx = 'none';
        for(let i=0; i<Service.team.length;i++){            
            if(Service.team[i].id===userId){
                idx = i;
                break;
            }
        }
        Service.team.splice(idx,1);
        Service.updateTeam();
    },
    createProject:(data)=>{
        console.log('createProject');
        console.log(data);
    }
}

export default Service;