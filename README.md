# Day2. 리눅스와 자동화

## 나만의 체크포인트

-   [x] 각자 컴퓨터 환경에서 사용할 수 있는 가상 환경(Virtual Machine)에서 리눅스 운영체제를 설치한다.

    -   권장 설치 운영체제 : ubuntu 22.04 이상 &rightarrow; Ubuntu 24.04 LTS

-   [x] 가상 환경에 원격으로 접속할 수 있도록 ssh 설정을 하고, root 계정 이외에 본인 접속할 계정을 추가한다.

-   [x] 본인 계정에 대한 패스워드를 설정한다.

-   [x] 로컬 컴퓨터에서 가상 환경 리모트 컴퓨터에 ssh로 접속해서 본인 계정으로 로그인한다.

-   [x] 본인 계정으로 /scrap 디렉토리를 생성한다.

    -   764 모드로 접근 권한을 바꿔서, 본인 계정에서도 쓸 수 있도록 설정한다.

-   [x] 가상 환경에서 터미널을 열고 /scrap 경로에 대해 권한을 확인하는 화면을 캡처한다.

-   [x] 가상 환경에 오늘 날짜 + 서울 시간대로 지정해서 로컬과 가상 환경이 동일하도록 맞춘다.

-   [x] 가상 환경에서 터미널을 열고 date 명령으로 오늘 날짜를 출력한 상태로, 화면을 캡처한다.

-   [x] 가상 환경에 node.js 를 설치하고 버전을 확인한다.

-   [x] 어제 작성한 day1 미션 js파일을 복사해서 실행한다.

## 문제 해결 과정

### SSH 서버 통신 구성

-   가상환경 서버

    1. Ubuntu 24.04 LTS 구성
    2. 네트워크 tcp 127.0.0.1 2222 &rightarrow; 22 로 포워딩 설정
    3. openssh 설치 `sudo apt install -y openssh-server`
    4. ssh 서버 실행 `sudo systemctl start ssh`
    5. 접속할 계정 추가 `sudo adduser user`

-   로컬 클라이언트

    1. 로컬에서 리모트 컴퓨터로 접속 `ssh -p 2222 user@127.0.0.1`

### 폴더 권한 확인

-   로컬 클라이언트

    1. 폴더 생성 `mkdir -m 764 scrap`
    2. user 폴더에도 다른 계정에서 들어오게 권한 변경 `chmod 755 user`

-   가상환경

    1. `cd /home/user`
    2. `ls -l`

![ls](https://gist.github.com/user-attachments/assets/3c5c5e4e-6f3d-4513-b1a4-495dc99fbb42)

### 시간 동기화

1.  ntp 패키지 설치 `sudo apt install ntp`
2.  ntp 서비스 실행 `sudo systemctl start ntp`
3.  서울로 지역 설정 `sudo timedatectl set-timezone Asia/Seoul`
4.  날짜 확인 `date`

![date](https://gist.github.com/user-attachments/assets/f7100d06-0a75-4449-b02c-4844623ecfc7)

### 노드 설치

1. `sudo apt install nodejs`
2. `node --version`

![node](https://gist.github.com/user-attachments/assets/48983c7b-cd3d-4eb4-ab7a-fab6b04b7173)

### day1 미션 실행

-   로컬

    1. 파일 서버로 전송 `scp -P 2222 * user@127.0.0.1:/home/user/`

-   가상환경

    1. 노드로 실행 `node ./manage.js`

![exec](https://gist.github.com/user-attachments/assets/4721a796-5d42-457a-a76b-2fc3983bd7a3)

## 학습 메모

-   ssh 원격 접속 에러(WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!)  
    [출처](https://visu4l.tistory.com/entry/ssh-원격-접속-에러WARNING-REMOTE-HOST-IDENTIFICATION-HAS-CHANGED)
