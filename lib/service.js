import { Alert } from 'react-native';
const apiName = '[ Service ]';
//const apiURL = 'http://192.168.0.2:3000/api';
const apiURL = 'http://115.71.237.152:3000/api';

const Service = {
    user:{}, // users info
    project:{}, // the project that user selected
    meta:{}, // the project's meta information 
    manager:{}, // manager's tasks and other info of the project 
    ongoingTask:[], // user's ongoing tasks on the project
    refreshOngoingTask:{},
    doneTask:[], // user's done tasks on the project
    refreshDoneTask:{},
    projectAll:{},   
    tempTeam:{}, 
    team:[], // create project - selected members to be joined to the project
             // select project - the project team members' tasks and other info
    updateTeam:{},    
    detailFlag:'',
    refreshMembers:{},
    app:'',
    changeFunc:'',    
    changeFuncPTab:'',
    current : 'loading',
    param :'',
    timeChk:'none',
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
        if(!(id&&pw)){
            return Alert.alert('로그인 실패','아이디와 비밀번호를 입력해주세요.');
        }
        id = id.toLowerCase();        
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
        //         // Service.goto('main');
        //         return fetch(apiURL+'/project/viewAll',{
        //             method:'POST',
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //               },
        //             body:JSON.stringify({
        //                 uid:Service.user._id
        //             })
        //         })
        //     }else{
        //         Alert.alert('로그인 실패',json.msg);
        //         Service.goto('login');
        //     }
            
        // })
        // .then((res)=>res.json())
        // .then((json)=>{
        //     console.log(json);
        //     if(json.result===1)console.log('메인정보 가져오기 성공');
        //     Service.projectAll = json.data;
            Service.goto('main');
            // if(Service.timeChk==='none'){
            //     Service.timeChk = setTimeout(()=>{
            //         Service.chkInfo();                
            //     },1000);
            // }
        }else{
            Alert.alert('로그인 실패',json.msg);
            Service.goto('login');
            }
        })
        .catch(err=>console.log(err));
    },
    getMainInfo:()=>{
        fetch(apiURL+'/project/viewAll',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                uid:Service.user._id
            })
        })
        .then((res)=>res.json())
        .then((json)=>{
            // console.log(json);
            if(json.result===1)console.log('메인정보 가져오기 성공');
            Service.projectAll = json.data;
            Service.setMainInfo({
                ongoing:Service.projectAll.ongoing,
                done:Service.projectAll.done,
            });            
        })
        .catch(err=>console.log(err));
    },
    setMainInfo:{},
    chkMainInfo:()=>{
        if(Service.current==='main'){
            console.log('chk main info');
            fetch(apiURL+'/user/projectChk',{
                method:'post',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    id:Service.user.id,
                    lastUpdate:Service.user.lastUpdate
                })
            })
            .then(res=>res.json())
            .then(ret=>{
                console.log('chk main info result ',ret);
                if(ret.result===4){ // main 정보 갱신 필요.                    
                    Service.getMainInfo();
                }
            })
            .catch(e=>console.log(e))
        }
    },
    // chkInfo:()=>{
    //     Service.timeChk = 'none';
    //     if(Service.current==='main'){
    //         console.log('main 페이지 갱신작업');
    //         fetch(apiURL+'/user/projectChk',{
    //             method:'post',
    //             headers:{
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body:JSON.stringify({
    //                 id:Service.user.id,
    //                 lastUpdate:Service.user.lastUpdate
    //             })
    //         })
    //         .then(res=>res.json())
    //         .then(ret=>{
    //             console.log(ret);
    //             if(ret.result===4){
    //                 return fetch(apiURL+'/project/viewAll',{
    //                     method:'POST',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'application/json',
    //                       },
    //                     body:JSON.stringify({
    //                         uid:Service.user._id
    //                     })
    //                 })                    
    //             }else{
    //                 if(Service.timeChk==='none'){
    //                     Service.timeChk = setTimeout(()=>{
    //                         Service.chkInfo();                
    //                     },1000);
    //                 }
    //                 return;
    //             }
    //         })
    //         .catch(e=>console.log(e))
    //     }else{
    //         console.log('다른거 처리');
    //         if(Service.timeChk==='none'){
    //             Service.timeChk = setTimeout(()=>{
    //                 Service.chkInfo();                
    //             },1000);
    //         }
    //     }
    // },
    join : (data)=>{
        Service.changeFunc('loading');
        console.log(apiName+'[ join ]');
        console.log('data => ',data);
        fetch(apiURL+'/user/join',{
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
        id = id.toLowerCase();
        if(id===Service.user.id){
            return Alert.alert(' 아이디 : '+id,'매니저의 아이디는 추가할 수 없습니다.');
        }
        let existFlag = false;
        Service.team.map(u=>{
            console.log('u.id = ',u.id);
            console.log('id = ',id);
            if(u.id===id){
                existFlag = true;
            }
        });
        if(existFlag) return Alert.alert(' 아이디 : '+id,'이미 추가된 유저입니다.');
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
                // console.log(json.data);
                let string = '이름 :'+String(json.data.name)+'  아이디 :'+String(json.data.id);
                Alert.alert('팀원을 추가하시겠습니까?',string+'\n승인을 누르시면 팀원으로 추가됩니다',[
                   
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
        userId = userId.toLowerCase();        
        let chk = false;
        let id = '';
        let name = '';
        
        Service.team.map(t=>{
            if(t.id===userId){
                id = t.id;
                name = t.name;
            }
        });
        let string = '이름 :'+String(name)+'  아이디 :'+String(id);
        Alert.alert('팀원을 삭제하시겠습니까?',string+'\n승인을 누르시면 리스트에서 삭제됩니다.',[                   
            {text: '취소', onPress: () => {
                console.log('Cancel Pressed');                
            }, style: 'cancel'},
            {text: '승인', onPress: () => {
                console.log('OK Pressed');
                let idx = 'none';
                for(let i=0; i<Service.team.length;i++){            
                    if(Service.team[i].id===userId){
                        idx = i;
                        break;
                    }
                }
                Service.team.splice(idx,1);
                Service.updateTeam();
            }},
        ]);       
        
    },
    createProject:(data)=>{
        console.log('createProject');
        console.log(data);
        let manager = data.manager?data.manager:false;
        if(!manager){
            return Alert.alert('프로젝트 생성 오류','프로젝트 매니저 아이디를 알 수 없습니다.');
        }
        let title = data.title?data.title:false;
        if(!title){
            return Alert.alert('프로젝트 생성 오류','제목을 입력하세요');
        }
        let desc = data.desc?data.desc:false;
        if(!desc){
            // return Alert.alert('프로젝트 생성 오류','설명을 입력하세요');
        }
        if(data.dueDate.length!==8){
            return Alert.alert('프로젝트 생성 오류','마감기한을 입력하세요.\n( YYYYMMDD - 8자리 숫자 )');
        }
        let dueDate = data.dueDate.substr(0,4) + '-'+data.dueDate.substr(4,2) + '-'+data.dueDate.substr(6,2);        

        let team = data.team.map(u=>u._id);
        
        

        fetch(apiURL+'/project/add',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                title:title,
                desc:desc,
                dueDate:dueDate,
                manager:manager,
                team:team,
            })        
        })
        .then(res=>res.json())
        .then(ret=>{
            console.log(ret)
            if(ret.result!==1){
                return Alert.alert('프로젝트 생성 오류',ret.msg);
            }else{
                Alert.alert('프로젝트 생성 완료','프로젝트가 생성되었습니다.');
                Service.goto('main');                
            }
        })
        .catch(e=>console.log(e));
    },
    selectProject:(flag,idx)=>{
        Service.meta = {};
        Service.project = {};
        Service.team = [];
        console.log('[ select project ] flag = ',flag,' , idx = ',idx);
        Service.goto('loading');
        fetch(apiURL+'/project/view',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                pid:Service.projectAll[flag][idx].project._id
            })
        })
        .then(res=>res.json())
        .then(ret=>{
            
            console.log('[ Service ][ project view ]',ret.result,' - ',ret.msg);
            if(ret.result===1){
                
                Service.meta = Service.projectAll[flag][idx].meta;
                Service.project = ret.data.project;
                Service.team = ret.data.project.team;
                Service.manager = ret.data.project.manager;
                console.log('[ select project ] title = ',Service.project.title,' , desc = ',Service.project.desc);
                console.log('[ Service ] project meta info = ',Service.meta);
                // Service.goto('projectTab');
                return fetch(apiURL+'/task/view',{
                    method:'post',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        pid:Service.project._id,
                        uid:Service.project.manager._id
                    })
                });
            }else{
                console.log('[ Service ] project view error ');
                throw new Error();
            }            
        })
        .then(res=>res.json())
        .then(ret=>{            
            // console.log('[ Service ][ task view ][ manager ]',ret.result , ' - ' , ret.msg);
            let meta ={
                ot:0,
                dt:0,
                yd:0,
                dd:0,
            }
            let ongoingTask = [];
            let doneTask = [];
            ret.data.forEach(task=>{                
                if(task.state==='ongoing'){
                    ongoingTask.push(task);
                    meta.ot++;
                }else{
                    doneTask.push(task);
                    meta.dt++;
                }
                task.doList.forEach(todo=>{
                    if(todo.state==='yet'){
                        meta.yd++;
                    }else{
                        meta.dd++;
                    }
                });
            });
            Object.assign(Service.manager,{meta:meta,ongoingTask:ongoingTask,doneTask:doneTask});
            let promiseArray = [];
            // console.log('[ Service ][ task view ][ team members ]',Service.team);
            for(let i = 0; i < Service.team.length; i++){
                promiseArray.push(fetch(apiURL+'/task/view',{
                    method:'post',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        pid:Service.project._id,
                        uid:Service.team[i]._id
                    })
                }).then(res=>res.json())
                .then(ret=>{
                    console.log(ret);
                    if(ret.result===1){
                        let meta ={
                            ot:0,
                            dt:0,
                            yd:0,
                            dd:0,
                        }
                        let ongoingTask = [];
                        let doneTask = [];
                        ret.data.forEach(task => {
                            // classify the task 
                            if(task.state==='ongoing'){
                                meta.ot++;
                                ongoingTask.push(task);
                            }else{
                                meta.dt++;
                                doneTask.push(task);
                            }
                            // classify the do
                            task.doList.forEach(todo=>{
                                if(todo.state==='yet'){
                                    meta.yd++;
                                }else{
                                    meta.dd++;
                                }
                            });
                        });
                        Object.assign(Service.team[i],{meta:meta,ongoingTask:ongoingTask,doneTask:doneTask});
                        return 1;
                    }else{
                        return 2;
                    }
                })
                )                
            }
            return Promise.all(promiseArray);
        })        
        .then(ret=>{
            console.log(ret);
            if(Service.manager._id===Service.user._id){
                Service.doneTask = Service.manager.doneTask;
                Service.ongoingTask = Service.manager.ongoingTask;
            }else{
                Service.team.forEach(member=>{
                    if(member._id===Service.user._id){
                        Service.doneTask = member.doneTask;
                        Service.ongoingTask = member.ongoingTask;
                        console.log('foreach');
                    }
                });
            }


            // console.log('[ Service ][ task view ][ user ]',Service.user);
            // console.log('[ Service ][ task view ][ doneTask ]',Service.doneTask);
            // console.log('[ Service ][ task view ][ ongoingTask ]',Service.ongoingTask);
            // console.log('[ Service ][ task view ][ manager ]',Service.manager);
            
            // console.log('[ Service ][ task view ][ team members ]',Service.team);
            // console.log('[ Service ] logs ',Service.project.logList);
            Service.goto('projectTab')
        })
        .catch(e=>console.log(e));
         

        
        
    },
    updateProject:{},
    addTask:(title,desc)=>{
        Service.timeChkFlag=false;        
        console.log(apiName+'[ addTask ] ');
        console.log('title   : ',title);
        console.log('desc    : ',desc);
        console.log('user    : ',Service.user.name);
        console.log('uid     : ',Service.user._id);
        console.log('project : ',Service.project.title);
        console.log('pid     : ',Service.project._id);
        fetch(apiURL+'/task/add',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                title:title,
                desc:desc,
                pid:Service.project._id,
                uid:Service.user._id
            })
        })
        .then(res=>res.json())
        .then(ret=>{
            console.log(apiName+'[ addTask ]',ret.msg);
            if(ret.result===1){
                Alert.alert('TASK 추가 완료','TASK 가 추가 되었습니다.');
                Service.refreshProject();
            }else{
                console.log(apiName+'[ addTask ]error');
            }
        })
        .catch(e=>{
            console.log(e)
        });
    },
    editTask:(title,desc,tid)=>{
        Service.timeChkFlag=false;        
        console.log(apiName+'[ editTask ] ');
        console.log('title   : ',title);
        console.log('desc    : ',desc);
        console.log('user    : ',Service.user.name);
        console.log('uid     : ',Service.user._id);
        fetch(apiURL+'/task/update',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                title:title,
                desc:desc,
                tid:tid,
                uid:Service.user._id
            })
        })
        .then(res=>res.json())
        .then(ret=>{
            console.log(apiName+'[ editTask ]',ret.msg);
            if(ret.result===1){
                Alert.alert('TASK 수정 완료','TASK 가 수정 되었습니다.');
                Service.refreshProject();
            }else{
                console.log(apiName+'[ editTask ]error');
            }
        })
        .catch(e=>{
            console.log(e)
        });
    },
    completeTask:(tid)=>{
        Service.timeChkFlag=false;        
        console.log(apiName+'[ doneTask ] ');        
        console.log('user    : ',Service.user.name);
        console.log('uid     : ',Service.user._id);
        fetch(apiURL+'/task/update',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                state:'done',
                tid:tid,
                uid:Service.user._id
            })
        })
        .then(res=>res.json())
        .then(ret=>{
            console.log(apiName+'[ doneTask ]',ret.msg);
            if(ret.result===1){
                Alert.alert('TASK 완료','TASK 가 완료 되었습니다.');
                Service.refreshProject();
            }else{
                console.log(apiName+'[ doneTask ]error');
            }
        })
        .catch(e=>{
            console.log(e)
        });
    },
    delTask:(tid)=>{
        Service.timeChkFlag=false;        
        console.log(apiName+'[ delete Task ] ');        
        console.log('user    : ',Service.user.name);
        console.log('uid     : ',Service.user._id);
        fetch(apiURL+'/task/delete',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({                
                tid:tid,
                uid:Service.user._id
            })
        })
        .then(res=>res.json())
        .then(ret=>{
            console.log(apiName+'[ delete Task ]',ret.msg);
            if(ret.result===1){
                Alert.alert('TASK 삭제 완료','TASK 가 삭제 되었습니다.');
                Service.refreshProject();
            }else{
                console.log(apiName+'[ delete Task ]error');
            }
        })
        .catch(e=>{
            console.log(e)
        });
    },
    addDo:(tid,title)=>{
        Service.timeChkFlag=false;        
        console.log(apiName+'[ add Do ] ');
        console.log('title    : ',title);
        console.log('user    : ',Service.user.name);
        console.log('uid     : ',Service.user._id);
        fetch(apiURL+'/todo/add',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({                
                tid:tid,
                title:title,
                uid:Service.user._id
            })
        })
        .then(res=>res.json())
        .then(ret=>{
            console.log(apiName+'[ add Do ]',ret.msg);
            if(ret.result===1){
                Alert.alert('Do 추가 완료','새로운 Do 가 추가 되었습니다.');
                Service.refreshProject();
            }else{
                console.log(apiName+'[ add Do ] error');
            }
        })
        .catch(e=>{
            console.log(e)
        });
    },
    editDo:(did,title)=>{
        Service.timeChkFlag=false;        
        console.log(apiName+'[ edit Do ] ');
        console.log('title    : ',title);
        console.log('user    : ',Service.user.name);
        console.log('uid     : ',Service.user._id);
        fetch(apiURL+'/todo/update',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({                
                did:did,
                title:title
            })
        })
        .then(res=>res.json())
        .then(ret=>{
            console.log(apiName+'[ edit Do ]',ret.msg);
            if(ret.result===1){
                Alert.alert('Do 수정 완료','수정 되었습니다.');
                Service.refreshProject();
            }else{
                console.log(apiName+'[ edit Do ] error');
            }
        })
        .catch(e=>{
            console.log(e)
        });
    },
    doneDo:(did,state)=>{
        Service.timeChkFlag=false;        
        console.log(apiName+'[ done Do ] ');
        console.log('state   : ',state);
        console.log('user    : ',Service.user.name);
        console.log('uid     : ',Service.user._id);
        fetch(apiURL+'/todo/update',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({                
                did:did,
                state:state
            })
        })
        .then(res=>res.json())
        .then(ret=>{            
            console.log(apiName+'[ done Do ]',ret.msg);
            if(ret.result===1){
                if(state==='done'){
                    Alert.alert('Do 완료','완료 상태로 변경 되었습니다.');
                }else{
                    Alert.alert('Do 미완료','미완료 상태로 변경 되었습니다.');
                }
                Service.refreshProject();
            }else{
                console.log(apiName+'[ done Do ] error');
            }
        })
        .catch(e=>{
            console.log(e)
        });
    },
    delDo:(did)=>{
        Service.timeChkFlag=false;        
        console.log(apiName+'[ del Do ] ');
        console.log('user    : ',Service.user.name);
        console.log('uid     : ',Service.user._id);
        fetch(apiURL+'/todo/delete',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({                
                did:did
            })
        })
        .then(res=>res.json())
        .then(ret=>{            
            console.log(apiName+'[ del Do ]',ret.msg);
            if(ret.result===1){                
                Alert.alert('Do 삭제','Do 삭제 되었습니다.');                
                Service.refreshProject();
            }else{
                console.log(apiName+'[ del Do ] error');
            }
        })
        .catch(e=>{
            console.log(e)
        });
    },
    timeChkFlag:false,
    timeChkHandle:0,
    timeChk:()=>{
        console.log('time chk on');
        Service.timeChkHandle = setInterval(()=>{
            console.log('time chk interval');
            if(Service.timeChkFlag){
                Service.timeChkFlag=false;
                fetch(apiURL+'/project/timeChk',{
                    method:'post',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({                        
                        pid:Service.project._id,
                        cTime:Service.project.lastUpdate
                    })
                })
                .then(res=>res.json())
                .then(ret=>{
                    
                    console.log('timeChk ===== ');
                    console.log(ret);
                    if(ret.result===7){
                        Service.refreshProject();
                    }else{
                        Service.timeChkFlag=true;
                    }
                })
                .catch(e=>console.log(e));
            }
        },1000);
    },
    timeChkOff:()=>{
        console.log('time chk off');
        Service.timeChkFlag=false;
        clearInterval(Service.timeChkHandle);
    },
    refreshProject:()=>{
        // Service.meta = {};
        // Service.project = {};
        // Service.team = [];
        // console.log('[ select project ] flag = ',flag,' , idx = ',idx);
        // Service.goto('loading');
        fetch(apiURL+'/project/view',{
            method:'post',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({
                pid:Service.project._id
            })
        })
        .then(res=>res.json())
        .then(ret=>{
            
            console.log('[ Service ][ updating now ]',ret.result,' - ',ret.msg);
            if(ret.result===1){
                
                Service.meta = ret.data.meta;
                Service.project = ret.data.project;
                Service.team = ret.data.project.team;
                Service.manager = ret.data.project.manager;
                console.log('[ Service ][ updating now ]title = ',Service.project.title,' , desc = ',Service.project.desc);
                console.log('[ Service ][ updating now ] project meta info = ',Service.meta);
                // Service.goto('projectTab');
                return fetch(apiURL+'/task/view',{
                    method:'post',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        pid:Service.project._id,
                        uid:Service.project.manager._id
                    })
                });
            }else{
                console.log('[ Service ] project view error ');
                throw new Error();
            }            
        })
        .then(res=>res.json())
        .then(ret=>{            
            // console.log('[ Service ][ task view ][ manager ]',ret.result , ' - ' , ret.msg);
            let meta ={
                ot:0,
                dt:0,
                yd:0,
                dd:0,
            }
            let ongoingTask = [];
            let doneTask = [];
            ret.data.forEach(task=>{                
                if(task.state==='ongoing'){
                    ongoingTask.push(task);
                    meta.ot++;
                }else{
                    doneTask.push(task);
                    meta.dt++;
                }
                task.doList.forEach(todo=>{
                    if(todo.state==='yet'){
                        meta.yd++;
                    }else{
                        meta.dd++;
                    }
                });
            });
            Object.assign(Service.manager,{meta:meta,ongoingTask:ongoingTask,doneTask:doneTask});
            let promiseArray = [];
            // console.log('[ Service ][ task view ][ team members ]',Service.team);
            for(let i = 0; i < Service.team.length; i++){
                promiseArray.push(fetch(apiURL+'/task/view',{
                    method:'post',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        pid:Service.project._id,
                        uid:Service.team[i]._id
                    })
                }).then(res=>res.json())
                .then(ret=>{
                    console.log(ret);
                    if(ret.result===1){
                        let meta ={
                            ot:0,
                            dt:0,
                            yd:0,
                            dd:0,
                        }
                        let ongoingTask = [];
                        let doneTask = [];
                        ret.data.forEach(task => {
                            // classify the task 
                            if(task.state==='ongoing'){
                                meta.ot++;
                                ongoingTask.push(task);
                            }else{
                                meta.dt++;
                                doneTask.push(task);
                            }
                            // classify the do
                            task.doList.forEach(todo=>{
                                if(todo.state==='yet'){
                                    meta.yd++;
                                }else{
                                    meta.dd++;
                                }
                            });
                        });
                        Object.assign(Service.team[i],{meta:meta,ongoingTask:ongoingTask,doneTask:doneTask});
                        return 1;
                    }else{
                        return 2;
                    }
                })
                )                
            }
            return Promise.all(promiseArray);
        })        
        .then(ret=>{
            console.log(ret);
            if(Service.manager._id===Service.user._id){
                Service.doneTask = Service.manager.doneTask;
                Service.ongoingTask = Service.manager.ongoingTask;
            }else{
                Service.team.forEach(member=>{
                    if(member._id===Service.user._id){
                        Service.doneTask = member.doneTask;
                        Service.ongoingTask = member.ongoingTask;
                        console.log('foreach');
                    }
                });
            }


            // console.log('[ Service ][ task view ][ user ]',Service.user);
            // console.log('[ Service ][ task view ][ doneTask ]',Service.doneTask);
            // console.log('[ Service ][ task view ][ ongoingTask ]',Service.ongoingTask);
            // console.log('[ Service ][ task view ][ manager ]',Service.manager);
            
            // console.log('[ Service ][ task view ][ team members ]',Service.team);
            // console.log('[ Service ] logs ',Service.project.logList);
            // Service.goto('projectTab')
            console.log('[ Service ][ updating now ]complete');
            Service.updateProject({
                project:Service.project,
                meta:Service.meta,
                manager:Service.manager,
                doneTask:Service.doneTask,
                ongoingTask:Service.ongoingTask,
                team:Service.team
            })
            Service.timeChkFlag=true;
        })
        .catch(e=>console.log(e));
    },
}

export default Service;