# 부스트캠프 챌린지 Day1. 개발 환경

## 나만의 체크포인트

-   [x] 문제 이해, 입출력 조건 파악
-   [x] 슈도코드 작성
-   [x] 기능 구현 &rightarrow; 자료구조에 담음 (어떤 자료 구조? &rightarrow; 빈 객체)
-   [x] 제약사항 예외 처리 &rightarrow; 정규식 처리
-   [x] 예약 대기 추가
-   [x] 콘솔 출력 UI
-   [x] 이미지 캡처

## 문제 해결 과정

### pseudo code

```
func allocate room:
    {time period, participants, meeting time} <- reservation
    room <- [A, B, C]

    selected room <- find to room if participants <= maximum capacity of room

    if exist selected room
        return reservation
    else
        return failure

func output
            |오|전|시|간||오|후|시|간|
    ----------------------------------
    회의실 A|🁢🁢|🁢🁢|🁢🁢|  ||🁢🁢|  |  |  |
    ----------------------------------
    회의실 B|🁢🁢|🁢🁢|  |  ||🁢🁢|🁢🁢|  |  |
    ----------------------------------
    회의실 C|  |  |  |  ||🁢🁢|  |  |  |

func process
    reservations <- tickets
        filter check ticket to restrictions
        map allocate room by ticket
        filter success

    for room, participants in reservations
        if timetable[room] is empty
            timetable[room] <- participants
        else
            waiting[room] <- participants

    output(timetable, waiting)
```

### 출력한 결과

![output](https://gist.github.com/user-attachments/assets/3bc5ca5d-2c2e-4d81-9559-3618d2af6b41)

## 학습 메모
