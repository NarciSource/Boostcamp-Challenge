# 부스트캠프 챌린지 Day7. 파일 경로 라이브러리 만들기

## 나만의 체크포인트

-   [x] 파일과 디렉토리 경로 Path를 처리하는 라이브러리 모듈 또는 클래스를 구현한다.

    -   node에 이미 있는 Path 클래스/모듈과 상관없이 다음 조건을 만족하는 직접 Path 객체를 구현해야 한다.

-   [x] Path 문자열을 초기 매개변수로 전달해서 Path 객체를 생성할 수 있어야 한다.

    -   UNIX 스타일, 윈도우 스타일 구성 방식을 모두 지원해야 한다.

        -   [x] UNIX : 디렉토리 분리 문자 / forward slash, Path 요소 구분 : colon

        -   [x] 윈도우 : 디렉토리 분리 문자 \ backword slash, Path 요소 구분 ; semicolon

    -   본인 컴퓨터 운영체제와 상관없이 UNIX나 윈도우 형식을 모두 동작하도록 구현해야 한다.

-   [x] 파일 경로를 생성하면 경로를 분석하고, 해당 파일이 있는지 여부를 판단해야 한다.
-   [x] Path 파싱을 위해서 정규표현식(regular expression)을 학습하고 필수적으로 사용한다.
    -   [x] 단위 테스트
-   [x] 다음과 같은 Path 요소에 접근해서 읽고, 변경할 수 있어야 한다.

    -   [x] root : String
    -   [x] base : String
    -   [x] name : String
    -   [x] ext : String
    -   [x] components : [String]
    -   [x] absoluteString : String //readonly. 직접 저장하면 안되고 분석한 내용으로 조합해서 만들어야 함
    -   [x] existFile : Bool //readonly. 생성 시점을 기준으로 파일이 존재하는지 여부를 판단
    -   [x] fileSize : Int //readonly. 생성 시점을 기준으로 파일의 크기

-   [x] pathComponents는 읽기만 가능하도록 만들고 변경하는 것은 메소드를 만든다.

-   [x] 경로에 요소를 추가하는 메소드 : appendComponent()

-   [x] base를 제외한 마지막 경로 제거하는 메소드 : deleteLastComponent()

-   [x] 단위테스트

## 문제 해결 과정

## 학습 메모

-   파일 경로 파싱 정규식: ^(\/|\w:\\)?([\w\/\.\\]+(?:\/|\\))?([^./]+)(\.\w+)?$
-   [Node Process 모듈](https://nodejs.org/api/process.html)

### 파일 경로 용어

-   root (루트): 파일 시스템의 최상위 디렉토리 또는 드라이브.

    -   Unix/Linux: /
    -   Windows: 각 드라이브 C:\ D:\

-   base (베이스): 경로에서 확장자와 파일 이름을 포함한 부분을 지칭. name + ext

-   name (이름): 파일 또는 디렉토리의 이름.

-   ext (확장자): 파일 이름의 마지막 부분으로, 파일의 유형이나 형식.

-   components (구성 요소): 파일 경로를 구성하는 각각의 디렉토리와 파일 이름.

-   absoluteString (절대 경로 문자열): 파일이나 디렉토리의 절대 경로를 문자열로 나타낸 것. 절대 경로는 파일 시스템의 루트부터 시작하여 경로를 전체적으로 설명.

-   existFile (파일 존재 여부): 특정 경로에 파일이 실제로 존재하는지 여부를 확인.

-   fileSize (파일 크기): 파일의 크기를 바이트 단위로 나타낸 것.
