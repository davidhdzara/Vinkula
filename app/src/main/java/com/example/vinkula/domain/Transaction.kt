package com.example.vinkula.domain

import com.google.firebase.Timestamp

data class Transaction(
    val id: String = "",
    val userId: String = "",
    val title: String = "",
    val amount: Double = 0.0,
    val category: String = "",
    val date: Timestamp = Timestamp.now(),
    val type: TransactionType = TransactionType.EXPENSE
)

enum class TransactionType {
    INCOME, EXPENSE, TRANSFER
}
