세브란스 테스트 
=============

세브란스 전자동의서 Proof of Concept 진행을 위한 샘플 코드
-------------

> 1. nginx 에서 동작할 수 있도록 plain html, plain javascript 로 작성했음

> 2. nginx.conf 에서 해당 경로 바라볼 수 있게 할 것
<code>
    location / {
        root   	**{D:\\dev-repo\\treetory\\severance\\html-agreement-viewer\\poc;}**
        index	**poc.html;**
    }
</code>

> 3. 해당 코드는 import 구문을 사용하는 관계로 특정 버전 이상의 browser 에서만 동작 가능
***********************************************************************
>   IE                      :   Not Supported
>   Edge                    :   Edge 76
>   Firefox                 :   Firefox 67-69, 70, 71-72
>   Chrome                  :   Chrome 63-77, 78, 79-81
>   Safari                  :   Safari 11.1-12.1, 13, TP
>   Opera                   :   Opera 50-63, 64
>   iOS Safari              :   iOS Safari 11-12.4, 13.2
>   Opera Mini              :   Not Supported
>   Android Browser         :   Android 5-6.x WebView: Chromium 76
>   Opera Mobile            :   Opera 46 for Android
>   Chrome for Android      :   Chrome 78 for Android
>   Firefox for Android     :   Firefox 68 for Android
>   UC Browser for Android  :   Not Suppored
>   Samsung Internet        :   Samsung Internet 8.2-9.2, 10.1
>   QQ Browser              :   Not Supported
>   Baidu Browser           :   Not Supported
>   KaiOS Browser           :   Not Supported
***********************************************************************
