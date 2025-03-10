# 부스트캠프 챌린지 Day5. 어벤저스 보드게임

## 나만의 체크포인트

### 핵심기능

-   [x] Board 클래스부터 구현하고 Ultron, BlackWidow, Hulk, CaptainAmerica, IronMan, HawkEye, Thor 클래스를 각각 다른 파일로 저장한다.

    -   파일을 추가하거나 기능을 추가할 때마다 소스 파일을 gist에 커밋한다.

-   [x] 프로그램을 구현할 때 입력 → 검증 → 처리/계산 → 형식 → 출력 단계를 구분한다.

    -   각 단계를 담당하는 객체 혹은 모듈로 분리한다.

-   [x] 프로그램을 시작하면 랜덤하게 10개 캐릭터를 고르고 위치에 배치한다.

    -   Ultron은 항상 3개를 배치해야 한다.

    -   BW, CA, TH는 최소한 1개씩 배치해야 한다.

    -   HK는 최대 1개만 배치가 가능하다.

    -   BW, IM, HE는 최대 2개까지 배치가 가능하다.

-   [x] 프로그램을 동작하는 동안 사용자와 컴퓨터가 반복해서 입력한다.

-   [x] 공격하는 나의 캐릭터와 상대편 목표 지점을 차례로 입력받아서 공격한다.

    입력값은 캐릭터 문자와 -> 화살표와 공격하려는 위치 2자리 문자를 입력받는다.
    예시) IM->B2 : IM으로 B2를 공격한다.

-   [x] 입력 형식에 맞지 않거나 자신의 차례가 아닌 경우는 다시 입력받는다.

-   [x] 만약 공격한 곳에 상대편 캐릭터가 있다면 HIT를 출력하고, 없다면 MISS를 출력한다.

    -   [x] HIT 공격 성공일 경우 공격포인트만큼 HP가 감소한다.

    -   [x] 만약 HP가 0이 되면 해당 캐릭터를 사라진다.

-   [x] 상대편이 자신을 공격해서 5번 공격이 성공할 때 마다 (HIT가 5가 되면) 나의 특정한 캐릭터를 다른 위치로 이동시킬 수 있다. 이동하는 규칙은 캐릭터마다 다르다.

-   [x] 입력값이 ?물음표를 입력하면 상대편 보드에서 가장 캐릭터가 많이 배치된 ROW를 출력한다. 딱 한 번만 사용할 수 있다.

### 프로그래밍 요구사항

-   보드 구성

    -   [x] Board는 각각 5x6 (가로:행 row x 세로:열 column) 크기 캐릭터 존재 여부를 관리한다.

    -   [x] 행에는 최소 0개에서 최대 3개 캐릭터까지만 배치할 수 있다.

    -   [x] Board는 현재 남아 있는 캐릭터를 확인해서 체력 점수 총합을 출력한다.

    -   [x] Board는 모든 말의 위치를 <u>간접적으로</u>(???) 알 수 있어서 전체를 출력할 수 있다. 출력을 위한 display() 함수는 적절한 데이터 구조로 A행부터 D행까지 전체를 행 단위로 리턴한다.

        -   [x] 출력을 위한 문자열 배열로 리턴하면 안되고 필요한(문자열이 아닌 타입을 포함하는) 데이터 구조를 리턴한다.

        -   [x] Board에서 return한 데이터 구조를 바탕으로 출력 형식을 담당하는 객체(혹은 모듈)에서 문자열 배열 바꾸고 출력한다.

        -   울트론은 UL로, 어벤저스는 각 이름 두 글자를 표시한다.

-   특정 캐릭터 초기 조건 생성하기 함수

    -   [x] 특정 위치에 특정 캐릭터를 생성하는 함수를 구현한다.

    -   [x] 이 함수는 초기 위치가 아니면 생성하지 않는다.

    -   [x] 이미 해당 위치에 다른 말이 있으면 생성하지 않는다.

    -   [x] 캐릭터 종류별로 최대 개수보다 많이 생성할 수는 없다.

    -   [x] Ultron 캐릭터는 최대 3개. Avengers는 최대 2개까지 가능하다.

    -   [x] 생성하지 않는 경우는 exception 예외처리로 상위에서 어떤 예외상황인지 판단한다.

-   특정 캐릭터 무조건 생성하기 함수

    -   특정 위치에 특정 캐릭터를 생성하는 함수를 구현한다.

    -   [x] 바로 직접 조건 생성함수와 다르게 어떤 캐릭터든지 어느 위치에 놓아도 상관없다.

        -   [x] 이미 해당 위치에 다른 말이 있으면 생성하지 않는다.

        -   [x] 최대 개수도 고려하지 않는다.

-   특정 위치 공격 함수

    -   [x] 입력받은 특정 위치를 공격할 때는 Board에서 제공하는 함수를 사용한다.

    -   [x] 내가 공격하려는 캐릭터를 전달하고, 공격하는 to 위치에 캐릭터가 있을 때만 동작한다.

    -   [x] 해당 자리에 캐릭터가 있으면 규칙에 따라 남은 HP를 반환하고, HP가 0이 되거나 위치에 캐릭터가 없으면 0을 반환한다.

-   캐릭터 공통

    -   모든 캐릭터는 위치값을 저장할 Position 타입으로 갖는다.

        -   [x] 꼭 Position 값을 다루기 위한 데이터 구조를 별도로 만든다.

        -   [x] Position은 행row은 A부터 D까지, 열column는 1부터 6까지 생성 가능하다.

        -   [x] row과 column 값은 enum으로 선언한다.

    -   캐릭터는 편이 확실하게 구분되어야 한다.

        -   [x] 상태값으로 지정한다면 생성할 때 결정하고 변경할 수 없어야 한다.

        -   [x] 타입으로 구분한다면 다형성으로 동작하도록 한다.

## 문제 해결 과정

### 문제 이해

1. 서로 다른 보드, 서로 공격
   &leftarrow; 게이머는 자신의 보드만 볼 수 있다? 공격은 상대방 보드에서 행해진다?

2. 프로그램을 시작하면 랜덤하게 10개 캐릭터를 고르고 위치에 배치한다.
   &leftarrow; 프로그램 단에서 Board 판에 캐릭터를 배치

3. 공격하는 나의 캐릭터와 상대편 목표 지점을 차례로 입력받아서 공격한다.
   &leftarrow; 유일한 사용자 입력

4. 공격하는 나의 캐릭터와 상대편 목표 지점을 차례로 입력받아서 공격한다.
   &leftarrow; 나의 캐릭터를 사용, 상대방 보드에서?

5. IM->B2 : IM으로 B2를 공격한다.
    - IM은 공격하는 나의 캐릭터. &leftarrow; 내 보드에 있는?
    - B2는 상대편 목표 지점. &leftarrow; 상대방 보드에 있는?
    - 공격 범위는 무제한.

### TypeScript 적용 이유

-   enum 사용
-   타입 유효성 검사 필요

### pseudo code

```js
class Character
    hp
    power
    reduce_hp
        hp <- hp - damage

class BlackWidow extends Character
class CaptainAmerica extends Character
class HawkEye extends Character
...


class Position
    row
    column


class Board
    board: Character[][]

    score
        sums of all characters hp in board

    attack
        target.reduce_hp( character.power )

    move
        if hit >= 5
        and is_valid of from_position and to_position
        and can_move to character
            set_piece( to_position, character )

    question
        if just_one_time
            return find max_row


function game
    boards <- initial_board

    while not exist_condition
        case user
            input <- prompt

            if input === ?
            then print( computer_board.max_row )

            if input === MOVE
            then move character on user_board

            if input === ATTACK
            then position, character <- prompt

        case computer
            position, character <- random choice


        opponent_board.attack( character.power, position )

        turn <- switch to turn
```

### 출력한 결과

![demo](https://gist.github.com/user-attachments/assets/084f8cbc-33f7-4d39-9040-8b208e7f5a28)
![exit](https://gist.github.com/user-attachments/assets/3863bac8-9644-477f-ab8a-d16a4e1d564d)

## 학습 메모

-   [enums](https://www.typescriptlang.org/ko/docs/handbook/enums.html)
-   [abstract class](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
