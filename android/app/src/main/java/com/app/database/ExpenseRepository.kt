package com.app.database

import android.content.ContentValues
import android.content.Context
import android.database.Cursor

data class Expense(
    val id: Int? = null,
    val type: String,
    val category: String,
    val amount: Double,
    val date: String,
    val description: String
)

class ExpenseRepository(context: Context) {
    private val dbHelper = AppDatabaseHelper(context)

    fun insert(expense: Expense): Long {
        val db = dbHelper.writableDatabase
        val values = ContentValues().apply {
            put("type", expense.type)
            put("category", expense.category)
            put("amount", expense.amount)
            put("date", expense.date)
            put("description", expense.description)
        }
        val id = db.insert("expenses", null, values)
        db.close()
        return id
    }

    fun update(expense: Expense): Int {
        val db = dbHelper.writableDatabase
        val values = ContentValues().apply {
            put("type", expense.type)
            put("category", expense.category)
            put("amount", expense.amount)
            put("date", expense.date)
            put("description", expense.description)
        }
        val rowsAffected = db.update("expenses", values, "id=?", arrayOf(expense.id.toString()))
        db.close()
        return rowsAffected
    }

    fun delete(id: Int): Int {
        val db = dbHelper.writableDatabase
        val rowsAffected = db.delete("expenses", "id=?", arrayOf(id.toString()))
        db.close()
        return rowsAffected
    }

    fun getAll(): List<Expense> {
        val db = dbHelper.readableDatabase
        val cursor: Cursor = db.rawQuery("SELECT * FROM expenses ORDER BY date DESC", null)
        val expenses = mutableListOf<Expense>()
        while (cursor.moveToNext()) {
            expenses.add(
                Expense(
                    id = cursor.getInt(cursor.getColumnIndexOrThrow("id")),
                    type = cursor.getString(cursor.getColumnIndexOrThrow("type")),
                    category = cursor.getString(cursor.getColumnIndexOrThrow("category")),
                    amount = cursor.getDouble(cursor.getColumnIndexOrThrow("amount")),
                    date = cursor.getString(cursor.getColumnIndexOrThrow("date")),
                    description = cursor.getString(cursor.getColumnIndexOrThrow("description"))
                )
            )
        }
        cursor.close()
        db.close()
        return expenses
    }
}
