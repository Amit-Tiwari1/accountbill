package com.app.nativeutils

import android.content.ContentResolver
import android.database.Cursor
import android.net.Uri
import android.provider.Telephony
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = SmsModule.NAME)
class SmsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "SmsModule"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun getSmsLogs(promise: Promise) {
        try {
            val smsList = Arguments.createArray()
            val resolver: ContentResolver = reactApplicationContext.contentResolver
            val cursor: Cursor? = resolver.query(
                Uri.parse("content://sms/"),
                arrayOf("_id", "address", "body", "date", "type"),
                null,
                null,
                "date DESC"
            )

            cursor?.use {
                while (it.moveToNext()) {
                    val sms = Arguments.createMap()
                    sms.putString("id", it.getString(it.getColumnIndexOrThrow("_id")))
                    sms.putString("address", it.getString(it.getColumnIndexOrThrow("address")))
                    sms.putString("body", it.getString(it.getColumnIndexOrThrow("body")))
                    sms.putString("date", it.getString(it.getColumnIndexOrThrow("date")))
                    sms.putString("type", it.getString(it.getColumnIndexOrThrow("type")))
                    smsList.pushMap(sms)
                }
            }

            promise.resolve(smsList)
        } catch (e: Exception) {
            promise.reject("SMS_ERROR", e.message)
        }
    }
}

