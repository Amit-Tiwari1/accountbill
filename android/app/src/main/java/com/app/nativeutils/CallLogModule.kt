package com.app.nativeutils

import android.provider.CallLog
import com.facebook.react.bridge.*

class CallLogModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CallLogModule"

    @ReactMethod
    fun getCallLogs(promise: Promise) {
        try {
            val cursor = reactApplicationContext.contentResolver.query(
                CallLog.Calls.CONTENT_URI, null, null, null, CallLog.Calls.DATE + " DESC"
            )
            val result = WritableNativeArray()
            cursor?.use {
                while (it.moveToNext()) {
                    val row = WritableNativeMap()
                    row.putString("number", it.getString(it.getColumnIndexOrThrow(CallLog.Calls.NUMBER)))
                    row.putString("type", it.getString(it.getColumnIndexOrThrow(CallLog.Calls.TYPE)))
                    row.putString("date", it.getString(it.getColumnIndexOrThrow(CallLog.Calls.DATE)))
                    row.putString("duration", it.getString(it.getColumnIndexOrThrow(CallLog.Calls.DURATION)))
                    result.pushMap(row)
                }
            }
            promise.resolve(result)
        } catch (e: Exception) { promise.reject("CALLLOG_ERROR", e.message) }
    }
}
