# 부스트캠프 챌린지 Day13. 소스 저장 오브젝트

> 그룹-짝번호 : 46-B  
> 캠퍼ID : J154, J225

## 페어 프로그래밍

-   vscode의 live share 기능을 사용하여 함께 코드 작성
-   slack의 hurdle 기능을 사용하여 소통  
    ![짝프로그래밍캡쳐](https://gist.github.com/user-attachments/assets/7592afb7-998f-418e-bd7b-686bf9c0add8)

-   30분 간격으로 네비게이터/드라이버 역할 변경
-   드라이버 역할이 작성한 코드를 commit 진행  
    ![각자커밋캡쳐](https://gist.github.com/user-attachments/assets/bb8455d0-fca5-45b8-8496-b8b45ab610b7)

## 우리 체크포인트

-   [x] 학습

    -   [x] VCS 버전관리 시스템
    -   [x] git
        -   [x] blob (Objects)
        -   [x] tree (Objects)
        -   [x] commit (Objects)
        -   [x] ~~delta compression~~
    -   [x] file
        -   [x] staged
        -   [x] tracking
        -   [x] modified
    -   [x] SHA

-   [x] 구현

    특정 디렉토리에 포함된 파일들 버전 관리를 위한 mit 명령을 만든다.

    -   [x] init : 필요한 디렉토리를 생성하고 초기화한다.

        -   오브젝트 : 디렉토리명/.mit/objects/ 또는 윈도우 디렉토리명\.mit\objects\
        -   인덱스 : 디렉토리명/.mit/index/ 또는 윈도우 디렉토리명\.mit\index\

    -   [x] add : 디렉토리에 변경된 파일들을 목록으로 만든다.

        -   [x] 디렉토리에서 전체 파일 목록을 탐색
        -   [x] 각 파일 내용에 대한 sha256 해시 값을 비교한다.
        -   [x] commit이 없거나 직전 commit 이후 해시값이 달라진 파일 목록을 저장한다.

    -   [x] status : 디렉토리에 변경된 파일 목록을 출력한다.

        -   add 명령으로 만들어진 변경된 파일 목록을 전체 경로와 함께 출력한다
        -   [x] 커밋된 변경
        -   [x] 스테이징 안된 변경

    -   [x] commit : add로 만들어진 파일들을 커밋한다.

        -   **<blob 오브젝트>** 파일별로 blob 오브젝트를 생성한다.

            -   [x] 해시값 앞에 8자리를 objects 하위 디렉토리로 생성한다.

            -   [x] 나머지 부분을 파일명으로 (위에서 만든 해시값 앞자리 디렉토리에) 저장한다.

            -   [x] blob 오브젝트 파일 내용은 원본 파일을 zlib로 압축해서 저장한다.

        -   **<tree 오브젝트>** blob 파일에 대한 기록은 tree 오브젝트에 저장한다. tree 오브젝트 파일은 objects 아래에 blob 규칙과 동일하게 생성한다.

            -   [x] tree 오브젝트는 blob마다 blob해시값, 압축후 파일크기, 파일명 순서로 한 줄씩 문자열로 기록한다.

            -   [x] ~~변경된 파일이 3개면 3줄이 생겨야 한다 .~~ 모든 파일 해시를 다 저장해야한다.

            -   [x] 작성한 tree 오브젝트 내용을 기준으로 sha256 해시값으로 blob와 동일하게 파일명을 만든다.

        -   **<commit 오브젝트>** 커밋할 때마다 이전 트리와 현재 트리를 포함하는 commit 오브젝트를 objects 아래에 생성한다.

            -   commit 오브젝트는 2가지 정보를 포함한다.

                1. 이전 tree 해시값, 현재 tree 해시값

                2. 날짜

            -   [x] 작성한 commit 오브젝트 내용을 기준으로 sha256 해시값으로 blob와 동일하게 파일명을 만든다.
            -   [x] 커밋 기록을 ~~index~~commits에 기록한다.

                -   [x] ~~.mit/index/commits~~ ./mit/commits 파일에 시간 역순으로 커밋 해시값을 한 줄씩 기록한다. 마지막 커밋이 스택 형태로 위에 추가한다.

    -   [x] log : 변경된 커밋 로그를 출력한다.

        -   [x] 디렉토리명 ~~.mit/index/commits~~ ./mit/commits 에서 커밋을 찾아서 이력을 출력한다.
        -   [x] commit 마다 현재 tree를 확인해서 변경된 파일명을 함께 표시한다.

    -   [x] restore : 이전 커밋으로 파일들을 되돌린다.

        -   [x] 특정한 커밋 해시값을 입력하면, 최신 커밋~~부터 차례대로 커밋 파일의 tree에 포함된 blob 내용을 꺼내서 파일을 복원한다.~~으로 설정한다.

        -   [x] 커밋 해시값은 앞 8자리만 입력하는 경우에도 해당 object 디렉토리에 커밋 파일이 1개만 있는 경우 그 커밋을 복원한다.

        -   [x] 단계별로 커밋은 ~~index/~~commits 파일에서 삭제하고, 입력한 커밋해시값을 가진 커밋 정보까지만 남겨놓는다.

        -   [x] 복원 과정에서 필요없는 commit, tree, blob 오브젝트는 삭제하지 않는다.
                디렉토리 아래에 .mit 하위 디렉토리를 만들고 필요한 파일을 생성한다.

## 개선 체크포인트

-   기능구현
    -   [x] commit
    -   [x] log
    -   [x] checkout
    -   [x] restore
-   리팩토링
    -   [x] 중복 함수 분리
    -   [x] 함수 파일 분리
    -   [x] 이름 정리
    -   [x] 책임성 분리
    -   [x] 타입 좁히기
    -   [x] 객체 공통 추상화
    -   [x] 타입 인터페이스 추가

## 문제 해결 과정

### 설계

#### 객체 식별

-   blob 오브젝트
-   tree 오브젝트
-   commit 오브젝트
-   index = staging area

#### 인터페이스

-   BlobRecord [hash, size, name]
-   TreeRecord [mode, hash, name]
-   CommitRecord [parentHash, snapshotHash, time]

#### mit 시퀀스 다이어그램

```mermaid

sequenceDiagram
    participant Untracked
    participant Unmodified
    participant Modified
    participant Staged
    participant History

    Untracked->>Staged: init()
    Unmodified->>Modified: edit
    Modified->>Staged: add()
    Staged->>History: commit()
    History->>Unmodified: reset
```

1.  add

    ```mermaid
    sequenceDiagram
        participant file
        participant blob
        participant stagingArea
        participant objects
        participant Index

        file->>blob: compress()
        blob->>objects: write()
        blob->>stagingArea: update()
        stagingArea->>objects: write()

        stagingArea->>Index: diff()
        alt if not same
            Index->>Index: update()
        end
    ```

2.  commit

    ```mermaid
    sequenceDiagram
        participant objects
        participant HEAD
        participant Index
        participant tree_objects
        participant Commit

        HEAD->>objects: read()
        objects->>HEAD: [parent_hash, snapshot_hash, time]
        HEAD->>Index: snapshot_hash as committed_hash

        Index->>objects: read()
        objects->>Index: [hash size name] : staging_record
        Index->>tree_objects: make_tree
        tree_objects->>Index: snapshot_hash

        alt if snapshot_hash !== committed_hash
            HEAD->>Commit: committed_hash
            Index->>Commit: snapshot_hash
            Commit->>objects: [parentHash, snapshotHash, time]
        end
    ```

3.  status

    ```mermaid
    sequenceDiagram
        participant objects
        participant Index
        participant HEAD
        participant current_files
        participant user

        Index->>objects: read()
        objects->>Index: staging
        Index->>current_files: staging

        HEAD->>objects: read()
        objects->>HEAD: tree_object
        HEAD->>objects: read()
        objects->>HEAD: snapshot
        HEAD->>current_files: snapshot

        current_files->>current_files: hashing()

        alt if hash not in snapshot and staging
            current_files->>user: "Changes to be committed"
        else if hash not in snapshot and in staging
            current_files->>user: "Changes not staged for commit"
        end
    ```

4.  log

    ```mermaid
    sequenceDiagram
        participant objects
        participant commits
        participant user

        commits->>objects: read()
        objects->>commits: [pre_tree_hash, top_tree_hash]
        commits->>objects: top_tree_hash
        objects->>commits: [hash, size, name][]
        commits->>commits: compare_adjacent()
        commits->>user: difference
    ```

5.  restore

    ```mermaid
    sequenceDiagram
        participant user
        participant objects
        participant commits
        participant Index
        participant HEAD

        user->>objects: restore_hash
        objects->>user: [pre_tree_hash, top_tree_hash]
        user->>commits: restore_hash
        commits->>commits: delete up to the top
        user->>Index: top_tree_hash
        user->>HEAD: restore_hash
    ```

### pseudo code

```js
function add
    function hash-object
        hash <- hashing(blob_file)

        ./mit/objects/[hash] <- blob_file

    function update-tree
        tree <- [blob_hash blob_size blob_name]

        hash <- hashing(tree)

        ./mit/objects/[hash] <- tree


    files
        map to make blob_object
        for
            blob_hash <- hash-object(blob_object)
            tree_hash <- update-tree(blob_hash)

    pre_staging <- ./mit/index/

    if diff(pre_staging, cur_staging) is not same

        ./mit/index <- [file_name hash mode size]
```

## 학습 메모

git 내부 4가지 object 이해  
https://storycompiler.tistory.com/7

git 내부 동작  
https://tecoble.techcourse.co.kr/post/2021-07-08-dot-git/  
https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EB%82%B4%EB%B6%80-Git-%EA%B0%9C%EC%B2%B4

git 명령어별 원리  
https://www.youtube.com/watch?v=KyGfapLpWhY&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk&index=15
