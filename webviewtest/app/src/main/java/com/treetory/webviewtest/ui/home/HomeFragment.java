package com.treetory.webviewtest.ui.home;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.fragment.app.Fragment;

import com.treetory.webviewtest.R;
import com.treetory.webviewtest.WebAppInterface;

public class HomeFragment extends Fragment {

    private static final String ENTRY_URL = String.format("https://%s", "dev1.lemonhc.com/mplus/poc.html");
    private WebView mWebView;

    public View onCreateView(/*@NonNull*/ LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_home, container, false);
        mWebView = root.findViewById(R.id.navigation_home);
        mWebView.setNetworkAvailable(true);
        mWebView.setLayerType(View.LAYER_TYPE_NONE, null);
        mWebView.addJavascriptInterface(new WebAppInterface(getContext()), "MyJavascriptInterface");

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webSettings.setAllowFileAccess(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAppCacheEnabled(true);
        webSettings.setAppCachePath("/data/data/" + this.getActivity().getPackageName() + "/cache/");

        // chrome://inspect 로 디버깅 하기 위함
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        // WebChromeClient 를 사용할 때, <-- 이게 권장인 듯
        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
                new AlertDialog.Builder(view.getContext())
                        .setTitle("Alert")
                        .setMessage(message)
                        .setPositiveButton(android.R.string.ok,
                                new AlertDialog.OnClickListener(){
                                    public void onClick(DialogInterface dialog, int which) {
                                        result.confirm();
                                    }
                                })
                        .setCancelable(false)
                        .create()
                        .show();
                return true;
            }

            @Override
            public boolean onJsConfirm(WebView view, String url, String message,
                                       final JsResult result) {
                new AlertDialog.Builder(view.getContext())
                        .setTitle("Confirm")
                        .setMessage(message)
                        .setPositiveButton("Yes",
                                new AlertDialog.OnClickListener(){
                                    public void onClick(DialogInterface dialog, int which) {
                                        result.confirm();
                                    }
                                })
                        .setNegativeButton("No",
                                new AlertDialog.OnClickListener(){
                                    public void onClick(DialogInterface dialog, int which) {
                                        result.cancel();
                                    }
                                })
                        .setCancelable(false)
                        .create()
                        .show();
                return true;
            }
        });

        mWebView.loadUrl(ENTRY_URL);

        return root;
    }

}