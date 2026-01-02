package com.example.vinkula.domain

import com.google.firebase.Timestamp

data class User(
    val id: String = "",
    val name: String = "",
    val email: String = "",
    val registrationDate: Timestamp = Timestamp.now()
)
