## 나만의 체크포인트

-   [x] 문제 이해, 입출력 조건 파악
-   [x] 슈도코드 작성
-   [ ] 기능 구현 &rightarrow; 자료구조에 담음 (어떤 자료 구조?)
-   [ ] 제약사항 예외 처리 &rightarrow; 정규식 처리
-   [ ] 예약 대기 추가
-   [ ] 콘솔 출력 UI
-   [ ] 이미지 캡처

## 문제 해결 과정

### pseudo code

```python
def reserve
    rooms: [A, B, C] <- time period in timetable

    rooms
        find first
            if participants < maximum capacity
            && meeting time < remains time
        then
            reserve to room

            return success
        catch
            return failure

def output
            |오|전|시|간||오|후|시|간|
    ----------------------------------
    회의실 A|🁢🁢|🁢🁢|🁢🁢|  ||🁢🁢|  |  |  |
    ----------------------------------
    회의실 B|🁢🁢|🁢🁢|  |  ||🁢🁢|🁢🁢|  |  |
    ----------------------------------
    회의실 C|  |  |  |  ||🁢🁢|  |  |  |

def process
    while
        reservation: {time period, participants, meeting time} = check to restrictions(input())

        reserve(reservation)
            then:
                timetable
            catch failure:
                waiting(time period, participants, meeting time)

        output(timetable)
```

## 학습 메모
