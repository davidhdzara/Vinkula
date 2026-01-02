package com.example.vinkula.ui.auth

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.vinkula.ui.components.AuthButton
import com.example.vinkula.ui.components.AuthHeader
import com.example.vinkula.ui.components.AuthInput
import com.example.vinkula.ui.navigation.Screen

@Composable
fun LoginScreen(navController: NavController, viewModel: AuthViewModel = viewModel()) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState()

    // Status Bar spacer handled by Edge-to-Edge default insets usually, 
    // but a Scaffold or inner padding is safer.
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Spacer(modifier = Modifier.height(32.dp))
        
        AuthHeader(
            title = "Bienvenido de nuevo",
            subtitle = "Gestiona tus finanzas con seguridad y control.",
            icon = Icons.Default.AccountBalanceWallet
        )

        Spacer(modifier = Modifier.height(32.dp))

        // Form
        AuthInput(
            value = email,
            onValueChange = { email = it },
            label = "Usuario o Correo",
            icon = Icons.Default.Person,
            placeholder = "Ingresa tu usuario"
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        AuthInput(
            value = password,
            onValueChange = { password = it },
            label = "Contraseña",
            icon = Icons.Default.Lock,
            placeholder = "Ingresa tu contraseña",
            isPassword = true
        )
        
        // Forgot Password
        Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.CenterEnd) {
            TextButton(onClick = { navController.navigate(Screen.RecoverPassword.route) }) {
                Text(
                    "¿Olvidaste tu contraseña?",
                    color = Color(0xFF137fec),
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp
                )
            }
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        if (error != null) {
            Text(
                text = error ?: "",
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
                modifier = Modifier.padding(bottom = 16.dp)
            )
        }

        AuthButton(
            text = "Iniciar Sesión",
            onClick = {
                viewModel.login(email, password) {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                }
            },
            isLoading = isLoading,
            enabled = email.isNotBlank() && password.isNotBlank()
        )
        
        Spacer(modifier = Modifier.height(40.dp))
        
        Row(verticalAlignment = Alignment.CenterVertically) {
            Divider(modifier = Modifier.weight(1f))
            Text(
                "O ingresa con", 
                modifier = Modifier.padding(horizontal = 16.dp),
                style = MaterialTheme.typography.labelSmall,
                color = Color.Gray
            )
            Divider(modifier = Modifier.weight(1f))
        }
        
        Spacer(modifier = Modifier.height(32.dp))
        
        // Sign Up Link
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("¿No tienes una cuenta? ", color = Color.Gray, fontSize = 14.sp)
            Text(
                "Regístrate",
                color = Color(0xFF137fec),
                fontWeight = FontWeight.Bold,
                fontSize = 14.sp,
                modifier = Modifier.clickable { navController.navigate(Screen.Register.route) }
            )
        }
        
        Spacer(modifier = Modifier.height(32.dp))
    }
}
