package com.app.nativeutils

import android.telephony.SmsManager
import com.facebook.react.bridge.*

class SmsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "SmsModule"

    @ReactMethod
    fun sendSMS(phone: String, message: String, promise: Promise) {
        try {
            val smsManager = SmsManager.getDefault()
            smsManager.sendTextMessage(phone, null, message, null, null)
            promise.resolve("SMS sent to $phone")
        } catch (e: Exception) { promise.reject("SMS_ERROR", e.message) }
    }
}
