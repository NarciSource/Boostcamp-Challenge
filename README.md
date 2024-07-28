# 부스트캠프 챌린지 Day9. 이벤트 매니저

> 그룹-짝번호 : 16-C  
> 캠퍼ID : J231, J225

## 나만의 체크포인트

-   [x] sharedInstance() 싱글톤으로 접근하도록 함수를 구현한다. 여러 번 호출해도 한 번 생성한 동일한 인스턴스를 반환한다.

-   [x] add(subscriber, eventName, sender, handler) Subscriber를 추가할 때는 subscriber 객체와 이벤트 이름, 이벤트 발행 객체를 모두 합쳐서 고유한 키로 봐야한다.

    -   [x] subscriber 와 sender 모두 객체 인스턴스를 인자값으로 전달한다
    -   [x] sender가 undefined: 모든 객체가 보내는 eventName 이벤트는 해당 구독자가 모든 알림을 받는다.
    -   [x] eventName이 빈 문자열: sender의 모든 이벤트를 받는다.
    -   [x] handler는 클로저로 이벤트를 받을 때 실행되어야 한다. 매개변수로 이벤트를 전달 받는다.

-   [x] remove(subscriber)
        subscriber를 제거할 때는 subscriber로 등록된 모든 조건을 제거한다.

-   [x] postEvent(eventName, sender, userInfo)

    -   [x] Object 타입으로 userData를 전달할 수 있다. undefined으로 생략가능하다.

    -   [x] 내부에서 Event 객체를 생성하고 구독 핸들러에 전달한다.

-   [x] stringify()

    모든 Subscriber 조건을 표시하는 문자열을 리턴한다.

-   [x] EventManager 내부에는 그림처럼 이벤트 조건을 비교할 수 있는 규칙 데이터가 있어야 한다. 이벤트가 발생했을 때 Subscriber 구독자를 찾기 위한 데이터 구조와 표를 readme에 추가한다

-   [x] post() 이벤트를 보낼 때 동기 방식을 위한 SyncQueue, 비동기 처리를 위한 AsyncQueue, 일정 시간에 맞춰서 delay 혹은 예약 발송이 가능한 DelayQueue를 선택할 수 있도록 개선한다.

-   [x] subscriber도 handler를 처리하는 Event Emitter를 지정할 수 있도록 개선한다

-   [x] handler에 Event 와 함께 이벤트가 종료를 의미하는 completed flag를 전달한다

-   [x] Promise와 Event Emitter를 활용해서 구현해야 한다.

-   [x] 동기방식은 postEvent()는 기존과 동일하게 모든 subscriber에 이벤트 브로드캐스트 동작이 끝나고 나서 리턴한다.

-   [x] 비동기방식 postEvent()는 특정한 Event Emitter에 코드를 넣고, 곧바로 리턴한다.

-   [x] 지연 혹은 예약 방식 postEvent()는 비동기 방식처럼 특정한 Event Emitter에 코드를 넣고, 지정한 시각에 해당 코드가 실행되야 한다.

-   [x] Subscriber 핸들러를 실행하는 Event Emitter를 구분해서 출력한다.

-   [x] 비동기방식이나 지연 방식을 테스트하려면 main에서 기다리는 코드가 필요하다.

-   [x] 비동기와 지연 방식을 확인하기 위해서 이벤트 전송 시각과 subscriber 코드 동작 시각을 출력한다.

-   [x] 모든 Subscriber 조건과 실행 결과도 함께 출력해서 gist에 저장한다.

### 🪚 재구현

특정한 PublisherA가 EventManager를 호출했을 때 다른 PublisherB도 호출할 수 있도록 Worker Thread를 구현한다. &rightarrow; ~~postEvent~~ eventManager

-   [x] ~~퍼블리셔 별로 이벤트 매니저를 관리~~

    1. 선언

    -   [x] 이벤트가 등록될 퍼블리셔(컴포넌트)가 정해지면 워커쓰레드 생성 → 자신만의 이벤트매니저 생성

    2. 등록

    -   [x] 이벤트 등록(subscriber, eventName, publisher, handler) → 워커쓰레드로 전송 → 이벤트매니저에 등록
            ⇒ 각자 컴포넌트마다 이벤트 등록이 독립적으로 행해진다.

    3. 실행

    -   [x] 이벤트 실행(eventName, publisher, userInfo) → 워커쓰레드로 전송 → 이벤트매니저에서 실행

-   [ ] 관리와 핸들러 수행 분리

    -   [ ] 워커쓰레드로 핸들러 수행 이동, emitter

## 문제 해결 과정

### 이름 정의

-   파라미터

    -   subscriber: 이벤트를 구독하려는 객체. 특정 이벤트가 발생할 때 호출될 핸들러 함수를 제공하는 객체
    -   sender: 이벤트를 발행하는 객체. = publisher
    -   handler: 이벤트가 발생할 때 호출될 구독자의 함수 = event

-   함수
    -   add: 구독자 등록
    -   postEvent: 이벤트 발행

### 짝설계

-   ERD

![ERD](https://lucas-image.codesquad.kr/1656053335179event-manager-flow.png)

-   규칙 데이터 구조 표

    ![규칙데이터](https://lucas-image.codesquad.kr/1627350268761Screen%20Shot%202021-07-27%20at%2010.43.32%20AM.png)

    -   Map 자료구조를 사용
        -   key: [Subscriber, EventName, Sender] 를 묶음
        -   value: Handler

### pseudo code

```js
class EventManager
    table
    eventMap
    syncQueue <- SyncEventEmitter <- EventEmitter
    asyncQueue <- AsyncEventEmitter
    delayQueue <- DelayEventEmitter

    sharedInstance: singleton

    function add
        table <- [key: subscriber, eventName, publisher], value: handler
        emitter <- [key: eventName, publisher], value: handler

        emitter.on -> handler

    function postEvent
        table
            filter
            forEach
                delayQueue.emit <- key
                syncQueue.emit <- key
                asyncQueue.emit <- key
```

### Worker Thead 사용

#### 🔍 문제

-   요구사항: 특정한 PublisherA가 EventManager를 호출했을 때 다른 PublisherB도 호출할 수 있도록 Worker Thread를 구현
-   특이사항:
    1. 워커 쓰레드는 독자적인 메모리 구조를 가진다. &rightarrow; 공통 메모리가 없다. JS 쓰레드만의 특징.
    2. 모든 쓰레드의 싱글톤 객체 공유 불가.
    3. 쓰레드간 데이터 통신은 직렬화를 거친다. &rightarrow; 컨텍스트를 잃어버린다. 함수를 사용하지 못함.
        - Structured Clone Algorithm을 사용하여 데이터를 직렬화
        - 함수, 클래스 인스턴스, DOM 노드, Error, RegExp 직렬화 불가

#### ❌ 실패

-   ~~Worker에게 통신을 전송하고 종료 핸들을 하는 과정에 새로운 쓰레드를 가진다.~~
-   ~~종료 핸들의 콜백에선 메인 쓰레드를 클로저한다.~~
-   ~~Worker 통신을 통해 만들어진 서브 쓰레드에서 클로저한 메인 쓰레드의 컨텍스를 사용할 수 있다.~~

#### 🤦실패 사유

-   콜백 함수는 새로운 쓰레드에서 실행되고 있는 것이 아니다.
-   콜백은 이벤트루프로 메인 쓰레드에서 비동기로 실행되고 있을 뿐이다.

#### 🌱 새로운 시도

-   퍼블리셔(컴포넌트)끼리 이벤트 파급은 필요하지 않다.
-   퍼블리셔 마다 워커쓰레드를 가진다.
-   워커쓰레드에서 이벤트매니저를 각자 갖는다. &leftarrow; 독립적인 메모리를 가지기 때문
-   이벤트 등록과 수행을 모두 워커쓰레드에서 이벤트매니저를 통해 수행한다.

-   이벤트매니저가 분배되어 있는건 아무래도 좋은 구조는 아닌 것 같다.
    -   중앙(메인 쓰레드)에서 모든 바인딩된 이벤트 관리가 필요하기 때문
    -   💡 관리는 메인에서 핸들러 수행은 서브 쓰레드에서?

### 결과

![event](https://gist.github.com/user-attachments/assets/cacd32f2-dc15-4f2a-a427-e41f3e016fe8)

## 학습 메모

-   [Worker threads](https://nodejs.org/api/worker_threads.html#worker-threads)
-   [The structured clone algorithm](https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)
-   [EventEmitter](https://nodejs.org/docs/latest/api/events.html#class-eventemitter)
-   [Publisher-Subscriber](https://learn.microsoft.com/ko-kr/azure/architecture/patterns/publisher-subscriber)
