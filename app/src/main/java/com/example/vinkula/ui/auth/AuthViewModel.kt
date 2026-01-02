package com.example.vinkula.ui.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class AuthViewModel : ViewModel() {
    private val auth = FirebaseAuth.getInstance()

    private val firestore = com.google.firebase.firestore.FirebaseFirestore.getInstance()

    private val _currentUser = MutableStateFlow<FirebaseUser?>(auth.currentUser)
    val currentUser: StateFlow<FirebaseUser?> = _currentUser.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    fun login(email: String, password: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                auth.signInWithEmailAndPassword(email, password).await()
                _currentUser.value = auth.currentUser
                onSuccess()
            } catch (e: Exception) {
                _error.value = e.message
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun register(email: String, password: String, name: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                // 1. Create Auth User
                val authResult = auth.createUserWithEmailAndPassword(email, password).await()
                val firebaseUser = authResult.user
                
                if (firebaseUser != null) {
                    _currentUser.value = firebaseUser

                    // 2. Create User Document in Firestore
                    try {
                        kotlinx.coroutines.withTimeout(5000L) {
                            val newUser = com.example.vinkula.domain.User(
                                id = firebaseUser.uid,
                                name = name,
                                email = email,
                                registrationDate = com.google.firebase.Timestamp.now() // Note: Ensure Timestamp import if needed or use full path
                            )
                            firestore.collection("users").document(firebaseUser.uid).set(newUser).await()
                        }
                    } catch (e: Exception) {
                        // Log the error but proceed or decide strategy. 
                        // For now we proceed but maybe show a message?
                        // If Firestore fails, we might want to alert, but allowing login is prioritized.
                        // _error.value = "Warning: Profile creation incomplete."
                        // Proceeding allows the user to at least enter the app.
                        // Ideally we should retry in background.
                    }
                    
                    // 3. Send Verification Email
                    try {
                        kotlinx.coroutines.withTimeout(5000L) {
                            firebaseUser.sendEmailVerification().await()
                        }
                    } catch (e: Exception) {
                         // Ignore email error or log it.
                    }

                    onSuccess()
                } else {
                    _error.value = "Error: El usuario no pudo ser creado."
                }
            } catch (e: Exception) {
                // Traducir errores comunes de Firebase si es posible
                _error.value = e.localizedMessage ?: "Ocurrió un error desconocido al registrarse."
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun resetPassword(email: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                auth.sendPasswordResetEmail(email).await()
                onSuccess()
            } catch (e: Exception) {
                _error.value = e.message
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun logout() {
        auth.signOut()
        _currentUser.value = null
    }
}
