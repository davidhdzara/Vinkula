package com.example.vinkula.ui.budget

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.vinkula.domain.Transaction
import com.example.vinkula.domain.TransactionType
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BudgetScreen(navController: NavController, viewModel: BudgetViewModel = androidx.lifecycle.viewmodel.compose.viewModel()) {
    val transactions by viewModel.expenses.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    var showAddDialog by remember { mutableStateOf(false) }

    Scaffold(
        floatingActionButton = {
            FloatingActionButton(onClick = { showAddDialog = true }) {
                Icon(Icons.Default.Add, contentDescription = "Add Transaction")
            }
        }
    ) { paddingValues ->
        Box(modifier = Modifier.padding(paddingValues).fillMaxSize()) {
            if (isLoading && transactions.isEmpty()) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp)
                ) {
                    items(transactions) { transaction ->
                        TransactionItem(transaction = transaction, onDelete = { 
                             viewModel.deleteTransaction(transaction.id) // Assuming ID is now mapped properly
                        })
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        AddTransactionDialog(
            onDismiss = { showAddDialog = false },
            onAdd = { title, amount, category, type ->
                viewModel.addTransaction(title, amount, category, type)
                showAddDialog = false
            }
        )
    }
}

@Composable
fun TransactionItem(transaction: Transaction, onDelete: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp).fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(text = transaction.title, style = MaterialTheme.typography.titleMedium)
                Text(
                    text = SimpleDateFormat("MMM dd, yyyy", Locale.getDefault()).format(transaction.date.toDate()) + 
                           if (transaction.type == TransactionType.TRANSFER) " (Transfer)" else "",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                val amountText = when (transaction.type) {
                    TransactionType.INCOME -> "+ $${transaction.amount}"
                    TransactionType.EXPENSE -> "- $${transaction.amount}"
                    TransactionType.TRANSFER -> "$${transaction.amount}"
                }
                val amountColor = when (transaction.type) {
                    TransactionType.INCOME -> Color.Green
                    TransactionType.EXPENSE -> Color.Red
                    TransactionType.TRANSFER -> Color.Blue
                }
                
                Text(
                    text = amountText,
                    color = amountColor,
                    style = MaterialTheme.typography.titleMedium
                )
                IconButton(onClick = onDelete) {
                    Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MaterialTheme.colorScheme.outline)
                }
            }
        }
    }
}

@Composable
fun AddTransactionDialog(onDismiss: () -> Unit, onAdd: (String, Double, String, TransactionType) -> Unit) {
    var title by remember { mutableStateOf("") }
    var amount by remember { mutableStateOf("") }
    var selectedType by remember { mutableStateOf(TransactionType.EXPENSE) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Transaction") },
        text = {
            Column {
                OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title") })
                Spacer(modifier = Modifier.height(8.dp))
                OutlinedTextField(value = amount, onValueChange = { amount = it }, label = { Text("Amount") })
                Spacer(modifier = Modifier.height(8.dp))
                
                Text("Type:", style = MaterialTheme.typography.labelMedium)
                Row(verticalAlignment = Alignment.CenterVertically) {
                    RadioButton(selected = selectedType == TransactionType.INCOME, onClick = { selectedType = TransactionType.INCOME })
                    Text("Income")
                    Spacer(modifier = Modifier.width(8.dp))
                    RadioButton(selected = selectedType == TransactionType.EXPENSE, onClick = { selectedType = TransactionType.EXPENSE })
                    Text("Expense")
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                     RadioButton(selected = selectedType == TransactionType.TRANSFER, onClick = { selectedType = TransactionType.TRANSFER })
                    Text("Transfer")
                }
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    val amountVal = amount.toDoubleOrNull()
                    if (title.isNotBlank() && amountVal != null) {
                        onAdd(title, amountVal, "General", selectedType)
                    }
                }
            ) {
                Text("Add")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    )
}
