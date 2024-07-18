# 부스트캠프 챌린지 Day4. 프로세스 시뮬레이터

## 나만의 체크포인트

-   [x] 짝설계

    -   [x] 구조도
    -   [x] 흐름도

-   [x] 영역을 미리 확보한다.

    -   [x] STACK 영역 (512KB) : 어셈블리 코드를 실행하면서 호출할 때마다 필요한 값을 스택 방식으로 Push하거나 Pop하는 영역

        -   0x00000 부터 0x7FFFF 까지

    -   [x] HEAP 영역 (512KB) : 어셈블리 코드를 실행하면서 메모리 할당 요청이 있을 때 사용할 공간을 확보하는 영역

        -   0x80000 부터 0x100000

    -   [x] TEXT 영역 (문자열배열) : 입력으로 주어지는 어셈블리 코드가 저장되는 영역

        -   0x100000부터 명령어 한 줄(배열 인덱스 1개)이 4바이트씩이라고 가정한다.

    -   [x] 스택에서 힙 영역에 메모리 주소를 다룰 때는 포인터 변수를 직접 구현해야 한다.

        -   프로그램에서 처리하는 모든 포인터 메모리 사이즈는 4바이트를 기준으로 한다.
            힌트 : 언어에서 4바이트를 기준으로 동작하는 타입을 활용한다.

-   프로그래밍 요구사항 에 나와있는 함수들을 구현한다.

    -   함수 요구사항

    1. [x] locate(funcName, codes)
    2. [x] setSize(type, length)
    3. [x] push(address) (internal only)
    4. [x] pop() (internal only)
    5. [x] malloc(type, count) (internal only)
    6. [x] free(stackAddress) (internal only)
    7. [x] step()
    8. [x] usage()
    9. [x] callstack()
    10. [x] heapdump()
    11. [ ] garbageCollect()
    12. [ ] reset()

    -   어셈블리 언어 동작

    1. [ ] VAR $VarName : $Type
    2. [ ] VAR $VarName : $Type[$Count]
    3. [x] CALL $FuncName
    4. [ ] RETURN $Value
    5. [ ] RELEASE $VarName
    6. [ ] SET $VarName = $Value
    7. [ ] SET $VarName[$Index] = $Value

## 문제 해결 과정

### 구조도

![구조도](https://gist.github.com/user-attachments/assets/eb68cbb6-5cf6-4729-af66-4c16e3ae4f33)

### 흐름도

1.  `locate("main", ["VAR A: BOOL[4]", "VAR B: INT", "CALL foo()", "SET B=$RETURN"])`

    **Text 영역에 저장**

    1. VAR A: BOOL[4]
    2. VAR B
    3. CALL foo
    4. SET B=$RETURN

2.  `locate("foo", ["VAR K: INT", "RETURN 10"])`

    1.  VAR K
    2.  RETURN 10

    _상태 pc = 1_

3.  `step()`

    -   pc 라인 실행 VAR A: BOOL[4]
    -   pc += 1

4.  `step()`

    -   pc 라인 실행 VAR B: INT
    -   pc += 1

5.  `step()`

    -   pc 라인 실행 CALL foo()
    -   CALL 확인
    -   stack.push(pc+1) : 되돌아 올 위치 (pc=4)
    -   pc = 5 : foo 의 시작 주소로 변경

6.  `step()`

    -   pc 라인 실행 VAR K: INT
    -   pc += 1

7.  `step()`

    -   pc 라인 실행 RETURN 10
    -   RETURN 확인
    -   pc = stack.pop()
    -   stack.push(10)

8.  `step()`
    -   pc 라인 실행 SET=$RETURN
    -   $RETURN 확인
    -   $RETURN = stack.pop()

### pseudo code

```js
class Type
    #size

class Pointer
    address: string

class Stack_Segment
    #sp <- top
    #size

class Text_Segment
    #instructions to random access
    #size
    #pc

class Heap_Segment
    #array <- random access

function locate
    func_address[func_name] <- final_position
    text_segment.instructions <- codes

function step

    if opcode is CALL
        return_address = pc+1

        stack_segment <- return_address

        pc = func_address[func_name]

    elif opcode is RETURN
        pc <- stack_segment.top

    else
        run to instructions[pc]

function simulator
    run commands
```

## 학습 메모
