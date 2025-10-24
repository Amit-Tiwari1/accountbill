package com.app

import android.content.ContentResolver
import android.database.Cursor
import android.provider.CallLog
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments

class CallLogModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "CallLogModule"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun getCallLogs(limit: Int?, promise: Promise) {
        try {
            val resolver: ContentResolver = reactApplicationContext.contentResolver
            // columns we want
            val projection = arrayOf(
                CallLog.Calls._ID,
                CallLog.Calls.NUMBER,
                CallLog.Calls.CACHED_NAME,
                CallLog.Calls.TYPE,
                CallLog.Calls.DATE,
                CallLog.Calls.DURATION
            )

            val sortOrder = "date DESC" + if (limit != null && limit > 0) " LIMIT $limit" else ""
            val cursor: Cursor? = resolver.query(
                CallLog.Calls.CONTENT_URI,
                projection,
                null,
                null,
                sortOrder
            )

            val resultArray = Arguments.createArray()

            cursor?.use {
                while (it.moveToNext()) {
                    val map = Arguments.createMap()
                    map.putString("id", it.getString(it.getColumnIndexOrThrow(CallLog.Calls._ID)))
                    map.putString("number", it.getString(it.getColumnIndexOrThrow(CallLog.Calls.NUMBER)))
                    map.putString("name", it.getString(it.getColumnIndexOrThrow(CallLog.Calls.CACHED_NAME)))
                    map.putInt("type", it.getInt(it.getColumnIndexOrThrow(CallLog.Calls.TYPE)))
                    map.putString("date", it.getString(it.getColumnIndexOrThrow(CallLog.Calls.DATE)))
                    map.putString("duration", it.getString(it.getColumnIndexOrThrow(CallLog.Calls.DURATION)))
                    resultArray.pushMap(map)
                }
            }

            promise.resolve(resultArray)
        } catch (e: Exception) {
            promise.reject("CALLLOG_ERROR", e.message)
        }
    }
}
