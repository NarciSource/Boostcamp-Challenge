
# 부스트캠프 챌린지 Day4. 프로세스 시뮬레이터

## 나만의 체크포인트

-   [ ] 영역을 미리 확보한다.

    -   [ ] STACK 영역 (512KB) : 어셈블리 코드를 실행하면서 호출할 때마다 필요한 값을 스택 방식으로 Push하거나 Pop하는 영역
        -   0x00000 부터 0x7FFFF 까지

    -   [ ] HEAP 영역 (512KB) : 어셈블리 코드를 실행하면서 메모리 할당 요청이 있을 때 사용할 공간을 확보하는 영역
        -   0x80000 부터 0x100000

    -   [ ] TEXT 영역 (문자열배열) : 입력으로 주어지는 어셈블리 코드가 저장되는 영역
        -   0x100000부터 명령어 한 줄(배열 인덱스 1개)이 4바이트씩이라고 가정한다.

-   [ ] 스택에서 힙 영역에 메모리 주소를 다룰 때는 포인터 변수를 직접 구현해야 한다.

          - 프로그램에서 처리하는 모든 포인터 메모리 사이즈는 4바이트를 기준으로 한다.
              힌트 : 언어에서 4바이트를 기준으로 동작하는 타입을 활용한다.

-   프로그래밍 요구사항 에 나와있는 함수들을 구현한다.

    -   함수 요구사항

    1. [ ] locate(funcName, codes)
    2. [ ] setSize(type, length)
    3. [ ] push(address) (internal only)
    4. [ ] pop() (internal only)
    5. [ ] malloc(type, count) (internal only)
    6. [ ] free(stackAddress) (internal only)
    7. [ ] step()
    8. [ ] usage()
    9. [ ] callstack()
    10. [ ] heapdump()
    11. [ ] garbageCollect()
    12. [ ] reset()

    -   어셈블리 언어 동작

    1. [ ] VAR $VarName : $Type
    2. [ ] VAR $VarName : $Type[$Count]
    3. [ ] CALL $FuncName
    4. [ ] RETURN $Value
    5. [ ] RELEASE $VarName
    6. [ ] SET $VarName = $Value
    7. [ ] SET $VarName[$Index] = $Value

## 문제 해결 과정

### pseudo code

## 학습 메모
