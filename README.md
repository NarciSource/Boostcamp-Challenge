# 부스트캠프 챌린지 Day18. 챌린지 GPT 서버

> 그룹-짝번호 : 42-C  
> 캠퍼ID : J225, J279

## 나만의 체크포인트

1.  TCP 에코 서버

    - 0.0.0.0 (ANY) 주소와 2024 포트 번호를 bind 하는 서버를 구현한다.
    - [x] 서버 역할을 담당하는 클래스(또는 모듈)을 구현한다.
    - [ ] ~~필요하다면 reuse를 위한 소켓 옵션을 지정한다. (소켓 옵션이 무엇인지 확인한다.)~~
    - [x] client가 접속하면 최소 4자리 / 최대 1024 크기만큼 읽고, 받은 문자열을 그대로 다시 전송한다.
    - [x] 새로운 client가 접속하면 어떤 IP와 Port 번호에서 접속했는지 client 정보를 콘솔 로그로 출력한다.
    - [x] 서버에서 받았던 문자열을 전송 완료하고 소켓 연결을 disconnect 끊는다.
    - [x] TCP 클라이언트를 별도로 구현하지 않고, 터미널에서 telnet 명령으로 접속해서 테스트한다.

2.  챌린지 GPT 만들기

    - [ ] 서버가 받은 모든 요청에는 적절한 응답을 보내준다. (아무런 반응이 없으면 안된다.)
    - [ ] 서버는 여러 클라이언트가 동시에 연결할 수 있어야 한다.
    - [ ] checkin 요청을 받은 후에도 연결을 유지해야 한다.

    1. checkin

       - [ ] 클라이언트는 서버에 처음 연결하고 나면 checkin 요청을 보내야 한다.
       - [ ] checkin 데이터로 campId를 문자열로 전달한다.
       - [ ] 캠퍼아이디 범위는 J001 에서 J256 까지로 제한한다.
       - [ ] 범위를 벗어나는 경우는 응답으로 실패를 알려줘야 한다.
       - [ ] 클라이언트는 캠퍼아이디가 범위를 벗어난 경우 재입력할 수 있어야 한다.
       - [ ] 이미 checkin 한 상태에서는 checkin을 할 수 없다.
       - [ ] checkin을 할 때 서버에서는 그룹을 할당한다.
       - [ ] 그룹은 최대 4명까지 가능해서 5명부터는 다른 그룹에 할당한다.
       - [ ] 그룹에서 빠져나가서 4명보다 작은 경우에는 재할당할 수 있다. (어떤 방식으로 구현해도 된다.)
       - [ ] checkin 응답으로는 배정된 그룹 번호를 정수형으로 알려준다.

    2. checkout

       - [ ] 특정 클라이언트가 checkout 요청을 보내면 이전에 checkin 했던 그룹에서 퇴장한다.
       - [ ] 만약 해당 그룹에 다른 캠퍼가 한 명이라도 남아있다면, 누군가 퇴장했다는 것을 message로 알려준다.
       - [ ] 클라이언트는 checkout 요청 후 응답을 받으면 연결을 끊는다.
       - [ ] 서버는 클라이언트가 checkout을 하지 않고 TCP 연결이 끊어져도 해당 연결은 checkout으로 동일하게 처리한다.

    3. summary

       - [ ] 체크인 이후에는 summary요청을 보내서 키워드를 받을 수 있다.
       - [ ] 데이터로는 day 몇 번째 미션인지 정수형으로 받는다.
       - [ ] 서버에서는 정수형을 확인해서 다음과 같은 내용을 응답한다.

    4. chat

       - [ ] 채팅 요청을 보내면 같은 그룹에 있는 사람들과 브로드캐스트를 할 수 있다.
       - [ ] 요청 데이터로는 maxCount를 정수형으로 보낼 수 있다.
       - [ ] 사람들과 주고받을 수 있는 메시지 개수는 maxCount보다 클 수 없다.
       - [ ] 최대 메시지 개수를 넘어가면 누군가 메시지를 보내도 서로에게 전달되지 않는다.

    5. finish

       - [ ] 채팅 요청을 보낸 캠퍼가 finish를 보내면 채팅을 멈출 수 있다.
       - [ ] 다시 브로드캐스트를 할 수 없다.

    6. broadcast

       - [ ] 브로드캐스트 요청을 보내면 chat 진행중인 경우는 그룹의 모두에게 브로드캐스트 되지만, 그렇지 않을 경우는 무시된다.
       - [ ] 브로드캐스트 요청의 데이터는 text로 문자열을 받을 수 있다.

    7. direct

       - [ ] 직접 특정한 캠퍼에서 메시지를 보낼 수 있는 기능이다.
       - [ ] 다이렉트 요청의 데이터로는 campId, text를 문자열로 받는다.
       - [ ] 만약 수신할 대상 캠퍼가 체크인을 하지 않은 경우는 보내지 않는다.
       - [ ] 체크인을 한 상태라면 text 메시지를 전달한다.

    8. clap

       - [ ] 체크인 그룹이 아니더라도 모든 클라이언트가 보내는 요청 횟수를 누적하기 위한 기능이다.
       - [ ] 요청할 때마다 하나씩 값을 누적해서 숫자를 응답한다.
       - [ ] 클라이언트는 반복해서 요청을 보낼 수 있다.

### 프로그래밍 요구사항

- [ ] TCP 방식으로 연결하는 소켓 클라이언트와 서버를 모두 구현해야 한다.
- [ ] 서버는 이전 단계에서 만들었던 에코 서버를 2024포트를 그대로 사용해서 개선한다.
- [ ] 전송하는 요청과 응답은 HTTP 규격을 비슷하게 만들기를 추천하고, 데이터 구조는 JSON 형식을 활용한다.
      꼭 HTTP와 동일하지는 않아도 되고, 사람이 읽어서 요청과 응답을 구분할 수 있으면 된다.

### 클라이언트 요구사항

- [ ] 클라이언트는 요청을 입력할 수 있는 비동기 입력 화면이 있어야 한다.
- [ ] 클라이언트는 서버로 보낸 요청과 서버에서 받은 응답, 그리고 서버에서 보내는 broadcast를 받아서 출력한다.
- [ ] 클라이언트는 checkin 성공한 시각을 변수에 기록한다.
- [ ] 클라이언트는 checkout 할 때 checkout 시각 - checkin 시각 => Core Time 활동 시간을 표시하고 프로그램을 종료한다.
- [ ] 클라이언트는 실행 후 입력한 명령을 모두 기록한다. !history 를 입력하면 서버로 보내지 않고 입력했던 순서대로 순번+\t+명령을 표시한다.

## 문제 해결 과정

## 학습 메모
