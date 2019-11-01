package com.treetory.webviewtest;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class WebAppInterface {

    private static final String TAG = "WebAppInterface";

    Context mContext;

    public WebAppInterface(Context c) {
        this.mContext = c;
    }

    @JavascriptInterface
    public void showClearMessage(String toast) {
        Log.d(TAG, "The [showClearMessage] is executed by javascript in WebView.");
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void showSubmitMessage(String toast) {
        Log.d(TAG, "The [showSubmitMessage] is executed by javascript in WebView.");
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

}
