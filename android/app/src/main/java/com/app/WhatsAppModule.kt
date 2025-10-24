package com.app

import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WhatsAppModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "WhatsAppModule"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun sendWhatsAppMessage(phoneNumber: String, message: String, promise: Promise) {
        try {
            // WhatsApp requires phone number in international format, e.g. "919876543210"
            val uri = Uri.parse("https://wa.me/$phoneNumber?text=${Uri.encode(message)}")
            val intent = Intent(Intent.ACTION_VIEW, uri)
            intent.setPackage("com.whatsapp")

            // Needed when launching from background
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

            if (intent.resolveActivity(reactApplicationContext.packageManager) != null) {
                reactApplicationContext.startActivity(intent)
                promise.resolve("WhatsApp opened successfully")
            } else {
                promise.reject("WHATSAPP_NOT_FOUND", "WhatsApp is not installed on this device")
            }
        } catch (e: Exception) {
            promise.reject("WHATSAPP_ERROR", e.message)
        }
    }
}
