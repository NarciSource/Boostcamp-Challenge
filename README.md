# 부스트캠프 챌린지 Day18. 챌린지 GPT 서버

> 그룹-짝번호 : 42-C  
> 캠퍼ID : J225, J279

## 나만의 체크포인트

1. TCP 에코 서버

   - 0.0.0.0 (ANY) 주소와 2024 포트 번호를 bind 하는 서버를 구현한다.
   - [x] 서버 역할을 담당하는 클래스(또는 모듈)을 구현한다.
   - [ ] 필요하다면 reuse를 위한 소켓 옵션을 지정한다. (소켓 옵션이 무엇인지 확인한다.)
   - [x] client가 접속하면 최소 4자리 / 최대 1024 크기만큼 읽고, 받은 문자열을 그대로 다시 전송한다.
   - [ ] 새로운 client가 접속하면 어떤 IP와 Port 번호에서 접속했는지 client 정보를 콘솔 로그로 출력한다.
   - [ ] 서버에서 받았던 문자열을 전송 완료하고 소켓 연결을 disconnect 끊는다.
   - [ ] TCP 클라이언트를 별도로 구현하지 않고, 터미널에서 telnet 명령으로 접속해서 테스트한다.

## 문제 해결 과정

## 학습 메모
