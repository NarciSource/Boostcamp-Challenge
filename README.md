# 부스트캠프 챌린지 Day3. XML 변환기

## 나만의 체크포인트

-   [x] XML 문서 형식 이해

-   [ ] 컴파일러 과정 정리

-   [ ] 슈도 코드

-   [ ] 여러 XML 샘플을 분석해서 요소별로 분리하는 Parser를 구현해야 한다.

-   [ ] Parser가 어떤 데이터 흐름으로 어떻게 동작하는지 설계 결과를 작성한다.

-   [ ] Parser가 만든 데이터 구조를 탐색해서 JSON 문자열로 출력하도록 구현해야 한다.

-   [ ] 아래 예제 XML 코드만 처리하는 파서를 만드는 게 아니라, 어떤 형태 XML을 입력하더라도 XML 태그(혹은 토큰)을 구분해서 원하는 형태로 처리할 수 있어야 한다.

## 문제 해결 과정

### XML 문서 형식 이해

-   Well-formed Documents (적격 구조 문서)

    -   XML documents must have a root element &rightarrow; 루트는 하나
    -   XML elements must have a closing tag &rightarrow; 열렸으면 닫혀야한다.
    -   XML tags are case sensitive &rightarrow; 태그 대소문자 구분
    -   XML elements must be properly nested &rightarrow; 요소의 결합 형태는 적절해야한다.
    -   XML attribute values must be quoted &rightarrow; 속성은 따움표로 감싸야한다.

-   Valid Documents (유효한 문서) &leftarrow; 🤔해야하나?
    -   DTD
    -   XML Schema

### pseudo code

```js

```

## 학습 메모

[XML wiki](https://en.wikipedia.org/wiki/XML)

[XML Validator](https://www.w3schools.com/xml/xml_validator.asp)
