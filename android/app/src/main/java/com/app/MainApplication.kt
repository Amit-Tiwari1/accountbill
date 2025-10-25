package com.app

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost


import com.app.database.DatabasePackage
import com.app.nativeutils.SmsPackage
import com.app.nativeutils.WhatsAppPackage
import com.app.nativeutils.CallLogPackage
import com.app.nativeutils.NotificationPackage

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
                 add(SmsPackage())
                add(WhatsAppPackage())
                add(CallLogPackage())
                add(NotificationPackage())
                add(DatabasePackage())

        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
  }
}
