@echo off
@echo             
@echo ╔═══════════════════════╗
@echo ‖    敏哥独家制作GOM引擎完美智能假人第一版     ‖
@echo ‖                QQ：776118181                 ‖
@echo ╰═══════════════════════╯
echo.
echo 注意：清理假人数据以后假人原数据无法恢复
echo.
pause
del %cd%\假人配置\人物_战士\*.* /q
del %cd%\假人配置\人物_法师\*.* /q
del %cd%\假人配置\人物_道士\*.* /q
cd.>%cd%\假人数据\个人数据Save.txt
cd.>%cd%\假人数据\消费积分Save.txt
cd.>%cd%\假人数据\假人死亡名单.txt
echo.>%cd%\假人会员\会员名单.txt
@echo off
@echo.
echo 假人数据清理完成......
echo.
echo [3]秒后本窗口将自动关闭,请稍等...
ping 127.0.0.1 -n 3 >NUL