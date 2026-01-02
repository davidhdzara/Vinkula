package com.example.vinkula.ui.budget

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.vinkula.data.TransactionRepository
import com.example.vinkula.domain.Transaction
import com.example.vinkula.domain.TransactionType
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class BudgetViewModel : ViewModel() {
    private val repository = TransactionRepository()

    private val _expenses = MutableStateFlow<List<Transaction>>(emptyList())
    val expenses: StateFlow<List<Transaction>> = _expenses.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    init {
        loadTransactions()
    }

    private fun loadTransactions() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                repository.getTransactions().collect { list ->
                    _expenses.value = list
                    _isLoading.value = false
                }
            } catch (e: Exception) {
                _error.value = e.message
                _isLoading.value = false
            }
        }
    }

    fun addTransaction(title: String, amount: Double, category: String, type: TransactionType) {
        viewModelScope.launch {
            try {
                val transaction = Transaction(
                    title = title,
                    amount = amount,
                    category = category,
                    type = type
                )
                repository.addTransaction(transaction)
            } catch (e: Exception) {
                _error.value = e.message
            }
        }
    }

    fun deleteTransaction(id: String) {
        viewModelScope.launch {
            try {
                repository.deleteTransaction(id)
            } catch (e: Exception) {
                _error.value = e.message
            }
        }
    }
}
