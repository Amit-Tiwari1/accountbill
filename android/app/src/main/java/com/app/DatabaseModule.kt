package com.app

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

    private val dbHelper = AppDatabaseHelper(reactContext)

    override fun getName(): String = "DatabaseModule"

    // =================== CRUD ===================
    @ReactMethod
    fun insertExpense(
        type: String,
        category: String,
        amount: Double,
        date: String,
        description: String,
        promise: Promise
    ) {
        val db = dbHelper.writableDatabase
        try {
            val stmt = db.compileStatement(
                "INSERT INTO expenses (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)"
            )
            stmt.bindString(1, type)
            stmt.bindString(2, category)
            stmt.bindDouble(3, amount)
            stmt.bindString(4, date)
            stmt.bindString(5, description)
            val rowId = stmt.executeInsert()
            promise.resolve(rowId)
        } catch (e: Exception) {
            promise.reject("INSERT_ERROR", e.message)
        } finally {
            db.close()
        }
    }

    @ReactMethod
    fun updateExpense(
        id: Int,
        type: String,
        category: String,
        amount: Double,
        date: String,
        description: String,
        promise: Promise
    ) {
        val db = dbHelper.writableDatabase
        try {
            val stmt = db.compileStatement(
                "UPDATE expenses SET type=?, category=?, amount=?, date=?, description=? WHERE id=?"
            )
            stmt.bindString(1, type)
            stmt.bindString(2, category)
            stmt.bindDouble(3, amount)
            stmt.bindString(4, date)
            stmt.bindString(5, description)
            stmt.bindLong(6, id.toLong())
            val rowsAffected = stmt.executeUpdateDelete()
            promise.resolve(rowsAffected)
        } catch (e: Exception) {
            promise.reject("UPDATE_ERROR", e.message)
        } finally {
            db.close()
        }
    }

    @ReactMethod
    fun deleteExpense(id: Int, promise: Promise) {
        val db = dbHelper.writableDatabase
        try {
            val stmt = db.compileStatement("DELETE FROM expenses WHERE id=?")
            stmt.bindLong(1, id.toLong())
            val rowsAffected = stmt.executeUpdateDelete()
            promise.resolve(rowsAffected)
        } catch (e: Exception) {
            promise.reject("DELETE_ERROR", e.message)
        } finally {
            db.close()
        }
    }

    @ReactMethod
    fun getExpenses(promise: Promise) {
        val db = dbHelper.readableDatabase
        try {
            val cursor = db.rawQuery("SELECT * FROM expenses ORDER BY date DESC", null)
            val result = WritableNativeArray()
            while (cursor.moveToNext()) {
                val row = WritableNativeMap()
                row.putInt("id", cursor.getInt(cursor.getColumnIndexOrThrow("id")))
                row.putString("type", cursor.getString(cursor.getColumnIndexOrThrow("type")))
                row.putString("category", cursor.getString(cursor.getColumnIndexOrThrow("category")))
                row.putDouble("amount", cursor.getDouble(cursor.getColumnIndexOrThrow("amount")))
                row.putString("date", cursor.getString(cursor.getColumnIndexOrThrow("date")))
                row.putString("description", cursor.getString(cursor.getColumnIndexOrThrow("description")))
                result.pushMap(row)
            }
            cursor.close()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("FETCH_ERROR", e.message)
        } finally {
            db.close()
        }
    }

    // =================== Export DB ===================
    @ReactMethod
    fun exportDatabase(promise: Promise) {
        try {
            val dbName = AppDatabaseHelper.DATABASE_NAME
            val dbFile1 = File(reactApplicationContext.filesDir, "SQLite/$dbName")
            val dbFile2 = File(reactApplicationContext.filesDir, dbName)
            val dbFile3 = reactApplicationContext.getDatabasePath(dbName)

            val dbPath = when {
                dbFile1.exists() -> dbFile1
                dbFile2.exists() -> dbFile2
                dbFile3.exists() -> dbFile3
                else -> null
            }

            if (dbPath == null) {
                promise.reject("DB_NOT_FOUND", "Database file not found in known locations")
                return
            }

            val permission = ContextCompat.checkSelfPermission(
                reactApplicationContext,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            )
            if (permission != PackageManager.PERMISSION_GRANTED) {
                promise.reject("PERMISSION_DENIED", "WRITE_EXTERNAL_STORAGE permission not granted")
                return
            }

           val exportFolder = reactApplicationContext.getExternalFilesDir("ExportedDatabases")
            if (exportFolder != null && !exportFolder.exists()) {
                exportFolder.mkdirs()
            }
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

    // =================== Test DB Connection ===================
    @ReactMethod
    fun testDatabaseConnection(promise: Promise) {
        try {
            val db = dbHelper.readableDatabase
            val cursor = db.rawQuery(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='expenses';",
                null
            )
            val exists = cursor.count > 0
            cursor.close()
            db.close()
            promise.resolve(if (exists) "Database connected and 'expenses' table exists" else "Table not found")
        } catch (e: Exception) {
            promise.reject("DB_TEST_ERROR", e.message)
        }
    }
}
