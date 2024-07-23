# 부스트캠프 챌린지 Day7. 파일 경로 라이브러리 만들기

## 나만의 체크포인트

-   파일과 디렉토리 경로 Path를 처리하는 라이브러리 모듈 또는 클래스를 구현한다.

    -   node에 이미 있는 Path 클래스/모듈과 상관없이 다음 조건을 만족하는 직접 Path 객체를 구현해야 한다.

-   [ ] Path 문자열을 초기 매개변수로 전달해서 Path 객체를 생성할 수 있어야 한다.

    -   UNIX 스타일, 윈도우 스타일 구성 방식을 모두 지원해야 한다.

        -   [ ] UNIX : 디렉토리 분리 문자 / forward slash, Path 요소 구분 : colon

        -   [ ] 윈도우 : 디렉토리 분리 문자 \ backword slash, Path 요소 구분 ; semicolon

    -   본인 컴퓨터 운영체제와 상관없이 UNIX나 윈도우 형식을 모두 동작하도록 구현해야 한다.

-   [ ] 파일 경로를 생성하면 경로를 분석하고, 해당 파일이 있는지 여부를 판단해야 한다.
-   [ ] Path 파싱을 위해서 정규표현식(regular expression)을 학습하고 필수적으로 사용한다.
-   [ ] 다음과 같은 Path 요소에 접근해서 읽고, 변경할 수 있어야 한다.
    -   root : String
    -   base : String
    -   name : String
    -   ext : String
    -   components : [String]
    -   absoluteString : String //readonly. 직접 저장하면 안되고 분석한 내용으로 조합해서 만들어야 함
    -   existFile : Bool //readonly. 생성 시점을 기준으로 파일이 존재하는지 여부를 판단
    -   fileSize : Int //readonly. 생성 시점을 기준으로 파일의 크기

## 문제 해결 과정

## 학습 메모

### 파일 경로 용어

-   root (루트): 파일 시스템의 최상위 디렉토리 또는 드라이브.

    -   Unix/Linux: /
    -   Windows: 각 드라이브 C:\ D:\

-   base (베이스): 파일 경로의 기본 부분을 의미합니다. 예를 들어, C:\Users\Username\Documents\file.txt에서 Documents가 베이스가 될 수 있습니다. 종종 전체 경로에서 특정 디렉토리까지의 부분을 지칭할 때 사용됩니다.

-   ext (확장자): 파일 이름의 마지막 부분으로, 파일의 유형이나 형식.

-   name (이름): 파일 또는 디렉토리의 이름. 경로에서 확장자와 파일 이름을 포함한 부분을 지칭.

-   lastDirectory (마지막 디렉토리): 경로의 끝에 위치한 디렉토리.

-   components (구성 요소): 파일 경로를 구성하는 각각의 디렉토리와 파일 이름.

-   absoluteString (절대 경로 문자열): 파일이나 디렉토리의 절대 경로를 문자열로 나타낸 것. 절대 경로는 파일 시스템의 루트부터 시작하여 경로를 전체적으로 설명.

-   existFile (파일 존재 여부): 특정 경로에 파일이 실제로 존재하는지 여부를 확인.

-   fileSize (파일 크기): 파일의 크기를 바이트 단위로 나타낸 것.
