package com.app.nativeutils

import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.*

class WhatsAppModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "WhatsAppModule"

    @ReactMethod
    fun sendWhatsApp(phone: String, message: String, promise: Promise) {
        try {
            val intent = Intent(Intent.ACTION_VIEW)
            val url = "https://api.whatsapp.com/send?phone=$phone&text=$message"
            intent.setPackage("com.whatsapp")
            intent.data = Uri.parse(url)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            reactApplicationContext.startActivity(intent)
            promise.resolve("WhatsApp opened for $phone")
        } catch (e: Exception) { promise.reject("WA_ERROR", e.message) }
    }
}
