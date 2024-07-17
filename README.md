# 부스트캠프 챌린지 Day3. XML 변환기

## 나만의 체크포인트

-   [x] XML 문서 형식 이해

-   [x] 컴파일러 과정 정리

-   [x] 정규식 작성

-   [x] 슈도 코드

-   [x] 여러 XML 샘플을 분석해서 요소별로 분리하는 Parser를 구현해야 한다.

    -   [x] cleanup
    -   [x] prolog 파싱
    -   [x] 파서 트리

-   [x] Parser가 어떤 데이터 흐름으로 어떻게 동작하는지 설계 결과를 작성한다.

-   [x] Parser가 만든 데이터 구조를 탐색해서 JSON 문자열로 출력하도록 구현해야 한다.

-   [x] 아래 예제 XML 코드만 처리하는 파서를 만드는 게 아니라, 어떤 형태 XML을 입력하더라도 XML 태그(혹은 토큰)을 구분해서 원하는 형태로 처리할 수 있어야 한다.

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

### 컴파일러 과정

1. 형태소 분석

    - 도입부 Prolog
        - \<?~ >
    - 주석 Comment
        - \<!-- ~ -->
    - 요소 Element

        - \<Element></Element>
        - \<Element/>
        - \</Element>

        - 태그
        - 속성
        - 값

2. 구문 분석
    - Well-formed Documents
    - Valid Documents
3. 심볼 테이블 구성
4. 파서 트리 생성 &rightarrow; 하향식 파서
5. ~~의미 분석~~
6. 코드 생성

### 정규식 작성

#### 도입부

-   규칙
    1.  "\<?" 로 시작해서 "\?>"로 닫힘
    2.  사이에는 "<", ">", "?" 금지
    3.  문서에는 하나만
-   정규식: `<\?[^<>?]+\?>`

#### 주석

-   규칙
    1. "\<!--" 로 시작해서 "-->" 로 끝남
    2. 사이에는 "<", ">", "--" 금지 &leftarrow; 😡 "--" 를 어떻게 제외하냐
-   정규식: ``

#### 요소

-   규칙
    1.  <태그>값<태그/>
-   정규식: `<([^>]*)>(.*)<\/.*>`

#### 태그

-   규칙

    1.  !"#$%&'()\*+,/;<=>?@[\]^`{|}~ 문자 금지
    2.  공백, "-", ".", 숫자로 시작해선 안됨

-   정규식: `` [^-.,\d]([^!"#$%&'()*+,/;<=>?@[\]^`{|}~\s]+) ``

#### 속성

-   규칙
    1. 이름-값의 쌍으로 구성되야한다.
    2. 값은 따움표로 감싸야한다.
-   정규식 `` ([^!"#$%&'()*+,/;<=>?@[\]^`{|}~\s]+)="([^!"#$%&'()*+,/;<=>?@[\]^`{|}~\s])+" ``

### pseudo code

```js
function analyze_lexical
    <tag>, open_tag
    </tag>, close_tag
    <tag/>, closure_tag

function analyze_syntax
    for tag of tags
        if this tag is not close tag
            stack <- tag
        else
            find to open tag sibling

            elements <- range from open to close
            stack <- element

// clear up
delete_comments

delete_end_of_line

// compiler
tokens: (< ... > | ... ) <- tokenize xml

tags: (tag_name, attributes, children) <- analyze_lexical tokens

tree <- analyze_syntax tags

json <- tree ~ [prolog, root]

```

### 결과 화면

![test1](https://gist.github.com/user-attachments/assets/e7689310-8a84-4657-8610-e47f5575f256)
![test2](https://gist.github.com/user-attachments/assets/74a739ea-8def-436d-8b34-87360e762c27)
![test3](https://gist.github.com/user-attachments/assets/ebf284d9-7012-4af4-8e5a-c5ca3ffedebf)

## 학습 메모

[XML wiki](https://en.wikipedia.org/wiki/XML)

[XML Validator](https://www.w3schools.com/xml/xml_validator.asp)
