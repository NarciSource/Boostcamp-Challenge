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

-   [ ] Parser가 어떤 데이터 흐름으로 어떻게 동작하는지 설계 결과를 작성한다.

-   [ ] Parser가 만든 데이터 구조를 탐색해서 JSON 문자열로 출력하도록 구현해야 한다.

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
function make_parse_tree

    for tag of tags
        if not exist start_tag
            start_tag <- tag
        elif tag is under level to start_tag
            children <- tag
        else
            end_tag <- tag

            elements <- tag.attributes
            elements <- make_parse_tree(children)

            symbol_table <- start_tag
            start_tag <- reset

// clear up
delete_comments()

delete_end_of_line()

// prolog
json_tree[prolog] <- parse prolog using prolog_regex

// element
tokens: (< ... >) <- parse xml using token_regex

tags: (tag_name, attributes) <- tokens map to element_regex

tree: ( tag_name: { elements }) <- make_parse_tree(tags)

json_tree[element] <- tree

```

## 학습 메모

[XML wiki](https://en.wikipedia.org/wiki/XML)

[XML Validator](https://www.w3schools.com/xml/xml_validator.asp)
