package com.app.database

import android.Manifest
import android.content.pm.PackageManager
import android.os.Environment
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

class DatabaseModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val repo = ExpenseRepository(reactContext)

    override fun getName(): String = "DatabaseModule"

    @ReactMethod
    fun insertExpense(type: String, category: String, amount: Double, date: String, description: String, promise: Promise) {
        try {
            val id = repo.insert(Expense(type = type, category = category, amount = amount, date = date, description = description))
            promise.resolve(id)
        } catch (e: Exception) {
            promise.reject("INSERT_ERROR", e.message)
        }
    }

    @ReactMethod
    fun updateExpense(id: Int, type: String, category: String, amount: Double, date: String, description: String, promise: Promise) {
        try {
            val rows = repo.update(Expense(id = id, type = type, category = category, amount = amount, date = date, description = description))
            promise.resolve(rows)
        } catch (e: Exception) {
            promise.reject("UPDATE_ERROR", e.message)
        }
    }

    @ReactMethod
    fun deleteExpense(id: Int, promise: Promise) {
        try {
            val rows = repo.delete(id)
            promise.resolve(rows)
        } catch (e: Exception) {
            promise.reject("DELETE_ERROR", e.message)
        }
    }

    @ReactMethod
    fun getExpenses(promise: Promise) {
        try {
            val expenses = repo.getAll()
            val array = WritableNativeArray()
            expenses.forEach {
                val map = WritableNativeMap()
                map.putInt("id", it.id ?: 0)
                map.putString("type", it.type)
                map.putString("category", it.category)
                map.putDouble("amount", it.amount)
                map.putString("date", it.date)
                map.putString("description", it.description)
                array.pushMap(map)
            }
            promise.resolve(array)
        } catch (e: Exception) {
            promise.reject("FETCH_ERROR", e.message)
        }
    }

    @ReactMethod
    fun exportDatabase(promise: Promise) {
        try {
            val dbPath = reactApplicationContext.getDatabasePath(AppDatabaseHelper.DATABASE_NAME)
            if (!dbPath.exists()) {
                promise.reject("DB_NOT_FOUND", "Database file not found")
                return
            }

            val permission = ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.WRITE_EXTERNAL_STORAGE)
            if (permission != PackageManager.PERMISSION_GRANTED) {
                promise.reject("PERMISSION_DENIED", "WRITE_EXTERNAL_STORAGE permission not granted")
                return
            }

            val exportFolder = File(Environment.getExternalStorageDirectory(), "ExportedDatabases")
            if (!exportFolder.exists()) exportFolder.mkdirs()

            val timestamp = System.currentTimeMillis()
            val destFile = File(exportFolder, "billDb_$timestamp.db")

            FileInputStream(dbPath).use { input ->
                FileOutputStream(destFile).use { output ->
                    val buffer = ByteArray(1024)
                    var length: Int
                    while (input.read(buffer).also { length = it } > 0) {
                        output.write(buffer, 0, length)
                    }
                }
            }

            promise.resolve("Database exported successfully to: ${destFile.path}")
        } catch (e: Exception) {
            promise.reject("EXPORT_ERROR", e.message)
        }
    }
}
