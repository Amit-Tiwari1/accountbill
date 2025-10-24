package com.app.nativeutils

import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.*

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
}
