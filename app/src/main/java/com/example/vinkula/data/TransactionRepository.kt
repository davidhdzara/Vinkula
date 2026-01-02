package com.example.vinkula.data

import com.example.vinkula.domain.Transaction
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class TransactionRepository {
    private val firestore = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()
    private val collectionPath = "transactions"

    fun getTransactions(): Flow<List<Transaction>> = callbackFlow {
        val userId = auth.currentUser?.uid
        if (userId == null) {
            close(Exception("User not logged in"))
            return@callbackFlow
        }

        val subscription = firestore.collection(collectionPath)
            .whereEqualTo("userId", userId)
            .orderBy("date", Query.Direction.DESCENDING)
            .addSnapshotListener { snapshot, error ->
                if (error != null) {
                    close(error)
                    return@addSnapshotListener
                }
                
                if (snapshot != null) {
                    val transactions = snapshot.toObjects(Transaction::class.java)
                    trySend(transactions)
                }
            }
        
        awaitClose { subscription.remove() }
    }

    suspend fun addTransaction(transaction: Transaction) {
        val userId = auth.currentUser?.uid ?: throw Exception("User not logged in")
        val transactionWithUser = transaction.copy(userId = userId)
        firestore.collection(collectionPath).add(transactionWithUser).await()
    }

    suspend fun deleteTransaction(transactionId: String) {
        firestore.collection(collectionPath).document(transactionId).delete().await()
    }
}
