# 세브란스 테스트 

# **html-agreement-viewer** : 세브란스 전자동의서 Proof of Concept 진행을 위한 샘플 코드

1. nginx 에서 동작할 수 있도록 plain html, plain javascript 로 작성했음

2. nginx.conf 에서 해당 경로 바라볼 수 있게 할 것

    ```
	location / {
        root   	{D:\\dev-repo\\treetory\\severance\\html-agreement-viewer\\poc;}
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

4. select box 선택 시, severance-agreeent-sample-data 서버 인스턴스가 살아있으면 httpRequest를 이용하여 sample data를 가져오고, 죽어있으면 (502) 스크립트 코드 내부에 선언된 전역변수를 sample data로 사용하여 렌더링 테스트를 진행한다.

# **severance-agreeent-sample-data** : Proof of Concept 진행을 위한 샘플 데이터 내려주는 테스트 서버

1. Spring-Boot 로 아주 단순하게 작성했음

2. RestController 에 Mapping 된 request URL 도 딱 한개임.

3. 상기 [html-agreement-viewer] 에서 선택한 값을 바탕으로 해당 값에 대응하는 파일명으로 되어있는 json 파일 읽은 후, json response 던져주는 방식으로 작성됨.

4. 상기 [html-agreement-viewer] 에서 CORS 를 피하기 위해 nginx.conf에 proxy_pass 설정해 줄 것.

5. swagger 사용하여 api test 가능
	```
	http://localhost:18989/api/swagger-ui.html
	```
