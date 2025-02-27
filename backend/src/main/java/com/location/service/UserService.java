package com.location.service;


import com.location.dto.UserDTO;
import com.location.dto.ClientDTO;
import com.location.exceptions.UserAlreadyExistsException;
import com.location.exceptions.UserNotExistsException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    // method to save a user
    ClientDTO saveUser(ClientDTO userDTO) throws UserAlreadyExistsException;

    // method to get all users
    List<UserDTO> getUsers();

    String sendOTP(String to) throws UserNotExistsException;

    boolean validateOTP(String email, String otp)  ;

    void resetPassword(String email, String password) throws UserNotExistsException;

    UserDTO getUserByCIN(String cin) throws UserNotExistsException;

    List<ClientDTO> getClients();

    void deleteClient(String CIN) throws UserNotExistsException;

    void archiveClient(String CIN) throws UserNotExistsException;

    UserDTO updateUser(String cin, UserDTO userDTO) throws UserNotExistsException, UserAlreadyExistsException;
}
