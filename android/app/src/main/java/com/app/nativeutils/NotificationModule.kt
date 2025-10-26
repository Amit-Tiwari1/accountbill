package com.app.nativeutils

import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.core.app.NotificationCompat
import android.provider.Settings
import com.facebook.react.bridge.*
import com.google.firebase.messaging.FirebaseMessaging


class NotificationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "NotificationModule"

    @ReactMethod
    fun sendNotification(title: String, message: String, promise: Promise) {
        try {
            val channelId = "AppChannel"
            val nm = reactApplicationContext.getSystemService(NotificationManager::class.java)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val channel = NotificationChannel(channelId, "App Notifications", NotificationManager.IMPORTANCE_DEFAULT)
                nm.createNotificationChannel(channel)
            }

            val notification = NotificationCompat.Builder(reactApplicationContext, channelId)
                .setContentTitle(title)
                .setContentText(message)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .build()

            nm.notify(System.currentTimeMillis().toInt(), notification)
            promise.resolve("Notification sent")
        } catch (e: Exception) { promise.reject("NOTIFY_ERROR", e.message) }
    }

       @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        try {
            val info = Arguments.createMap()
            info.putString("brand", Build.BRAND)
            info.putString("model", Build.MODEL)
            info.putString("os", "Android")
            info.putString("osVersion", Build.VERSION.RELEASE)

            // Unique device ID
            val androidId = Settings.Secure.getString(
                reactApplicationContext.contentResolver,
                Settings.Secure.ANDROID_ID
            )
            info.putString("deviceId", androidId)

            promise.resolve(info)
        } catch (e: Exception) {
            promise.reject("DEVICE_INFO_ERROR", e.message)
        }
    }

    @ReactMethod
    fun getFCMToken(promise: Promise) {
        FirebaseMessaging.getInstance().token
            .addOnCompleteListener { task ->
                if (!task.isSuccessful) {
                    promise.reject("FCM_TOKEN_ERROR", task.exception?.message)
                    return@addOnCompleteListener
                }
                val token = task.result
                promise.resolve(token)
            }
    }
}
