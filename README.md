# 부스트캠프 챌린지 Day20. 문제해결력 미션

## 나만의 체크포인트

### VirtualMemory 클래스

-   currentPage : Page
-   currentPageIndex : Int
-   swapFile : Page[8]

## public 메소드

-   [x] init(baseAddress)

    -   [x] 클래스를 초기화하면서 baseAddress를 F000~FA00 범위 내에서 지정할 수 있다
    -   [x] baseAddress를 시작으로 8개의 Page를 초기화하고 swapFile에 저장한다
    -   [x] 그 중에 첫번째 페이지를 currentPage에 지정 혹은 복사하고 currentPageIndex는 0으로 지정한다

-   [x] alloc(size, length) -> Address

    -   [x] 현재 선택된 페이지에 size\*length 만큼 할당이 가능한지 확인한다

    -   [x] 할당 가능하면 할당하고 첫번째 주소를 리턴한다

    -   [x] 만약 할당이 불가능하면, 다음 페이지를 현재 페이지로 가져오고 다시 할당이 가능한지 확인한다 (pageOut 한 다음에 pageIn 처리한다)

    -   [x] 최소 페이지부터 8번째 페이지까지 확인하고 할당이 안되면 주소는 0값을 리턴한다

    -   현재 페이지에는 마지막 가져온 페이지가 남는다

-   [x] read(address) -> Value8

    -   [x] 현재 선택된 페이지 주소가 포함되는지 확인하고 포함될 경우 8바이트만 읽어서 리턴한다

    -   [x] 만약 해당 페이지 주소가 아닌 경우, 주소를 포함하는 페이지를 swapFile에서 불러온다 (pageOut 한 다음에 pageIn 처리한다)

    -   [x] 주소가 포함된 페이지를 불러와서 8바이트만 읽어서 리턴한다

-   [x] write(address, value)

    -   [x] 현재 선택된 페이지 주소가 포함되는지 확인하고 포함될 경우 인자값 value를 해당 주소에 덮어쓴다. 인자값 value는 8바이트라고 가정한다

    -   [x] 값을 덮어쓰고 나면 pageOut() 처리한다

    -   [x] 만약 해당 페이지 주소가 아닌 경우, 주소를 포함하는 페이지를 swapFile에서 불러온다 (pageOut 한 다음에 pageIn 처리한다)

    -   [x] 주소가 포함된 페이지를 불러와서 value를 해당 주소에 8바이트 덮어쓰고 pageOut 처리한다

-   [x] free(address)

    해당 주소값을 해제하고 여유 공간으로 확보한다

-   [x] peek() -> HexString

    현재 페이지 값을 한꺼번에 확인할 수 있도록 16진수 문자열로 출력한다

-   [x] report() -> [pageInCount, pageOutCount]

    지금까지 pageInCount와 pageOutCount를 순서대로 배열에 담아 리턴한다

### private 메소드

-   [x] pageIn(index)

    -   swapFile[currentPageIndex] 에 값을 현재 페이지에 덮어쓴다

    -   pageInCount를 +1 증가한다

-   [x] pageOut(index)

    -   현재 페이지에 있는 값을 swapFile[currentPageIndex] 에 덮어쓴다

    -   pageOutCount를 +1 증가한다

## 문제 해결 과정
