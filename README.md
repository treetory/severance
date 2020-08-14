# xaml parse test

# **html-agreement-viewer** : xaml -> json 변환된 데이터를 파싱하여 동적 html 태그 생성

1. nginx 에서 동작할 수 있도록 plain html, plain javascript 로 작성했음

2. nginx.conf 에서 해당 경로 바라볼 수 있게 할 것

    ```
	location / {
        root   	D:\\dev-repo\\treetory\\severance\\html-agreement-viewer\\poc;
        index	poc.html;
    }

	location / {
        proxy_pass 	http://localhost:8080/sample;
    }
	```

3. 해당 코드는 import 구문을 사용하는 관계로 특정 버전 이상의 browser 에서만 동작 가능

| 브라우저 종류 | 동작되는 버전 |
|---|:---:|
| `IE` | Not Supported
| `Edge` | Edge 76
| `Firefox` | Firefox 67-69, 70, 71-72
| `Chrome` | Chrome 63-77, 78, 79-81
| `Safari` | Safari 11.1-12.1, 13, TP
| `Opera` | Opera 50-63, 64
| `iOS Safari` | iOS Safari 11-12.4, 13.2
| `Opera Mini` | Not Supported
| `Android Browser` | Android 5-6.x WebView: Chromium 76
| `Opera Mobile` | Opera 46 for Android
| `Chrome for Android` | Chrome 78 for Android
| `Firefox for Android` | Firefox 68 for Android
| `UC Browser for Android` | Not Suppored
| `Samsung Internet` | Samsung Internet 8.2-9.2, 10.1
| `QQ Browser` | Not Supported
| `Baidu Browser` | Not Supported
| `KaiOS Browser` | Not Supported

4. select box 선택 시, severance-agreeent-sample-data 서버 인스턴스가 살아있으면 httpRequest를 이용하여 sample data를 가져오고, 죽어있으면 (502) 스크립트 코드 내부에 선언된 전역변수를 sample data로 사용하여 렌더링 테스트를 진행한다. -> select box 의 옵션 값도 가져오기 위한 REST Controller 의 method 생성했다. select box 선택 시, 파싱하기 위해 대응되는 json 파일이 없으면 컨트롤러에서 반환한 error 메시지를 alert 창에 뿌려준다.

# **html-agreement-poc-final** : xaml -> json 변환

1. Spring-Boot 로 아주 단순하게 작성했음

2. RestController 에 Mapping 된 request URL 도 딱 한개임.

3. 상기 [html-agreement-viewer] 에서 선택한 값을 바탕으로 해당 값에 대응하는 파일명으로 되어있는 json 파일 읽은 후, json response 던져주는 방식으로 작성됨. -> Either 를 이용하여 Exception 이 발생하면 left 의 에러메시지를 내려주고, 해당 파일을 찾아서 잘 파싱한다면 right 의 arrayList 객체를 내려주는 형식으로 코드를 수정하였음.

4. 상기 [html-agreement-viewer] 에서 CORS 를 피하기 위해 nginx.conf에 proxy_pass 설정해 줄 것.

5. swagger 사용하여 api test 가능
	```
	http://localhost:18989/api/swagger-ui.html
	```

6. json 파일 upload 기능 추가
	```
	http://localhost:18989/upload
	```
	
7. nginx 에서 돌리던 [html-agreement-viewer] 를 Spring-Boot 안에 이식함.
	```
	http://localhost:18989/poc
	```
	
8. 상기 위에 이식된 부분에서 동의서 목록도 제공받은 json 파일에서 생성할 수 있도록 기능 추가함. 그리고 업로드된 것이 있으면 select box 의 옵션 값이 파란색, bold 로 표현되도록 기능 추가함.

9. 파일 업로드 한 것이 위치하는 target 경로는 application.properties 에 기술해 놓았음.

# **webviewtest** : POC 진행 샘플 코드가 webview 환경에서 돌아갈 때의 모습을 시연하기 위한 test android app

1. Fragment view 를 이용했음.

2. HomeFragment 에 webview 를 얹었음.

3. ENTRY_URL 에 테스트 해야할 웹 컨텐츠 주소를 입력 후, 실행 또는 앱 패키지를 말아서 폰에 설치하여 테스트할 것.

4. 단순히 컨텐츠가 로드되는 모습만 확인하기 위해 만든 것이므로 다른 기능은 없음.
