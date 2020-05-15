package com.treetory.webviewtest;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.util.SizeF;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JsResult;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    @RequiresApi(api = Build.VERSION_CODES.P)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        BottomNavigationView navView = findViewById(R.id.nav_view);
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);

        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, 1234);

        CameraManager manager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
        try {

            String[] cams = manager.getCameraIdList();

            for (String cam : cams) {

                CameraCharacteristics character = manager.getCameraCharacteristics(cam);

                Log.d(TAG, String.format("%s -> %d", CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL.getName(), character.get(CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL)));

                SizeF f1 = character.get(CameraCharacteristics.SENSOR_INFO_PHYSICAL_SIZE);
                // Log.d(TAG, length);
                if (f1 != null) {
                    /*
                    for (float i : f) {
                        Log.d(TAG, String.format("%s -> %s", CameraCharacteristics.LENS_DISTORTION.getName(), Float.valueOf(i).toString()));
                    }
                     */
                    Log.d(TAG, String.format("%s : %s -> width : %s | height : %s",
                            cam,
                            CameraCharacteristics.SENSOR_INFO_PHYSICAL_SIZE.getName(),
                            Float.valueOf(f1.getWidth()).toString(),
                            Float.valueOf(f1.getHeight()).toString()
                            ));
                }

                float[] f2 = character.get(CameraCharacteristics.LENS_INTRINSIC_CALIBRATION);
                if (f2 != null) {
                    Log.d(TAG, "INTRINSIC");
                }
            }

        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }


        /*  WebView 생성 */
        //this.setWebView();
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
    }

}
