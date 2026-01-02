package com.example.vinkula.ui.stats

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.vinkula.ui.budget.BudgetViewModel

@Composable
fun StatisticsScreen(navController: NavController, viewModel: BudgetViewModel = androidx.lifecycle.viewmodel.compose.viewModel()) {
    val expenses by viewModel.expenses.collectAsState()
    
    val totalIncome = expenses.filter { it.type == com.example.vinkula.domain.TransactionType.INCOME }.sumOf { it.amount }
    val totalExpense = expenses.filter { it.type == com.example.vinkula.domain.TransactionType.EXPENSE }.sumOf { it.amount }
    val balance = totalIncome - totalExpense

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Financial Summary", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(32.dp))
        
        Text("Total Income: $$totalIncome", color = Color.Green, style = MaterialTheme.typography.titleMedium)
        Text("Total Expense: $$totalExpense", color = Color.Red, style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(16.dp))
        Text("Net Balance: $$balance", style = MaterialTheme.typography.headlineSmall)

        Spacer(modifier = Modifier.height(32.dp))
        
        // Simple Pie Chart Placeholder
        if (totalIncome > 0 || totalExpense > 0) {
             Canvas(modifier = Modifier.size(200.dp)) {
                val total = totalIncome + totalExpense
                val incomeAngle = (totalIncome / total * 360).toFloat()
                val expenseAngle = (totalExpense / total * 360).toFloat()
                
                drawArc(
                    color = Color.Green,
                    startAngle = -90f,
                    sweepAngle = incomeAngle,
                    useCenter = true,
                    size = Size(size.width, size.height)
                )
                 drawArc(
                    color = Color.Red,
                    startAngle = -90f + incomeAngle,
                    sweepAngle = expenseAngle,
                    useCenter = true,
                    size = Size(size.width, size.height)
                )
            }
        } else {
            Text("No data to display chart")
        }
    }
}
