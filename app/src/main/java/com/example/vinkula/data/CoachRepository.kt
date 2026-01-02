package com.example.vinkula.data

import com.google.ai.client.generativeai.GenerativeModel
import com.example.vinkula.domain.Transaction
import com.example.vinkula.data.TransactionRepository
import com.example.vinkula.BuildConfig
import kotlinx.coroutines.flow.first

class CoachRepository(
    private val transactionRepository: TransactionRepository
) {
    private val apiKey = BuildConfig.GEMINI_API_KEY

    private val generativeModel = GenerativeModel(
        modelName = "gemini-pro",
        apiKey = apiKey
    )

    suspend fun getFinancialAdvice(userMessage: String): String {
        return try {
            // Fetch recent transactions to provide context
            // We use 'first()' to get the current snapshot of transactions
            val transactions = transactionRepository.getTransactions().first()
            
            val prompt = buildPrompt(userMessage, transactions)
            
            val response = generativeModel.generateContent(prompt)
            response.text ?: "I'm having trouble thinking of a response right now."
        } catch (e: Exception) {
            "Error: ${e.message}"
        }
    }

    private fun buildPrompt(userMessage: String, transactions: List<Transaction>): String {
        val transactionSummary = transactions.joinToString("\n") { 
            "- ${it.title}: $${it.amount} (${it.category}) [${it.type}]" 
        }

        return """
            You are a helpful and encouraging financial coach.
            Here is the user's recent financial data:
            $transactionSummary
            
            User's Question: $userMessage
            
            Please provide a concise and helpful response based on their data.
        """.trimIndent()
    }
}
