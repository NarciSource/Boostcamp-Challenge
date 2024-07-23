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
