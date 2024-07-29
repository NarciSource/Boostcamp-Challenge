# 동작예시 해석

## 지시&출력

### 접수 물품

1. 소형(3분)
2. 중형(7분)
3. 대형(15분)

-   > 접수할 물품을 입력하세요. 예) 소형 2개 => 1:2

    -   > 1:2
    -   <U>[ 1 1 ]</U> &rarr; _DashBoard_
    -   소형 분류 시작 &rarr; _Sorting_Worker_
    -   **[1]** <U>[ 1 ]</U> &rarr; _DashBoard_

-   (1분경과)

    -   > 3:1
    -   **[1]** <U>[ 1 3 ]</U> &rarr; _DashBoard_

-   (2분경과)

    -   소형 물품 배송 시작 &rarr; _Delivery_Worker_
    -   소형 분류 시작 &rarr; _Sorting_Worker_

-   (2분경과)

    -   > 2:2
    -   **[1]** <U>[ 3 2 2 ]</U> &rarr; _DashBoard_

-   (1분경과)

    -   소형 물품 배송 대기
    -   **[3]** <U>[ 2 2 ]</U> &rarr; _DashBoard_
    -   대형 분류 시작 &rarr; _Sorting_Worker_

-   (7분경과)

    -   소형 물품 배송 완료 &rarr; _Delivery_Worker_
    -   소형 물품 배송 시작 &rarr; _Delivery_Worker_

-   (8분경과)

    -   **[2]** <U>[ 2 ]</U> &rarr; _DashBoard_
    -   중형 분류 시작 &rarr; _Sorting_Worker_

-   (2분경과)

    -   소형 물품 배송 완료 &rarr; _Delivery_Worker_

-   (5분경과)

    -   대형 물품 배송 시작 &rarr; _Delivery_Worker_
    -   중형 분류 시작 &rarr; _Sorting_Worker_
    -   **[2]** <U>[&nbsp;&nbsp;&nbsp;]</U> &rarr; _DashBoard_

-   (7분경과)

    -   <U>[&nbsp;&nbsp;&nbsp;]</U>
    -   대형 물품 배송 완료 &rarr; _Delivery_Worker_

-   (3분경과)

    -   중형 물품 배송 시작 &rarr; _Delivery_Worker_

-   (중간생략)
-   모든 물품이 발송되었습니다.

## 해석

-   n분 경과는 새로운 출력이 필요할 때 앞 출력과의 인터벌인듯
-   ~~입력은 매분 받나? 없으면 패스하고?~~ &rarr; 비동기로 입력과 동작이 따로 되나봄
-   배송 대기 알림은 누가 주지? ~~배달 기사~~ ~~분류 작업자~~ 택배 현황판?
