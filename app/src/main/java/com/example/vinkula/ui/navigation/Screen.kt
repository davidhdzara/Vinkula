package com.example.vinkula.ui.navigation

sealed class Screen(val route: String) {
    object Login : Screen("login")
    object Register : Screen("register")
    object RecoverPassword : Screen("recover_password")
    object Home : Screen("home")
    object Budget : Screen("budget")
    object Coach : Screen("coach")
    object Stats : Screen("stats")
    object Settings : Screen("settings")
}
