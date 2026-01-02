package com.example.vinkula.ui.auth

import android.widget.Toast
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Mail
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
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
fun RegisterScreen(navController: NavController, viewModel: AuthViewModel = viewModel()) {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }
    var acceptedTerms by remember { mutableStateOf(false) }
    
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState()
    
    val context = LocalContext.current

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
            title = "Crear Cuenta",
            subtitle = "Únete para gestionar tus finanzas con seguridad.",
            icon = Icons.Default.AccountBalanceWallet
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Form
        AuthInput(
            value = name,
            onValueChange = { name = it },
            label = "Usuario",
            icon = Icons.Default.Person,
            placeholder = "Elige un nombre de usuario"
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        AuthInput(
            value = email,
            onValueChange = { email = it },
            label = "Correo Electrónico",
            icon = Icons.Default.Mail,
            placeholder = "ejemplo@correo.com"
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        AuthInput(
            value = password,
            onValueChange = { password = it },
            label = "Contraseña",
            icon = Icons.Default.Lock,
            placeholder = "Crea tu contraseña",
            isPassword = true
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        AuthInput(
            value = confirmPassword,
            onValueChange = { confirmPassword = it },
            label = "Confirmar Contraseña",
            icon = Icons.Default.Lock,
            placeholder = "Repite tu contraseña",
            isPassword = true
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Terms Checkbox
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Checkbox(
                checked = acceptedTerms,
                onCheckedChange = { acceptedTerms = it },
                colors = CheckboxDefaults.colors(checkedColor = Color(0xFF137fec))
            )
            Text(
                text = "Acepto los Términos y Condiciones",
                style = MaterialTheme.typography.bodySmall,
                color = Color.Gray,
                modifier = Modifier.clickable { acceptedTerms = !acceptedTerms }
            )
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
            text = "Registrarse",
            onClick = {
                if (password == confirmPassword) {
                    viewModel.register(email, password, name) {
                        Toast.makeText(context, "Cuenta creada. Verifica tu correo.", Toast.LENGTH_LONG).show()
                         navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Login.route) { inclusive = true }
                        }
                    }
                } else {
                     Toast.makeText(context, "Las contraseñas no coinciden", Toast.LENGTH_SHORT).show()
                }
            },
            isLoading = isLoading,
            enabled = name.isNotBlank() && email.isNotBlank() && password.length >= 6 && acceptedTerms
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        // Login Link
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("¿Ya tienes una cuenta? ", color = Color.Gray, fontSize = 14.sp)
            Text(
                "Inicia Sesión",
                color = Color(0xFF137fec),
                fontWeight = FontWeight.Bold,
                fontSize = 14.sp,
                modifier = Modifier.clickable { navController.navigate(Screen.Login.route) }
            )
        }
        
        Spacer(modifier = Modifier.height(32.dp))
    }
}
