const onGameSDKMessage = (e) => {
    if (!e || !e.data) { return; }
    switch (e.data.operation) {
        case 'receiveGameSdkType':
            receiveGameSdkType(e.data.data)
            break;
        case 'receiveUserInfo':
            receiveUserInfo(e.data.data)
            break;
    }
};



;(function(global){
    var GameSdk={
        game_sdk_ios:false,
        game_SDK_H5:false,
        game_SDK_android:false,
        loginCallback:null,
        platformCallback:null,
        isSimulatorCallback:null,
        realNameCallback:null,
        bindPhoneCallback:null,
        resumeCallback:null,
        pauseCallback:null,
        showLoginCallback:null,

        sendVersion(version){
            if (window.$App&& $App.sendVersion){
                $App.sendVersion(version)
            }else if (window.webkit&&window.webkit.messageHandlers&& window.webkit.messageHandlers.sendVersion){
                window.webkit.messageHandlers.sendVersion.postMessage(version);
            }
        },
        loginBtnShow:function(callback){
            this.showLoginCallback=callback
        },
        intoLoginScene:function(){
            if (window.$App&& $App.intoLoginScene){
                $App.intoLoginScene("")
            }else if (window.webkit&&window.webkit.messageHandlers&& window.webkit.messageHandlers.intoLoginScene){
                window.webkit.messageHandlers.intoLoginScene.postMessage('');
            }
        },
        login:function(callback){
            this.loginCallback=callback    
            if(this.game_SDK_android){
                $App.appLogin("")
            }else if(this.game_SDK_H5){
                window.parent.postMessage({ operation: 'login'}, '*')
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.appLogin.postMessage('');     
            }           
        },
        getPlatformType:function(callback){
            this.platformCallback=callback
            if(this.game_SDK_android){
                $App.getPlatformType("")
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.getPlatformType.postMessage('');     
            }               
        },
        isSimulator:function(callback){
            this.isSimulatorCallback=callback    
            if(this.game_SDK_android){
                $App.isSimulator("")
            }else if(this.game_SDK_H5){
                window.parent.postMessage({ operation: 'isSimulator'}, '*')
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.isSimulator.postMessage('');     
            }              
        },
        openPay:function(orderInfo){          
            if(this.game_SDK_android){
                $App.openPay(orderInfo)
            }else if(this.game_SDK_H5){
                window.parent.postMessage({ operation: 'openPay',orderInfo:orderInfo}, '*')
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.openPay.postMessage(orderInfo);     
            }   
        },
        exit:function(){           
            if(this.game_SDK_android){
                $App.exit()
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.exit.postMessage('');     
            }  
        },
        exitLogin:function(){
            if(this.game_SDK_android){
                $App.exitLogin()
            }else if(this.game_SDK_H5){

            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.exitLogin.postMessage('');     
            }  
        },
        uploadRoleInfo:function(roleInfo){
            var roleJson=JSON.parse(roleInfo);
            if (roleJson.sex==0){
                roleJson.sex=1
            }else if (roleJson.sex==1){
                roleJson.sex=2
            }
            roleInfo=JSON.stringify(roleJson)
            if(this.game_SDK_android){
                $App.uploadRoleInfo(roleInfo)
            }else if(this.game_SDK_H5){
                window.parent.postMessage({ operation: 'uploadRoleInfo',roleParam:roleInfo}, '*')
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.uploadRoleInfo.postMessage(roleInfo);     
            }  
        },
        realName:function(callback){
            this.realNameCallback=callback   
            if(this.game_SDK_android){
                $App.realName("")
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.realName.postMessage('');     
            }   
        },
        bindPhone:function(callback){
            this.bindPhoneCallback=callback    
            if(this.game_SDK_android){
                $App.bindPhone("")
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.bindPhone.postMessage('');     
            } 
        },
        init:function(callback){
            if (window.$App){
                this.game_SDK_android=true
                return true
            }else if (window.webkit&&window.webkit.messageHandlers&& window.webkit.messageHandlers.appLogin){
                 this.game_sdk_ios=true
                return true
            }
            return this.game_SDK_H5
        },
        onResume:function(callback){
           this.resumeCallback=callback     
        },
        loadingComplete:function(){
            if(this.game_SDK_android){
                $App.loadingComplete("")
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.loadingComplete.postMessage('');     
            } 
        },
        openDeal:function(type){
            if(this.game_SDK_android){
                $App.openDeal(type)
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.openDeal.postMessage(type);     
            } 
        },
        onPause:function(callback){
           this.pauseCallback=callback     
        },
        onUserInfoError:function(){
            if(this.game_SDK_android){
                $App.onUserInfoError("")
            }else if (this.game_sdk_ios){
                window.webkit.messageHandlers.onUserInfoError.postMessage('');     
            } 
         }
    }
    global.GameSdk=GameSdk
    window.addEventListener('message',onGameSDKMessage)
    // 兼容CommonJs规范导出
    if (typeof module !== 'undefined' && module.exports) module.exports = GameSdk;
})(this || window);

var game_view_pause=false


function receiveUserInfo(userInfo){
    GameSdk.loginCallback(userInfo)
}

function receiveLoginBtnShow(){
    GameSdk.showLoginCallback()
}

function receiveOnResume(r){
    if(game_view_pause){
        GameSdk.resumeCallback()
        game_view_pause=false
    }
}

function receiveOnPause(r){
    if(!game_view_pause){
      game_view_pause=true  
      GameSdk.pauseCallback()
    }
}

function receivePlatform(platform){
    GameSdk.platformCallback(platform)
}

function receiveIsSimulator(result){
    GameSdk.isSimulatorCallback(result)
}

function receiveRealName(realInfo){
    GameSdk.realNameCallback(realInfo)
}

function receivePhoneInfo(phone){
    GameSdk.bindPhoneCallback(phone)
}

function receiveGameSdkType(type){
    setgametype(type)
}

function receiveGameChannel(channel){
    setChannel(channel)
}


