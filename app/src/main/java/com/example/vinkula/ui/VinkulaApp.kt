package com.example.vinkula.ui

import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.navigation.compose.rememberNavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Home
import androidx.compose.foundation.layout.padding
import com.example.vinkula.ui.auth.LoginScreen
import com.example.vinkula.ui.auth.RegisterScreen
import com.example.vinkula.ui.auth.RecoverPasswordScreen
import com.example.vinkula.ui.navigation.Screen

@Composable
fun VinkulaApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination
    val currentRoute = currentDestination?.route

    val mainRoutes = listOf(Screen.Home, Screen.Budget, Screen.Coach, Screen.Stats, Screen.Settings)
    val showBottomBar = currentRoute in mainRoutes.map { it.route }

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar {
                    mainRoutes.forEach { screen ->
                        NavigationBarItem(
                            icon = { 
                                when(screen) {
                                    Screen.Home -> androidx.compose.material3.Icon(androidx.compose.material.icons.Icons.Default.Home, "Inicio")
                                    Screen.Budget -> androidx.compose.material3.Icon(androidx.compose.material.icons.Icons.Default.List, "Transacciones")
                                    Screen.Coach -> androidx.compose.material3.Icon(androidx.compose.material.icons.Icons.Default.Person, "Coach")
                                    Screen.Stats -> androidx.compose.material3.Icon(androidx.compose.material.icons.Icons.Default.Info, "Estadísticas")
                                    Screen.Settings -> androidx.compose.material3.Icon(androidx.compose.material.icons.Icons.Default.Settings, "Ajustes")
                                    else -> {}
                                }
                            },
                            label = { 
                                Text(when(screen) {
                                    Screen.Home -> "Inicio"
                                    Screen.Budget -> "Trans."
                                    Screen.Coach -> "Coach"
                                    Screen.Stats -> "Stats"
                                    Screen.Settings -> "Ajustes"
                                    else -> ""
                                }) 
                            },
                            selected = currentDestination?.route == screen.route,
                            onClick = {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.startDestinationId) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController, 
            startDestination = Screen.Login.route,
            modifier = androidx.compose.ui.Modifier.padding(innerPadding)
        ) {
            composable(Screen.Login.route) {
                LoginScreen(navController = navController)
            }
            composable(Screen.Register.route) {
                RegisterScreen(navController = navController)
            }
            composable(Screen.RecoverPassword.route) {
                RecoverPasswordScreen(navController = navController)
            }
            composable(Screen.Home.route) {
                 com.example.vinkula.ui.home.HomeScreen(navController = navController)
            }
            composable(Screen.Budget.route) {
                 com.example.vinkula.ui.budget.BudgetScreen(navController = navController)
            }
            composable(Screen.Coach.route) {
                 com.example.vinkula.ui.coach.CoachScreen(navController = navController)
            }
            composable(Screen.Stats.route) {
                 com.example.vinkula.ui.stats.StatisticsScreen(navController = navController)
            }
            composable(Screen.Settings.route) {
                 com.example.vinkula.ui.settings.SettingsScreen(navController = navController)
            }
        }
    }
}
