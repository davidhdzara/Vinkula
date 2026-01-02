package com.example.vinkula.ui.home

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowDownward
import androidx.compose.material.icons.filled.ArrowUpward
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.QrCodeScanner
import androidx.compose.material.icons.filled.Savings
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.AccountBalance
import androidx.compose.material.icons.filled.Payments
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.vinkula.domain.TransactionType
import com.example.vinkula.ui.budget.BudgetViewModel

@Composable
fun HomeScreen(navController: NavController, viewModel: BudgetViewModel = androidx.lifecycle.viewmodel.compose.viewModel()) {
    // We will use dummy data for now to match the mockup visuals strictly
    val totalBalance = "$ 16.000.000"
    
    // Status bar spacer is handled by Scaffold padding usually, but since we want Edge-to-Edge,
    // we should be mindful of top padding. Scaffold in VinkulaApp provides innerPadding.
    // However, for a "full screen" feel, often the header goes behind status bar.
    // We will assume standard padding for now.

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 80.dp), // Extra bottom padding for BottomBar
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        // 1. Balance Card
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .clip(RoundedCornerShape(32.dp))
                    .background(Color(0xFF137fec))
            ) {
                // Background Effect (Blur circle simulation)
                Box(
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .offset(x = 20.dp, y = 20.dp)
                        .size(150.dp)
                        .clip(RoundedCornerShape(100))
                        .background(Color.White.copy(alpha = 0.1f))
                )

                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(24.dp),
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    // Top Row
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Top
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Text("Balance Total", color = Color.White.copy(alpha = 0.9f), style = MaterialTheme.typography.labelLarge)
                            Icon(Icons.Default.Visibility, contentDescription = "Show", tint = Color.White.copy(alpha = 0.9f), modifier = Modifier.size(18.dp))
                        }
                        
                        // Percentage Badge
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = Color.White.copy(alpha = 0.2f),
                            contentColor = Color.White
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Icon(Icons.Default.TrendingUp, contentDescription = null, modifier = Modifier.size(14.dp))
                                Text("+3.1%", style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold)
                            }
                        }
                    }

                    // Balance Amount
                    Text(
                        text = totalBalance,
                        style = MaterialTheme.typography.displaySmall.copy(fontWeight = FontWeight.Bold),
                        color = Color.White
                    )

                    // Currency Tag
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = Color(0xFF0b5cbe).copy(alpha = 0.4f),
                        contentColor = Color.White
                    ) {
                        Text(
                            text = "COP - Peso Colombiano",
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                            style = MaterialTheme.typography.labelSmall,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }
            }
        }

        // 2. Action Buttons
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                ActionBtn(icon = Icons.Default.Add, label = "Añadir") { /* Todo: Open Add Modal */ }
                ActionBtn(icon = Icons.Default.SwapHoriz, label = "Transferir") {}
                ActionBtn(icon = Icons.Default.BarChart, label = "Análisis") {}
                ActionBtn(icon = Icons.Default.Savings, label = "Metas") {}
            }
        }

        // 3. Accounts Section
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("Tus Cuentas", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                TextButton(onClick = {}) {
                    Text("Ver todo", color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                }
            }
            
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                AccountItem(
                    name = "Dinero en Efectivo",
                    balance = "$ 550.000",
                    subtitle = "Billetera manual",
                    color = Color(0xFFE8F5E9), // Green 50
                    iconColor = Color(0xFF43A047),
                    icon = Icons.Default.Payments
                )
                
                AccountItem(
                    name = "Cuenta Ahorros",
                    balance = "$ 5.200.000",
                    subtitle = "Bancolombia • ****1234",
                    color = Color(0xFFF5F5F5), // Gray 50
                    iconColor = Color(0xFF757575),
                    icon = Icons.Default.AccountBalance
                )
                
                AccountItem(
                    name = "Billetera Digital",
                    balance = "$ 850.000",
                    subtitle = "Nequi • ****9988",
                    color = Color(0xFF37474F), // Blue Grey
                    iconColor = Color.White,
                    icon = Icons.Default.QrCodeScanner
                )

                AccountItem(
                    name = "Tarjeta Crédito",
                    balance = "-$ 1.200.000",
                    subtitle = "Davivienda • ****4550",
                    isNegative = true,
                    color = Color(0xFF263238), // Dark
                    iconColor = Color.White,
                    icon = Icons.Default.CreditCard
                )
            }
        }
        
        // 4. Connect New Account Button
        item {
            Surface(
                onClick = {},
                shape = RoundedCornerShape(20.dp),
                border = androidx.compose.foundation.BorderStroke(2.dp, Color.LightGray.copy(alpha = 0.5f)), // Dashed border simulation implies using DrawModifier, sticking to simple border for now
                color = Color.Transparent,
                modifier = Modifier.fillMaxWidth().height(60.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxSize(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(Icons.Default.Add, contentDescription = null, tint = Color.Gray)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Conectar Nueva Cuenta", color = Color.Gray, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
fun ActionBtn(icon: androidx.compose.ui.graphics.vector.ImageVector, label: String, onClick: () -> Unit) {
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.width(70.dp)) {
        Surface(
            onClick = onClick,
            shape = RoundedCornerShape(20.dp),
            color = MaterialTheme.colorScheme.surface,
            shadowElevation = 2.dp,
            modifier = Modifier.size(64.dp)
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(
                    imageVector = icon,
                    contentDescription = label,
                    tint = Color(0xFF137fec),
                    modifier = Modifier.size(28.dp)
                )
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
        Text(label, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Bold, color = Color.Gray)
    }
}

@Composable
fun AccountItem(
    name: String,
    balance: String,
    subtitle: String,
    color: Color,
    iconColor: Color,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    isNegative: Boolean = false
) {
    Surface(
        onClick = {},
        shape = RoundedCornerShape(20.dp),
        color = MaterialTheme.colorScheme.surface,
        shadowElevation = 1.dp,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                // Icon Box
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .background(color),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(icon, contentDescription = null, tint = iconColor, modifier = Modifier.size(24.dp))
                }
                
                Spacer(modifier = Modifier.width(16.dp))
                
                Column {
                    Text(name, fontWeight = FontWeight.Bold, style = MaterialTheme.typography.bodyMedium)
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(subtitle, style = MaterialTheme.typography.bodySmall, color = Color.Gray)
                        if (name == "Dinero en Efectivo") {
                            Spacer(modifier = Modifier.width(4.dp))
                            Icon(Icons.Default.Edit, contentDescription = null, modifier = Modifier.size(12.dp), tint = Color.Gray)
                        }
                    }
                }
            }
            
            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = balance,
                    fontWeight = FontWeight.Bold,
                    color = if (isNegative) Color(0xFFFF5252) else MaterialTheme.colorScheme.onSurface
                )
                 Text(
                    text = "Actualizado hoy",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.Gray
                )
            }
        }
    }
}
