package com.example.vinkula.ui.coach

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
// Imports removed
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class ChatMessage(
    val text: String,
    val isUser: Boolean
)

class CoachViewModel : ViewModel() {
    
    private val transactionRepository = com.example.vinkula.data.TransactionRepository()
    private val coachRepository = com.example.vinkula.data.CoachRepository(transactionRepository)

    private val _messages = MutableStateFlow<List<ChatMessage>>(
        listOf(ChatMessage("Hello! I am your AI Financial Coach. How can I help you today?", false))
    )
    val messages: StateFlow<List<ChatMessage>> = _messages.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    fun sendMessage(userMessage: String) {
        val currentList = _messages.value.toMutableList()
        currentList.add(ChatMessage(userMessage, true))
        _messages.value = currentList

        viewModelScope.launch {
            _isLoading.value = true
            try {
                // The repository handles fetching context and calling the AI
                val responseText = coachRepository.getFinancialAdvice(userMessage)
                
                val updatedList = _messages.value.toMutableList()
                updatedList.add(ChatMessage(responseText, false))
                _messages.value = updatedList
                
            } catch (e: Exception) {
                val updatedList = _messages.value.toMutableList()
                updatedList.add(ChatMessage("Error: ${e.message}", false))
                _messages.value = updatedList
            } finally {
                _isLoading.value = false
            }
        }
    }
}
