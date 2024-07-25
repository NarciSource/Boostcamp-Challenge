# 부스트캠프 챌린지 Day9. 이벤트 매니저

## 나만의 체크포인트

-   [ ] sharedInstance() 싱글톤으로 접근하도록 함수를 구현한다. 여러 번 호출해도 한 번 생성한 동일한 인스턴스를 반환한다.

-   [ ] add(subscriber, eventName, sender, handler) Subscriber를 추가할 때는 subscriber 객체와 이벤트 이름, 이벤트 발행 객체를 모두 합쳐서 고유한 키로 봐야한다.

    -   subscriber 와 sender 모두 객체 인스턴스를 인자값으로 전달한다

    -   eventName 은 이벤트를 지칭하는 이름이다. "" 빈값도 가능하다

    -   handler는 클로저로 이벤트를 받을 때 실행되어야 한다. 매개변수로 이벤트를 전달 받는다.

-   [ ] remove(subscriber)
        subscriber를 제거할 때는 subscriber로 등록된 모든 조건을 제거한다.

-   [ ] postEvent(eventName, sender, userInfo)

    -   이벤트를 발행할 때는 이벤트 이름을 꼭 명시해야 한다.

    -   이벤트를 발생하고 전송하는 Publisher 객체 인스턴스를 꼭 넘겨야한다.

    -   Object 타입으로 userData를 전달할 수 있다. undefined으로 생략가능하다.

    -   내부에서 Event 객체를 생성하고 구독 핸들러에 전달한다.

-   [ ] stringify()

    모든 Subscriber 조건을 표시하는 문자열을 리턴한다.

## 문제 해결 과정

### 짝설계

### 결과

## 학습 메모
